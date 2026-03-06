# QuickHire Frontend

A modern, responsive job board application built with **Next.js**, **React**, **Tailwind CSS**, and **Axios**.

## Features

- 🎯 **Job Listings Page** - Browse all available jobs with responsive grid/list layout
- 🔍 **Search & Filter** - Search by job title, company, and filter by category & location
- 💼 **Job Details** - Detailed job information with requirements, benefits, and salary
- 📝 **Application Form** - Submit job applications with validation
- 🛠️ **Admin Dashboard** - Post, edit, and delete job listings
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Clean, professional design following Figma template
- ⚡ **Performance** - Built with modern Next.js and optimized Tailwind CSS

## Tech Stack

- **Framework:** Next.js 16
- **UI Library:** React 19
- **Styling:** Tailwind CSS 3
- **HTTP Client:** Axios
- **Language:** JavaScript (JSX)

## Project Structure

```
frontend/
├── app/                      # Next.js app router directory
│   ├── layout.jsx           # Root layout
│   ├── page.jsx             # Home page
│   ├── jobs/
│   │   ├── page.jsx         # Jobs listing page
│   │   └── [id]/
│   │       └── page.jsx     # Job detail page
│   └── admin/
│       └── page.jsx         # Admin dashboard
├── components/              # Reusable React components
│   ├── layout/
│   │   ├── Header.jsx       # Navigation header
│   │   └── Footer.jsx       # Footer component
│   ├── home/                # Home page components
│   │   ├── HeroSection.jsx
│   │   ├── CategoriesSection.jsx
│   │   ├── FeaturedJobsSection.jsx
│   │   ├── LatestJobsSection.jsx
│   │   └── AdminPromoBanner.jsx
│   ├── jobs/                # Job-related components
│   │   ├── JobCard.jsx
│   │   ├── JobsListingView.jsx
│   │   ├── JobDetailView.jsx
│   │   └── ApplicationForm.jsx
│   └── admin/               # Admin components
│       ├── AdminDashboard.jsx
│       ├── JobsList.jsx
│       └── JobForm.jsx
├── services/                # API services
│   └── api.js              # Axios API client
├── styles/                  # Global styles
│   └── globals.css         # Tailwind & custom styles
├── public/                  # Static files
├── .env.local              # Environment variables
├── jsconfig.json           # Path aliases config
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn installed
- Backend API running on `http://localhost:8000`

### Installation

1. **Clone the repository** (or copy the project)

```bash
cd QuickHire/frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create/update `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Running Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## API Integration

The frontend communicates with the backend API using Axios. API endpoints are defined in `services/api.js`:

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/{id}` - Get job details
- `POST /api/jobs` - Create job (Admin)
- `PUT /api/jobs/{id}` - Update job (Admin)
- `DELETE /api/jobs/{id}` - Delete job (Admin)

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications` - Get applications (Admin)

## Component Documentation

### HeroSection
Hero section with search functionality and job count headline.

### CategoriesSection
Grid of job categories with icons and job counts.

### FeaturedJobsSection & LatestJobsSection
Display jobs in card or list format with job details.

### JobCard
Reusable component for displaying job information in featured or list layout.

### JobDetailView
Full job details with requirements, benefits, and application form.

### ApplicationForm
Modal form for submitting job applications with validation.

### AdminDashboard
Admin interface to manage job listings with create, edit, and delete functionality.

## Styling

The project uses **Tailwind CSS** with custom configuration:

- **Primary Color:** Purple (#6B3EFF)
- **Secondary Color:** Cyan (#00D4FF)
- **Dark Color:** Gray-900 (#1F2937)
- **Light Color:** Gray-50 (#F9FAFB)

Custom utility classes are available in `styles/globals.css`:
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.card` - Card component style
- `.text-gradient` - Text gradient effect

## Responsive Design

The UI is fully responsive with breakpoints:
- Mobile: 320px - 640px (sm)
- Tablet: 768px - 1024px (md & lg)
- Desktop: 1280px+ (xl & 2xl)

## Features Details

### Search & Filter
Users can search jobs by title/company and filter by category and location.

### Job Application
Applicants can submit their information including name, email, resume link, and cover note. Includes client-side validation.

### Admin Panel
Admins can:
- View all posted jobs
- Create new job listings
- Edit existing jobs
- Delete job listings
- View application stats

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

The frontend can be deployed to:
- **Vercel** (recommended, native Next.js support)
- **Netlify**
- **Self-hosted** (Node.js required)

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Future Enhancements

- User authentication and profiles
- Saved jobs feature
- Application tracking
- Email notifications
- Advanced filters and sorting
- Job recommendations
- Analytics and dashboards

## License

MIT License

## Support

For issues and questions, please contact the development team.
