@echo off
echo ========================================
echo    ToolnTask Final Deployment Script
echo ========================================
echo.

echo Step 1: Running clean build...
call npm run build

if %errorlevel% equ 0 (
    echo.
    echo ✅ Build successful!
    echo.
    echo Step 2: Deploying to Vercel...
    call npx vercel --prod
    echo.
    echo 🎉 Deployment completed!
    echo Your ToolnTask app should now be live!
) else (
    echo.
    echo ❌ Build failed. Please check errors above.
    pause
    exit /b 1
)

echo.
echo Press any key to exit...
pause
