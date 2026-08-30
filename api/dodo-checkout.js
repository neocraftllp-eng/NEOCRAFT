// Vercel Serverless Function: Dodo Payments Checkout Creator
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.DODO_PAYMENTS_API_KEY || 'vFObtZHR9bMY47ti.0fkPxAL7r5B4wSTzqcuth7iA6tRdbI_IU-RGDHYlgSVGssmn';

  try {
    const { orderId, amount, currency = 'INR', customer = {}, items = [], returnUrl } = req.body;

    const payload = {
      billing: {
        city: customer.city || 'Mumbai',
        country: 'IN',
        state: customer.state || 'Maharashtra',
        street: customer.address || 'Signature Tower, Mumbai',
        zipcode: customer.pincode || '400050'
      },
      customer: {
        email: customer.email || 'collector@neocraftx.com',
        name: customer.name || 'NEOCRAFT VIP Collector',
        phone_number: customer.phone || '+919166691274'
      },
      payment_link: true,
      product_cart: items.length > 0 ? items.map(item => ({
        product_id: item.id || `PROD-${Math.floor(100 + Math.random() * 900)}`,
        quantity: item.quantity || 1,
        amount: Math.round((item.price || amount) * 100)
      })) : [
        {
          product_id: `NEOCRAFT-${orderId || 'SIGN'}`,
          quantity: 1,
          amount: Math.round(amount * 100)
        }
      ],
      return_url: returnUrl || 'https://neocraftx.com/account',
      metadata: {
        order_id: orderId,
        store: 'NEOCRAFT X Studio'
      }
    };

    const response = await fetch('https://live.dodopayments.com/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok && data) {
      return res.status(200).json({
        success: true,
        payment_link: data.payment_link || data.checkout_url || data.url,
        payment_id: data.payment_id || data.id,
        data
      });
    } else {
      return res.status(200).json({
        success: true,
        fallback: true,
        payment_link: `https://checkout.dodopayments.com/buy/${orderId}?amount=${amount}&currency=${currency}`,
        error: data
      });
    }
  } catch (error) {
    console.error('Dodo Payments Serverless Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
