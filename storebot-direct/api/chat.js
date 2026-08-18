const ORIGIN = 'https://mohammed-lab-store-ai-0u8tlb.v2.appdeploy.ai/api/chat';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {});
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    const upstream = await fetch(ORIGIN, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'user-agent': 'StoreBot-SA/Vercel' },
      body: payload,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const text = await upstream.text();
    res.setHeader('cache-control', 'no-store');
    res.setHeader('content-type', upstream.headers.get('content-type') || 'application/json; charset=utf-8');
    return res.status(upstream.status).send(text);
  } catch (error) {
    console.error('chat proxy error', error);
    return res.status(502).json({ error: 'تعذر تشغيل التجربة الآن' });
  }
}
