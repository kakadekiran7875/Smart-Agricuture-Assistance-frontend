/**
 * Smart Agriculture Assistant - Production Authentication Service (JWT)
 * Handles farmer registration, login, token refresh, profile retrieval, and logout.
 * Implements credentials: 'include' for secure HttpOnly cookie support and Bearer tokens.
 */
(function (window) {
    'use strict';

    const TOKEN_KEY = 'smartAgriToken';
    const USER_KEY = 'smartAgriUser';

    // In-memory storage for refresh token (NEVER store in localStorage or sessionStorage)
    let inMemoryRefreshToken = null;

    // Proactively clean up any legacy refresh token in storage if present
    try {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('smartAgriRefreshToken');
            localStorage.removeItem('smartAgriPassword');
        }
        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.removeItem('smartAgriRefreshToken');
            sessionStorage.removeItem('smartAgriPassword');
        }
    } catch (_) {}

    function getBaseUrl() {
        if (window.API_CONFIG && window.API_CONFIG.BASE_URL) {
            return window.API_CONFIG.BASE_URL;
        }
        const isLocal = typeof window !== 'undefined' && 
            (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '');
        return isLocal ? 'http://localhost:5001' : 'https://smart-agricuture-assistance-backend.onrender.com';
    }

    const AuthService = {
        /**
         * 1️⃣ Farmer Registration (Complete Profile & Location)
         */
        register: async function (params) {
            const baseUrl = getBaseUrl();
            const endpoint = (window.API_CONFIG && window.API_CONFIG.ENDPOINTS && window.API_CONFIG.ENDPOINTS.AUTH_REGISTER) || '/api/auth/register';

            const lat = params.latitude !== undefined && params.latitude !== null ? params.latitude : (params.location?.latitude);
            const lon = params.longitude !== undefined && params.longitude !== null ? params.longitude : (params.location?.longitude);
            const parsedLat = typeof lat === 'number' ? lat : (lat ? parseFloat(lat) : null);
            const parsedLon = typeof lon === 'number' ? lon : (lon ? parseFloat(lon) : null);

            const payload = {
                fullName: (params.fullName || params.name || '').trim(),
                mobileNumber: (params.mobileNumber || params.phone || '').trim().replace(/[\s\-()]/g, ''),
                email: params.email ? params.email.trim() : undefined,
                password: params.password,
                confirmPassword: params.confirmPassword || params.password,
                state: (params.state || 'Maharashtra').trim(),
                district: (params.district || '').trim(),
                taluka: (params.taluka || '').trim(),
                village: (params.village || '').trim(),
                address: (params.fullAddress || params.address || '').trim(),
                fullAddress: (params.fullAddress || params.address || '').trim(),
                pincode: (params.pinCode || params.pincode || '').trim(),
                pinCode: (params.pinCode || params.pincode || '').trim(),
                latitude: parsedLat !== null && !isNaN(parsedLat) ? parsedLat : undefined,
                longitude: parsedLon !== null && !isNaN(parsedLon) ? parsedLon : undefined,
                location: {
                    latitude: parsedLat !== null && !isNaN(parsedLat) ? parsedLat : null,
                    longitude: parsedLon !== null && !isNaN(parsedLon) ? parsedLon : null
                },
                userType: params.userType || 'Farmer',
                crops: Array.isArray(params.crops) ? params.crops : (params.crops ? [params.crops] : undefined),
                cropsCultivated: Array.isArray(params.crops) ? params.crops : (params.crops ? [params.crops] : undefined),
                landAcres: params.landAcres !== undefined && params.landAcres !== '' ? Number(params.landAcres) : undefined,
                farmingLandAcres: params.landAcres !== undefined && params.landAcres !== '' ? Number(params.landAcres) : undefined,
                soilType: params.soilType || undefined,
                irrigationType: params.irrigationType || undefined,
                farmingExperience: params.farmingExperience || undefined,
                preferredLanguage: params.preferredLanguage || 'mr',
                acceptTerms: params.acceptTerms !== undefined ? params.acceptTerms : true,
                termsAccepted: params.acceptTerms !== undefined ? params.acceptTerms : true
            };

            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(payload)
            });

            const data = await response.json().catch(() => ({ success: false, message: 'Invalid response from server' }));

            if (!response.ok || !data.success) {
                const err = new Error(data.message || `Registration failed (HTTP ${response.status})`);
                err.status = response.status;
                err.data = data;
                throw err;
            }

            if (data.token && data.user) {
                // Enrich safeUser with agricultural profile attributes if not returned
                const enriched = {
                    ...data.user,
                    taluka: payload.taluka || data.user.taluka,
                    address: payload.address || data.user.address,
                    pincode: payload.pincode || data.user.pincode,
                    latitude: payload.latitude || data.user.latitude,
                    longitude: payload.longitude || data.user.longitude,
                    crops: payload.crops || data.user.crops,
                    landAcres: payload.landAcres !== undefined ? payload.landAcres : data.user.landAcres,
                    soilType: payload.soilType || data.user.soilType,
                    irrigationType: payload.irrigationType || data.user.irrigationType,
                    farmingExperience: payload.farmingExperience || data.user.farmingExperience,
                    userType: payload.userType || data.user.userType
                };
                this.setSession(data.token, enriched, data.refreshToken);
            }

            return data;
        },

        /**
         * 2️⃣ Farmer Login (JWT Token)
         * Accepts mobile number or email as identifier
         */
        login: async function (identifier, password) {
            const baseUrl = getBaseUrl();
            const endpoint = (window.API_CONFIG && window.API_CONFIG.ENDPOINTS && window.API_CONFIG.ENDPOINTS.AUTH_LOGIN) || '/api/auth/login';

            const payload = {
                identifier: (identifier || '').trim(),
                password: password || ''
            };

            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(payload)
            });

            const data = await response.json().catch(() => ({ success: false, message: 'Invalid response from server' }));

            if (!response.ok || !data.success) {
                const err = new Error(data.message || 'Invalid mobile number or password');
                err.status = response.status;
                err.data = data;
                throw err;
            }

            if (data.token && data.user) {
                this.setSession(data.token, data.user, data.refreshToken);
            }

            return data;
        },

        /**
         * 3️⃣ Refresh Access Token (Uses HttpOnly cookie and/or in-memory token)
         */
        refreshToken: async function () {
            const baseUrl = getBaseUrl();
            const endpoint = '/api/auth/refresh';

            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ refreshToken: inMemoryRefreshToken || undefined })
            });

            const data = await response.json().catch(() => ({ success: false }));

            if (!response.ok || !data.success) {
                this.clearLocalSession();
                throw new Error(data.message || 'Session expired. Please log in again.');
            }

            if (data.accessToken) {
                this.setToken(data.accessToken);
                if (data.refreshToken) {
                    inMemoryRefreshToken = data.refreshToken;
                }
            }

            return data;
        },

        /**
         * 4️⃣ Fetch Current User Profile (/api/auth/me)
         */
        getProfile: async function () {
            const baseUrl = getBaseUrl();
            const endpoint = '/api/auth/me';
            let token = this.getToken();

            const headers = { 'Accept': 'application/json' };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            let response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'GET',
                headers: headers,
                credentials: 'include'
            });

            // If token expired, try silent refresh once
            if (response.status === 401) {
                try {
                    const refreshed = await this.refreshToken();
                    token = refreshed.accessToken;
                    headers['Authorization'] = `Bearer ${token}`;
                    response = await fetch(`${baseUrl}${endpoint}`, {
                        method: 'GET',
                        headers: headers,
                        credentials: 'include'
                    });
                } catch (rErr) {
                    this.clearLocalSession();
                    throw new Error('Session expired. Please login.');
                }
            }

            const data = await response.json().catch(() => ({ success: false, message: 'Failed to parse response' }));

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to fetch user profile');
            }

            if (data.user) {
                this.setUser(data.user);
            }

            return data;
        },

        /**
         * 5️⃣ Logout (Revoke Server Session + Clear Local Storage & Cookies)
         */
        logout: async function () {
            const baseUrl = getBaseUrl();
            const endpoint = '/api/auth/logout';
            const token = this.getToken();

            try {
                await fetch(`${baseUrl}${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                    },
                    credentials: 'include',
                    body: JSON.stringify({ refreshToken: inMemoryRefreshToken || undefined })
                });
            } catch (err) {
                console.warn('[AuthService] Logout request error (continuing local cleanup):', err.message);
            }

            this.clearLocalSession();
            console.log('[AuthService] Logged out successfully.');
        },

        /**
         * 6️⃣ Live Reverse-Geocode Coordinates
         * Connects to POST /api/location/reverse-geocode with automatic fallback
         */
        reverseGeocode: async function (latitude, longitude) {
            const baseUrl = getBaseUrl();
            const endpoint = (window.API_CONFIG && window.API_CONFIG.ENDPOINTS && window.API_CONFIG.ENDPOINTS.LOCATION_REVERSE_GEOCODE) || '/api/location/reverse-geocode';

            const payload = {
                latitude: Number(latitude),
                longitude: Number(longitude)
            };

            try {
                const response = await fetch(`${baseUrl}${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json().catch(() => ({}));

                if (response.ok && data.success && data.location) {
                    return data.location;
                }

                if (!response.ok && data.message) {
                    console.warn('[AuthService] Backend reverse-geocode message:', data.message);
                }
            } catch (networkErr) {
                console.warn('[AuthService] Backend reverse-geocode error (using fallback):', networkErr.message);
            }

            // Client-side fallback to OpenStreetMap Nominatim if backend route is unavailable
            try {
                const fallbackRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1`, {
                    headers: { 'Accept': 'application/json' }
                });
                if (fallbackRes.ok) {
                    const osm = await fallbackRes.json();
                    const addr = osm.address || {};
                    return {
                        state: addr.state || addr.province || addr.region || null,
                        district: (addr.state_district || addr.district || addr.county || '').replace(/\s+District$/i, '').trim() || null,
                        taluka: (addr.county || addr.subdistrict || addr.tehsil || addr.taluk || addr.taluka || '').replace(/\s+(Subdistrict|Tehsil|Taluka|Taluk)$/i, '').trim() || null,
                        village: (addr.village || addr.hamlet || addr.town || addr.city || addr.suburb || '').trim() || null,
                        fullAddress: osm.display_name || null,
                        pinCode: (addr.postcode || '').replace(/[^\d]/g, '').slice(0, 6) || null,
                        country: addr.country || 'India',
                        latitude: Number(latitude),
                        longitude: Number(longitude)
                    };
                }
            } catch (fallbackErr) {
                console.warn('[AuthService] Fallback reverse-geocode error:', fallbackErr.message);
            }

            throw new Error('Unable to resolve address from coordinates. Please enter your address details manually.');
        },

        /**
         * Storage Helpers - Compliant with strict security standards
         */
        setSession: function (token, user, refreshToken) {
            if (typeof localStorage === 'undefined') return;
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem('AGRI_AUTH_TOKEN', token);

            // Store refresh token strictly in memory, never in localStorage
            if (refreshToken) {
                inMemoryRefreshToken = refreshToken;
            }

            if (user) {
                const displayName = user.fullName || user.name || 'Farmer';
                const enrichedUser = {
                    ...user,
                    name: displayName,
                    fullName: displayName,
                    phone: user.mobileNumber || user.phone || '',
                    mobileNumber: user.mobileNumber || user.phone || '',
                    avatar: displayName ? displayName.charAt(0).toUpperCase() : 'F',
                    role: user.role || 'farmer',
                    loginTime: new Date().toISOString()
                };
                const userJson = JSON.stringify(enrichedUser);
                localStorage.setItem(USER_KEY, userJson);
                localStorage.setItem('AGRI_AUTH_USER', userJson);
            }
        },

        setToken: function (token) {
            if (typeof localStorage === 'undefined') return;
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem('AGRI_AUTH_TOKEN', token);
        },

        setUser: function (user) {
            if (typeof localStorage === 'undefined' || !user) return;
            const displayName = user.fullName || user.name || 'Farmer';
            const enrichedUser = {
                ...user,
                name: displayName,
                fullName: displayName,
                phone: user.mobileNumber || user.phone || '',
                mobileNumber: user.mobileNumber || user.phone || '',
                avatar: displayName ? displayName.charAt(0).toUpperCase() : 'F',
                role: user.role || 'farmer'
            };
            const userJson = JSON.stringify(enrichedUser);
            localStorage.setItem(USER_KEY, userJson);
            localStorage.setItem('AGRI_AUTH_USER', userJson);
        },

        getToken: function () {
            if (typeof localStorage === 'undefined') return null;
            return localStorage.getItem(TOKEN_KEY) || localStorage.getItem('AGRI_AUTH_TOKEN');
        },

        getCurrentUser: function () {
            if (typeof localStorage === 'undefined') return null;
            try {
                const u = localStorage.getItem(USER_KEY) || localStorage.getItem('AGRI_AUTH_USER');
                return u ? JSON.parse(u) : null;
            } catch (e) {
                return null;
            }
        },

        isAuthenticated: function () {
            return !!this.getToken();
        },

        clearLocalSession: function () {
            inMemoryRefreshToken = null;
            if (typeof localStorage === 'undefined') return;
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            localStorage.removeItem('AGRI_AUTH_TOKEN');
            localStorage.removeItem('AGRI_AUTH_USER');
            localStorage.removeItem('smartAgriRefreshToken');
            localStorage.removeItem('smartAgriPassword');
            if (typeof sessionStorage !== 'undefined') {
                sessionStorage.clear();
            }
        }
    };

    window.AuthService = AuthService;
    window.authService = AuthService;
})(typeof window !== 'undefined' ? window : globalThis);
