import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-800">
          Build a Job-Winning CV with AI
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Create professional, ATS-compliant resumes in minutes. Let our AI handle the writing, so you can focus on landing your dream job.
        </p>
        <Link
          href="/dashboard"
          className="mt-8 inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
        >
          Get Started for Free
        </Link>
      </div>
    </main>
  )
}