// api/subscribe.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    // Add subscriber to memory
    const subscribersModule = await import('./subscribers.js');
    subscribersModule.default({ method: 'POST', body: { name, email }, res });

    res.status(200).json({ message: `Thank you for subscribing, ${name}!` });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}