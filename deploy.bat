@echo off
REM Noor Payroll Deployment Script for Windows

echo 🚀 Noor Payroll Deployment Script
echo ==================================

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Git repository not found. Please run:
    echo    git init
    echo    git add .
    echo    git commit -m "Initial commit - Noor Payroll Application"
    pause
    exit /b 1
)

REM Check if remote is set
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ❌ No git remote found. Please set up GitHub repository first:
    echo    1. Create repository on GitHub
    echo    2. Run: git remote add origin https://github.com/yourusername/noor-payroll.git
    echo    3. Run: git push -u origin main
    pause
    exit /b 1
)

echo ✅ Git repository found
echo 📋 Deployment Options:
echo.
echo 1. Vercel (Recommended) - npx vercel
echo 2. Railway - npx @railway/cli railway up
echo 3. Manual GitHub Deployment
echo 4. Exit
echo.
set /p choice="Choose deployment option (1-4): "

if "%choice%"=="1" (
    echo 🚀 Deploying to Vercel...
    echo 💡 If this is your first time, you'll need to login:
    npx vercel login
    echo 📦 Deploying...
    npx vercel
    echo ✅ Deployment complete! Don't forget to set environment variables in Vercel dashboard.
) else if "%choice%"=="2" (
    echo 🚀 Deploying to Railway...
    echo 💡 If this is your first time, you'll need to login:
    npx @railway/cli railway login
    echo 📦 Deploying...
    npx @railway/cli railway up
    echo ✅ Deployment complete! Don't forget to set environment variables in Railway dashboard.
) else if "%choice%"=="3" (
    echo 📋 Manual GitHub Deployment Instructions:
    echo.
    echo 1. Push your code to GitHub:
    echo    git add .
    echo    git commit -m "Ready for deployment"
    echo    git push origin main
    echo.
    echo 2. Choose a platform:
    echo    • Vercel: Go to vercel.com → New Project → Import GitHub repo
    echo    • Railway: Go to railway.app → New Project → Import GitHub repo
    echo    • Render: Go to render.com → New + → Web Service → Import GitHub repo
    echo.
    echo 3. Set these environment variables:
    echo    DATABASE_URL = file:./dev.db
    echo    NEXTAUTH_SECRET = [generate with: openssl rand -base64 32]
    echo    NEXTAUTH_URL = https://your-app-url.com
    echo    NODE_ENV = production
) else if "%choice%"=="4" (
    echo 👋 Exiting deployment script.
    exit /b 0
) else (
    echo ❌ Invalid option. Please choose 1-4.
    pause
    exit /b 1
)

echo.
echo 🎉 Deployment process completed!
echo 📖 For detailed instructions, see DEPLOYMENT.md
echo ⚠️  Don't forget to set up environment variables in your deployment platform!
pause