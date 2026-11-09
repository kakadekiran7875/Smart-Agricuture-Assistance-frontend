/**
 * Automated Verification Script for Live GPS Detection & Address Auto-Fill
 */

import { reverseGeocode, normalizeLocationData } from '../../../Smart Agriculture Assistant backend/services/locationService.js';

console.log('🧪 Starting Live GPS & Reverse-Geocode Contract Verification...\n');

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

// 1. Provider data normalization test
console.log('--- 1. Provider Data Normalization Tests ---');
const sampleProviderData = {
    display_name: 'Hadapsar, Haveli, Pune, Maharashtra, 411028, India',
    address: {
        suburb: 'Hadapsar',
        county: 'Haveli',
        state_district: 'Pune District',
        state: 'Maharashtra',
        postcode: '411028',
        country: 'India'
    }
};

const normalized = normalizeLocationData(sampleProviderData, 18.5089, 73.9260);

assert(normalized.state === 'Maharashtra', 'Normalized state is Maharashtra');
assert(normalized.district === 'Pune', 'Cleaned district removed "District" suffix -> "Pune"');
assert(normalized.taluka === 'Haveli', 'Cleaned taluka from county -> "Haveli"');
assert(normalized.village === 'Hadapsar', 'Village/Suburb mapped correctly -> "Hadapsar"');
assert(normalized.pinCode === '411028', 'PIN code normalized -> "411028"');
assert(normalized.country === 'India', 'Country is India');
assert(normalized.latitude === 18.5089, 'Latitude preserved as number');
assert(normalized.longitude === 73.9260, 'Longitude preserved as number');
assert(typeof normalized.fullAddress === 'string' && normalized.fullAddress.length > 5, 'Full address generated');

// 2. Form Mapping Simulation Test
console.log('\n--- 2. Form Mapping Contract Test ---');
function simulateFormMapping(loc) {
    const formFields = {
        state: loc.state || '',
        district: loc.district || '',
        taluka: loc.taluka || '',
        village: loc.village || '',
        fullAddress: loc.fullAddress || '',
        pinCode: loc.pinCode || '',
        latitude: loc.latitude,
        longitude: loc.longitude
    };
    return formFields;
}

const mapped = simulateFormMapping(normalized);
assert(mapped.state === 'Maharashtra', 'Form field state populated');
assert(mapped.district === 'Pune', 'Form field district populated');
assert(mapped.taluka === 'Haveli', 'Form field taluka populated');
assert(mapped.village === 'Hadapsar', 'Form field village populated');
assert(mapped.fullAddress.includes('Hadapsar'), 'Form field fullAddress populated');
assert(mapped.pinCode === '411028', 'Form field pinCode populated');

// 3. Existing Address Overwrite Guard Simulation
console.log('\n--- 3. Overwrite Guard Simulation ---');
function checkHasExistingAddress(fields) {
    return Boolean(fields.district || fields.taluka || fields.village || fields.fullAddress || fields.pinCode);
}

const emptyForm = { district: '', taluka: '', village: '', fullAddress: '', pinCode: '' };
const filledForm = { district: 'Nashik', taluka: 'Sinnar', village: 'Nimgaon', fullAddress: 'Gat 12', pinCode: '422103' };

assert(checkHasExistingAddress(emptyForm) === false, 'Empty form correctly detected as no manual address');
assert(checkHasExistingAddress(filledForm) === true, 'Filled form correctly triggers overwrite guard');

// 4. Registration Payload Contract
console.log('\n--- 4. Registration Submission Contract ---');
const registrationData = {
    state: mapped.state,
    district: mapped.district,
    taluka: mapped.taluka,
    village: mapped.village,
    fullAddress: mapped.fullAddress,
    pinCode: mapped.pinCode,
    location: {
        latitude: mapped.latitude,
        longitude: mapped.longitude
    }
};

assert(registrationData.location.latitude === 18.5089, 'Payload contains nested location.latitude');
assert(registrationData.location.longitude === 73.9260, 'Payload contains nested location.longitude');
assert(registrationData.pinCode === '411028', 'Payload contains pinCode');
assert(registrationData.fullAddress.length > 0, 'Payload contains fullAddress');

console.log(`\n========================================`);
console.log(`Test Summary: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);
