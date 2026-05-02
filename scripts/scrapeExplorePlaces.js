"use strict";
/**
 * Playwright Scraper for explore_places enrichment.
 *
 * Usage:
 *   npx tsx scripts/scrapeExplorePlaces.ts
 *
 * What it does:
 *   1. Reads all rows from explore_places in SQLite
 *   2. For each place without a thumbnail, searches Google Maps
 *   3. Scrapes: thumbnail URL, rating, description, opening hours
 *   4. Updates the SQLite row with enriched data
 *
 * Requirements:
 *   - playwright (already in devDeps)
 *   - better-sqlite3 (already in deps)
 *   - Run `npx playwright install chromium` once before first use
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var playwright_1 = require("playwright");
var better_sqlite3_1 = __importDefault(require("better-sqlite3"));
var path_1 = __importDefault(require("path"));
var os_1 = require("os");
// ─── Config ─────────────────────────────────────────
var DB_PATH = path_1.default.join((0, os_1.homedir)(), 'AppData', 'Roaming', 'locus', 'locus.db');
var DELAY_BETWEEN_SEARCHES_MS = 3000; // Polite delay between searches
var MAX_RETRIES = 2;
var HEADLESS = true;
// ─── Database ───────────────────────────────────────
function openDatabase() {
    console.log("\uD83D\uDCC2 Opening database: ".concat(DB_PATH));
    var db = new better_sqlite3_1.default(DB_PATH);
    db.pragma('journal_mode = WAL');
    return db;
}
function getPlacesToEnrich(db) {
    // Get places that haven't been enriched yet (no thumbnail or no rating)
    var rows = db.prepare("\n    SELECT id, title, location_name, category, thumbnail_url, full_image_url,\n           description, rating, opening_hours, source_url\n    FROM explore_places\n    WHERE thumbnail_url IS NULL OR rating IS NULL\n    ORDER BY id\n  ").all();
    return rows;
}
function updatePlace(db, id, data) {
    var _a;
    var updates = [];
    var params = [];
    if (data.thumbnailUrl) {
        updates.push('thumbnail_url = ?');
        params.push(data.thumbnailUrl);
    }
    if (data.fullImageUrl) {
        updates.push('full_image_url = ?');
        params.push(data.fullImageUrl);
    }
    if (data.description) {
        updates.push('description = ?');
        params.push(data.description);
    }
    if (data.rating !== undefined) {
        updates.push('rating = ?');
        params.push(data.rating);
    }
    if (data.openingHours) {
        updates.push('opening_hours = ?');
        params.push(data.openingHours);
    }
    if (data.sourceUrl) {
        updates.push('source_url = ?');
        params.push(data.sourceUrl);
    }
    if (updates.length === 0)
        return;
    updates.push("updated_at = datetime('now')");
    params.push(id);
    (_a = db.prepare("UPDATE explore_places SET ".concat(updates.join(', '), " WHERE id = ?"))).run.apply(_a, params);
}
// ─── Scraper ────────────────────────────────────────
function scrapeGoogleMaps(page, placeName, locationName) {
    return __awaiter(this, void 0, void 0, function () {
        var searchQuery, encodedQuery, url, result, ratingText, ratingNum, _a, ratingAlt, num, _b, imgSrc, _c, imgAlt, _d, address, _e, hoursButton, hoursText, _f, error_1;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    searchQuery = locationName
                        ? "".concat(placeName, " ").concat(locationName, " \u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28\u0E44\u0E17\u0E22")
                        : "".concat(placeName, " \u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28\u0E44\u0E17\u0E22");
                    encodedQuery = encodeURIComponent(searchQuery);
                    url = "https://www.google.com/maps/search/".concat(encodedQuery);
                    console.log("  \uD83D\uDD0D Searching: ".concat(searchQuery));
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 27, , 28]);
                    return [4 /*yield*/, page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 })];
                case 2:
                    _g.sent();
                    // Wait for the map to settle
                    return [4 /*yield*/, page.waitForTimeout(2500)];
                case 3:
                    // Wait for the map to settle
                    _g.sent();
                    result = {
                        sourceUrl: page.url(),
                    };
                    _g.label = 4;
                case 4:
                    _g.trys.push([4, 6, , 11]);
                    return [4 /*yield*/, page.locator('[class*="fontDisplayLarge"]').first().textContent({ timeout: 5000 })];
                case 5:
                    ratingText = _g.sent();
                    if (ratingText) {
                        ratingNum = parseFloat(ratingText.trim());
                        if (!isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5) {
                            result.rating = ratingNum;
                            console.log("  \u2B50 Rating: ".concat(ratingNum));
                        }
                    }
                    return [3 /*break*/, 11];
                case 6:
                    _a = _g.sent();
                    _g.label = 7;
                case 7:
                    _g.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, page.locator('span[aria-hidden="true"]').filter({ hasText: /^\d\.\d$/ }).first().textContent({ timeout: 3000 })];
                case 8:
                    ratingAlt = _g.sent();
                    if (ratingAlt) {
                        num = parseFloat(ratingAlt.trim());
                        if (!isNaN(num) && num >= 1 && num <= 5) {
                            result.rating = num;
                            console.log("  \u2B50 Rating (alt): ".concat(num));
                        }
                    }
                    return [3 /*break*/, 10];
                case 9:
                    _b = _g.sent();
                    console.log("  \u26A0\uFE0F Could not find rating");
                    return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 11];
                case 11:
                    _g.trys.push([11, 13, , 18]);
                    return [4 /*yield*/, page.locator('img[decoding="async"][src*="googleusercontent"]').first().getAttribute('src', { timeout: 5000 })];
                case 12:
                    imgSrc = _g.sent();
                    if (imgSrc) {
                        result.thumbnailUrl = imgSrc;
                        // Construct a larger version
                        result.fullImageUrl = imgSrc.replace(/=w\d+-h\d+/, '=w1200-h800');
                        console.log("  \uD83D\uDDBC\uFE0F Image found");
                    }
                    return [3 /*break*/, 18];
                case 13:
                    _c = _g.sent();
                    _g.label = 14;
                case 14:
                    _g.trys.push([14, 16, , 17]);
                    return [4 /*yield*/, page.locator('img[src*="maps/"]').first().getAttribute('src', { timeout: 3000 })];
                case 15:
                    imgAlt = _g.sent();
                    if (imgAlt && imgAlt.startsWith('http')) {
                        result.thumbnailUrl = imgAlt;
                        console.log("  \uD83D\uDDBC\uFE0F Image found (alt)");
                    }
                    return [3 /*break*/, 17];
                case 16:
                    _d = _g.sent();
                    console.log("  \u26A0\uFE0F Could not find image");
                    return [3 /*break*/, 17];
                case 17: return [3 /*break*/, 18];
                case 18:
                    _g.trys.push([18, 20, , 21]);
                    return [4 /*yield*/, page.locator('[data-item-id="address"]').first().textContent({ timeout: 3000 })];
                case 19:
                    address = _g.sent();
                    if (address) {
                        result.description = address.trim();
                        console.log("  \uD83D\uDCCD Address: ".concat(result.description.substring(0, 50), "..."));
                    }
                    return [3 /*break*/, 21];
                case 20:
                    _e = _g.sent();
                    console.log("  \u26A0\uFE0F Could not find address");
                    return [3 /*break*/, 21];
                case 21:
                    _g.trys.push([21, 25, , 26]);
                    hoursButton = page.locator('[data-item-id*="oh"]').first();
                    return [4 /*yield*/, hoursButton.isVisible({ timeout: 2000 })];
                case 22:
                    if (!_g.sent()) return [3 /*break*/, 24];
                    return [4 /*yield*/, hoursButton.textContent({ timeout: 3000 })];
                case 23:
                    hoursText = _g.sent();
                    if (hoursText) {
                        result.openingHours = hoursText.trim();
                        console.log("  \uD83D\uDD50 Hours: ".concat(result.openingHours.substring(0, 50), "..."));
                    }
                    _g.label = 24;
                case 24: return [3 /*break*/, 26];
                case 25:
                    _f = _g.sent();
                    console.log("  \u26A0\uFE0F Could not find hours");
                    return [3 /*break*/, 26];
                case 26: return [2 /*return*/, result];
                case 27:
                    error_1 = _g.sent();
                    console.error("  \u274C Error scraping ".concat(placeName, ":"), error_1 instanceof Error ? error_1.message : error_1);
                    return [2 /*return*/, {}];
                case 28: return [2 /*return*/];
            }
        });
    });
}
// ─── Main ───────────────────────────────────────────
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var db, places, browser, context, page, enriched, failed, _i, places_1, place, success, attempt, data, error_2, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('═══════════════════════════════════════════');
                    console.log('  Locus — Explore Places Scraper');
                    console.log('═══════════════════════════════════════════');
                    db = openDatabase();
                    places = getPlacesToEnrich(db);
                    if (places.length === 0) {
                        console.log('✅ All places already enriched. Nothing to do.');
                        db.close();
                        return [2 /*return*/];
                    }
                    console.log("\n\uD83D\uDCCB Found ".concat(places.length, " places to enrich\n"));
                    browser = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 17, 18, 21]);
                    return [4 /*yield*/, playwright_1.chromium.launch({
                            headless: HEADLESS,
                            args: [
                                '--disable-blink-features=AutomationControlled',
                                '--lang=th-TH',
                            ],
                        })];
                case 2:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newContext({
                            locale: 'th-TH',
                            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                            viewport: { width: 1280, height: 800 },
                        })];
                case 3:
                    context = _a.sent();
                    return [4 /*yield*/, context.newPage()];
                case 4:
                    page = _a.sent();
                    enriched = 0;
                    failed = 0;
                    _i = 0, places_1 = places;
                    _a.label = 5;
                case 5:
                    if (!(_i < places_1.length)) return [3 /*break*/, 15];
                    place = places_1[_i];
                    console.log("\n[".concat(enriched + failed + 1, "/").concat(places.length, "] ").concat(place.title, " \u2014 ").concat(place.location_name || 'ไม่ระบุ'));
                    success = false;
                    attempt = 0;
                    _a.label = 6;
                case 6:
                    if (!(attempt <= MAX_RETRIES)) return [3 /*break*/, 12];
                    if (!(attempt > 0)) return [3 /*break*/, 8];
                    console.log("  \uD83D\uDD04 Retry ".concat(attempt, "/").concat(MAX_RETRIES, "..."));
                    return [4 /*yield*/, page.waitForTimeout(2000)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    _a.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, scrapeGoogleMaps(page, place.title, place.location_name)];
                case 9:
                    data = _a.sent();
                    // Only update if we got meaningful data
                    if (data.rating || data.thumbnailUrl || data.description) {
                        updatePlace(db, place.id, data);
                        enriched++;
                        success = true;
                        console.log("  \u2705 Enriched successfully");
                        return [3 /*break*/, 12];
                    }
                    else {
                        console.log("  \u26A0\uFE0F No meaningful data scraped");
                    }
                    return [3 /*break*/, 11];
                case 10:
                    error_2 = _a.sent();
                    console.error("  \u274C Attempt ".concat(attempt + 1, " failed:"), error_2 instanceof Error ? error_2.message : error_2);
                    return [3 /*break*/, 11];
                case 11:
                    attempt++;
                    return [3 /*break*/, 6];
                case 12:
                    if (!success) {
                        failed++;
                        console.log("  \u274C Failed after ".concat(MAX_RETRIES + 1, " attempts"));
                    }
                    if (!(enriched + failed < places.length)) return [3 /*break*/, 14];
                    return [4 /*yield*/, page.waitForTimeout(DELAY_BETWEEN_SEARCHES_MS)];
                case 13:
                    _a.sent();
                    _a.label = 14;
                case 14:
                    _i++;
                    return [3 /*break*/, 5];
                case 15: return [4 /*yield*/, context.close()];
                case 16:
                    _a.sent();
                    console.log('\n═══════════════════════════════════════════');
                    console.log("  Results: ".concat(enriched, " enriched, ").concat(failed, " failed"));
                    console.log('═══════════════════════════════════════════\n');
                    return [3 /*break*/, 21];
                case 17:
                    error_3 = _a.sent();
                    console.error('Fatal error:', error_3);
                    return [3 /*break*/, 21];
                case 18:
                    if (!browser) return [3 /*break*/, 20];
                    return [4 /*yield*/, browser.close()];
                case 19:
                    _a.sent();
                    _a.label = 20;
                case 20:
                    db.close();
                    return [7 /*endfinally*/];
                case 21: return [2 /*return*/];
            }
        });
    });
}
main().catch(console.error);
