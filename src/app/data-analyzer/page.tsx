/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { uploadDataset } from '@/lib/api'
import toast from 'react-hot-toast'
import EnergyConsumptionChart from '@/components/energy-chart/EnergyConsumptionChart'

export default function DataAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [csvData, setCsvData] = useState(null)
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setFile(selectedFile || null)
  }

  const handleUpload = async () => {
    if (!file || !question) {
      toast.error('Please upload a file and enter a question')
      return
    }

    setIsLoading(true)
    try {
      const result = await uploadDataset(file, question)
      setResponse(result.data.answer)
      setCsvData(result.data.csv_data)

      console.log(csvData)

      toast.success('Analysis complete!')
    } catch (error) {
      setResponse('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Data Analyzer</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Upload Dataset
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Ask a Question
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What insights do you want?"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 disabled:opacity-50"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Data'}
        </button>

        {response && (
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h2 className="text-xl font-semibold mb-2">Analysis Result</h2>
            <p>{response}</p>
          </div>
        )}

        {csvData && <EnergyConsumptionChart data={csvData} />}
      </div>
    </div>
  )
}