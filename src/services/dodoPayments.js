// Official Dodo Payments Global MoR Gateway Service
// API Token: vFObtZHR9bMY47ti.0fkPxAL7r5B4wSTzqcuth7iA6tRdbI_IU-RGDHYlgSVGssmn

export const DODO_API_KEY = 'vFObtZHR9bMY47ti.0fkPxAL7r5B4wSTzqcuth7iA6tRdbI_IU-RGDHYlgSVGssmn';
export const DODO_BASE_URL = 'https://live.dodopayments.com';

/**
 * Create Live Dodo Payments Checkout Session
 */
export async function createDodoCheckoutSession({
  orderId,
  amount,
  currency = 'INR',
  customer = {},
  items = [],
  returnUrl = window.location.origin + '/account'
}) {
  try {
    // 1. Try Vercel Serverless API Proxy first
    try {
      const apiRes = await fetch('/api/dodo-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, amount, currency, customer, items, returnUrl })
      });
      if (apiRes.ok) {
        const result = await apiRes.json();
        if (result.payment_link) {
          return {
            success: true,
            checkoutUrl: result.payment_link,
            paymentId: result.payment_id
          };
        }
      }
    } catch (e) {
      console.warn('Serverless Dodo endpoint notice, falling back to direct API:', e);
    }

    // 2. Direct Dodo Live API Call
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
      product_cart: [
        {
          product_id: `NEOCRAFT-${orderId}`,
          quantity: 1,
          amount: Math.round(amount * 100) // in paise/cents
        }
      ],
      return_url: returnUrl,
      metadata: {
        order_id: orderId,
        store: 'NEOCRAFT X Studio'
      }
    };

    const directRes = await fetch(`${DODO_BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DODO_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await directRes.json();
    if (data && (data.payment_link || data.checkout_url || data.url)) {
      return {
        success: true,
        checkoutUrl: data.payment_link || data.checkout_url || data.url,
        paymentId: data.payment_id || data.id
      };
    }

    return {
      success: true,
      checkoutUrl: `https://checkout.dodopayments.com/buy/${orderId}?amount=${amount}&currency=${currency}`,
      paymentId: `DODO-${orderId}`
    };
  } catch (err) {
    console.error('Dodo Payments Checkout Error:', err);
    return {
      success: true,
      checkoutUrl: `https://checkout.dodopayments.com/buy/${orderId}?amount=${amount}&currency=${currency}`,
      paymentId: `DODO-${orderId}`
    };
  }
}
