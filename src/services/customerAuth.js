// Production Customer Authentication & Official Google OAuth 2.0 / Identity Services Engine

const USER_STORAGE_KEY = 'neocraft_active_customer';
const USERS_DB_KEY = 'neocraft_registered_customers';
const SAVED_DESIGNS_KEY = 'neocraft_user_saved_designs';

// Official Live Google OAuth 2.0 Web Client ID
export const GOOGLE_CLIENT_ID = '1030893698897-o37fia9pfnahmmavqsre1lb16oi08cgb.apps.googleusercontent.com';

/**
 * Decode Google Identity Services JWT Credential Token
 */
export function decodeGoogleJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error decoding Google JWT Token:', e);
    return null;
  }
}

/**
 * Initialize Official Google Identity Services SDK
 */
export function initGoogleIdentityServices(onSuccessCallback, containerId = 'google-signin-btn-container') {
  if (typeof window === 'undefined') return;

  const tryInit = () => {
    if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response) => {
            if (response.credential) {
              const payload = decodeGoogleJwt(response.credential);
              if (payload) {
                const user = loginWithGoogleProfile({
                  name: payload.name || payload.given_name || 'Google User',
                  email: payload.email,
                  avatar: payload.picture,
                  googleId: payload.sub,
                  emailVerified: payload.email_verified
                });
                if (onSuccessCallback) onSuccessCallback(user);
              }
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true
        });

        // Render official Google button if container exists
        const container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = '';
          window.google.accounts.id.renderButton(container, {
            theme: 'filled_black',
            size: 'large',
            type: 'standard',
            shape: 'pill',
            text: 'continue_with',
            logo_alignment: 'left',
            width: 320
          });
        }
      } catch (err) {
        console.warn('Google GSI initialization notice:', err);
      }
    } else {
      setTimeout(tryInit, 300);
    }
  };

  tryInit();
}

/**
 * Trigger Real Google OAuth 2.0 Web Popup using Google Token Client
 */
export function triggerGoogleOAuthPopup(onSuccessCallback, onErrorCallback) {
  try {
    if (window.google?.accounts?.oauth2) {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
        callback: async (tokenResponse) => {
          if (tokenResponse && tokenResponse.access_token) {
            try {
              // Real Google UserInfo API request
              const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                  Authorization: `Bearer ${tokenResponse.access_token}`
                }
              });
              const profile = await res.json();
              if (profile && profile.email) {
                const user = loginWithGoogleProfile({
                  name: profile.name || profile.given_name || profile.email.split('@')[0],
                  email: profile.email,
                  avatar: profile.picture,
                  googleId: profile.sub,
                  emailVerified: profile.email_verified !== false
                });
                if (onSuccessCallback) onSuccessCallback(user);
              }
            } catch (fetchErr) {
              console.error('Failed to fetch Google profile:', fetchErr);
              if (onErrorCallback) onErrorCallback('Failed to retrieve profile from Google.');
            }
          } else if (tokenResponse?.error) {
            console.error('Google OAuth error:', tokenResponse.error);
            if (onErrorCallback) onErrorCallback(tokenResponse.error);
          }
        },
        error_callback: (err) => {
          console.error('Google Token Client Error:', err);
          if (onErrorCallback) onErrorCallback(err.message || 'Google Sign-In was cancelled.');
        }
      });

      client.requestAccessToken({ prompt: 'select_account' });
      return;
    }

    // Fallback to GSI ID Prompt
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    }
  } catch (err) {
    console.error('Trigger Google OAuth error:', err);
    if (onErrorCallback) onErrorCallback('Google Sign-In initialization failed.');
  }
}

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
    const cleanId = emailOrPhone.toLowerCase().trim();
    const users = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]');
    
    let user = users.find(u => 
      (u.email && u.email.toLowerCase() === cleanId) || 
      (u.phone && u.phone.includes(emailOrPhone.trim()))
    );

    if (user) {
      if (user.password && password && user.password !== password) {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      window.dispatchEvent(new Event('neocraft_auth_changed'));
      return { success: true, user };
    }

    // Auto-create registered account if password provided
    const namePart = emailOrPhone.includes('@') 
      ? emailOrPhone.split('@')[0].replace(/[^a-zA-Z]/g, ' ') 
      : 'VIP Member';
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    user = {
      id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formattedName.trim() || 'VIP Member',
      email: emailOrPhone.includes('@') ? cleanId : `${cleanId}@customer.neocraftx.com`,
      phone: !emailOrPhone.includes('@') ? emailOrPhone.trim() : '+91 91666 91274',
      password: password || '123456',
      city: 'Mumbai',
      tier: 'Gold VIP Member',
      karma: 500,
      authProvider: 'email',
      joinedAt: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`
    };

    users.push(user);
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event('neocraft_auth_changed'));
    return { success: true, user };
  } catch (e) {
    return { success: false, error: 'Authentication error occurred.' };
  }
}

export function loginWithGoogleProfile(profile) {
  try {
    if (!profile || !profile.email) return null;

    const cleanEmail = profile.email.toLowerCase().trim();
    const users = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]');
    let user = users.find(u => u.email && u.email.toLowerCase() === cleanEmail);

    if (!user) {
      user = {
        id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
        name: profile.name || cleanEmail.split('@')[0],
        email: cleanEmail,
        phone: profile.phone || '+91 91666 91274',
        city: profile.city || 'Mumbai',
        tier: 'Gold VIP Member',
        karma: 500, // 500 Welcome Bonus Karma Points
        authProvider: 'google',
        emailVerified: true,
        googleId: profile.googleId || null,
        joinedAt: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
        avatar: profile.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
      };
      users.push(user);
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    } else {
      user.name = profile.name || user.name;
      user.avatar = profile.avatar || user.avatar;
      user.authProvider = 'google';
      user.emailVerified = true;
    }

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event('neocraft_auth_changed'));
    return user;
  } catch (e) {
    return null;
  }
}

export const loginWithGoogle = loginWithGoogleProfile;

export function registerCustomer({ name, email, phone, password, city = 'Mumbai' }) {
  try {
    const cleanEmail = email.toLowerCase().trim();
    const users = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]');
    
    if (users.some(u => u.email && u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'This email is already registered. Please Sign In.' };
    }

    const newUser = {
      id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      password: password || '123456',
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
    return { success: true, user: newUser };
  } catch (e) {
    return { success: false, error: 'Registration error.' };
  }
}

export function logoutCustomer() {
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
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
