# Vercel Deployment Guide - Noor Payroll

## Quick Deploy Steps

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy (Choose one method)

#### Method A: CLI Deployment
```bash
# From project root directory
vercel --prod
```

#### Method B: GitHub Integration (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - Framework: Next.js
   - Build Command: `npm run build && npm run db:generate`
   - Output Directory: `.next`
   - Install Command: `npm install`

### 4. Environment Variables Setup
After deployment, go to your Vercel project dashboard:
1. Navigate to Settings → Environment Variables
2. Add these variables:

```
DATABASE_URL=postgresql://username:password@host:port/database
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-generated-secret
EDGE_CONFIG_URL=your-edge-config-url
EDGE_CONFIG_TOKEN=your-edge-config-token
```

### 5. Database Setup for Production
For production, you'll need a PostgreSQL database. Options:

#### Option 1: Supabase (Free Tier)
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your connection string from Settings → Database
4. Update DATABASE_URL in Vercel

#### Option 2: Railway Database
1. Go to [railway.app](https://railway.app)
2. Create a new PostgreSQL database
3. Get connection string
4. Update DATABASE_URL in Vercel

### 6. Post-Deployment Commands
After successful deployment:
1. Go to your Vercel project dashboard
2. Navigate to "Deployments"
3. Click on the latest deployment
4. Go to "Console" tab
5. Run these commands:
   ```bash
   npx prisma migrate deploy
   npm run db:seed
   ```

### 7. Verify Deployment
Test these endpoints:
- Main app: `https://your-app.vercel.app`
- Health check: `https://your-app.vercel.app/api/health`
- API routes: `https://your-app.vercel.app/api/auth/login`

## Troubleshooting

### Common Issues

1. **Build Fails with Prisma**
   - Ensure DATABASE_URL is set correctly
   - Check if Prisma client is generated: `npm run db:generate`

2. **NextAuth Issues**
   - Verify NEXTAUTH_URL matches your deployment URL
   - Ensure NEXTAUTH_SECRET is set

3. **Database Connection Issues**
   - Test database connection locally first
   - Ensure database allows connections from Vercel IPs

### Debug Commands
```bash
# Check build logs
vercel logs your-app.vercel.app

# Check deployment status
vercel ls
```

## Production Checklist
- [ ] Set production DATABASE_URL
- [ ] Set NEXTAUTH_SECRET
- [ ] Set NEXTAUTH_URL to production URL
- [ ] Run database migrations
- [ ] Test all user roles (Owner, HR, Accountant, Employee)
- [ ] Test SIF file generation
- [ ] Test WPS integration
- [ ] Verify real-time features work
