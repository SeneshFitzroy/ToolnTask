@echo off
setlocal enabledelayedexpansion
git add .
set "FILES="
for /f %%i in ('git diff --cached --name-only') do set "FILES=%%i, !FILES!"
for /f "delims=" %%j in ('git diff --cached') do set "CHANGES=!CHANGES!%%j "
set "MSG=feat: Enhanced !FILES! - Detailed changes: !CHANGES:~0,50!... at %time% %date%"
git commit -m "!MSG!" --author="SeneshFitzroy <10952757@students.nsbm.ac.uk>"
if !ERRORLEVEL! neq 0 (echo Commit failed, run git commit manually & pause)
git push origin main