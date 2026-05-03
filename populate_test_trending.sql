-- Test data for Trending Places feature
-- Updates explore_places with varied review counts to show trending differences

-- Top trending: Phang Nga attractions
UPDATE explore_places 
SET 
  review_count = 2847,
  review_count_week = 285,
  last_review_at = datetime('now', '-2 days'),
  checkin_count = 712,
  rating = 4.8
WHERE title = 'Phang Nga Bay' OR title LIKE '%Phang Nga%';

UPDATE explore_places 
SET 
  review_count = 1923,
  review_count_week = 192,
  last_review_at = datetime('now', '-3 days'),
  checkin_count = 481,
  rating = 4.7
WHERE title LIKE '%James Bond%' OR title LIKE '%Khao Phing Kan%';

-- High trending: Phuket attractions
UPDATE explore_places 
SET 
  review_count = 3421,
  review_count_week = 342,
  last_review_at = datetime('now', '-1 day'),
  checkin_count = 856,
  rating = 4.9
WHERE title LIKE '%Patong%' OR title LIKE '%Big Buddha%' OR province_id = 'phuket';

-- Medium trending: Krabi attractions
UPDATE explore_places 
SET 
  review_count = 1567,
  review_count_week = 156,
  last_review_at = datetime('now', '-4 days'),
  checkin_count = 392,
  rating = 4.6
WHERE province_id = 'krabi' OR title LIKE '%Krabi%';

-- Lower trending: Bangkok attractions
UPDATE explore_places 
SET 
  review_count = 892,
  review_count_week = 50,
  last_review_at = datetime('now', '-7 days'),
  checkin_count = 223,
  rating = 4.5
WHERE province_id = 'bkk' OR title LIKE '%Bangkok%' LIMIT 5;

-- Very low trending: Northeastern attractions
UPDATE explore_places 
SET 
  review_count = 345,
  review_count_week = 10,
  last_review_at = datetime('now', '-14 days'),
  checkin_count = 86,
  rating = 4.2
WHERE region_id = 'NE' AND review_count IS NULL
LIMIT 10;

-- Update timestamp to current so they show as fresh
UPDATE explore_places 
SET updated_at = datetime('now')
WHERE review_count IS NOT NULL;
