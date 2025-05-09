// --------------------------------------------------------
// frontend/pages/403.tsx
// --------------------------------------------------------
export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold text-red-600">403 — Access Denied</h1>
        <p className="mb-6 text-gray-700">You do not have permission to view this page.</p>
        <a
          href="/"
          className="inline-block rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}