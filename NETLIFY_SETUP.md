# Netlify Setup Guide for CountWize

## Current Status
- ✅ Site exists: countwize.com
- ✅ Domain connected: countwize.com
- ⚠️ Deployment: Manual (needs GitHub connection)
- ✅ netlify.toml created and pushed to GitHub

## Steps to Connect GitHub for Automatic Deployments

### Step 1: Open Site Settings
1. Go to https://app.netlify.com
2. Click on "countwize.com" site
3. Click "Site settings" (gear icon)

### Step 2: Connect GitHub Repository
1. Go to "Build & deploy" → "Continuous Deployment"
2. Click "Link repository"
3. Select "GitHub"
4. Authorize if needed
5. Select repository: **DaveXRouz/CountWize**
6. Click "Save"

### Step 3: Configure Build Settings
1. Branch to deploy: **main**
2. Build command: **(leave empty - no build needed)**
3. Publish directory: **/** (root directory)
4. Click "Save"

### Step 4: Verify Configuration
- The netlify.toml file will be automatically detected
- All redirects will be configured
- Security headers will be applied
- Cache control will be set

## After Connection

Once connected, every push to GitHub main branch will:
1. ✅ Automatically trigger a new deployment
2. ✅ Build and deploy your site
3. ✅ Update countwize.com within 1-2 minutes
4. ✅ Apply all netlify.toml configurations

## Manual Steps Required

Since I cannot access your Netlify account directly, you need to:
1. Click on the countwize.com site in Netlify dashboard
2. Go to Site settings → Build & deploy
3. Click "Link repository" and connect GitHub
4. Select the CountWize repository
5. Configure build settings (empty build command, root publish directory)

After this, everything will be automatic!
