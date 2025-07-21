@echo off
setlocal enabledelayedexpansion
git config user.email "10952854@students.plymouth.ac.uk"
git config user.name "Mandira-16"
git add .
set "FILES="
for /f %%i in ('git diff --cached --name-only') do set "FILES=%%i, !FILES!"
set "MSG=feat: Final fixes and multilingual enhancement - Fixed LanguageContext syntax, enhanced Profile redirect, complete translation system - %time% %date%"
git commit -m "!MSG!"
if !ERRORLEVEL! neq 0 (echo Commit failed, run git commit manually & pause)
git push origin main