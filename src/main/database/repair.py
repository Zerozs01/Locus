import os

db_path = r'C:\App\Electron\Locus\src\main\database\db.ts'

with open(db_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the start of the first getTrendingPlaces
clean_index = -1
for i, line in enumerate(lines):
    if 'export function getTrendingPlaces' in line:
        clean_index = i
        break

if clean_index != -1:
    # Keep only the clean part
    clean_content = "".join(lines[:clean_index])
    
    # Append the correct tail
    tail = """
export function getTrendingPlaces(limit = 5, timeframe: 'today' | 'week' | 'month' = 'week'): TrendingPlace[] {
  try {
    const rows = db.prepare('SELECT * FROM explore_places').all() as any[];
    const places = rows.map(r => ({
      ...r,
      tags: r.tags ? JSON.parse(r.tags) : []
    }));
    
    if (places.length === 0) return [];

    const now = Date.now();
    const scored = places.map((place) => {
      const trendingScore = calculateTrendingScore(place, timeframe, now);
      return { ...place, trendingScore };
    });

    const sortedAll = scored.sort((a, b) => b.trendingScore - a.trendingScore);
    const regionMap = new Map();
    const extras = [];
    
    for (const p of sortedAll) {
      const rid = p.region_id || 'unknown';
      if (!regionMap.has(rid)) regionMap.set(rid, p);
      else extras.push(p);
    }
    
    let combined = Array.from(regionMap.values());
    if (combined.length < limit) {
      combined.push(...extras.slice(0, limit - combined.length));
    }
    
    return combined.sort((a, b) => b.trendingScore - a.trendingScore).slice(0, limit);
  } catch (error) {
    console.error('❌ getTrendingPlaces Error:', error);
    return [];
  }
}

export function populateTestTrendingData(): { success: boolean; message: string; updated: number } {
  try {
    let updated = 0;
    const allPlaces = db.prepare('SELECT id FROM explore_places').all() as any[];
    const updateStmt = db.prepare(`
      UPDATE explore_places 
      SET review_count = ?, review_count_week = ?, last_review_at = ?, 
          checkin_count = ?, updated_at = datetime('now')
      WHERE id = ?
    `);

    db.transaction(() => {
      for (const p of allPlaces) {
        const isHot = Math.random() > 0.85;
        const baseMult = isHot ? 10 : 1;
        const total = Math.floor(Math.random() * 300 * baseMult) + 5;
        const weekly = Math.floor(Math.random() * 10 * baseMult);
        const checkins = Math.floor(Math.random() * 20 * baseMult);
        const daysAgo = Math.floor(Math.random() * 45);
        const lastReview = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
        updateStmt.run(total, weekly, lastReview, checkins, p.id);
        updated++;
      }
    })();
    return { success: true, message: `Updated ${updated} places`, updated };
  } catch (error) {
    console.error('❌ populateTestTrendingData Error:', error);
    return { success: false, message: 'Error', updated: 0 };
  }
}

export function saveExplorePlaces(places: any[]): number {
  const upsert = db.prepare(`
    INSERT INTO explore_places (
      title, location_name, category, icon_name, region_id, province_id, tags, 
      thumbnail_url, full_image_url, description, rating, review_count, review_count_week,
      last_review_at, checkin_count, opening_hours, source_url, lat, lng, updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(title, province_id) DO UPDATE SET
      location_name = excluded.location_name,
      category = excluded.category,
      updated_at = datetime('now')
  `);
  const doInsert = db.transaction((items) => {
    for (const p of items) {
      upsert.run(
        p.title, p.locationName || null, p.category || null, p.iconName || null,
        p.regionId || null, p.provinceId || null, p.tags ? JSON.stringify(p.tags) : null,
        p.thumbnailUrl || null, p.fullImageUrl || null, p.description || null,
        p.rating ?? null, p.reviewCount ?? null, p.reviewCountWeek ?? null,
        p.lastReviewAt ?? null, p.checkinCount ?? null, p.openingHours || null,
        p.sourceUrl || null, p.lat ?? null, p.lng ?? null
      );
    }
  });
  doInsert(places);
  return places.length;
}

export function seedExplorePlaces(places: any[]): void {
  saveExplorePlaces(places);
}

export interface ProvinceStats {
  provinceId: string;
  provinceName: string;
  regionId: string;
  visitorCount: number;
  popularityFactors?: string;
  lastUpdated?: string;
}

export function upsertProvinceStats(stats: ProvinceStats): void {
  const upsert = db.prepare(`
    INSERT INTO provinces_stats (province_id, province_name, region_id, visitor_count, popularity_factors, last_updated)
    VALUES (?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(province_id) DO UPDATE SET
      visitor_count = excluded.visitor_count,
      last_updated = datetime('now')
  `);
  upsert.run(stats.provinceId, stats.provinceName, stats.regionId, stats.visitorCount, stats.popularityFactors ?? null);
}

export function getPopularProvinces(regionId?: string, limit = 100): ProvinceStats[] {
  const condition = regionId ? 'WHERE region_id = ?' : '';
  const rows = db.prepare(`SELECT * FROM provinces_stats ${condition} ORDER BY visitor_count DESC LIMIT ?`).all(limit) as any[];
  return rows.map(r => ({
    provinceId: r.province_id,
    provinceName: r.province_name,
    regionId: r.region_id,
    visitorCount: r.visitor_count,
    popularityFactors: r.popularity_factors,
    lastUpdated: r.last_updated
  }));
}

export function saveChatConversation(id, title, chatContext, lastContextKey) {
  const upsert = db.prepare(`
    INSERT INTO chat_conversations (id, title, chat_context, last_context_key, updated_at)
    VALUES (?, ?, ?, ?, datetime('now'))
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      chat_context = excluded.chat_context,
      last_context_key = excluded.last_context_key,
      updated_at = datetime('now')
  `);
  upsert.run(id, title, JSON.stringify(chatContext), lastContextKey);
}

export function getChatConversations() {
  const rows = db.prepare('SELECT * FROM chat_conversations ORDER BY updated_at DESC').all() as any[];
  return rows.map(r => ({
    id: r.id,
    title: r.title,
    chatContext: r.chat_context ? JSON.parse(r.chat_context) : null,
    lastContextKey: r.last_context_key,
    createdAt: r.created_at,
    updatedAt: r.updated_at
  }));
}

export function getChatConversation(id) {
  const row = db.prepare('SELECT * FROM chat_conversations WHERE id = ?').get(id) as any;
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    chatContext: row.chat_context ? JSON.parse(row.chat_context) : null,
    lastContextKey: row.last_context_key,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function deleteChatConversation(id) {
  db.prepare('DELETE FROM chat_conversations WHERE id = ?').run(id);
}

export function saveChatMessage(message) {
  const upsert = db.prepare(`
    INSERT INTO chat_messages (id, conversation_id, text, sender, timestamp, sources, context_type, context_data, status, is_system)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      text = excluded.text,
      status = excluded.status
  `);
  upsert.run(
    message.id, message.conversationId, message.text, message.sender, message.timestamp,
    message.sources ? JSON.stringify(message.sources) : null,
    message.contextType || null,
    message.contextData ? JSON.stringify(message.contextData) : null,
    message.status || 'complete', message.isSystem ? 1 : 0
  );
}

export function getChatMessages(conversationId) {
  const rows = db.prepare('SELECT * FROM chat_messages WHERE conversation_id = ? ORDER BY timestamp ASC').all(conversationId) as any[];
  return rows.map(r => ({
    id: r.id, conversationId: r.conversation_id, text: r.text, sender: r.sender,
    timestamp: r.timestamp, sources: r.sources ? JSON.parse(r.sources) : [],
    contextType: r.context_type, contextData: r.context_data ? JSON.parse(r.context_data) : null,
    status: r.status, isSystem: r.is_system === 1
  }));
}

export function deleteChatMessage(messageId) {
  db.prepare('DELETE FROM chat_messages WHERE id = ?').run(messageId);
}

export function getNewsArchive(provinceId, limit = 20) {
  if (provinceId) {
    return db.prepare('SELECT * FROM news_archive WHERE province_id = ? ORDER BY published_at DESC LIMIT ?').all(provinceId, limit);
  }
  return db.prepare('SELECT * FROM news_archive ORDER BY published_at DESC LIMIT ?').all(limit);
}

export function saveNewsArchive(items) {
  const insert = db.prepare(`
    INSERT OR REPLACE INTO news_archive (id, province_id, title, source, url, published_at, summary, tag, is_tactical)
    VALUES (@id, @province_id, @title, @source, @url, @published_at, @summary, @tag, @is_tactical)
  `);
  const transaction = db.transaction((rows) => {
    for (const row of rows) insert.run(row);
  });
  transaction(items);
  return { success: true, count: items.length };
}
"""
    with open(db_path, 'w', encoding='utf-8') as f:
        f.write(clean_content + tail)
    print("Repair successful")
else:
    print("Clean point not found")
