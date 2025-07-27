import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Fetch the user's profile to get their credit count
  const { data: profile } = await supabase
    .from('profiles')
    .select('credits_remaining')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Welcome, {user.email}</p>
            <p className="text-lg font-semibold text-indigo-600">
              Credits: {profile?.credits_remaining ?? 0} 🪙
            </p>
          </div>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Your Next CV
          </h1>
          <p className="mt-2 text-gray-500">
            Choose a template to get started.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Link href="/cv-builder" className="block">
    <div className="p-8 bg-white border-2 border-indigo-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
        <h2 className="text-2xl font-semibold text-gray-900">📄 Official CV</h2>
        <p className="mt-2 text-gray-600">
            ATS-compliant resume for job applications.
        </p>
    </div>
</Link>
          <button className="p-8 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-not-allowed opacity-50">
            <h2 className="text-2xl font-semibold text-gray-900">🎨 Unofficial CV</h2>
            <p className="mt-2 text-gray-600">
              Creative portfolio resume (Coming Soon).
            </p>
          </button>
        </div>

        {/* My CVs Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My CVs</h2>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-500">
              Your saved CVs will appear here.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}