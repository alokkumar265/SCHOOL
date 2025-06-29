@echo off
echo ========================================
echo Cleaning and Pushing to GitHub
echo ========================================
echo.

echo Step 1: Removing token files...
if exist push_with_token.bat del push_with_token.bat
if exist push_to_github.bat del push_to_github.bat
if exist setup_and_push.bat del setup_and_push.bat
if exist final_push.bat del final_push.bat
echo ✓ Token files removed
echo.

echo Step 2: Adding changes...
git add .
echo ✓ Changes added
echo.

echo Step 3: Committing changes...
git commit -m "Remove token files for security"
echo ✓ Changes committed
echo.

echo Step 4: Force pushing to overwrite history...
git push --force-with-lease origin main
echo.

echo ========================================
echo Push completed!
echo ========================================
echo.
echo Check your repository at: https://github.com/alokkumar265/SCHOOL
echo.
pause 