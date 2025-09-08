// SheetsWebApp.gs
// 1) In Google Drive: New > Google Sheets (name: SoniHolidays_Leads)
// 2) Extensions > Apps Script: paste this code, then Deploy > New deployment > Type: Web app
//    Execute as: Me, Access: Anyone with the link. Copy the Web App URL into SHEETS_WEBAPP_URL.

const SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'timestampISO','source_page','name','email','phone','trip_type','destination',
        'start_date','end_date','budget','group_size','pace','notes'
      ]);
    }
    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.timestampISO || new Date().toISOString(),
      data.source_page || '',
      data.name || '',
      data.email || '',
      data.phone || '',
      data.trip_type || '',
      data.destination || '',
      data.start_date || '',
      data.end_date || '',
      data.budget || '',
      data.group_size || '',
      data.pace || '',
      data.notes || ''
    ]);
    return ContentService.createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

