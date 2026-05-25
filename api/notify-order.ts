import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('DISCORD_WEBHOOK_URL is not configured');
    return res.status(500).json({ error: 'Notification service not configured' });
  }

  try {
    const { orderNumber, firstName, lastName, email, phone, orderTotal, items } = req.body;

    // Basic validation — make sure we have the essentials
    if (!orderNumber || !firstName || !email || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Missing required order fields' });
    }

    const itemList = items
      .map((i: any) => `> • **${i.quantity}x** ${i.name} (${i.dosage}) - $${(i.price * i.quantity).toFixed(2)}`)
      .join('\n');

    const discordPayload = {
      content: [
        `@everyone`,
        ``,
        `🚨 **NEW ORDER RECEIVED!** 🚨`,
        ``,
        `🔖 **Order #:** ${orderNumber}`,
        `👤 **Customer:** ${firstName} ${lastName}`,
        `📧 **Email:** ${email}`,
        `📞 **Phone:** ${phone || 'N/A'}`,
        ``,
        `💰 **Order Total:** $${Number(orderTotal).toFixed(2)} CAD`,
        `💳 **Payment:** Interac e-Transfer (awaiting payment to payments@boreallabs.ca)`,
        ``,
        `📦 **Items Ordered:**`,
        itemList,
        ``,
        `*Watch for an incoming e-Transfer of $${Number(orderTotal).toFixed(2)} with memo "${orderNumber}". Log into Supabase to manage this order.*`,
      ].join('\n'),
    };

    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload),
    });

    if (!discordRes.ok) {
      const errText = await discordRes.text();
      console.error('Discord webhook error:', discordRes.status, errText);
      return res.status(502).json({ error: 'Failed to send notification' });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Notification handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
