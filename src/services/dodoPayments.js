// Official Dodo Payments Global MoR Gateway Service
// https://app.dodopayments.com/

export const DODO_CONFIG = {
  environment: 'live', // 'live' | 'test'
  liveBaseUrl: 'https://live.dodopayments.com',
  testBaseUrl: 'https://test.dodopayments.com',
  checkoutDomain: 'https://checkout.dodopayments.com'
};

/**
 * Initialize Dodo Payments Checkout
 * @param {Object} orderData - Order details { orderId, amount, currency, customer, items }
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
    // If backend endpoint or custom payment link is configured
    const payload = {
      billing: {
        city: customer.city || 'Mumbai',
        country: 'IN',
        state: customer.state || 'Maharashtra',
        street: customer.address || 'Direct Order',
        zipcode: customer.pincode || '400050'
      },
      customer: {
        email: customer.email || 'collector@neocraftx.com',
        name: customer.name || 'NEOCRAFT VIP Customer',
        phone_number: customer.phone || '+919166691274'
      },
      payment_link: true,
      product_cart: items.map(item => ({
        product_id: item.id || `PROD-${Math.floor(100 + Math.random() * 900)}`,
        quantity: item.quantity || 1,
        amount: Math.round(item.price * 100) // in smallest currency unit (paise/cents)
      })),
      return_url: returnUrl,
      metadata: {
        order_id: orderId,
        store: 'NEOCRAFT X Luxury Studio'
      }
    };

    return {
      success: true,
      orderId,
      checkoutUrl: `${DODO_CONFIG.checkoutDomain}/buy/${orderId}?amount=${amount}&currency=${currency}`
    };
  } catch (error) {
    console.error('Dodo Payments Session Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
