# GitHub Setup Guide for Grade Flow Online

This guide will help you push the complete Grade Flow Online project to your GitHub repository.

## Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **Git Installed**: Ensure Git is installed on your system
3. **Personal Access Token**: You'll need to create a GitHub Personal Access Token

## Step 1: Create a Personal Access Token (PAT)

1. Go to [GitHub Settings](https://github.com/settings)
2. Scroll down to "Developer settings" (bottom left)
3. Click on "Personal access tokens" → "Tokens (classic)"
4. Click "Generate new token" → "Generate new token (classic)"
5. Give it a name like "Grade Flow Online Project"
6. Select the following scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
7. Click "Generate token"
8. **IMPORTANT**: Copy the token immediately - you won't see it again!

## Step 2: Configure Git (if not already done)

Open your terminal/command prompt and run:

```bash
git config --global user.name "alokkumar265"
git config --global user.email "alokkumar265@gmail.com"
```

## Step 3: Push to GitHub

### Option A: Using Command Line (Recommended)

1. **Navigate to your project directory**:
   ```bash
   cd grade-flow-online-main
   ```

2. **Initialize Git repository** (if not already done):
   ```bash
   git init
   ```

3. **Add all files**:
   ```bash
   git add .
   ```

4. **Commit the changes**:
   ```bash
   git commit -m "Initial commit: Complete Grade Flow Online School Management System"
   ```

5. **Add the remote repository**:
   ```bash
   git remote add origin https://github.com/alokkumar265/SCHOOL.git
   ```

6. **Rename the branch to main**:
   ```bash
   git branch -M main
   ```

7. **Push to GitHub**:
   ```bash
   git push -u origin main
   ```
   
   When prompted for username and password:
   - **Username**: `alokkumar265`
   - **Password**: Use your Personal Access Token (not your GitHub password)

### Option B: Using GitHub Desktop

1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Sign in with your GitHub account
3. Click "Clone a repository from the Internet"
4. Select your repository: `alokkumar265/SCHOOL`
5. Choose a local path for the repository
6. Click "Clone"
7. Copy all project files to the cloned directory
8. In GitHub Desktop, you'll see all the changes
9. Add a commit message and click "Commit to main"
10. Click "Push origin"

### Option C: Using VS Code

1. Open VS Code
2. Open the project folder
3. Go to Source Control (Ctrl+Shift+G)
4. Click "Initialize Repository"
5. Stage all changes
6. Add commit message and commit
7. Click "Publish Branch"
8. Select your repository and push

## Step 4: Verify the Push

1. Go to your GitHub repository: https://github.com/alokkumar265/SCHOOL
2. You should see all the project files uploaded
3. The repository should show the complete project structure

## Troubleshooting

### Authentication Issues

If you get authentication errors:

1. **Clear stored credentials**:
   ```bash
   git config --global --unset credential.helper
   ```

2. **Use Personal Access Token**:
   - Make sure you're using the PAT as password, not your GitHub password
   - The username should be your GitHub username

3. **Alternative: Use SSH**:
   ```bash
   git remote set-url origin git@github.com:alokkumar265/SCHOOL.git
   ```

### Large File Issues

If you have issues with large files:

1. **Check file sizes**:
   ```bash
   git status
   ```

2. **Add to .gitignore** if needed:
   ```
   node_modules/
   .env
   .env.local
   dist/
   build/
   ```

### Permission Issues

If you get permission errors:

1. **Check repository ownership**: Make sure you own the repository
2. **Check PAT permissions**: Ensure your token has `repo` access
3. **Repository visibility**: Make sure the repository is not private if you want it public

## Project Structure After Push

Your GitHub repository should contain:

```
SCHOOL/
├── src/
│   ├── components/
│   ├── frontend/
│   ├── backend/
│   ├── pages/
│   └── ...
├── public/
├── package.json
├── README.md
├── tailwind.config.ts
├── vite.config.ts
└── ...
```

## Next Steps

After successfully pushing to GitHub:

1. **Enable GitHub Pages** (optional):
   - Go to repository Settings → Pages
   - Select source branch (main)
   - Save

2. **Set up CI/CD** (optional):
   - Add GitHub Actions for automated testing
   - Set up deployment to Vercel/Netlify

3. **Add collaborators** (if needed):
   - Go to repository Settings → Collaborators
   - Add team members

4. **Create releases**:
   - Tag important versions
   - Create release notes

## Support

If you encounter any issues:

1. Check the [GitHub documentation](https://docs.github.com/)
2. Review the error messages carefully
3. Make sure your Personal Access Token is valid and has the correct permissions
4. Contact GitHub support if needed

---

**Note**: Keep your Personal Access Token secure and don't share it publicly. You can revoke it anytime from GitHub Settings if needed. 