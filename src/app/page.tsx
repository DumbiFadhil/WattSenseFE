import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to WattSense</h1>
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Link 
          href="/data-analyzer" 
          className="bg-tertiary text-white p-6 rounded-lg shadow-md hover:bg-primary/90 transition duration-300 block"
        >
          <h2 className="text-2xl font-semibold mb-4">Data Analyzer</h2>
          <p>Upload and analyze your datasets with our advanced AI tools</p>
        </Link>
        <Link 
          href="/ai-consultant" 
          className="bg-secondary text-white p-6 rounded-lg shadow-md hover:bg-primary/90 transition duration-300 block"
        >
          <h2 className="text-2xl font-semibold mb-4">AI Consultant</h2>
          <p>Get AI-powered insights and recommendations</p>
        </Link>
      </div>
    </div>
  )
}