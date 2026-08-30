export const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, name: 'INR (₹)' },
  USD: { symbol: '$', rate: 0.012, name: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.011, name: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.0095, name: 'GBP (£)' },
  AED: { symbol: 'AED ', rate: 0.044, name: 'AED (د.إ)' }
};

export const SIZES = [
  { id: 'S', label: 'Small (45cm / 18")', multiplier: 1.0, basePrice: 3499, suitableFor: 'Bedside, Desk, Intimate corner' },
  { id: 'M', label: 'Medium (75cm / 30")', multiplier: 1.45, basePrice: 4999, suitableFor: 'Standard Bedroom wall, Gaming setup' },
  { id: 'L', label: 'Large (100cm / 39")', multiplier: 1.95, basePrice: 6999, suitableFor: 'Living Room, Wedding backdrop, Cafe' },
  { id: 'XL', label: 'X-Large (150cm / 59")', multiplier: 2.8, basePrice: 9999, suitableFor: 'Commercial Storefront, Bar wall, Event stage' },
  { id: 'XXL', label: 'Grand XXL (200cm / 78")', multiplier: 3.9, basePrice: 13999, suitableFor: 'Club facade, Grand reception, Luxury villa' },
];

export const BACKING_TYPES = [
  { id: 'cut-to-shape', name: 'Cut-to-Shape', price: 0, desc: 'Contours seamlessly around the typography' },
  { id: 'full-rect', name: 'Full Acrylic Board', price: 499, desc: 'Solid rectangle clear optical acrylic plate' },
  { id: 'stand-off', name: 'Metallic Standoff Pins', price: 699, desc: 'Floating wall mounts with brass/steel spacers' },
  { id: 'hollow-cut', name: 'Hollow Invisible Outline', price: 899, desc: 'Zero excess backing, maximum modern float' },
];

export const calculateCustomNeonPrice = ({
  text = '',
  sizeId = 'M',
  backingId = 'cut-to-shape',
  hasRemoteDimmer = true,
  isOutdoorWaterproof = false,
  isMultiColor = false,
}) => {
  const cleanLength = text.replace(/[\s\n]/g, '').length || 1;
  const sizeObj = SIZES.find(s => s.id === sizeId) || SIZES[1];
  const backingObj = BACKING_TYPES.find(b => b.id === backingId) || BACKING_TYPES[0];

  // Base calculation
  let price = sizeObj.basePrice;

  // Additional character multiplier for long custom texts
  if (cleanLength > 8) {
    const extraChars = cleanLength - 8;
    price += extraChars * 220 * sizeObj.multiplier;
  }

  // Backing add-on
  price += backingObj.price;

  // Dimmer add-on
  if (hasRemoteDimmer) {
    price += 799;
  }

  // Waterproof add-on
  if (isOutdoorWaterproof) {
    price += 999;
  }

  // Multi-color / RGB add-on
  if (isMultiColor) {
    price += 699;
  }

  return Math.round(price);
};

export const formatPrice = (priceInINR, currencyCode = 'INR') => {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.INR;
  const converted = priceInINR * currency.rate;
  
  if (currencyCode === 'INR') {
    return `₹${Math.round(converted).toLocaleString('en-IN')}`;
  }
  return `${currency.symbol}${converted.toFixed(currencyCode === 'USD' || currencyCode === 'EUR' || currencyCode === 'GBP' ? 2 : 0)}`;
};
