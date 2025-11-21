<<<<<<< HEAD
# Soul of Words - शब्दों की आत्मा

A bi-monthly Hindi magazine platform with admin panel for managing gallery and products.

## Features

- **Admin Panel**: Add/manage gallery items and products
- **Authentication**: Secure login/signup with JWT
- **Gallery**: Dynamic gallery displaying admin-added items
- **Products**: Product management system
- **Cloud Database**: MongoDB Atlas integration
- **Responsive Design**: Works on desktop and mobile

## Tech Stack

**Frontend**
- HTML, CSS, JavaScript
- Responsive design
- Fetch API for backend communication

**Backend**
- Node.js + Express
- MongoDB Atlas
- JWT Authentication
- Multer for file uploads

## Project Structure

```
sabdo-ki-aatma/
├── frontend/
│   ├── index.html
│   ├── gallery.html
│   ├── admin/
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── signup.html
│   ├── css-files/
│   ├── js-files/
│   └── images/
├── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   └── package.json
└── README.md
```

## Installation (Local)

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
- Open `frontend/index.html` in browser
- Or use Live Server extension

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step deployment guide.

## Environment Variables

Create `.env` file in backend:
```
MONGODB_URI=your-mongodb-connection-string
PORT=5000
JWT_SECRET=your-secret-key
NODE_ENV=development
```

## Admin Panel

Access at: `/admin`
- Login/Signup required
- Add gallery items
- Add products with prices
- Manage uploaded content

## API Endpoints

- `GET /api/gallery` - Get all gallery items
- `POST /api/gallery` - Add gallery item (protected)
- `DELETE /api/gallery/:id` - Delete gallery item (protected)
- `GET /api/products` - Get all products
- `POST /api/products` - Add product (protected)
- `DELETE /api/products/:id` - Delete product (protected)
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/admin/stats` - Get statistics (protected)

## License

MIT License

## Support

For issues or questions, contact: soulofwords4@gmail.com
=======
# sabdo-ki-aatma
Soul Of Words website
>>>>>>> 5f3004d252ef8689c1955ec23c9db14e10539ae7
