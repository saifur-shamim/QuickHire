# QuickHire - Quick Start Guide (5 Minutes)

## 🚀 Get Running in 5 Steps

### Step 1: Create Database (1 min)
```bash
mysql -u root -p

# Paste this:
CREATE DATABASE quickhire;
exit
```

### Step 2: Start Backend (1 min)
```bash
cd /media/saifur-shamim/Education3/Projects/QuickHire/backend

# First time setup:
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate

# Then run:
php artisan serve --host=0.0.0.0 --port=8000
```

✓ Backend ready: **http://localhost:8000**

### Step 3: Start Frontend (1 min)
```bash
# NEW TERMINAL WINDOW
cd /media/saifur-shamim/Education3/Projects/QuickHire/frontend

npm install  # (first time only)
npm run dev
```

✓ Frontend ready: **http://localhost:3000**

### Step 4: Test Home Page (1 min)
- Open browser: **http://localhost:3000**
- Jobs should load from API
- See featured jobs and latest jobs sections

### Step 5: Test Full Workflow (1 min)
1. Click "Browse Jobs" → See all jobs
2. Click any job → See full details
3. Click "Apply Now" → Submit application
4. Go to `/admin` → Manage jobs

✅ **Done! Your app is fully functional!**

---

## 📋 What's Working

✅ All jobs load from database  
✅ Search and filters work  
✅ Job details page works  
✅ Application form submits to database  
✅ Admin dashboard creates/deletes jobs  
✅ Fully responsive mobile design  

---

## 🔍 Troubleshooting

**"Failed to load jobs"**
- Make sure backend is running on port 8000
- Check that database was created
- Check backend didn't show errors

**"Cannot connect"**
- Verify both terminals show "Server running"
- Backend should show: `http://0.0.0.0:8000`
- Frontend should show: `http://localhost:3000`

**"Migrations failed"**
- Make sure MySQL is running
- Make sure database was created
- Check `.env` has correct database name

---

## 📝 Detailed Testing

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for complete testing steps

See [API_INTEGRATION.md](API_INTEGRATION.md) for API details

---

## 🎯 Commands Cheat Sheet

```bash
# Backend
cd backend
php artisan serve --host=0.0.0.0 --port=8000    # Start server
php artisan migrate                              # Run migrations
php artisan tinker                               # Debug console
php artisan migrate:rollback                     # Undo migrations

# Frontend
cd frontend
npm run dev                                      # Start dev server
npm run build                                    # Build for production
npm install                                      # Install dependencies

# Database
mysql quickhire -u root -p                       # Connect to database
SELECT * FROM jobs;                              # View all jobs
SELECT * FROM applications;                      # View applications
```

---

## ✨ Features

**User Features:**
- Browse all job listings
- Search jobs by title/company
- Filter by category, location, type
- View detailed job information
- Submit job applications
- Fully responsive mobile design

**Admin Features:**
- View all jobs in dashboard
- Create new job listings
- Delete job listings
- See all applications
- Job statistics

**Technical:**
- REST API with Laravel
- Real-time frontend updates
- Form validation (client + server)
- CORS enabled for security
- MySQL database with relationships

---

## 📱 Mobile Testing

The app is **fully responsive** and works on:
- ✅ Desktop (1920x1080+)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)

Test in browser: Press F12 → Click device icon (top left)

---

## 🔗 URLs

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Browse Jobs | http://localhost:3000/jobs |
| Job Detail | http://localhost:3000/jobs/1 |
| Admin | http://localhost:3000/admin |
| Backend API | http://localhost:8000/api |

---

## 📊 Example Test Flow

1. **Create a test job:**
   - Go to http://localhost:3000/admin
   - Click "Add New Job"
   - Fill form: Title, Company, Location, etc.
   - Click Submit

2. **See it appear:**
   - Go to http://localhost:3000
   - Job appears in "Featured Jobs"
   - Job appears in "Latest Jobs"

3. **Apply to job:**
   - Go to http://localhost:3000/jobs
   - Click test job card
   - Click "Apply Now"
   - Fill application form:
     - Name: "Your Name"
     - Email: "your@email.com"
     - Resume: "https://example.com/resume.pdf"
     - Cover Note: "I'm interested..."
   - Click Submit

4. **Check database:**
   ```bash
   mysql quickhire -u root -p
   SELECT * FROM applications;
   ```

---

## 🎓 Next Steps

- [ ] Run all 5 steps above
- [ ] Test home page loads
- [ ] Test jobs listing
- [ ] Test job details
- [ ] Test application form
- [ ] Test admin dashboard
- [ ] Check mobile view (F12 → responsive mode)
- [ ] Read [TESTING_GUIDE.md](TESTING_GUIDE.md) for detailed testing
- [ ] Deploy to production (optional)

---

## ⚠️ Important Notes

**Database Must Exist:**
```bash
mysql -u root -p -e "CREATE DATABASE quickhire;"
```

**Both Servers Must Run:**
- Backend on http://localhost:8000
- Frontend on http://localhost:3000

**Keep Terminals Open:**
- Don't close backend terminal while testing
- Don't close frontend terminal while testing
- Open new terminals for other commands

---

## 📞 Help

If something doesn't work:

1. **Check if servers are running:**
   - Visit http://localhost:8000 (should show Laravel welcome or error)
   - Visit http://localhost:3000 (should show QuickHire home)

2. **Check browser console:**
   - Press F12
   - Go to "Console" tab
   - Look for red error messages

3. **Check backend logs:**
   ```bash
   tail -f backend/storage/logs/laravel.log
   ```

4. **Follow detailed guide:**
   - See [TESTING_GUIDE.md](TESTING_GUIDE.md)

---

**You're all set! Happy coding! 🚀**

Questions? Check the docs or test now!
