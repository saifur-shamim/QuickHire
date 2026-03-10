# QuickHire - Complete Testing Guide

## Overview
This guide walks you through testing the entire QuickHire application workflow, from setting up the backend to verifying all frontend features.

---

## ✅ STEP 1: Backend Setup & Database

### Prerequisites
- PHP 8.3+
- MySQL 5.7+
- Composer
- Command line/Terminal access

### Step 1.1: Create MySQL Database

```bash
# Open MySQL console (or use MySQL Workbench)
mysql -u root -p

# Create the database
CREATE DATABASE quickhire;

# Exit MySQL
exit
```

### Step 1.2: Configure Backend Environment

```bash
cd /media/saifur-shamim/Education3/Projects/QuickHire/backend

# Copy environment configuration
cp .env.example .env

# Verify .env contains these database settings:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=quickhire
# DB_USERNAME=root
# DB_PASSWORD=(your mysql password)
```

### Step 1.3: Install Dependencies & Run Migrations

```bash
# Install composer dependencies
composer install

# Generate app key
php artisan key:generate

# Run migrations to create tables
php artisan migrate

# Expected output:
# ✅ Migration table created successfully
# ✅ Triggered: 2024_01_01_000000_create_users_table (or similar)
# ✅ Triggered: 2024_03_06_create_jobs_table
# ✅ Triggered: 2024_03_06_create_applications_table
# ✅ Triggered: 2026_03_11_000000_create_categories_table
# ✅ Triggered: 2026_03_11_000001_update_job_listings_table
```

**✓ Verify:** Check MySQL database for `categories`, `job_listings`, and `job_applications` tables
```bash
mysql quickhire -u root -p -e "SHOW TABLES;"
```

### Step 1.3.1: Seed Sample Categories (Important!)

Before creating jobs, you must create categories in the database:

```bash
# Open MySQL console
mysql quickhire -u root -p

# Insert sample categories
INSERT INTO categories (name, slug, created_at, updated_at) VALUES
('Technology', 'technology', NOW(), NOW()),
('Design', 'design', NOW(), NOW()),
('Marketing', 'marketing', NOW(), NOW()),
('Sales', 'sales', NOW(), NOW()),
('Finance', 'finance', NOW(), NOW()),
('Engineering', 'engineering', NOW(), NOW()),
('Business', 'business', NOW(), NOW()),
('Human Resource', 'human-resource', NOW(), NOW());

# Exit MySQL
exit
```

**✓ Verify:** Check if categories were created
```bash
mysql quickhire -u root -p -e "SELECT * FROM categories;"
```

### Step 1.4: Start Laravel Server

```bash
# Start Laravel development server
php artisan serve --host=0.0.0.0 --port=8000

# Expected output:
# INFO  Server running on [http://0.0.0.0:8000]
# INFO  Press Ctrl+C to stop the server
```

✓ **Backend is ready at:** `http://localhost:8000`

---

## 📋 Database Schema Overview

### After Updated Migrations

Your database now has the following tables:

**categories (NEW - March 11)**
- `id` - Primary Key
- `name` - Category name (e.g., "Technology", "Design")
- `slug` - URL slug (e.g., "technology", "design")
- `created_at`, `updated_at` - Timestamps

**job_listings** (Updated - March 11)
- `id` - Primary Key
- `title`, `company`, `location` - Job basics
- `category_id` - Foreign Key to categories table (NEW)
- `type` - Job type (Full Time, Part Time, etc.)
- `salary_min`, `salary_max` - Salary range
- `description`, `requirements`, `benefits` - Job details
- `logo` - Company logo/icon
- `is_featured` - Boolean to mark as featured (NEW)
- `created_at`, `updated_at` - Timestamps

**job_applications** (Unchanged)
- `id` - Primary Key
- `job_listing_id` - Foreign Key to job_listings
- `name`, `email` - Applicant info
- `resume_link`, `cover_note` - Application details
- `created_at`, `updated_at` - Timestamps

**Important Changes:**
- Category is now a **database relationship** instead of a text field
- Jobs can be marked as **featured** for the featured jobs section
- Better database normalization and data integrity

---

## ✅ STEP 2: Frontend Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Step 2.1: Open New Terminal & Navigate to Frontend

```bash
# Open new terminal window
cd /media/saifur-shamim/Education3/Projects/QuickHire/frontend

# Install dependencies
npm install

# Expected output:
# ✅ up to date in X.XXs
```

### Step 2.2: Verify Environment Configuration

Check `.env.local` file contains:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NODE_ENV=development
```

If not present, create/update it:
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local
```

### Step 2.3: Start Development Server

```bash
npm run dev

# Expected output:
# ▲ Next.js 16.1.6
# - Local:        http://localhost:3000
```

✓ **Frontend is ready at:** `http://localhost:3000`

---

## ✅ STEP 3: Test API Endpoints (Optional but Recommended)

### Using cURL or Postman

#### 3.1: Test Jobs API

**Create a Sample Job:**
```bash
curl -X POST http://localhost:8000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior React Developer",
    "company": "Tech Corp",
    "location": "New York, USA",
    "category_id": 1,
    "type": "Full Time",
    "salary_min": 100000,
    "salary_max": 150000,
    "description": "Looking for an experienced React developer.",
    "requirements": ["React", "Node.js", "SQL"],
    "benefits": ["Health insurance", "Remote work"],
    "is_featured": true
  }'
```

**Get All Jobs:**
```bash
curl http://localhost:8000/api/jobs
```

**Get Single Job (replace 1 with actual job ID):**
```bash
curl http://localhost:8000/api/jobs/1
```

#### 3.2: Test Applications API

**Submit Application (replace 1 with job ID from jobs table):**
```bash
curl -X POST http://localhost:8000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "job_listing_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "resume_link": "https://example.com/resume.pdf",
    "cover_note": "I am very interested in this position."
  }'
```

**Get All Applications:**
```bash
curl http://localhost:8000/api/applications
```

#### 3.3: Test Categories API (New)

**Get All Categories:**
```bash
curl http://localhost:8000/api/categories
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": [
    {"id": 1, "name": "Technology", "slug": "technology", "created_at": "...", "updated_at": "..."},
    {"id": 2, "name": "Design", "slug": "design", "created_at": "...", "updated_at": "..."},
    ...
  ]
}
```

---

## ✅ STEP 4: Frontend Feature Testing

### Open Browser

Open `http://localhost:3000` in your browser

### 4.1: Test Home Page

**What to verify:**
- ✅ Header with logo and navigation visible
- ✅ Hero section displays correctly
- ✅ Categories section shows job categories
- ✅ Featured jobs section shows jobs from API
- ✅ Admin promotion banner visible
- ✅ Latest jobs section displays
- ✅ Footer visible
- ✅ No errors in browser console

**If issues:**
- Check if backend is running (`http://localhost:8000/api/jobs` should return data)
- Check browser console for errors (F12 → Console tab)
- Verify `.env.local` API URL is correct

### 4.2: Test Jobs Listing Page

**Navigate to:** Click "Browse Jobs" or go to `/jobs`

**What to verify:**
- ✅ Job listings load from API
- ✅ Search box works (type job title)
- ✅ Category filter works (now using category IDs)
- ✅ Location filter works
- ✅ Jobs display in grid/list
- ✅ Pagination works (if more than display limit)
- ✅ Loading spinner shows briefly
- ✅ No duplicate jobs displayed

**Test Search:**
1. Type "React" in search box
2. Should filter jobs containing "React"

**Test Category Filter:**
1. Select category from dropdown (uses category names from database)
2. Should show only jobs in that category
3. Category filtering now uses database category relationships

### 4.2.1: Test Featured Jobs Section (New Feature)

**From home page:** Scroll to "Featured jobs" section

**What to verify:**
- ✅ Featured section shows only jobs marked as `is_featured = true`
- ✅ Shows maximum 8 featured jobs
- ✅ Displays in 4-column grid layout
- ✅ If no featured jobs exist, shows "No featured jobs available right now"
- ✅ "Show all jobs" link works

**To create featured jobs:**
1. Go to `/admin` (Admin Dashboard)
2. Click "Add New Job"
3. Fill all fields and **check** "Mark as Featured Job" checkbox
4. Submit the form
5. Return to home page and verify job appears in Featured jobs section

### 4.3: Test Job Detail Page

**Click any job card**

**What to verify:**
- ✅ Job details load correctly
- ✅ Title, company, location display
- ✅ Full description visible
- ✅ Requirements list shows
- ✅ Benefits list shows
- ✅ Salary range displays
- ✅ "Apply Now" button visible
- ✅ All job information matches API data

### 4.4: Test Application Form

**From job detail, click "Apply Now"**

**What to verify:**
- ✅ Modal form appears
- ✅ Form fields are empty (name, email, resume link, cover note)
- ✅ All fields are required (try submitting empty)
- ✅ Email validation works (invalid email shows error)
- ✅ URL validation works for resume link

**Test Valid Submission:**
1. Fill form with valid data:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Resume: "https://example.com/resume.pdf"
   - Cover Note: "I am interested..."
2. Click "Submit Application"
3. Verify success message appears
4. Form closes after 2 seconds

**Check database:**
```bash
# View submitted applications
mysql quickhire -u root -p -e "SELECT * FROM applications;"
```

### 4.5: Test Admin Dashboard

**Navigate to:** `/admin` (or add admin link to navigation)

**What to verify:**
- ✅ All jobs from database display in table
- ✅ "Add New Job" button visible
- ✅ Delete button works for each job
- ✅ Edit button (if implemented) works

**Test Add Job:**
1. Click "Add New Job"
2. Fill form fields:
   - Title: "Test Job"
   - Company: "Test Company"
   - Location: "Test City"
   - **Category:** Select from dropdown (now fetches from database categories)
   - Type: "Full Time"
   - Minimum Salary: 60000
   - Maximum Salary: 100000
   - **Featured Job:** Check box to mark as featured (optional)
   - Description: "Test description"
   - Requirements: Enter requirements (one per line)
   - Benefits: Enter benefits (one per line)
3. Click Submit
4. Verify success message
5. New job appears in:
   - Home page > Latest jobs section
   - If marked featured: Home page > Featured jobs section
   - Jobs listing page

**Test Delete Job:**
1. Click Delete button on any job
2. Confirm deletion
3. Job disappears from list
4. Job no longer appears on home page or jobs listing

---

## ✅ STEP 5: Responsive Design Testing

### Test on Different Screen Sizes

**Desktop (1920x1080):**
```bash
# Browser DevTools: F12 → responsive design mode
# Or manually resize browser window
```

**Tablet (768x1024):**
- Click device toolbar (top left)
- Select "iPad"
- Verify layout adapts

**Mobile (375x667):**
- Click device toolbar
- Select "iPhone SE"
- Verify:
  - ✅ Menu collapses to hamburger
  - ✅ Content single column
  - ✅ Buttons clickable
  - ✅ Text readable

---

## ✅ STEP 6: Error Handling Testing

### 6.1: Test Network Error Handling

**Stop backend server** (in backend terminal, press Ctrl+C)

1. Refresh home page
2. Verify loading spinner
3. Verify error message displays: "Failed to load jobs"
4. Button to retry (or manual page refresh)

**Restart backend:**
```bash
php artisan serve --host=0.0.0.0 --port=8000
```

### 6.2: Test Validation Errors

**Application Form:**
1. Click "Apply Now"
2. Click Submit without filling form
3. Verify error: "Name is required"

**Invalid Email:**
1. Enter: "notanemail"
2. Verify error: "Valid email is required"

**Invalid URL:**
1. Enter resume: "not-a-url"
2. Verify error: "Resume link must be a valid URL"

---

## ✅ STEP 7: Database Verification

### View Database Tables and Records

```bash
mysql quickhire -u root -p

# Show all categories
SELECT id, name, slug FROM categories;

# Show all jobs (with category info)
SELECT id, title, company, category_id, is_featured FROM job_listings;

# Show all applications
SELECT id, job_listing_id, name, email FROM job_applications;

# Count records
SELECT COUNT(*) as total_categories FROM categories;
SELECT COUNT(*) as total_jobs FROM job_listings;
SELECT COUNT(*) as total_applications FROM job_applications;

# Show featured jobs only
SELECT id, title, company, is_featured FROM job_listings WHERE is_featured = true;

exit
```

**Expected Output:**
- ✅ Categories table has 8 default categories (Technology, Design, Marketing, etc.)
- ✅ Job listings show category_id (foreign key) instead of category text
- ✅ Job listings have is_featured column with true/false values
- ✅ Job applications reference job_listing_id

---

## ✅ STEP 8: Browser Console Verification

**Open DevTools:** Press F12 in browser

### Check Console Tab
- ✅ No red errors
- ✅ Only warnings (yellow) are okay
- ✅ When fetching jobs, console shows: "Jobs fetched successfully" (if logging added)

### Check Network Tab
- ✅ API requests to `http://localhost:8000/api/jobs` return 200
- ✅ API requests to `http://localhost:8000/api/applications` return 201 (on submission)
- ✅ No 404 or 500 errors

### Check Application Tab
- ✅ LocalStorage/SessionStorage is clean (optional)

---

## 🔍 TROUBLESHOOTING

### Issue: "Failed to load jobs"
**Solutions:**
1. Verify backend is running: `lsof -i :8000`
2. Check database connection: `php artisan tinker` → `DB::connection()->getPdo();`
3. Verify CORS is enabled in bootstrap/app.php
4. Check .env.local has correct API URL

### Issue: "Cannot POST /api/applications"
**Solutions:**
1. Verify job_id exists in database
2. Check form validation errors in browser console
3. Verify backend migrations ran: `php artisan migrate:status`

### Issue: Job detail page shows "Job not found"
**Solutions:**
1. Verify job exists in database: `SELECT * FROM jobs WHERE id = 1;`
2. Check URL parameter matches job ID
3. Refresh browser

### Issue: Form validation always fails
**Solutions:**
1. Check browser console for specific error message
2. Verify resume URL is valid (starts with http:// or https://)
3. Verify email format is correct

### Issue: Dashboard can't create/delete jobs
**Solutions:**
1. Check backend error logs: `storage/logs/laravel.log`
2. Verify all required fields are filled
3. Check job_id in applications table matches deleted job

---

## ✅ COMPLETE WORKFLOW TEST CHECKLIST

- [ ] Backend server running on port 8000
- [ ] Frontend server running on port 3000
- [ ] Database has jobs and applications tables
- [ ] Home page loads jobs from API
- [ ] Jobs listing page displays all jobs
- [ ] Search filter works
- [ ] Category filter works
- [ ] Location filter works
- [ ] Job detail page loads correct job
- [ ] Application form validates correctly
- [ ] Application submission succeeds
- [ ] Application saved to database
- [ ] Admin dashboard loads all jobs
- [ ] Admin can create new jobs
- [ ] Admin can delete jobs
- [ ] Responsive design works on mobile
- [ ] No console errors
- [ ] API returns correct status codes
- [ ] Error messages display properly

---

## 📱 TESTING WITH MOBILE DEVICE (Optional)

### Connect Physical Device

1. **Get your computer IP:**
   ```bash
   ifconfig | grep "inet " | grep -v "127.0.0.1"
   # Note: something like 192.168.x.x
   ```

2. **Update frontend environment:**
   ```bash
   # In .env.local, replace localhost with your IP:
   NEXT_PUBLIC_API_URL=http://192.168.x.x:8000/api
   ```

3. **Update backend CORS (if needed):**
   In `app/Http/Middleware/AddCorsHeaders.php`:
   ```php
   'Access-Control-Allow-Origin' => 'http://192.168.x.x:3000',
   ```

4. **On mobile browser:**
   - Go to: `http://192.168.x.x:3000`
   - Test all features same as desktop

---

## 📊 PERFORMANCE TIPS

- Check Network tab for slow API responses
- Use React DevTools to check component renders
- Verify database queries are optimized
- Monitor backend logs for slow queries

---

## 🎉 SUCCESS!

If all items in the checklist pass, your QuickHire application is fully functional!

**Next steps:**
- Deploy frontend to Vercel
- Deploy backend to Railway/Render
- Set up production database
- Update API URLs for production
- Set up error monitoring (Sentry, etc.)

---

## 📞 QUICK COMMANDS REFERENCE

```bash
# Backend
cd backend
php artisan serve --host=0.0.0.0 --port=8000
php artisan migrate
php artisan tinker

# Frontend
cd frontend
npm install
npm run dev
npm run build

# Database - Setup
mysql -u root -p
CREATE DATABASE quickhire;
USE quickhire;
SHOW TABLES;

# Database - View Data
SELECT * FROM categories;
SELECT * FROM job_listings;
SELECT * FROM job_applications;
SELECT * FROM jobs; # Laravel queue table (ignore)

# API Endpoints - Jobs
curl http://localhost:8000/api/jobs
curl http://localhost:8000/api/jobs/1
curl http://localhost:8000/api/jobs?featured=true # Get featured jobs only
curl http://localhost:8000/api/jobs?category_id=1 # Get jobs by category

# API Endpoints - Categories (New)
curl http://localhost:8000/api/categories

# API Endpoints - Applications
curl http://localhost:8000/api/applications
curl http://localhost:8000/api/jobs/1/applications

# Useful system checks
curl http://localhost:8000/api/jobs
curl http://localhost:3000
lsof -i :8000  # Check if port 8000 is in use
lsof -i :3000  # Check if port 3000 is in use
```

---

**Happy Testing! 🚀**
