#!/usr/bin/env node

/**
 * Firebase Configuration Validator
 * 
 * Script ini memeriksa apakah Firebase environment variables sudah dikonfigurasi dengan benar.
 * Jalankan dengan: node scripts/check-firebase-config.js
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Manual .env.local loader (since dotenv is not a dependency)
try {
  const envPath = resolve(__dirname, '../.env.local');
  const envFile = readFileSync(envPath, 'utf-8');
  envFile.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      const value = valueParts.join('=').trim();
      process.env[key.trim()] = value;
    }
  });
  console.log('📄 Loaded .env.local file\n');
} catch (error) {
  console.log('⚠️  No .env.local file found (checking process.env only)\n');
}

const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

console.log('🔍 Checking Firebase Configuration...\n');

let allValid = true;
const results = [];

requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  const isValid = value && value !== 'your_api_key_here' && !value.includes('demo-');
  
  results.push({
    name: varName,
    value: value,
    isValid: isValid,
    status: isValid ? '✅' : '❌'
  });
  
  if (!isValid) {
    allValid = false;
  }
});

// Print results
results.forEach(result => {
  console.log(`${result.status} ${result.name}`);
  if (result.isValid) {
    console.log(`   Value: ${result.value.substring(0, 20)}...`);
  } else if (!result.value) {
    console.log(`   ⚠️  NOT SET - Please add this to .env.local`);
  } else if (result.value.includes('demo-') || result.value.includes('your_')) {
    console.log(`   ⚠️  Using placeholder value - Please add real Firebase credentials`);
  }
  console.log();
});

// Summary
console.log('━'.repeat(60));
if (allValid) {
  console.log('✅ All Firebase environment variables are configured!\n');
  console.log('Next steps:');
  console.log('1. Test locally: npm run dev');
  console.log('2. For Netlify deployment:');
  console.log('   - Add these variables in Netlify Dashboard');
  console.log('   - Site configuration → Environment variables');
  console.log('3. Add your Netlify domain to Firebase Authorized Domains');
  console.log('   - Firebase Console → Authentication → Settings → Authorized domains');
} else {
  console.log('❌ Some Firebase environment variables are missing or invalid!\n');
  console.log('To fix this:');
  console.log('1. Copy .env.example to .env.local');
  console.log('   cp .env.example .env.local');
  console.log('2. Get Firebase credentials from Firebase Console');
  console.log('   https://console.firebase.google.com');
  console.log('3. Update .env.local with real values');
  console.log('4. Re-run this script to verify');
  console.log('\nFor deployment to Netlify:');
  console.log('- Add all variables in Netlify Dashboard');
  console.log('- See DEPLOYMENT_TROUBLESHOOTING.md for detailed guide');
  process.exit(1);
}
