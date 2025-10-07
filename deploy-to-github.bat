@echo off
echo ===================================
echo Math Stars Challenge - Git Setup
echo ===================================
echo.

REM Initialize git repository
git init

REM Add all files
git add .

REM Commit the files
git commit -m "Initial commit: Math Stars Challenge game with Firebase backend"

REM Add remote repository (replace YOUR_USERNAME with your actual GitHub username)
echo.
echo Please enter your GitHub username:
set /p username=Username: 
git remote add origin https://github.com/%username%/kidtools.git

REM Create main branch and push
git branch -M main
git push -u origin main

echo.
echo ===================================
echo Done! Your code is now on GitHub!
echo ===================================
echo.
echo To enable GitHub Pages:
echo 1. Go to https://github.com/%username%/kidtools
echo 2. Click Settings
echo 3. Scroll to Pages section
echo 4. Select 'main' branch as source
echo 5. Click Save
echo.
echo Your site will be live at:
echo https://%username%.github.io/kidtools/
echo.
pause
