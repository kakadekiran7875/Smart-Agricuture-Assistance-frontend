/**
 * Smart Agriculture Assistant (स्मार्ट कृषी सहाय्यक)
 * Farmer Multi-Step Registration Controller
 * Real-time GPS detection, reverse-geocoding, and automatic address population
 */

(function (window, document) {
    'use strict';

    // State Store
    const state = {
        currentStep: 1,
        maxVisitedStep: 1,
        selectedCrops: new Set(),
        gpsDetected: false,
        gpsAccuracy: null,
        isDetectingGps: false,
        isSubmitting: false,
        pendingLocationData: null,
        formData: {
            fullName: '',
            mobileNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
            preferredLanguage: 'mr',
            userType: 'Farmer',
            state: 'Maharashtra',
            district: '',
            taluka: '',
            village: '',
            address: '',
            fullAddress: '',
            pincode: '',
            pinCode: '',
            latitude: null,
            longitude: null,
            location: { latitude: null, longitude: null },
            crops: [],
            landAcres: '',
            soilType: '',
            irrigationType: '',
            farmingExperience: '',
            acceptTerms: false
        }
    };

    // Maharashtra Districts List
    const MAHARASHTRA_DISTRICTS = [
        'Ahmednagar (अहिल्यानगर)', 'Akola (अकोला)', 'Amravati (अमरावती)', 
        'Chhatrapati Sambhajinagar (औरंगाबाद)', 'Beed (बीड)', 'Bhandara (भंडारा)', 
        'Buldhana (बुलढाणा)', 'Chandrapur (चंद्रपूर)', 'Dhule (धुळे)', 
        'Gadchiroli (गडचिरोली)', 'Gondia (गोंदिया)', 'Hingoli (हिंगोली)', 
        'Jalgaon (जळगाव)', 'Jalna (जालना)', 'Kolhapur (कोल्हापूर)', 
        'Latur (लातूर)', 'Mumbai City (मुंबई शहर)', 'Mumbai Suburban (मुंबई उपनगर)', 
        'Nagpur (नागपूर)', 'Nanded (नांदेड)', 'Nandurbar (नंदुरबार)', 
        'Nashik (नाशिक)', 'Dharashiv (उस्मानाबाद)', 'Palghar (पालघर)', 
        'Parbhani (परभणी)', 'Pune (पुणे)', 'Raigad (रायगड)', 
        'Ratnagiri (रत्नागिरी)', 'Sangli (सांगली)', 'Satara (सातारा)', 
        'Sindhudurg (सिंधुदुर्ग)', 'Solapur (सोलापूर)', 'Thane (ठाणे)', 
        'Wardha (वर्धा)', 'Washim (वाशिम)', 'Yavatmal (यवतमाळ)'
    ];

    // Popular default crops for one-click pill selection
    const DEFAULT_CROPS = [
        { id: 'sugarcane', en: 'Sugarcane', mr: 'ऊस' },
        { id: 'cotton', en: 'Cotton', mr: 'कापूस' },
        { id: 'soybean', en: 'Soybean', mr: 'सोयाबीन' },
        { id: 'onion', en: 'Onion', mr: 'कांदा' },
        { id: 'wheat', en: 'Wheat', mr: 'गहू' },
        { id: 'rice', en: 'Rice / Paddy', mr: 'भात' },
        { id: 'maize', en: 'Maize', mr: 'मका' },
        { id: 'tomato', en: 'Tomato', mr: 'टोमॅटो' },
        { id: 'pomegranate', en: 'Pomegranate', mr: 'डाळिंब' },
        { id: 'grapes', en: 'Grapes', mr: 'द्राक्षे' },
        { id: 'turmeric', en: 'Turmeric', mr: 'हळद' },
        { id: 'chickpea', en: 'Gram / Harbara', mr: 'हरभरा' },
        { id: 'banana', en: 'Banana', mr: 'केळी' },
        { id: 'groundnut', en: 'Groundnut', mr: 'भुईमूग' }
    ];

    // Password Policy Regex (Must match backend utils/validators.js)
    const PASS_RULES = {
        minLen: (p) => p && p.length >= 8,
        uppercase: (p) => /[A-Z]/.test(p),
        lowercase: (p) => /[a-z]/.test(p),
        number: (p) => /[0-9]/.test(p),
        special: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p)
    };

    /**
     * DOM Initializer
     */
    document.addEventListener('DOMContentLoaded', () => {
        initLanguageDefault();
        initDistrictDropdown();
        initCropTags();
        bindInputEvents();
        bindPasswordToggles();
        bindGpsButton();
        bindStepperClicks();
        bindNavigationButtons();
    });

    /**
     * Inherit language from previous selection or browser
     */
    function initLanguageDefault() {
        const storedLang = localStorage.getItem('smartAgriLang') || localStorage.getItem('language');
        if (storedLang && ['mr', 'hi', 'en'].includes(storedLang)) {
            state.formData.preferredLanguage = storedLang;
            const langSelect = document.getElementById('preferredLanguage');
            if (langSelect) langSelect.value = storedLang;
        }
    }

    /**
     * Populate District Datalist / Dropdown
     */
    function initDistrictDropdown() {
        const districtList = document.getElementById('districtList');
        const districtSelect = document.getElementById('districtSelect');

        if (districtList) {
            districtList.innerHTML = MAHARASHTRA_DISTRICTS.map(d => `<option value="${d}">${d}</option>`).join('');
        }

        if (districtSelect) {
            MAHARASHTRA_DISTRICTS.forEach(d => {
                const opt = document.createElement('option');
                opt.value = d.split(' (')[0];
                opt.textContent = d;
                districtSelect.appendChild(opt);
            });
        }
    }

    /**
     * Render Interactive Crop Tag Pills
     */
    function initCropTags() {
        const container = document.getElementById('cropTagsContainer');
        if (!container) return;

        container.innerHTML = DEFAULT_CROPS.map(crop => `
            <button type="button" class="crop-tag-pill" data-crop="${crop.en}" onclick="window.toggleCropSelection('${crop.en}')">
                <i class="fa-solid fa-plus"></i>
                <span>${crop.mr} (${crop.en})</span>
            </button>
        `).join('');

        window.toggleCropSelection = function(cropName) {
            if (state.selectedCrops.has(cropName)) {
                state.selectedCrops.delete(cropName);
            } else {
                state.selectedCrops.add(cropName);
            }
            updateCropPillStyles();
        };

        const addCustomBtn = document.getElementById('btnAddCustomCrop');
        const customInput = document.getElementById('customCropInput');
        if (addCustomBtn && customInput) {
            addCustomBtn.addEventListener('click', () => {
                const val = customInput.value.trim();
                if (val && !state.selectedCrops.has(val)) {
                    state.selectedCrops.add(val);
                    customInput.value = '';
                    renderCustomPill(val);
                    updateCropPillStyles();
                }
            });
            customInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomBtn.click();
                }
            });
        }
    }

    function renderCustomPill(name) {
        const container = document.getElementById('cropTagsContainer');
        if (!container) return;
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'crop-tag-pill selected';
        pill.setAttribute('data-crop', name);
        pill.innerHTML = `<i class="fa-solid fa-check"></i> <span>${escapeHtml(name)}</span>`;
        pill.onclick = () => window.toggleCropSelection(name);
        container.appendChild(pill);
    }

    function updateCropPillStyles() {
        const pills = document.querySelectorAll('.crop-tag-pill');
        pills.forEach(pill => {
            const cropName = pill.getAttribute('data-crop');
            if (state.selectedCrops.has(cropName)) {
                pill.classList.add('selected');
                const icon = pill.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-check';
            } else {
                pill.classList.remove('selected');
                const icon = pill.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-plus';
            }
        });
        state.formData.crops = Array.from(state.selectedCrops);
    }

    /**
     * Password Visibility Toggles
     */
    function bindPasswordToggles() {
        const toggles = document.querySelectorAll('.btn-password-toggle');
        toggles.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                const input = document.getElementById(targetId);
                const icon = btn.querySelector('i');
                if (!input) return;

                if (input.type === 'password') {
                    input.type = 'text';
                    if (icon) icon.className = 'fa-solid fa-eye-slash';
                    btn.setAttribute('aria-label', 'Hide password');
                } else {
                    input.type = 'password';
                    if (icon) icon.className = 'fa-solid fa-eye';
                    btn.setAttribute('aria-label', 'Show password');
                }
            });
        });
    }

    /**
     * Password Strength Evaluation (Real-time)
     */
    function evaluatePasswordStrength(password) {
        const meterFill = document.getElementById('passwordMeterFill');
        const ruleMinLen = document.getElementById('ruleMinLen');
        const ruleUpper = document.getElementById('ruleUpper');
        const ruleLower = document.getElementById('ruleLower');
        const ruleNum = document.getElementById('ruleNum');
        const ruleSpecial = document.getElementById('ruleSpecial');

        const isMinLen = PASS_RULES.minLen(password);
        const isUpper = PASS_RULES.uppercase(password);
        const isLower = PASS_RULES.lowercase(password);
        const isNum = PASS_RULES.number(password);
        const isSpecial = PASS_RULES.special(password);

        updateRuleBadge(ruleMinLen, isMinLen);
        updateRuleBadge(ruleUpper, isUpper);
        updateRuleBadge(ruleLower, isLower);
        updateRuleBadge(ruleNum, isNum);
        updateRuleBadge(ruleSpecial, isSpecial);

        const score = [isMinLen, isUpper, isLower, isNum, isSpecial].filter(Boolean).length;

        if (meterFill) {
            let width = (score / 5) * 100;
            meterFill.style.width = `${width}%`;
            if (score <= 2) {
                meterFill.style.backgroundColor = 'var(--auth-danger)';
            } else if (score <= 4) {
                meterFill.style.backgroundColor = 'var(--auth-warning)';
            } else {
                meterFill.style.backgroundColor = 'var(--auth-success)';
            }
        }

        return score === 5;
    }

    function updateRuleBadge(el, isMet) {
        if (!el) return;
        const icon = el.querySelector('i');
        if (isMet) {
            el.classList.add('met');
            if (icon) icon.className = 'fa-solid fa-circle-check';
        } else {
            el.classList.remove('met');
            if (icon) icon.className = 'fa-regular fa-circle';
        }
    }

    /**
     * Real-time Input Validation & Binding
     */
    function bindInputEvents() {
        const passInput = document.getElementById('password');
        if (passInput) {
            passInput.addEventListener('input', () => {
                evaluatePasswordStrength(passInput.value);
                validateField('password');
                const confirmPass = document.getElementById('confirmPassword');
                if (confirmPass && confirmPass.value) {
                    validateField('confirmPassword');
                }
            });
        }

        const confirmPass = document.getElementById('confirmPassword');
        if (confirmPass) {
            confirmPass.addEventListener('input', () => {
                validateField('confirmPassword');
            });
        }

        const mobileInput = document.getElementById('mobileNumber');
        if (mobileInput) {
            mobileInput.addEventListener('input', (e) => {
                let clean = e.target.value.replace(/[^\d+]/g, '');
                if (clean.startsWith('+91')) clean = clean.slice(3);
                e.target.value = clean.slice(0, 10);
                validateField('mobileNumber');
            });
        }

        const pinInput = document.getElementById('pincode');
        if (pinInput) {
            pinInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^\d]/g, '').slice(0, 6);
                validateField('pincode');
            });
        }

        const watchedFields = [
            'fullName', 'email', 'state', 'district', 
            'taluka', 'village', 'address', 'preferredLanguage', 'userType'
        ];

        watchedFields.forEach(fieldId => {
            const el = document.getElementById(fieldId);
            if (el) {
                el.addEventListener('blur', () => validateField(fieldId));
                el.addEventListener('change', () => validateField(fieldId));
            }
        });
    }

    /**
     * Field-Specific Validation Logic
     */
    function validateField(fieldId) {
        const input = document.getElementById(fieldId);
        const errorEl = document.getElementById(`${fieldId}Error`);
        if (!input) return true;

        const val = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (fieldId) {
            case 'fullName':
                if (!val) {
                    isValid = false;
                    errorMessage = 'Full name is required / पूर्ण नाव आवश्यक आहे';
                } else if (val.length < 2) {
                    isValid = false;
                    errorMessage = 'Full name must be at least 2 characters';
                } else if (!/^[a-zA-Z\s\u0900-\u097F.]+$/.test(val)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid name using letters only';
                }
                break;

            case 'mobileNumber':
                const cleanPhone = val.replace(/[\s\-()]/g, '');
                if (!cleanPhone) {
                    isValid = false;
                    errorMessage = '10-digit mobile number is required / मोबाईल नंबर आवश्यक आहे';
                } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
                    isValid = false;
                    errorMessage = 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9';
                }
                break;

            case 'email':
                if (val && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address (e.g. farmer@gmail.com)';
                }
                break;

            case 'password':
                if (!val) {
                    isValid = false;
                    errorMessage = 'Password is required / पासवर्ड आवश्यक आहे';
                } else if (!evaluatePasswordStrength(val)) {
                    isValid = false;
                    errorMessage = 'Password does not meet all security criteria';
                }
                break;

            case 'confirmPassword':
                const origPass = document.getElementById('password')?.value || '';
                if (!val) {
                    isValid = false;
                    errorMessage = 'Please confirm your password / पासवर्ड खात्री करा';
                } else if (val !== origPass) {
                    isValid = false;
                    errorMessage = 'Passwords do not match / पासवर्ड जुळत नाही';
                }
                break;

            case 'preferredLanguage':
                if (!val) {
                    isValid = false;
                    errorMessage = 'Please select your preferred language';
                }
                break;

            case 'userType':
                if (!val) {
                    isValid = false;
                    errorMessage = 'Please select your user type';
                }
                break;

            case 'state':
                if (!val) {
                    isValid = false;
                    errorMessage = 'State is required / राज्य निवडा';
                }
                break;

            case 'district':
                if (!val) {
                    isValid = false;
                    errorMessage = 'District is required / जिल्हा आवश्यक आहे';
                }
                break;

            case 'taluka':
                if (!val) {
                    isValid = false;
                    errorMessage = 'Taluka / Tehsil is required / तालुका आवश्यक आहे';
                }
                break;

            case 'village':
                if (!val) {
                    isValid = false;
                    errorMessage = 'Village / City is required / गाव किंवा शहर आवश्यक आहे';
                }
                break;

            case 'address':
                if (!val) {
                    isValid = false;
                    errorMessage = 'Full address is required / संपूर्ण पत्ता आवश्यक आहे';
                }
                break;

            case 'pincode':
                if (!val) {
                    isValid = false;
                    errorMessage = '6-digit PIN Code is required / पिन कोड आवश्यक आहे';
                } else if (!/^[1-9][0-9]{5}$/.test(val)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid 6-digit Indian PIN code';
                }
                break;
        }

        if (!isValid) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            if (errorEl) {
                errorEl.textContent = errorMessage;
                errorEl.classList.add('active');
            }
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.classList.remove('active');
            }
        }

        return isValid;
    }

    /**
     * Validate Entire Step Before Proceeding
     */
    function validateStep(stepNumber) {
        let isValid = true;
        let firstInvalid = null;

        if (stepNumber === 1) {
            const step1Fields = ['fullName', 'mobileNumber', 'email', 'password', 'confirmPassword', 'preferredLanguage', 'userType'];
            step1Fields.forEach(f => {
                const pass = validateField(f);
                if (!pass) {
                    isValid = false;
                    if (!firstInvalid) firstInvalid = document.getElementById(f);
                }
            });
        } else if (stepNumber === 2) {
            const step2Fields = ['state', 'district', 'taluka', 'village', 'address', 'pincode'];
            step2Fields.forEach(f => {
                const pass = validateField(f);
                if (!pass) {
                    isValid = false;
                    if (!firstInvalid) firstInvalid = document.getElementById(f);
                }
            });
        } else if (stepNumber === 3) {
            isValid = true;
        } else if (stepNumber === 4) {
            const termsCheck = document.getElementById('acceptTermsCheckbox');
            if (!termsCheck || !termsCheck.checked) {
                showAlert('You must agree to the Terms & Conditions and Privacy Policy to create your account.', 'warning');
                isValid = false;
                if (!firstInvalid) firstInvalid = termsCheck;
            }
        }

        if (!isValid && firstInvalid) {
            firstInvalid.focus();
            if (firstInvalid.scrollIntoView) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        return isValid;
    }

    /* ========================================================
       LIVE GPS LOCATION DETECTION & ADDRESS AUTO-FILL ENGINE
    ======================================================== */

    /**
     * Manage Button Loading & Feedback States
     */
    function setGpsButtonState(stateType) {
        const btn = document.getElementById('btnDetectGps');
        const retryBtn = document.getElementById('btnRetryGps');
        if (!btn) return;

        switch (stateType) {
            case 'idle':
                state.isDetectingGps = false;
                btn.disabled = false;
                btn.style.background = '';
                btn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> <span id="btnDetectGpsText">Detect My Current Location</span>';
                if (retryBtn) retryBtn.style.display = 'none';
                break;

            case 'requesting':
                state.isDetectingGps = true;
                btn.disabled = true;
                btn.style.background = '';
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span id="btnDetectGpsText">Requesting Location Permission...</span>';
                if (retryBtn) retryBtn.style.display = 'none';
                break;

            case 'detecting':
                state.isDetectingGps = true;
                btn.disabled = true;
                btn.style.background = '';
                btn.innerHTML = '<i class="fa-solid fa-satellite-dish fa-spin"></i> <span id="btnDetectGpsText">Detecting Your Location...</span>';
                if (retryBtn) retryBtn.style.display = 'none';
                break;

            case 'fetching':
                state.isDetectingGps = true;
                btn.disabled = true;
                btn.style.background = '';
                btn.innerHTML = '<i class="fa-solid fa-network-wired fa-fade"></i> <span id="btnDetectGpsText">Fetching Address Details...</span>';
                if (retryBtn) retryBtn.style.display = 'none';
                break;

            case 'success':
                state.isDetectingGps = false;
                btn.disabled = false;
                btn.style.background = 'var(--auth-primary-dark)';
                btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span id="btnDetectGpsText">Location Detected Successfully</span>';
                if (retryBtn) retryBtn.style.display = 'inline-flex';
                break;

            case 'tryAgain':
                state.isDetectingGps = false;
                btn.disabled = false;
                btn.style.background = '';
                btn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> <span id="btnDetectGpsText">Try Again</span>';
                if (retryBtn) retryBtn.style.display = 'none';
                break;
        }
    }

    /**
     * Check if user has already entered an address
     */
    function hasExistingManualAddress() {
        const d = document.getElementById('district')?.value.trim();
        const t = document.getElementById('taluka')?.value.trim();
        const v = document.getElementById('village')?.value.trim();
        const a = document.getElementById('address')?.value.trim();
        const p = document.getElementById('pincode')?.value.trim();
        return Boolean(d || t || v || a || p);
    }

    /**
     * Reusable Function: Map Location Data from API into Form Fields
     */
    function mapLocationToForm(locationData) {
        if (!locationData) return;

        // 1. State
        if (locationData.state) {
            const stateSelect = document.getElementById('state');
            if (stateSelect) {
                let matched = false;
                const targetState = locationData.state.toLowerCase();
                for (let i = 0; i < stateSelect.options.length; i++) {
                    const opt = stateSelect.options[i];
                    if (opt.value.toLowerCase() === targetState || opt.textContent.toLowerCase().includes(targetState)) {
                        stateSelect.selectedIndex = i;
                        matched = true;
                        break;
                    }
                }
                if (!matched) {
                    const newOpt = document.createElement('option');
                    newOpt.value = locationData.state;
                    newOpt.textContent = locationData.state;
                    stateSelect.appendChild(newOpt);
                    stateSelect.value = locationData.state;
                }
                triggerFieldHighlight(stateSelect);
                validateField('state');
            }
        }

        // 2. District
        if (locationData.district) {
            const districtInput = document.getElementById('district');
            if (districtInput) {
                const cleanDist = locationData.district.replace(/\s+District$/i, '').trim();
                const matchedOption = MAHARASHTRA_DISTRICTS.find(d => d.toLowerCase().startsWith(cleanDist.toLowerCase()));
                districtInput.value = matchedOption || cleanDist;
                triggerFieldHighlight(districtInput);
                validateField('district');
            }
        }

        // 3. Taluka / Tehsil
        if (locationData.taluka) {
            const talukaInput = document.getElementById('taluka');
            if (talukaInput) {
                talukaInput.value = locationData.taluka;
                triggerFieldHighlight(talukaInput);
                validateField('taluka');
            }
        }

        // 4. Village / Town
        if (locationData.village) {
            const villageInput = document.getElementById('village');
            if (villageInput) {
                villageInput.value = locationData.village;
                triggerFieldHighlight(villageInput);
                validateField('village');
            }
        }

        // 5. Full Address
        if (locationData.fullAddress) {
            const addressInput = document.getElementById('address');
            if (addressInput) {
                addressInput.value = locationData.fullAddress;
                triggerFieldHighlight(addressInput);
                validateField('address');
            }
        }

        // 6. PIN Code
        if (locationData.pinCode) {
            const pinInput = document.getElementById('pincode');
            if (pinInput) {
                pinInput.value = String(locationData.pinCode).replace(/[^\d]/g, '').slice(0, 6);
                triggerFieldHighlight(pinInput);
                validateField('pincode');
            }
        }

        // Maintain Coordinates
        if (locationData.latitude && locationData.longitude) {
            const latInput = document.getElementById('latitude');
            const lngInput = document.getElementById('longitude');
            if (latInput) latInput.value = locationData.latitude;
            if (lngInput) lngInput.value = locationData.longitude;
            state.formData.latitude = locationData.latitude;
            state.formData.longitude = locationData.longitude;
            state.formData.location = { latitude: locationData.latitude, longitude: locationData.longitude };
        }

        collectStepData(2);
    }

    /**
     * Subtle visual pulse on auto-filled fields
     */
    function triggerFieldHighlight(element) {
        if (!element) return;
        element.classList.remove('detected-field-highlight');
        // Force reflow
        void element.offsetWidth;
        element.classList.add('detected-field-highlight');
        setTimeout(() => element.classList.remove('detected-field-highlight'), 1800);
    }

    /**
     * Confirmation Dialog for Overwriting Existing Address
     */
    function openOverwriteConfirmDialog(locationData, accuracy) {
        const dialog = document.getElementById('gpsOverwriteConfirmDialog');
        if (!dialog) {
            if (window.confirm('You have already entered address information. Would you like to overwrite it with the detected GPS location?')) {
                mapLocationToForm(locationData);
                setGpsButtonState('success');
                showGpsSuccessMessage(accuracy);
            } else {
                setGpsButtonState('success');
                showGpsStatus('Existing address preserved. GPS coordinates updated.', 'success');
            }
            return;
        }

        dialog.classList.add('active');

        const btnConfirm = document.getElementById('btnConfirmOverwrite');
        const btnCancel = document.getElementById('btnCancelOverwrite');

        btnConfirm.onclick = () => {
            dialog.classList.remove('active');
            mapLocationToForm(locationData);
            setGpsButtonState('success');
            showGpsSuccessMessage(accuracy);
            state.pendingLocationData = null;
        };

        btnCancel.onclick = () => {
            dialog.classList.remove('active');
            setGpsButtonState('success');
            showGpsStatus('Existing address preserved. GPS coordinates updated.', 'success');
            state.pendingLocationData = null;
        };
    }

    /**
     * Show Final Location Detected Success Message
     */
    function showGpsSuccessMessage(accuracy) {
        let accuracyBadge = '';
        if (accuracy) {
            const isPoor = accuracy > 1000;
            accuracyBadge = `<span class="gps-accuracy-pill ${isPoor ? 'poor' : ''}"><i class="fa-solid fa-bullseye"></i> ±${accuracy}m accuracy</span>`;
            if (isPoor) {
                accuracyBadge += ` <small style="color:var(--auth-warning); font-weight:600;">(Broad cellular fix — verify address details manually)</small>`;
            }
        }
        showGpsStatus(`Your current location has been detected successfully. Please verify your address before continuing. ${accuracyBadge}`, 'success');
    }

    /**
     * Start Browser Geolocation Detection Flow
     */
    function startGpsDetection() {
        if (state.isDetectingGps) return;

        if (!navigator.geolocation) {
            showGpsStatus('Geolocation is not supported by your browser. Please enter your location manually.', 'error');
            setGpsButtonState('tryAgain');
            return;
        }

        // Close any active overwrite dialog
        const dialog = document.getElementById('gpsOverwriteConfirmDialog');
        if (dialog) dialog.classList.remove('active');

        // State 1: Requesting Permission
        setGpsButtonState('requesting');
        showGpsStatus('Requesting browser device location permission...', 'warning');

        const geoOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };

        // State 2: Detecting Location
        const detectingTimer = setTimeout(() => {
            if (state.isDetectingGps) {
                setGpsButtonState('detecting');
                showGpsStatus('Locking GPS satellite/cellular signal...', 'warning');
            }
        }, 1200);

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                clearTimeout(detectingTimer);

                const lat = Number(pos.coords.latitude.toFixed(6));
                const lon = Number(pos.coords.longitude.toFixed(6));
                const accuracy = Math.round(pos.coords.accuracy || 0);

                state.formData.latitude = lat;
                state.formData.longitude = lon;
                state.formData.location = { latitude: lat, longitude: lon };
                state.gpsDetected = true;
                state.gpsAccuracy = accuracy;

                const latInput = document.getElementById('latitude');
                const lngInput = document.getElementById('longitude');
                if (latInput) latInput.value = lat;
                if (lngInput) lngInput.value = lon;

                // State 3: Fetching Address Details via Reverse-Geocoding API
                setGpsButtonState('fetching');
                showGpsStatus(`GPS signal locked (${lat}, ${lon}). Resolving address via reverse-geocoding...`, 'warning');

                try {
                    let locationData = null;

                    // Connect to Central AuthService -> POST /api/location/reverse-geocode
                    if (window.AuthService && typeof window.AuthService.reverseGeocode === 'function') {
                        locationData = await window.AuthService.reverseGeocode(lat, lon);
                    } else {
                        const baseUrl = (window.API_CONFIG && window.API_CONFIG.BASE_URL) || 'http://localhost:5001';
                        const res = await fetch(`${baseUrl}/api/location/reverse-geocode`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                            body: JSON.stringify({ latitude: lat, longitude: lon })
                        });
                        const data = await res.json().catch(() => ({}));
                        if (res.ok && data.success && data.location) {
                            locationData = data.location;
                        }
                    }

                    if (!locationData) {
                        throw new Error('No address information returned for coordinates.');
                    }

                    // Check if user already typed manual address
                    if (hasExistingManualAddress()) {
                        state.pendingLocationData = locationData;
                        setGpsButtonState('success');
                        showGpsStatus(`Location resolved for (${lat}, ${lon}). Please choose whether to replace your existing address below.`, 'warning');
                        openOverwriteConfirmDialog(locationData, accuracy);
                    } else {
                        mapLocationToForm(locationData);
                        setGpsButtonState('success');
                        showGpsSuccessMessage(accuracy);
                    }

                } catch (apiErr) {
                    console.warn('[GPS Detection] Reverse-geocoding note:', apiErr.message);
                    setGpsButtonState('tryAgain');
                    showGpsStatus(`GPS coordinates captured (${lat}, ${lon}). Address lookup could not be auto-resolved; please enter your village and district manually below.`, 'warning');
                }
            },
            (err) => {
                clearTimeout(detectingTimer);
                setGpsButtonState('tryAgain');

                let msg = 'Location detection could not be completed. You can enter your address details manually below.';
                if (err.code === err.PERMISSION_DENIED) {
                    msg = 'GPS permission denied. Registration is not blocked — please enter your location details manually below.';
                } else if (err.code === err.TIMEOUT) {
                    msg = 'Location request timed out (20s). Please check your GPS signal or enter address manually.';
                } else if (err.code === err.POSITION_UNAVAILABLE) {
                    msg = 'GPS position currently unavailable. Please enter your address manually.';
                }

                showGpsStatus(msg, 'warning');
            },
            geoOptions
        );
    }

    /**
     * Bind GPS Actions
     */
    function bindGpsButton() {
        const btn = document.getElementById('btnDetectGps');
        const retryBtn = document.getElementById('btnRetryGps');

        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                startGpsDetection();
            });
        }

        if (retryBtn) {
            retryBtn.addEventListener('click', (e) => {
                e.preventDefault();
                startGpsDetection();
            });
        }
    }

    function showGpsStatus(msg, type = 'info') {
        const badge = document.getElementById('gpsStatusBadge');
        if (!badge) return;
        badge.className = `gps-status-badge ${type}`;
        const iconClass = type === 'success' ? 'fa-circle-check' : type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-xmark';
        badge.innerHTML = `<i class="fa-solid ${iconClass}"></i> <div>${msg}</div>`;
    }

    /**
     * Step Navigation Controller
     */
    function goToStep(step) {
        if (step < 1 || step > 4) return;

        if (step > state.currentStep) {
            const isValid = validateStep(state.currentStep);
            if (!isValid) return;
            collectStepData(state.currentStep);
        } else {
            collectStepData(state.currentStep);
        }

        state.currentStep = step;
        state.maxVisitedStep = Math.max(state.maxVisitedStep, step);

        updateStepperUI();

        if (step === 4) {
            renderReviewData();
        }

        hideAlert();

        const card = document.querySelector('.auth-card-container');
        if (card && card.scrollIntoView) {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /**
     * Collect Form Field Values to In-Memory State
     */
    function collectStepData(step) {
        const getVal = (id) => (document.getElementById(id)?.value || '').trim();

        if (step === 1) {
            state.formData.fullName = getVal('fullName');
            state.formData.mobileNumber = getVal('mobileNumber').replace(/[\s\-()]/g, '');
            state.formData.email = getVal('email');
            state.formData.password = document.getElementById('password')?.value || '';
            state.formData.confirmPassword = document.getElementById('confirmPassword')?.value || '';
            state.formData.preferredLanguage = getVal('preferredLanguage') || 'mr';
            state.formData.userType = getVal('userType') || 'Farmer';
        } else if (step === 2) {
            state.formData.state = getVal('state') || 'Maharashtra';
            state.formData.district = getVal('district');
            state.formData.taluka = getVal('taluka');
            state.formData.village = getVal('village');
            state.formData.address = getVal('address');
            state.formData.fullAddress = getVal('address');
            state.formData.pincode = getVal('pincode');
            state.formData.pinCode = getVal('pincode');
            const lat = getVal('latitude');
            const lng = getVal('longitude');
            state.formData.latitude = lat ? parseFloat(lat) : null;
            state.formData.longitude = lng ? parseFloat(lng) : null;
            state.formData.location = {
                latitude: state.formData.latitude,
                longitude: state.formData.longitude
            };
        } else if (step === 3) {
            state.formData.crops = Array.from(state.selectedCrops);
            state.formData.landAcres = getVal('landAcres');
            state.formData.soilType = getVal('soilType');
            state.formData.irrigationType = getVal('irrigationType');
            state.formData.farmingExperience = getVal('farmingExperience');
        } else if (step === 4) {
            const termsBox = document.getElementById('acceptTermsCheckbox');
            state.formData.acceptTerms = termsBox ? termsBox.checked : false;
        }
    }

    /**
     * Update Stepper Progress Bar & Active Views
     */
    function updateStepperUI() {
        const steps = [1, 2, 3, 4];

        steps.forEach(s => {
            const stepEl = document.getElementById(`authStep${s}`);
            const itemBtn = document.getElementById(`stepperItem${s}`);

            if (stepEl) {
                if (s === state.currentStep) {
                    stepEl.classList.add('active');
                } else {
                    stepEl.classList.remove('active');
                }
            }

            if (itemBtn) {
                itemBtn.classList.remove('active', 'completed');
                if (s === state.currentStep) {
                    itemBtn.classList.add('active');
                } else if (s < state.currentStep) {
                    itemBtn.classList.add('completed');
                    const circle = itemBtn.querySelector('.step-circle');
                    if (circle) circle.innerHTML = '<i class="fa-solid fa-check"></i>';
                } else {
                    const circle = itemBtn.querySelector('.step-circle');
                    if (circle) circle.textContent = s;
                }
            }
        });

        const progressFill = document.getElementById('stepperProgressFill');
        if (progressFill) {
            const pct = ((state.currentStep - 1) / 3) * 100;
            progressFill.style.width = `${pct}%`;
        }
    }

    /**
     * Stepper Top Click Handler
     */
    function bindStepperClicks() {
        for (let i = 1; i <= 4; i++) {
            const btn = document.getElementById(`stepperItem${i}`);
            if (btn) {
                btn.addEventListener('click', () => {
                    if (i <= state.maxVisitedStep || i <= state.currentStep) {
                        goToStep(i);
                    } else if (i === state.currentStep + 1) {
                        goToStep(i);
                    }
                });
            }
        }
    }

    /**
     * Navigation Buttons (Next / Prev / Submit)
     */
    function bindNavigationButtons() {
        document.querySelectorAll('.btn-auth-next').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetStep = parseInt(btn.getAttribute('data-next'), 10);
                if (targetStep) goToStep(targetStep);
            });
        });

        document.querySelectorAll('.btn-auth-prev').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetStep = parseInt(btn.getAttribute('data-prev'), 10);
                if (targetStep) goToStep(targetStep);
            });
        });

        const submitBtn = document.getElementById('btnSubmitRegistration');
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                handleFormSubmission();
            });
        }
    }

    /**
     * Render Final Step 4 Review Data
     */
    function renderReviewData() {
        collectStepData(1);
        collectStepData(2);
        collectStepData(3);

        const d = state.formData;

        setReviewText('revFullName', d.fullName);
        setReviewText('revMobile', d.mobileNumber);
        setReviewText('revEmail', d.email || 'Not provided (ऐच्छिक)');
        setReviewText('revLanguage', getLanguageLabel(d.preferredLanguage));
        setReviewText('revUserType', d.userType);

        setReviewText('revState', d.state);
        setReviewText('revDistrict', d.district);
        setReviewText('revTaluka', d.taluka);
        setReviewText('revVillage', d.village);
        setReviewText('revAddress', d.address || d.fullAddress);
        setReviewText('revPincode', d.pincode || d.pinCode);

        const gpsWrap = document.getElementById('revGps');
        if (gpsWrap) {
            if (d.latitude && d.longitude) {
                gpsWrap.innerHTML = `<span class="review-tag-badge"><i class="fa-solid fa-location-dot"></i> ${d.latitude}, ${d.longitude}</span>`;
            } else {
                gpsWrap.innerHTML = '<span class="review-item-val empty">Manual Address Entered</span>';
            }
        }

        const cropsWrap = document.getElementById('revCrops');
        if (cropsWrap) {
            if (d.crops && d.crops.length > 0) {
                cropsWrap.innerHTML = d.crops.map(c => `<span class="review-tag-badge"><i class="fa-solid fa-wheat-awn"></i> ${escapeHtml(c)}</span>`).join('');
            } else {
                cropsWrap.innerHTML = '<span class="review-item-val empty">None selected (Can be added later)</span>';
            }
        }

        setReviewText('revLandAcres', d.landAcres ? `${d.landAcres} Acres / एकर` : 'Not specified');
        setReviewText('revSoilType', d.soilType || 'Not specified');
        setReviewText('revIrrigationType', d.irrigationType || 'Not specified');
        setReviewText('revFarmingExperience', d.farmingExperience || 'Not specified');
    }

    function setReviewText(elementId, value) {
        const el = document.getElementById(elementId);
        if (!el) return;
        if (value) {
            el.textContent = value;
            el.classList.remove('empty');
        } else {
            el.textContent = 'Not specified';
            el.classList.add('empty');
        }
    }

    function getLanguageLabel(code) {
        switch (code) {
            case 'mr': return 'मराठी (Marathi)';
            case 'hi': return 'हिन्दी (Hindi)';
            case 'kn': return 'ಕನ್ನಡ (Kannada)';
            default: return 'English';
        }
    }

    /**
     * Alert Notification Helper
     */
    function showAlert(message, type = 'danger') {
        const banner = document.getElementById('authAlertBanner');
        if (!banner) return;

        banner.className = `auth-alert-banner ${type} active`;
        const iconClass = type === 'success' ? 'fa-circle-check' : type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-exclamation';
        banner.innerHTML = `<i class="fa-solid ${iconClass} auth-alert-icon"></i> <div>${message}</div>`;

        if (banner.scrollIntoView) {
            banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function hideAlert() {
        const banner = document.getElementById('authAlertBanner');
        if (banner) {
            banner.className = 'auth-alert-banner';
            banner.innerHTML = '';
        }
    }

    /**
     * Form Submission to Backend API
     */
    async function handleFormSubmission() {
        if (state.isSubmitting) return;

        if (!validateStep(4)) return;

        if (!validateStep(1)) {
            goToStep(1);
            return;
        }
        if (!validateStep(2)) {
            goToStep(2);
            return;
        }

        collectStepData(1);
        collectStepData(2);
        collectStepData(3);
        collectStepData(4);

        const submitBtn = document.getElementById('btnSubmitRegistration');
        const origBtnHtml = submitBtn ? submitBtn.innerHTML : '';

        try {
            state.isSubmitting = true;
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Registering Farmer Account...';
            }
            hideAlert();

            // Submit according to backend registration contract
            const registrationPayload = {
                fullName: state.formData.fullName,
                mobileNumber: state.formData.mobileNumber,
                email: state.formData.email || undefined,
                password: state.formData.password,
                confirmPassword: state.formData.confirmPassword,
                preferredLanguage: state.formData.preferredLanguage,
                userType: state.formData.userType,
                state: state.formData.state,
                district: state.formData.district,
                taluka: state.formData.taluka,
                village: state.formData.village,
                fullAddress: state.formData.fullAddress || state.formData.address,
                address: state.formData.address || state.formData.fullAddress,
                pinCode: state.formData.pinCode || state.formData.pincode,
                pincode: state.formData.pincode || state.formData.pinCode,
                location: {
                    latitude: state.formData.latitude,
                    longitude: state.formData.longitude
                },
                latitude: state.formData.latitude,
                longitude: state.formData.longitude,
                crops: state.formData.crops,
                cropsCultivated: state.formData.crops,
                landAcres: state.formData.landAcres ? Number(state.formData.landAcres) : undefined,
                farmingLandAcres: state.formData.landAcres ? Number(state.formData.landAcres) : undefined,
                soilType: state.formData.soilType || undefined,
                irrigationType: state.formData.irrigationType || undefined,
                farmingExperience: state.formData.farmingExperience || undefined,
                acceptTerms: true,
                termsAccepted: true
            };

            if (!window.AuthService || typeof window.AuthService.register !== 'function') {
                throw new Error('Authentication service is initializing. Please refresh the page.');
            }

            const response = await window.AuthService.register(registrationPayload);

            if (response.requiresOtp || response.otpSent) {
                showAlert('OTP has been sent to your mobile number. Redirecting to verification...', 'success');
                setTimeout(() => {
                    window.location.href = `verify-otp.html?phone=${encodeURIComponent(state.formData.mobileNumber)}`;
                }, 1200);
                return;
            }

            showAlert('🎉 Registration Successful! Welcome to Smart Agriculture Assistant. Redirecting to your dashboard...', 'success');

            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Registration Completed!';
                submitBtn.style.background = 'var(--auth-primary-dark)';
            }

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1200);

        } catch (err) {
            console.error('[Registration Error]', err);
            let displayMsg = err.message || 'Registration failed. Please check your network connection and try again.';

            if (err.status === 409 || (err.message && err.message.toLowerCase().includes('already exists'))) {
                displayMsg = `⚠️ ${err.message}. Already registered? <a href="login.html" style="font-weight:700; text-decoration:underline;">Click here to Login</a>.`;
            } else if (err.status === 400) {
                displayMsg = `⚠️ Validation error: ${err.message}`;
            }

            showAlert(displayMsg, 'danger');
        } finally {
            state.isSubmitting = false;
            if (submitBtn && !submitBtn.innerHTML.includes('Completed')) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = origBtnHtml;
            }
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Expose helpers
    window.jumpToStep = goToStep;
    window.mapLocationToForm = mapLocationToForm;
    window.startGpsDetection = startGpsDetection;

})(typeof window !== 'undefined' ? window : globalThis, document);
