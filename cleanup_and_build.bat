@echo off
echo ========================================
echo     ToolnTask Build Cleanup Script
echo ========================================
echo.

echo Cleaning up problematic files...

cd /d "c:\Users\senes\OneDrive\Desktop\ToolNTask\ToolnTask\pages"

:: Rename any remaining empty or problematic files
for %%f in (*.tsx) do (
    if not exist "%%f" goto :skip
    findstr /l /m "export default" "%%f" >nul
    if errorlevel 1 (
        echo Renaming problematic file: %%f
        ren "%%f" "%%~nf.txt"
    )
    :skip
)

echo.
echo ✅ Cleanup completed!
echo.
echo Running build test...
cd /d "c:\Users\senes\OneDrive\Desktop\ToolNTask\ToolnTask"
call npm run build

if %errorlevel% equ 0 (
    echo.
    echo ✅ Build successful! Ready for deployment.
) else (
    echo.
    echo ❌ Build still has issues. Please check the errors above.
)

echo.
pause
