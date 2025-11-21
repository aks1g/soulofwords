# Deployment Guide - Soul of Words

## Prerequisites
- GitHub account
- Render.com account
- MongoDB Atlas account (already configured)

## Deployment Steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sabdo-ki-aatma.git
git push -u origin main
```

### 2. Deploy on Render.com

1. Go to https://render.com
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Select your GitHub repository
5. Configure:
   - **Name**: sabdo-ki-aatma
   - **Environment**: Node
   - **Region**: Singapore (or closest to you)
   - **Branch**: main
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

6. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://akshit66:akshit66@cluster0.ymh9sic.mongodb.net/sabdo-ki-aatma?retryWrites=true&w=majority
   JWT_SECRET=your-very-strong-secret-key-min-32-characters-long
   NODE_ENV=production
   PORT=5000
   ```

7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)
9. Copy the deployed URL

### 3. Test Your Deployment

- **Homepage**: https://your-app.onrender.com/
- **Gallery**: https://your-app.onrender.com/gallery.html
- **Admin Panel**: https://your-app.onrender.com/admin
- **API Health**: https://your-app.onrender.com/api/health

### 4. First Time Setup

1. Go to admin panel: https://your-app.onrender.com/admin
2. Sign up with credentials
3. Login
4. Add gallery items and products

## Troubleshooting

### Images not loading
- Check if uploads folder exists on server
- Ensure image paths are correct

### API errors
- Check CORS settings in server.js
- Verify MongoDB connection string
- Check environment variables

### Build fails
- Ensure all dependencies in package.json
- Check Node version compatibility
- Review build logs on Render

## Live URL
Your application is live at: **[Your Render URL will appear here after deployment]**

## Maintenance
- Monitor Render dashboard
- Keep MongoDB Atlas credentials secure
- Backup database regularly
- Update dependencies quarterly
