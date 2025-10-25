# 🚀 Database Setup Guide

## Option 1: MongoDB Atlas (Cloud - Easiest)

### Step 1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/atlas
2. Click "Try Free" 
3. Create account with email/password

### Step 2: Create Cluster
1. Choose "Shared" (Free tier)
2. Select region closest to you
3. Click "Create Cluster"

### Step 3: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### Step 4: Update Environment File
Create `server/.env` file:
```bash
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/dishcovery?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random_at_least_32_characters
NODE_ENV=development
```

### Step 5: Install Dependencies & Start
```bash
cd server
npm install
npm run dev
```

---

## Option 2: Local MongoDB

### Step 1: Install MongoDB
1. Download from: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. Start MongoDB service

### Step 2: Update Environment File
Create `server/.env` file:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dishcovery
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random_at_least_32_characters
NODE_ENV=development
```

### Step 3: Install Dependencies & Start
```bash
cd server
npm install
npm run dev
```

---

## 🎯 Quick Test

After setup, test the backend:
1. Go to: `http://localhost:5000/api/health`
2. You should see: `{"status":"healthy","message":"Dishcovery API is running!"}`

## 🔧 Troubleshooting

### "Cannot connect to MongoDB"
- Check if MongoDB is running (local) or cluster is active (Atlas)
- Verify connection string in `.env` file
- Check firewall/network settings

### "Authentication failed"
- Verify username/password in connection string
- Check database user permissions in Atlas

### "Module not found"
- Run `npm install` in the server directory
- Check if all dependencies are installed

## 📱 Once Backend is Running

1. **Start Frontend**: `npm run dev` (in main directory)
2. **Test Registration**: Go to `/register` and create account
3. **Test Login**: Go to `/login` and sign in
4. **Access Dashboard**: Should redirect to `/dashboard` after login

The app will work perfectly once the database is connected!
