'use client';

export default function ApplicationsList({ applications = [] }) {
  return (
    <div className="overflow-x-auto">
      {applications.length > 0 ? (
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Applicant Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Job Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Resume</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cover Note</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Applied On</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{app.name}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-600">{app.email}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-600">{app.job_listing?.title || 'Job Deleted'}</p>
                </td>
                <td className="px-6 py-4">
                  {app.resume_link ? (
                    <a 
                      href={app.resume_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 underline font-medium"
                    >
                      View Resume
                    </a>
                  ) : (
                    <span className="text-gray-400">No resume</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-600 text-sm max-w-xs truncate">{app.cover_note || 'No note'}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-600 text-sm">
                    {new Date(app.created_at).toLocaleDateString()}
                  </p>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <a 
                      href={`mailto:${app.email}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Email applicant"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="px-6 py-12 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-600 text-lg font-medium">No applications yet</p>
          <p className="text-gray-500 mt-1">Applications will appear here as they come in</p>
        </div>
      )}
    </div>
  );
}
