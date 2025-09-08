export type SheetPayload = Record<string, any> & { timestampISO?: string };

export async function appendRow(sheetName: string, data: SheetPayload) {
  const webapp = process.env.SHEETS_WEBAPP_URL;
  if (!webapp) {
    console.log('[sheets] Skipping, no SHEETS_WEBAPP_URL');
    return { ok: true, skipped: true } as const;
  }
  try {
    const res = await fetch(webapp, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, timestampISO: data.timestampISO || new Date().toISOString() }),
      // Apps Script requires no-cors in browser; but here we are on server.
    });
    if (!res.ok) throw new Error(`Sheets webapp responded ${res.status}`);
    return { ok: true } as const;
  } catch (err) {
    console.error('[sheets] Error', err);
    return { ok: false, error: String(err) } as const;
  }
}