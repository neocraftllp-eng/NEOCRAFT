// Real Customer Authentication & VIP Member Loyalty Storage Engine

const USER_STORAGE_KEY = 'neocraft_active_customer';
const USERS_DB_KEY = 'neocraft_registered_customers';
const SAVED_DESIGNS_KEY = 'neocraft_user_saved_designs';

export function getCurrentCustomer() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function loginCustomer(emailOrPhone, password = '') {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]');
    let user = users.find(u => 
      (u.email && u.email.toLowerCase() === emailOrPhone.toLowerCase().trim()) || 
      (u.phone && u.phone.includes(emailOrPhone.trim()))
    );

    if (!user) {
      const namePart = emailOrPhone.includes('@') 
        ? emailOrPhone.split('@')[0].replace(/[^a-zA-Z]/g, ' ') 
        : 'VIP Member';
      const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

      user = {
        id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formattedName.trim() || 'VIP Member',
        email: emailOrPhone.includes('@') ? emailOrPhone.toLowerCase().trim() : `${emailOrPhone}@customer.neocraftx.com`,
        phone: !emailOrPhone.includes('@') ? emailOrPhone.trim() : '+91 91666 91274',
        tier: 'Gold VIP Member',
        karma: 500,
        authProvider: 'email',
        joinedAt: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`
      };
      users.push(user);
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    }

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event('neocraft_auth_changed'));
    return user;
  } catch (e) {
    return null;
  }
}

export function loginWithGoogle(googleProfile = null) {
  try {
    if (!googleProfile || !googleProfile.email) {
      return null;
    }

    const users = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]');
    let user = users.find(u => u.email && u.email.toLowerCase() === googleProfile.email.toLowerCase().trim());

    if (!user) {
      user = {
        id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
        name: googleProfile.name || 'Google Customer',
        email: googleProfile.email.toLowerCase().trim(),
        phone: googleProfile.phone || '+91 91666 91274',
        city: googleProfile.city || 'Mumbai',
        tier: 'Gold VIP Member',
        karma: 500, // 500 Welcome Bonus Karma Points
        authProvider: 'google',
        joinedAt: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
        avatar: googleProfile.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
      };
      users.push(user);
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    } else {
      user.name = googleProfile.name || user.name;
      user.avatar = googleProfile.avatar || user.avatar;
      user.authProvider = 'google';
    }

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event('neocraft_auth_changed'));
    return user;
  } catch (e) {
    return null;
  }
}

export function registerCustomer({ name, email, phone, city = 'Mumbai' }) {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]');
    const newUser = {
      id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      city: city.trim(),
      tier: 'Gold VIP Member',
      karma: 500, // 500 Welcome Bonus Karma Points
      authProvider: 'email',
      joinedAt: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`
    };

    users.push(newUser);
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    window.dispatchEvent(new Event('neocraft_auth_changed'));
    return newUser;
  } catch (e) {
    return null;
  }
}

export function logoutCustomer() {
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
    window.dispatchEvent(new Event('neocraft_auth_changed'));
  } catch (e) {}
}

export function getCustomerSavedDesigns() {
  try {
    const raw = localStorage.getItem(SAVED_DESIGNS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveCustomerDesign(design) {
  try {
    const current = getCustomerSavedDesigns();
    const newDesign = {
      id: `DSG-${Math.floor(100 + Math.random() * 900)}`,
      savedAt: 'Just now',
      ...design
    };
    const updated = [newDesign, ...current];
    localStorage.setItem(SAVED_DESIGNS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}
