export const buildGraphDataSets = arr => {
  
  const dataset = [];

  arr.forEach((points, idx) => {
    dataset.push({
      data: points,
      smooth: true,
      showPoints: true,
      fill: true,
      className: "curve" + (idx+1)
    })
  })

  return dataset

}