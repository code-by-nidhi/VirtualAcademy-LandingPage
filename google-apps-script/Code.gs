/**
 * Techcadd Virtual Academy – enrollment form → Google Sheet
 *
 * Paste this into Extensions → Apps Script of your Google Sheet, set SECRET
 * (same value as GOOGLE_SHEET_SECRET in the website's .env.local), then
 * Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 * Full steps: see README.md in the website project.
 */

const SECRET = "CHANGE_ME_TO_A_LONG_RANDOM_STRING";
const SHEET_NAME = "Enrollments";
const TIMEZONE = "Asia/Kolkata";
const HEADERS = ["Timestamp", "Full Name", "Mobile (WhatsApp)", "Email", "City", "Course", "Current Status", "Page"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (body.secret !== SECRET) return json({ ok: false, error: "unauthorized" });

    lock.waitLock(10000); // avoid two submissions writing the same row
    const sheet = getSheet();
    const d = body.data || {};
    sheet.appendRow([
      Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd HH:mm:ss"),
      clean(d.name),
      clean(d.phone),
      clean(d.email),
      clean(d.city),
      clean(d.course),
      clean(d.status),
      clean(d.page),
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Visiting the web app URL in a browser shows this – handy to confirm the deployment works.
function doGet() {
  return json({ ok: true, message: "Enrollment endpoint is live. Submissions must be POSTed." });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Stops values like "=IMPORTXML(...)" being run as formulas, and keeps phone numbers as text.
function clean(v) {
  const s = String(v == null ? "" : v).trim().slice(0, 200);
  return /^[=+\-@0-9]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
