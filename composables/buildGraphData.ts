export const buildGraphData = (obj, yHeight) => {
  
  const graphData = {
    datasets: [{
      data: [],
      smooth: true,
      showPoints: true,
      fill: true,
      className: "curve1"
    }],
    grid: {
      verticalLines: true,
      horizontalLines: true
    },
    labels: {
      xLabels: [],
      yLabels: yHeight,
      yLabelsTextFormatter: val => Math.round((val * 100) / 100),
    },
  }

  obj.forEach((entry) => {

    const date = new Date(entry["date"])
    const count = parseInt(entry["count"].toString(), 10)

    graphData.datasets[0].data.push(count)

    const xLabel = date.toLocaleDateString("default", { month: "short", day: "numeric" })

    graphData.labels.xLabels.push(xLabel)

  })

  return graphData

}