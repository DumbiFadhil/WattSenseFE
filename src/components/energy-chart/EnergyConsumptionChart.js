// components/EnergyConsumptionChart.js

import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)

const EnergyConsumptionChart = ({ data }) => {
  const appliances = [...new Set(data.Appliance)]
  const timeLabels = [...new Set(data.Time)]

  const datasets = appliances.map((appliance) => {
    const energyConsumptionData = data.Energy_Consumption.filter((_, index) => data.Appliance[index] === appliance)
    return {
      label: appliance,
      data: energyConsumptionData.map(Number),
      fill: false,
      borderColor: getRandomColor(),
      tension: 0.1
    }
  })

  const chartData = {
    labels: timeLabels,
    datasets: datasets
  }

  return <Line data={chartData} />
}

const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export default EnergyConsumptionChart
