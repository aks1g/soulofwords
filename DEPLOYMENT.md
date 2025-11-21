# Deployment Guide: Soul of Words on Render.com (Blueprint Method)

This guide will walk you through deploying your full-stack application on Render using the automated Blueprint method.

### Prerequisites
- Your project code, including the `render.yaml` file, is on GitHub.
- You have a Render.com account, logged in with GitHub.

### Deployment Steps

**1. Commit and Push the Latest Changes:**
Before deploying, make sure your `render.yaml` file is on GitHub.
```bash
git add .
git commit -m "feat: Add render.yaml for automated deployment"
git push origin main
```

**2. Log in to Render and Create a New Blueprint:**
- Go to your [Render Dashboard](https://dashboard.render.com/).
- Click the **"New +"** button and select **"Blueprint"**.

**3. Connect Your GitHub Repository:**
- Select your GitHub repository (e.g., `sabdo-ki-aatma-live`).
- Render will automatically detect and apply the settings from your `render.yaml` file.
- Click **"Apply"** to confirm.

**4. Your Site is Live!**
- Render will now build and deploy your project based on the blueprint. This may take a few minutes.
- Once the status shows **"Live"**, your website will be available at the public URL provided by Render.
- The admin panel is at `/admin` (e.g., `https://sabdo-ki-aatma.onrender.com/admin`).

### Troubleshooting
- **Deployment Fails:** Check the "Logs" on Render for errors. The most common issues are related to the MongoDB connection or IP whitelisting.
- **IP Whitelist:** Ensure your MongoDB Atlas "Network Access" list is set to `0.0.0.0/0` (Allow Access from Anywhere).
