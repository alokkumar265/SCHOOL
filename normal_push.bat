@echo off
echo ========================================
echo Normal Push to GitHub Repository
echo ========================================
echo.

echo Step 1: Adding remote repository...
git remote add origin https://github.com/alokkumar265/SCHOOL.git
echo ✓ Remote added
echo.

echo Step 2: Renaming branch to main...
git branch -M main
echo ✓ Branch renamed
echo.

echo Step 3: Pushing to GitHub...
echo When prompted for credentials:
echo Username: alokkumar265
echo Password: Use your GitHub Personal Access Token
echo.
git push -u origin main
echo.

echo ========================================
echo Push completed!
echo ========================================
echo.
echo Check your repository at: https://github.com/alokkumar265/SCHOOL
echo.
pause 