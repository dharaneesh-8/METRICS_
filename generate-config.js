/**
 * Simple script to generate config.js from .env file
 * Run with: node generate-config.js
 */

const fs = require('fs');
const path = require('path');

// Read .env file
const envPath = path.join(__dirname, '.env');
let supabaseUrl = '';
let supabaseAnonKey = '';

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const [key, ...valueParts] = trimmed.split('=');
            const value = valueParts.join('=').trim();
            
            if (key === 'SUPABASE_URL') {
                supabaseUrl = value;
            } else if (key === 'SUPABASE_ANON_KEY') {
                supabaseAnonKey = value;
            }
        }
    });
} else {
    console.warn('Warning: .env file not found. Using placeholder values.');
    console.warn('Please create a .env file with SUPABASE_URL and SUPABASE_ANON_KEY');
}

// Generate config.js
const configContent = `// Supabase Configuration
// This file is auto-generated from .env file
// To regenerate, run: node generate-config.js

const SUPABASE_CONFIG = {
    url: '${supabaseUrl || 'YOUR_SUPABASE_URL'}',
    anonKey: '${supabaseAnonKey || 'YOUR_SUPABASE_ANON_KEY'}'
};
`;

// Write config.js
const configPath = path.join(__dirname, 'config.js');
fs.writeFileSync(configPath, configContent, 'utf8');

console.log('✓ config.js generated successfully!');
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠ Please update .env file with your Supabase credentials and run again.');
}

