@echo off
setlocal enabledelayedexpansion

:: Add all changes to staging
git add .

:: Initialize variables
set "FILES="
set "INSERTIONS=0"
set "DELETIONS=0"
set "CHANGES="

:: Collect changed files
for /f %%i in ('git diff --cached --name-only') do set "FILES=%%i, !FILES!"

:: Analyze changes and count insertions/deletions
for /f "tokens=1,2" %%j in ('git diff --cached --numstat') do (
    if not "%%j"=="-" (
        set /a "INSERTIONS+=%%j"
        set /a "DELETIONS+=%%k"
    )
)

:: Get a concise diff summary (first 50 characters of diff output)
for /f "delims=" %%j in ('git diff --cached --shortstat') do set "CHANGES=%%j"

:: Construct a detailed commit message
set "MSG=feat: Enhanced !FILES! - Detailed changes: !CHANGES! (Insertions: !INSERTIONS!, Deletions: !DELETIONS!) at %time% %date%"

:: Commit with detailed message and specified author
git commit -m "!MSG!" --author="SeneshFitzroy <10952757@students.plymouth.ac.uk>"

:: Check for commit success and handle failure
if !ERRORLEVEL! neq 0 (
    echo Commit failed, run git commit manually & pause
) else (
    :: Push to remote repository
    git push origin main
)