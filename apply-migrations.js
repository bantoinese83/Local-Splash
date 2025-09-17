#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎨 Local Splash - Database Migration Helper\n');

// Read migration files
const migration1Path = path.join(__dirname, 'supabase', 'migrations', '0001_initial_schema.sql');
const migration2Path = path.join(__dirname, 'supabase', 'migrations', '0002_add_commission_system.sql');

try {
  const migration1 = fs.readFileSync(migration1Path, 'utf8');
  const migration2 = fs.readFileSync(migration2Path, 'utf8');

  console.log('📋 Migration 1: Initial Schema');
  console.log('=' .repeat(50));
  console.log(migration1);
  console.log('\n' + '=' .repeat(50) + '\n');

  console.log('📋 Migration 2: Commission System');
  console.log('=' .repeat(50));
  console.log(migration2);
  console.log('\n' + '=' .repeat(50) + '\n');

  console.log('🚀 Instructions:');
  console.log('1. Go to your Supabase project dashboard');
  console.log('2. Navigate to SQL Editor');
  console.log('3. Copy and paste Migration 1 above');
  console.log('4. Click "Run" to execute');
  console.log('5. Copy and paste Migration 2 above');
  console.log('6. Click "Run" to execute');
  console.log('\n✅ Your database will be ready!');

} catch (error) {
  console.error('❌ Error reading migration files:', error.message);
  process.exit(1);
}
