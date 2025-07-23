@echo off
echo ========================================
echo        ToolnTask Vercel Deployment
echo ========================================
echo.

echo Step 1: Building the application...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed! Please fix errors before deploying.
    pause
    exit /b 1
)

echo.
echo Step 2: Installing Vercel CLI (if not installed)...
call npm list -g vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Vercel CLI...
    call npm install -g vercel
)

echo.
echo Step 3: Deploying to Vercel...
echo Please run the following commands manually:
echo.
echo 1. vercel login
echo 2. vercel
echo 3. vercel --prod
echo.
echo ========================================
echo       Deployment script completed
echo ========================================
pause
