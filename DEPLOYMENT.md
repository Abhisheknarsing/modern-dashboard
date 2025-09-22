# Modern Dashboard - Deployment Guide

## Production Deployment

This guide covers deploying the Modern Dashboard application to production environments.

## Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- PostgreSQL database (for production)
- Environment variables configured

## Environment Configuration

### Required Environment Variables

Create a `.env.production` file with the following variables:

```bash
# NextAuth.js Configuration
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-super-secure-secret-key-here

# Database Configuration (PostgreSQL for production)
DATABASE_URL="postgresql://username:password@host:5432/database_name"

# Node Environment
NODE_ENV=production

# Optional: Analytics and Monitoring
ANALYTICS_ID=your-analytics-id
SENTRY_DSN=your-sentry-dsn

# Optional: Email Configuration
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@example.com
EMAIL_SERVER_PASSWORD=your-email-password
EMAIL_FROM=noreply@example.com

# Optional: Redis for Session Storage
REDIS_URL=redis://localhost:6379

# Optional: Feature Flags
FEATURE_ANALYTICS=true
FEATURE_NOTIFICATIONS=true
FEATURE_EXPORT=true
```

## Build Process

### 1. Install Dependencies
```bash
npm ci --production=false
```

### 2. Run Type Checking
```bash
npm run type-check
```

### 3. Run Linting
```bash
npm run lint
```

### 4. Run Tests
```bash
npm run test
npm run test:e2e
```

### 5. Build Application
```bash
npm run build:production
```

### 6. Start Production Server
```bash
npm start
```

## Deployment Platforms

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t modern-dashboard .
docker run -p 3000:3000 modern-dashboard
```

### AWS/DigitalOcean/Other VPS

1. Set up a server with Node.js 18+
2. Clone the repository
3. Install dependencies and build
4. Use PM2 for process management

```bash
# Install PM2
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'modern-dashboard',
    script: 'npm',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Database Setup

### PostgreSQL Production Setup

1. Create a PostgreSQL database
2. Run migrations (if using Prisma):

```bash
npx prisma migrate deploy
npx prisma generate
```

## Performance Optimization

### 1. Enable Compression
The application includes gzip compression in Next.js config.

### 2. CDN Configuration
Configure your CDN to cache static assets:
- Cache `/static/*` files for 1 year
- Cache `/_next/static/*` files for 1 year
- Cache images with appropriate headers

### 3. Database Optimization
- Use connection pooling
- Enable query optimization
- Set up read replicas if needed

### 4. Monitoring
- Set up application monitoring (Sentry, DataDog, etc.)
- Configure uptime monitoring
- Set up performance monitoring

## Security Checklist

- [ ] HTTPS enabled with valid SSL certificate
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] Security headers configured
- [ ] Dependencies updated and scanned for vulnerabilities

## Health Checks

The application includes health check endpoints:
- `/api/health` - Basic health check
- `/api/auth/me` - Authentication health check

## Backup Strategy

1. **Database Backups**: Set up automated daily backups
2. **File Backups**: Backup uploaded files and configurations
3. **Code Backups**: Ensure code is in version control

## Rollback Strategy

1. Keep previous build artifacts
2. Use blue-green deployment if possible
3. Have database migration rollback scripts ready

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (nginx, AWS ALB, etc.)
- Deploy multiple instances
- Use session store (Redis) for session sharing

### Vertical Scaling
- Monitor CPU and memory usage
- Scale server resources as needed

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Runtime Errors**
   - Check environment variables
   - Verify database connectivity
   - Check application logs

3. **Performance Issues**
   - Enable performance monitoring
   - Check database query performance
   - Verify CDN configuration

### Logs

Application logs are available through:
- Console output (development)
- PM2 logs (production with PM2)
- Platform-specific logging (Vercel, AWS, etc.)

```bash
# View PM2 logs
pm2 logs modern-dashboard

# View real-time logs
pm2 logs modern-dashboard --lines 100
```

## Support

For deployment issues:
1. Check this documentation
2. Review application logs
3. Check environment configuration
4. Verify database connectivity