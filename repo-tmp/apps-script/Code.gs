/**
 * Marketplace stack rank submission webhook
 *
 * Spreadsheet: https://docs.google.com/spreadsheets/d/1gGJ6sAOiMk6d9bRsx8TZt-PCzBsAXJriMLk_blvB5DU
 *
 * Creates/ensures a "Responses" tab with Rank 1–11 headers on first write.
 */

var SPREADSHEET_ID = '1gGJ6sAOiMk6d9bRsx8TZt-PCzBsAXJriMLk_blvB5DU';
var SHEET_NAME = 'Responses';
var RANK_COUNT = 11;

function getHeaderRow_() {
  var headers = ['Timestamp', 'Name'];
  for (var i = 1; i <= RANK_COUNT; i++) {
    headers.push('Rank ' + i);
  }
  return headers;
}

function getResponsesSheet_() {
  if (!SPREADSHEET_ID || SPREADSHEET_ID === 'REPLACE_ME') {
    throw new Error('Set SPREADSHEET_ID in Code.gs to your Google Sheet ID.');
  }

  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  var headers = getHeaderRow_();
  var firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  if (!firstRow[0] && !firstRow[1]) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  return sheet;
}

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var sheet = getResponsesSheet_();
    var rankings = payload.rankings || [];
    var rankCells = [];

    for (var i = 1; i <= RANK_COUNT; i++) {
      var match = rankings.filter(function (item) {
        return item.rank === i;
      })[0];

      rankCells.push(match ? match.type : '');
    }

    sheet.appendRow(
      [payload.timestamp || new Date().toISOString(), payload.name || ''].concat(rankCells)
    );

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Stack rank webhook is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
