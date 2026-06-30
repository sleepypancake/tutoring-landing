import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone } = body;

  if (!name || !phone) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json({ error: 'Telegram not configured' }, { status: 500 });
  }

  const message = `📩 *Новая заявка с сайта!*\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n\n🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

  const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown',
    }),
  });

  if (!telegramRes.ok) {
    return NextResponse.json({ error: 'Telegram send failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
