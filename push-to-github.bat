@echo off
echo ===================================
echo Math Stars Challenge - GitHub Push
echo ===================================
echo.
echo Git repository initialized and files committed!
echo.
echo Next steps:
echo 1. Go to https://github.com/new
echo 2. Create a new repository named: kidtools
echo 3. Make it PUBLIC
echo 4. DO NOT initialize with README (we already have files)
echo 5. Click "Create repository"
echo.
echo After creating the repository, enter your GitHub username below:
echo.
set /p username=Your GitHub username: 

echo.
echo Adding remote repository...
cd C:\kidtools
"C:\Program Files\Git\cmd\git.exe" remote add origin https://github.com/%username%/kidtools.git

echo.
echo Setting branch to main...
"C:\Program Files\Git\cmd\git.exe" branch -M main

echo.
echo Pushing to GitHub...
"C:\Program Files\Git\cmd\git.exe" push -u origin main

echo.
echo ===================================
echo SUCCESS! Code pushed to GitHub!
echo ===================================
echo.
echo Now enable GitHub Pages:
echo 1. Go to https://github.com/%username%/kidtools
echo 2. Click "Settings"
echo 3. Click "Pages" in left sidebar
echo 4. Under "Source", select "main" branch
echo 5. Click "Save"
echo.
echo Your site will be live at:
echo https://%username%.github.io/kidtools/
echo.
pause
