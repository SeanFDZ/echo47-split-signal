# Echo 47 // Split Signal - Deployment Guide

## Step 1: Upload Files to GitHub

1. Navigate to your repository: https://github.com/SeanFDZ/echo47-split-signal

2. Upload all files from the `echo47-repo` folder:
   - Click "Add file" → "Upload files"
   - Drag and drop all files (maintaining directory structure)
   - Commit message: "Initial repository setup"

## Step 2: Enable GitHub Pages

1. Go to repository **Settings**
2. Navigate to **Pages** (left sidebar)
3. Under "Build and deployment":
   - Source: Deploy from a branch
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
4. Click **Save**

## Step 3: Configure Custom Domain

1. Still in **Settings** → **Pages**
2. Under "Custom domain", enter: `echo47.network`
3. Click **Save**
4. Wait for DNS check (may take a few minutes)
5. Once verified, check "Enforce HTTPS"

## Step 4: Configure DNS Records

In your domain registrar (where you bought echo47.network):

1. Add these DNS records:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A  
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: seanfdz.github.io
```

2. Save changes and wait for DNS propagation (15 minutes - 48 hours)

## Step 5: Test the Site

1. Visit: https://echo47.network
2. Should see the placeholder page with loading message
3. Check HTTPS is working (padlock icon in browser)

## Step 6: Connect n8n Workflow

Once the site is live, we'll configure the n8n workflow to:

1. Generate article JSON files
2. Generate article HTML pages  
3. Update articles.json master index
4. Commit and push to GitHub via API

---

## Troubleshooting

**DNS not resolving:**
- Wait longer (DNS can take up to 48 hours)
- Verify A records point to GitHub's IPs
- Check CNAME file exists in repository root

**GitHub Pages not building:**
- Check repository Settings → Pages for error messages
- Ensure branch is correct (main/master)
- Verify all files uploaded successfully

**Custom domain not working:**
- Ensure CNAME file contains only: `echo47.network`
- No http://, no www, no trailing slash
- Check GitHub Pages settings show green checkmark

---

## Next Steps

After deployment:
1. Test the site loads correctly
2. Configure GitHub Personal Access Token for n8n
3. Update n8n workflow with repository details
4. Test end-to-end article generation
5. Schedule workflow for MWF 06:00 CT
