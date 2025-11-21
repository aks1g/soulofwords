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

**3. Configure the Service Settings:**
- **Name**: `sabdo-ki-aatma` (or a name of your choice).
- **Region**: Choose a region near you (e.g., Singapore).
- **Root Directory**: `backend` (This is important!)
- **Branch**: `main`.
- **Build Command**: `npm install`.
- **Start Command**: `npm start`.
- **Instance Type**: Select the **`Free`** plan.

**4. Add Environment Variables (Crucial Step):**
- **MONGODB_URI**: Your MongoDB connection string.
- **JWT_SECRET**: A secret key for JWT signing and encryption.
- **SENDGRID_API_KEY**: Your SendGrid API key for email notifications.

**5. Monitor the Deployment:**
- After applying the blueprint, you will be taken to the Blueprint dashboard.
- Click on the service name (e.g., `sabdo-ki-aatma`) to view its details.
- Go to the **"Logs"** tab to watch the live deployment progress.
- The process is complete when you see the message **"Your service is live"**.

**6. Your Site is Live!**
- Once the status shows **"Live"**, your website will be available at the public URL provided by Render.
- The admin panel is at `/admin` (e.g., `https://sabdo-ki-aatma.onrender.com/admin`).

### Troubleshooting
- **Deployment Fails:** Check the "Logs" on Render for errors. The most common issues are related to the MongoDB connection or IP whitelisting.
- **IP Whitelist:** Ensure your MongoDB Atlas "Network Access" list is set to `0.0.0.0/0` (Allow Access from Anywhere).
