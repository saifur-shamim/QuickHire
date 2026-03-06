import '@/styles/globals.css';

export const metadata = {
  title: 'QuickHire - Job Board Application',
  description: 'Discover more than 5000+ Jobs. Great platform for the job seeker that searching for new career heights and passionate about startups.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
