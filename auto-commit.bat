@echo off
setlocal enabledelayedexpansion

:: Stage all changes
git add .

:: Collect changed files and build initial message
set "FILES="
for /f "delims=" %%i in ('git diff --cached --name-only') do set "FILES=%%i, !FILES!"

:: Get detailed change statistics
for /f "tokens=1-3" %%j in ('git diff --cached --shortstat') do (
    if not "%%j"=="" set "STATS=%%j %%k %%l"
)

:: Construct a clear, detailed commit message with current timestamp
set "MSG=feat: Enhanced !FILES:~0,-2! - !STATS! at %time% %date%"

:: Commit with specified author and push if successful
git commit -m "!MSG!" --author="SeneshFitzroy <10952757@students.plymouth.ac.uk>" || (
    echo Commit failed, run git commit manually
    pause
    exit /b 1
)
git push origin main
