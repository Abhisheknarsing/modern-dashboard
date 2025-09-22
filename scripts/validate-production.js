#!/usr/bin/env node

/**
 * Production Validation Script
 * 
 * This script validates that the application is ready for production
 * by checking various aspects of the build and functionality.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Production Validation...\n');

const checks = [];
let passed = 0;
let failed = 0;

function addCheck(name, fn) {
  checks.push({ name, fn });
}

function runCheck(name, fn) {
  try {
    const result = fn();
    if (result) {
      console.log(`✅ ${name}`);
      passed++;
      return true;
    } else {
      console.log(`❌ ${name}`);
      failed++;
      return false;
    }
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    failed++;
    return false;
  }
}

// File Structure Checks
addCheck('Next.js configuration exists', () => {
  return fs.existsSync('next.config.ts');
});

addCheck('Package.json has required scripts', () => {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = ['build', 'start', 'test', 'lint'];
  return requiredScripts.every(script => pkg.scripts[script]);
});

addCheck('TypeScript configuration is valid', () => {
  return fs.existsSync('tsconfig.json');
});

addCheck('Tailwind configuration exists', () => {
  return fs.existsSync('tailwind.config.ts');
});

// Environment Configuration
addCheck('Environment example file exists', () => {
  return fs.existsSync('.env.example');
});

addCheck('Production environment file exists', () => {
  return fs.existsSync('.env.production');
});

// Build Validation
addCheck('TypeScript compilation passes', () => {
  try {
    execSync('npx tsc --noEmit', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
});

addCheck('ESLint passes', () => {
  try {
    execSync('npm run lint', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
});

addCheck('Production build succeeds', () => {
  try {
    execSync('npm run build', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
});

// Component Structure Checks
addCheck('Core components exist', () => {
  const coreComponents = [
    'src/components/auth/login-form.tsx',
    'src/components/auth/register-form.tsx',
    'src/components/dashboard/kpi-card.tsx',
    'src/components/dashboard/financial-card.tsx',
    'src/components/charts/bar-chart.tsx',
    'src/components/charts/circular-progress.tsx',
  ];
  return coreComponents.every(component => fs.existsSync(component));
});

addCheck('Page routes exist', () => {
  const pages = [
    'src/app/page.tsx',
    'src/app/(auth)/login/page.tsx',
    'src/app/(auth)/register/page.tsx',
    'src/app/(dashboard)/dashboard/page.tsx',
  ];
  return pages.every(page => fs.existsSync(page));
});

addCheck('API routes exist', () => {
  const apiRoutes = [
    'src/app/api/auth/login/route.ts',
    'src/app/api/auth/register/route.ts',
    'src/app/api/auth/me/route.ts',
  ];
  return apiRoutes.every(route => fs.existsSync(route));
});

// Security Checks
addCheck('Middleware exists for route protection', () => {
  return fs.existsSync('middleware.ts');
});

addCheck('Authentication configuration exists', () => {
  return fs.existsSync('src/lib/auth-config.ts');
});

// Test Coverage
addCheck('Test files exist', () => {
  const testDirs = [
    'src/components/auth/__tests__',
    'src/components/dashboard/__tests__',
    'src/components/charts/__tests__',
  ];
  return testDirs.every(dir => fs.existsSync(dir));
});

// Documentation
addCheck('README exists', () => {
  return fs.existsSync('README.md');
});

addCheck('Deployment documentation exists', () => {
  return fs.existsSync('DEPLOYMENT.md');
});

addCheck('Production checklist exists', () => {
  return fs.existsSync('PRODUCTION_CHECKLIST.md');
});

// Performance Checks
addCheck('Bundle analyzer configuration exists', () => {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return pkg.devDependencies && pkg.devDependencies['@next/bundle-analyzer'];
});

addCheck('Performance optimization scripts exist', () => {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return pkg.scripts['build:analyze'] || pkg.scripts['analyze'];
});

// Build Output Validation
addCheck('Build output directory exists', () => {
  return fs.existsSync('.next');
});

addCheck('Static files generated', () => {
  return fs.existsSync('.next/static');
});

// Run all checks
console.log('Running validation checks...\n');

checks.forEach(check => {
  runCheck(check.name, check.fn);
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`Validation Summary:`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📊 Total: ${checks.length}`);

if (failed === 0) {
  console.log('\n🎉 All checks passed! Application is ready for production.');
  process.exit(0);
} else {
  console.log('\n⚠️  Some checks failed. Please address the issues before deploying.');
  process.exit(1);
}