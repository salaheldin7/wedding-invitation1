# Premium Wedding Invitation

A cinematic, bilingual (English/Arabic) wedding invitation built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Highlights

- Cinematic intro sequence with monogram, card reveal, and envelope animation
- Bilingual layout with RTL support and Arabic typography
- Live countdown to 21 August 2026
- Frontend-only RSVP form (Google Sheets via Apps Script)
- Auto-start music with mute control

## Development

```bash
npm install
npm run dev
```

## Configuration

- Audio: place your track at `public/audio/ahwak.mp3` or update the source in `src/app/page.tsx`
- RSVP: set `NEXT_PUBLIC_RSVP_ENDPOINT` in `.env.local`
- Monogram initials: update the text in `src/components/intro/MonogramScene.tsx` and `src/components/intro/EnvelopeScene.tsx`

## RSVP to Google Sheets

Create a Google Sheet, open Apps Script, and paste this handler:

```js
function doPost(e) {
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RSVP");
	const data = JSON.parse(e.postData.contents);
	sheet.appendRow([
		new Date(),
		data.name,
		data.attendance,
		data.guests,
		data.message,
	]);
	return ContentService.createTextOutput(JSON.stringify({ ok: true }))
		.setMimeType(ContentService.MimeType.JSON)
		.setHeader("Access-Control-Allow-Origin", "*");
}
```

Deploy it as a Web App and set the deployment URL in `.env.local`:

```
NEXT_PUBLIC_RSVP_ENDPOINT=YOUR_WEB_APP_URL
```

## Notes

- Animations respect the user's reduced motion setting.
- Designed mobile-first; test on iPhone aspect ratios.
