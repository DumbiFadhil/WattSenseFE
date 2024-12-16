'use client' // Mark this as a Client Component

import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import Link from 'next/link'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    fill: boolean
  }[]
}

export default function Home() {
  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Total Energy Usage (kWh)',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const newLabel = new Date().toLocaleTimeString()

      // Simulate a smooth energy usage curve, adding some random noise
      const previousDataPoint = data.datasets[0].data[data.datasets[0].data.length - 1] || 0
      const randomChange = Math.random() * 5 - 2.5 // Small random fluctuations between -2.5 and 2.5 kWh
      let newDataPoint = previousDataPoint + randomChange

      // Occasionally, add a large spike (simulating a high energy consumption moment)
      if (Math.random() < 0.1) {
        newDataPoint += Math.random() * 50 // Random spike between 0 and 50 kWh
      }

      // Ensure the new data point doesn't go below 0
      newDataPoint = Math.max(0, newDataPoint)

      setData((prevData) => {
        const updatedLabels = [...prevData.labels, newLabel].slice(-10) // Keep only the last 10 labels
        const updatedData = [...prevData.datasets[0].data, newDataPoint].slice(-10) // Keep only the last 10 data points

        return {
          ...prevData,
          labels: updatedLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: updatedData,
            },
          ],
        }
      })
    }, 180000) // 15 minutes in milliseconds (900,000 ms)

    return () => clearInterval(interval)
  }, [data])

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to <span className="text-bg-tertiary">Watt</span><span className="text-bg-secondary">Sense</span></h1>
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Link
          href="/data-analyzer"
          className="bg-tertiary text-white p-6 rounded-lg shadow-md hover:bg-tertiary/70 transition duration-300 block"
        >
          <h2 className="text-2xl font-semibold mb-4">Data Analyzer</h2>
          <p>Upload and analyze your datasets with our advanced AI tools</p>
        </Link>
        <Link
          href="/ai-consultant"
          className="bg-secondary text-white p-6 rounded-lg shadow-md hover:bg-secondary/70 transition duration-300 block"
        >
          <h2 className="text-2xl font-semibold mb-4">AI Consultant</h2>
          <p>Get AI-powered insights and recommendations</p>
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Real-Time Energy Monitoring</h2>
        <p>Energy usage data is updated every 3 minutes...</p>
        <div className="mt-4">
          <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} height={400} />
        </div>
      </div>
    </div>
  )
}
