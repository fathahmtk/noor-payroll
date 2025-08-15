# Noor Payroll - Qatar WPS Integration Software

A comprehensive payroll management system designed for Qatar businesses, featuring Wage Protection System (WPS) compliance, multi-role dashboards, and SIF file generation for bank submissions.

## Features

- **Multi-Role Dashboard System**: Business Owner, HR Manager, Accountant, and Employee portals
- **Qatar WPS Compliance**: Full integration with Qatar Wage Protection System requirements
- **SIF File Generation**: Standard Interchange Format files for bank submissions
- **Employee Management**: Complete employee lifecycle management
- **Payroll Processing**: Automated payroll calculations and disbursements
- **Bank Integration**: Support for major Qatar banks (QNB, CBQ, DBQ, QIB, etc.)
- **Real-time Communication**: Socket.IO for live updates and notifications

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM, SQLite
- **Authentication**: NextAuth.js with role-based access control
- **Real-time**: Socket.IO for live features
- **Database**: SQLite with Prisma ORM

## Free Deployment Options

### 1. Vercel (Recommended)
**Best for**: Production deployment with automatic scaling

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For automatic deployment, connect your GitHub repository to Vercel
```

**Environment Variables Setup on Vercel:**
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add all variables from `.env.example`
4. Redeploy your application

### 2. Railway
**Best for**: Full-stack applications with database support

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

**Configuration:**
- Railway automatically detects Next.js applications
- Add SQLite database service from Railway marketplace
- Set environment variables in Railway dashboard

### 3. Render
**Best for**: Free tier with web services and databases

```bash
# Create account on render.com
# Connect your GitHub repository
# Configure build command: npm run build
# Configure start command: npm start
# Add environment variables
```

### 4. Netlify
**Best for**: Static sites with serverless functions

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**Note**: For Netlify, you'll need to use external database services as it doesn't include built-in databases.

### 5. Heroku (Free Tier Limited)
**Best for**: Traditional PaaS deployment

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create

# Add buildpacks
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-prisma

# Deploy
git push heroku main
```

## Deployment Preparation

### 1. Build the Application
```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Build the application
npm run build
```

### 2. Database Setup
For production deployment, you'll need to:

1. **For Railway/Render**: Use their built-in database services
2. **For Vercel/Netlify**: Use external database services like:
   - Supabase (free tier available)
   - PlanetScale (free tier available)
   - Railway SQLite (free tier available)

### 3. Environment Variables
Create a `.env.production` file with your production values:

```bash
# Database (use your production database URL)
DATABASE_URL="your-production-database-url"

# NextAuth
NEXTAUTH_SECRET="generate-a-strong-secret"
NEXTAUTH_URL="https://your-app-url.com"

# Production
NODE_ENV="production"
```

### 4. Generate NextAuth Secret
```bash
# Generate a secure secret for NextAuth
openssl rand -base64 32
```

## Platform-Specific Configurations

### Vercel Configuration
Create `vercel.json`:
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEXTAUTH_URL": "https://your-app.vercel.app"
  }
}
```

### Railway Configuration
Create `railway.toml`:
```toml
[build]
command = "npm run build"

[deploy]
startCommand = "npm start"

[env]
NODE_ENV = "production"
```

### Render Configuration
- Set build command: `npm run build`
- Set start command: `npm start`
- Add health check path: `/`

## Post-Deployment Steps

### 1. Database Migration
```bash
# For production database
npm run db:push
```

### 2. Seed Initial Data (Optional)
```bash
# Run seed script for demo data
npm run db:seed
```

### 3. Verify Deployment
- Check all dashboards are accessible
- Test authentication flow
- Verify SIF file generation
- Test real-time features

## Free Tier Limitations

Be aware of free tier limitations:
- **Vercel**: 100GB bandwidth, 10GB storage
- **Railway**: 500 hours/month, 1GB RAM
- **Render**: 750 hours/month, 512MB RAM
- **Netlify**: 100GB bandwidth, serverless functions
- **Heroku**: 550 hours/month (sleeps after 30min inactivity)

## Recommended Setup

For production use with free tier:
1. **Primary Choice**: Vercel + Supabase (PostgreSQL)
2. **Alternative**: Railway (includes database)
3. **Development**: Render (easy setup)

## Support

For deployment issues:
1. Check platform documentation
2. Review build logs
3. Verify environment variables
4. Test database connectivity