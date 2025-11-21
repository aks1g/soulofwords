# Deployment Guide: Soul of Words on Render.com

This guide will walk you through deploying your full-stack application on Render.

### Prerequisites
- Your project code is successfully pushed to a clean GitHub repository.
- You have a Render.com account, logged in with GitHub.

### Deployment Steps

**1. Log in to Render and Create a New Service:**
- Go to your [Render Dashboard](https://dashboard.render.com/).
- Click the **"New +"** button and select **"Web Service"**.

**2. Connect Your GitHub Repository:**
- Find and select your new GitHub repository (e.g., `sabdo-ki-aatma-live`).
- Click **"Connect"**.

**3. Configure the Service Settings:**
- **Name**: `sabdo-ki-aatma` (or a name of your choice).
- **Region**: Choose a region near you (e.g., Singapore).
- **Branch**: `main`.
- **Build Command**: `cd backend && npm install`.
- **Start Command**: `cd backend && npm start`.
- **Instance Type**: Select the **`Free`** plan.

**4. Add Environment Variables (Crucial Step):**
- Scroll down to the "Environment" section.
- Click **"Add Environment Variable"** for each of the following:

| Key           | Value                                                                                             |
|---------------|---------------------------------------------------------------------------------------------------|
| `MONGODB_URI` | `mongodb+srv://akshit66:akshit66@cluster0.ymh9sic.mongodb.net/sabdo-ki-aatma?retryWrites=true&w=majority` |
| `JWT_SECRET`  | `your-very-strong-secret-key-that-is-at-least-32-characters-long` (Create a new secret!) |
| `NODE_ENV`    | `production`                                                                                      |
| `PORT`        | `5000`                                                                                            |

**5. Create the Web Service:**
- Click the **"Create Web Service"** button at the bottom.
- Render will now build and deploy your project. This may take a few minutes. You can watch the progress in the **"Logs"** tab.

**6. Your Site is Live!**
- Once the status shows **"Live"**, Render will give you a public URL at the top of the page (e.g., `https://sabdo-ki-aatma.onrender.com`).
- Visit that URL to see your website.
- The admin panel is available at `/admin` (e.g., `https://sabdo-ki-aatma.onrender.com/admin`).

### Troubleshooting
- **502 Error / App Crashing:** Check the "Logs" on Render for errors. The most common cause is an incorrect or missing environment variable, or an IP whitelist issue in MongoDB Atlas.
- **IP Whitelist:** Make sure your MongoDB Atlas "Network Access" list is set to `0.0.0.0/0` (Allow Access from Anywhere).
