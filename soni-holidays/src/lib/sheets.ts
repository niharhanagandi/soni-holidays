import { GoogleSpreadsheet } from 'google-spreadsheet';

function hasCreds() {
  return !!(process.env.GOOGLE_SHEETS_SPREADSHEET_ID && process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY);
}

export async function appendRow(sheetName: string, data: Record<string, any>) {
  if (!hasCreds()) {
    console.log('[sheets] Dry run:', sheetName, data);
    return { ok: true, dryRun: true } as const;
  }
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_SPREADSHEET_ID!, {
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL!,
    privateKey: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  } as any);
  await doc.loadInfo();
  let sheet = doc.sheetsByTitle[sheetName];
  if (!sheet) {
    sheet = await doc.addSheet({ title: sheetName, headerValues: Object.keys(data) });
  } else {
    if (!sheet.headerValues?.length) await sheet.setHeaderRow(Object.keys(data));
  }
  await sheet.addRow(data as any);
  return { ok: true } as const;
}