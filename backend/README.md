# QuickHire Backend API

A powerful REST API for the QuickHire job board application built with **Laravel 11**, **PHP 8.3**, and **MySQL**.

## Features

- ✅ **Jobs Management API** - CRUD operations for job listings
- ✅ **Job Applications** - Submit and manage job applications
- ✅ **Search & Filtering** - Advanced filtering by category, location, job type
- ✅ **Pagination** - Efficient data retrieval with pagination
- ✅ **Validation** - Comprehensive input validation with custom messages
- ✅ **Error Handling** - Consistent JSON error responses
- ✅ **CORS Support** - Cross-origin resource sharing for frontend integration
- ✅ **Clean Code** - Modular, well-organized code structure

## Tech Stack

- **Framework:** Laravel 11
- **PHP:** 8.3+
- **Database:** MySQL
- **Request Validation:** Laravel Form Requests
- **API Format:** JSON

## Prerequisites

- PHP 8.3 or higher
- MySQL 5.7+ or MySQL 8.0+
- Composer
- Node.js (for frontend development)

## Installation & Setup

### 1. Navigate to Backend Directory

```bash
cd QuickHire/backend
```

### 2. Install Dependencies

```bash
composer install
```

### 3. Create MySQL Database

```bash
mysql -u root -p
CREATE DATABASE quickhire;
EXIT;
```

### 4. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and set database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=quickhire
DB_USERNAME=root
DB_PASSWORD=

FRONTEND_URL=http://localhost:3000
```

### 5. Generate Application Key

```bash
php artisan key:generate
```

### 6. Run Database Migrations

```bash
php artisan migrate
```

### 7. Start the Server

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

API available at: **http://localhost:8000/api**

## API Endpoints

### Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Get all jobs (with search, filter, pagination) |
| GET | `/api/jobs/{id}` | Get single job details |
| POST | `/api/jobs` | Create new job |
| PUT | `/api/jobs/{id}` | Update job |
| DELETE | `/api/jobs/{id}` | Delete job |

### Applications

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/applications` | Submit job application |
| GET | `/api/applications` | Get all applications (admin) |
| GET | `/api/applications/{id}` | Get single application |
| GET | `/api/jobs/{jobId}/applications` | Get applications for a job |
| DELETE | `/api/applications/{id}` | Delete application |

## API Examples

### Get All Jobs with Filters

```bash
curl "http://localhost:8000/api/jobs?search=designer&category=Design&location=NewYork&per_page=10"
```

### Create a Job

```bash
curl -X POST http://localhost:8000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior UI Designer",
    "company": "Dropbox",
    "location": "San Francisco, USA",
    "category": "Design",
    "type": "Full Time",
    "salary_min": 80000,
    "salary_max": 120000,
    "description": "We are looking for a talented UI designer...",
    "requirements": ["5+ years experience", "Figma proficiency"],
    "benefits": ["Health insurance", "Remote work", "Flexible hours"]
  }'
```

### Submit Application

```bash
curl -X POST http://localhost:8000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "job_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "resume_link": "https://example.com/resume.pdf",
    "cover_note": "I am very interested in this position..."
  }'
```

## Database Schema

### Jobs Table

```
id (Primary Key)
title (string)
company (string)
location (string)
category (string)
type (Full Time, Part Time, Internship, Freelance)
salary_min (decimal)
salary_max (decimal)
description (text)
requirements (JSON array)
benefits (JSON array)
logo (string)
created_at
updated_at
```

### Applications Table

```
id (Primary Key)
job_id (Foreign Key → jobs.id)
name (string)
email (string)
resume_link (URL string)
cover_note (text)
created_at
updated_at
```

## Validation Rules

### Create/Update Job

- `title` - Required, max 255 characters
- `company` - Required, max 255 characters
- `location` - Required, max 255 characters
- `category` - Required, max 255 characters
- `type` - Required, one of: Full Time, Part Time, Internship, Freelance
- `salary_min` - Optional, numeric, min 0
- `salary_max` - Optional, numeric, >= salary_min
- `description` - Required, string
- `requirements` - Optional, array of strings
- `benefits` - Optional, array of strings
- `logo` - Optional, string

### Submit Application

- `job_id` - Required, must exist in jobs table
- `name` - Required, max 255 characters
- `email` - Required, valid email format
- `resume_link` - Required, valid URL
- `cover_note` - Required, text

## Response Format

All responses are JSON:

```json
{
  "success": true/false,
  "message": "Response message",
  "data": { /* Data or array of data */ },
  "pagination": { /* For list endpoints */ }
}
```

## CORS Configuration

CORS is enabled for frontend at `http://localhost:3000` (configurable in `.env`).

Allowed methods: GET, POST, PUT, DELETE, OPTIONS

## Error Responses

- **400** - Bad Request (validation error)
- **404** - Not Found
- **500** - Server Error

All error responses include detailed error messages.

## Deployment

The backend can be deployed to platforms like:
- Railway
- Render
- Heroku
- Traditional shared hosting

Set environment variables on your hosting platform and run migrations.

## License

MIT License
