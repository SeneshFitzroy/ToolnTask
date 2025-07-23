@echo off
echo Cleaning up problematic build files...

cd /d "c:\Users\senes\OneDrive\Desktop\ToolNTask\ToolnTask\pages"

REM Remove files that are causing build issues
if exist "About_fixed.tsx" del "About_fixed.tsx"
if exist "Tools_clean.tsx" del "Tools_clean.tsx"
if exist "Tools_new.tsx" del "Tools_new.tsx"
if exist "TermsAndConditions_new.tsx" del "TermsAndConditions_new.tsx"
if exist "TermsAndConditions_old.tsx" del "TermsAndConditions_old.tsx"
if exist "test-phone-verify.tsx" del "test-phone-verify.tsx"
if exist "test-twilio.tsx" del "test-twilio.tsx"
if exist "phone-verification.tsx" del "phone-verification.tsx"
if exist "forgot-password-new.tsx" del "forgot-password-new.tsx"

REM Clean tasks directory
cd tasks
if exist "[id]_clean.tsx" del "[id]_clean.tsx"
if exist "[id]_enhanced_clean.tsx" del "[id]_enhanced_clean.tsx"
if exist "[id]_redirect.tsx" del "[id]_redirect.tsx"

cd ..

REM Clean tools directory  
cd tools
if exist "[id]_clean.tsx" del "[id]_clean.tsx"
if exist "[id]_enhanced_clean.tsx" del "[id]_enhanced_clean.tsx"
if exist "[id]_redirect.tsx" del "[id]_redirect.tsx"

cd ..

echo Cleanup completed!
pause
