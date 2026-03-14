# QuickHire - Job Board Application

A complete, production-ready job board application with **Next.js Frontend** and **Laravel Backend**.

## 🚀 Project Overview

QuickHire is a modern job board platform that allows users to:
- Browse and search job listings
- Filter jobs by category, location, and job type
- View detailed job information
- Submit job applications
- Admin panel for managing job postings

### Key Features

✅ **Responsive UI** - Works seamlessly on desktop, tablet, and mobile  
✅ **Advanced Search & Filtering** - Find jobs by title, company, category, location  
✅ **Job Applications** - Submit applications with resume links and cover notes  
✅ **Admin Dashboard** - Post, edit, and delete job listings  
✅ **Clean Architecture** - Component-based frontend, RESTful API backend  
✅ **Production Ready** - Validation, error handling, CORS support  
✅ **MySQL Database** - Persistent data storage with relationships  

## 📁 Project Structure

```
QuickHire/
├── frontend/                 # Next.js React Application
│   ├── app/                 # Next.js app router
│   ├── components/          # Reusable React components
│   ├── services/            # API service layer (Axios)
│   ├── styles/              # Tailwind CSS
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── README.md
│
└── backend/                 # Laravel REST API
    ├── app/
    │   ├── Http/
    │   │   ├── Controllers/
    │   │   ├── Requests/
    │   │   └── Middleware/
    │   └── Models/
    ├── database/
    │   └── migrations/
    ├── routes/
    │   ├── api.php
    │   └── web.php
    ├── .env
    ├── artisan
    ├── composer.json
    └── README.md
```

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 16
- **UI Library:** React 19
- **Styling:** Tailwind CSS 3
- **HTTP Client:** Axios
- **Language:** JavaScript (JSX)

### Backend
- **Framework:** Laravel 11
- **PHP:** 8.3+
- **Database:** MySQL
- **API Format:** RESTful JSON

## 📋 Features

### ✅ Frontend (Next.js/React)

1. **Job Listings Page**
   - Display all jobs with pagination
   - Search functionality
   - Filter by category and location
   - Responsive layout

2. **Job Detail Page**
   - Full job description
   - Requirements and benefits
   - Apply Now form
   - Company information

3. **Application Form**
   - Name field
   - Email field
   - Resume link (URL)
   - Cover note textarea
   - Client-side validation

4. **Admin Dashboard**
   - View all job listings
   - Add new job listings
   - Edit existing jobs
   - Delete job listings
   - Job statistics

5. **Responsive UI**
   - Mobile-first design
   - Tailwind CSS styling
   - Clean, professional UX
   - Feature-complete responsive design

6. **Code Quality**
   - Component-based structure
   - Modular organization
   - Service layer for API calls
   - Proper naming conventions

### ✅ Backend (Laravel + MySQL)

1. **RESTful API Endpoints**

   **Jobs:**
   - `GET /api/jobs` - List all jobs with search/filter/pagination
   - `GET /api/jobs/{id}` - Get single job details
   - `POST /api/jobs` - Create new job
   - `PUT /api/jobs/{id}` - Update job
   - `DELETE /api/jobs/{id}` - Delete job

   **Applications:**
   - `POST /api/applications` - Submit job application
   - `GET /api/applications` - Get all applications (Admin)
   - `GET /api/applications/{id}` - Get single application
   - `GET /api/jobs/{jobId}/applications` - Get job applications
   - `DELETE /api/applications/{id}` - Delete application

2. **Database Models & Migrations**
   - Job model with relationships
   - Application model with foreign key
   - Proper timestamps
   - JSON fields for arrays

3. **Input Validation**
   - Job validation rules
   - Application validation rules
   - Email format validation
   - URL validation for resume links
   - Custom error messages

4. **Code Quality**
   - Clean folder structure
   - Meaningful naming conventions
   - Modular controllers
   - Organized API routes
   - CORS middleware

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PHP 8.3+
- MySQL 5.7+
- npm or yarn
- Composer

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:3000**

### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
# Configure database in .env
php artisan key:generate
php artisan migrate
php artisan serve --host=0.0.0.0 --port=8000
```

Backend API at: **http://localhost:8000/api**

## 📚 API Documentation

### Get All Jobs

```bash
GET /api/jobs?search=designer&category=Design&location=NewYork&per_page=10
```

### Create Job

```bash
POST /api/jobs
Content-Type: application/json

{
  "title": "Senior UI Designer",
  "company": "Dropbox",
  "location": "San Francisco, USA",
  "category": "Design",
  "type": "Full Time",
  "salary_min": 80000,
  "salary_max": 120000,
  "description": "We are looking for a talented UI designer...",
  "requirements": ["5+ years experience", "Figma proficiency"],
  "benefits": ["Health insurance", "Remote work"]
}
```

### Submit Application

```bash
POST /api/applications
Content-Type: application/json

{
  "job_id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "resume_link": "https://example.com/resume.pdf",
  "cover_note": "I am very interested in this position..."
}
```

## 📖 Documentation

- **Frontend Details:** See [frontend/README.md](frontend/README.md)
- **Backend Details:** See [backend/README.md](backend/README.md)

## 🎨 Design Reference

UI follows the Figma template closely with:
- Purple primary color (#6B3EFF)
- Cyan accent color (#00D4FF)
- Clean, modern typography
- Professional spacing and layout
- Fully responsive design

## 📝 Database Schema

### Jobs Table

| Column | Type | Details |
|--------|------|---------|
| id | INT | Primary Key |
| title | VARCHAR(255) | Job title |
| company | VARCHAR(255) | Company name |
| location | VARCHAR(255) | Job location |
| category | VARCHAR(255) | Job category |
| type | VARCHAR(255) | Full Time, Part Time, etc. |
| salary_min | DECIMAL(10,2) | Minimum salary |
| salary_max | DECIMAL(10,2) | Maximum salary |
| description | TEXT | Full job description |
| requirements | JSON | Array of requirements |
| benefits | JSON | Array of benefits |
| logo | VARCHAR(255) | Company logo |
| created_at | TIMESTAMP | Creation date |
| updated_at | TIMESTAMP | Update date |

### Applications Table

| Column | Type | Details |
|--------|------|---------|
| id | INT | Primary Key |
| job_id | INT | Foreign Key → jobs.id |
| name | VARCHAR(255) | Applicant name |
| email | VARCHAR(255) | Applicant email |
| resume_link | VARCHAR(255) | Resume URL |
| cover_note | TEXT | Application message |
| created_at | TIMESTAMP | Application date |
| updated_at | TIMESTAMP | Update date |

## ✨ Features

### Frontend Features
- ✅ Home page with hero section
- ✅ Category browsing
- ✅ Featured and latest jobs sections
- ✅ Advanced job search and filtering
- ✅ Detailed job view
- ✅ Application submission form
- ✅ Admin dashboard for job management
- ✅ Fully responsive design
- ✅ Clean, professional UI
- ✅ Smooth animations and transitions

### Backend Features
- ✅ Complete REST API
- ✅ Advanced search and filtering
- ✅ Pagination support
- ✅ Input validation
- ✅ Error handling
- ✅ CORS support
- ✅ JSON responses
- ✅ Relationship management
- ✅ Job and application management

## 🔐 Validation

### Job Validation
- Title: Required, max 255 chars
- Company: Required, max 255 chars
- Location: Required, max 255 chars
- Category: Required, max 255 chars
- Type: Required, one of predefined types
- Description: Required
- Salary: Optional, numeric
- Requirements/Benefits: Optional, array

### Application Validation
- Job ID: Required, must exist
- Name: Required, max 255 chars
- Email: Required, valid email format
- Resume Link: Required, valid URL
- Cover Note: Required, text
## 📖 Testing Guide

For comprehensive testing instructions, refer to the **[Complete Testing Guide](TESTING_GUIDE.md)**. This guide covers:
- Backend setup and API endpoint testing
- Frontend feature verification
- Database schema overview
- Error handling testing
- Responsive design validation
- Troubleshooting common issues
## � Testing Guide

For comprehensive testing instructions, refer to the **[Complete Testing Guide](TESTING_GUIDE.md)**. This guide covers:
- Backend setup and API endpoint testing
- Frontend feature verification
- Database schema overview
- Error handling testing
- Responsive design validation
- Troubleshooting common issues

## �🚢 Deployment

**Frontend Live Link:**  
https://quick-hire-virid-eight.vercel.app/

**Backend Live Link:**  
https://quickhire-production-e3cd.up.railway.app/

## 📞 Support

For issues and questions, refer to:
- [Frontend Documentation](frontend/README.md)
- [Backend Documentation](backend/README.md)

## 📄 License

MIT License - Feel free to use this project for commercial or personal use.

---

**Built with ❤️ for efficient job searching and hiring**
