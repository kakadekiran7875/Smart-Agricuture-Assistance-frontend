/**
 * Validation and Contract Verification Script for Farmer Registration System
 */

import { validatePassword, validateEmail, validateMobileNumber } from '../../../Smart Agriculture Assistant backend/utils/validators.js';

console.log('🧪 Starting Registration Validation & Contract Tests...\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`  ✅ PASS: ${message}`);
        passed++;
    } else {
        console.error(`  ❌ FAIL: ${message}`);
        failed++;
    }
}

// 1. Mobile Number Tests
console.log('--- 1. Mobile Number Validation Tests ---');
assert(validateMobileNumber('9876543210').isValid, 'Valid 10-digit starting with 9');
assert(validateMobileNumber('8123456789').isValid, 'Valid 10-digit starting with 8');
assert(validateMobileNumber('7012345678').isValid, 'Valid 10-digit starting with 7');
assert(validateMobileNumber('6234567890').isValid, 'Valid 10-digit starting with 6');
assert(validateMobileNumber('+91 98765 43210').isValid, 'Handled +91 and spaces correctly');
assert(validateMobileNumber('09876543210').isValid, 'Handled leading 0 correctly');
assert(!validateMobileNumber('5123456789').isValid, 'Rejected starting digit 5');
assert(!validateMobileNumber('987654321').isValid, 'Rejected 9-digit number');
assert(!validateMobileNumber('98765432101').isValid, 'Rejected 11-digit number');
assert(!validateMobileNumber('').isValid, 'Rejected empty mobile number');

// 2. Email Validation Tests
console.log('\n--- 2. Email Validation Tests ---');
assert(validateEmail('farmer@gmail.com').isValid, 'Valid standard email');
assert(validateEmail('ramesh.patil@agri.gov.in').isValid, 'Valid complex domain email');
assert(!validateEmail('invalid-email').isValid, 'Rejected missing @');
assert(!validateEmail('farmer@').isValid, 'Rejected missing domain');
assert(!validateEmail('@domain.com').isValid, 'Rejected missing local part');

// 3. Password Strength Tests
console.log('\n--- 3. Password Policy Validation Tests ---');
assert(validatePassword('Kisan@2026').isValid, 'Strong password with Upper, Lower, Number, Special');
assert(validatePassword('short1!A').isValid, 'Accepts exactly 8 chars if meets rules');
assert(!validatePassword('weakpassword').isValid, 'Rejected lowercase only');
assert(!validatePassword('WEAKPASSWORD123').isValid, 'Rejected uppercase + numbers only');
assert(!validatePassword('Farmer2026').isValid, 'Rejected missing special character');
assert(!validatePassword('Farmer!@#').isValid, 'Rejected missing number');

// 4. Registration Payload Contract Test
console.log('\n--- 4. Backend Payload Contract Structure ---');
const samplePayload = {
    fullName: 'Ramesh Tukaram Patil',
    mobileNumber: '9876543210',
    email: 'ramesh.patil@smartagri.in',
    password: 'Password@123',
    confirmPassword: 'Password@123',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Haveli',
    village: 'Hadapsar',
    address: 'Gat No. 42, Near Canal Road',
    pincode: '411028',
    latitude: 18.52043,
    longitude: 73.85674,
    crops: ['Sugarcane', 'Wheat'],
    landAcres: 4.5,
    soilType: 'Black Soil',
    irrigationType: 'Drip Irrigation',
    farmingExperience: '5–10 years',
    preferredLanguage: 'mr',
    userType: 'Farmer',
    acceptTerms: true
};

assert(samplePayload.fullName.length >= 2, 'FullName meets length requirement');
assert(validateMobileNumber(samplePayload.mobileNumber).isValid, 'Mobile number matches validation');
assert(validatePassword(samplePayload.password).isValid, 'Password matches backend policy');
assert(samplePayload.password === samplePayload.confirmPassword, 'Confirm password matches');
assert(samplePayload.acceptTerms === true, 'Accept terms is true');
assert(/^[1-9][0-9]{5}$/.test(samplePayload.pincode), 'PIN code is valid 6 digits');

console.log(`\n========================================`);
console.log(`Test Summary: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);
