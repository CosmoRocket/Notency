import React from 'react'
import { Pie as PieChartGraph } from 'react-chartjs-2'

const PieChart = ({
  data,
  options
}) => 
<div className="mt-3">
  <PieChartGraph data={data} options={options} />
</div>

export default PieChart

