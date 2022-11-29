import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import React, { useLayoutEffect, useRef } from 'react'

// <---------------------------------< Design Ideas >-------------------------------->
const MchartPie = (props) => {
  const chartRef = useRef(null)

  useLayoutEffect(() => {
    const root = am5.Root.new('chartdiv')

    root.setThemes([am5themes_Animated.new(root)])

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalHorizontal,
        startAngle: -180,
        endAngle: 0,
        innerRadius: am5.percent(65),
      }),
    )

    // Define data
    let data = [
      {
        category: 'Sold',
        amount: 100000,
      },
      {
        category: 'Remaining',
        amount: 160000,
      },
    ]

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: 'Series',
        valueField: 'amount',
        categoryField: 'category',
        startAngle: -180,
        endAngle: 0,
        alignLabels: false,
      }),
    )

    series.ticks.template.set('visible', false)
    series.labels.template.set('visible', false)

    series.slices.template.setAll({
      stroke: am5.color('#fff'),
      strokeWidth: 2,
      strokeOpacity: 0.4,
      toggleKey: 'none',
    })

    series.children.push(
      am5.Label.new(root, {
        text: '{valueSum}',
        fontSize: 20,
        centerX: am5.percent(50),
        centerY: am5.percent(100),
        populateText: true,
      }),
    )

    series.appear(600)
    chart.appear(200)

    series.data.setAll(data)

    // Add legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.horizontalLayout,
      }),
    )

    legend.data.setAll(series.dataItems)

    chartRef.current = chart

    return () => {
      root.dispose()
    }
  }, [])

  return (
    <>
      <h2>Pie Chart (mchart)</h2>
      <div id="chartdiv" style={{ width: '100%', minHeight: '200px' }}></div>
      <div>Total Gold: 3060 Kg</div>
    </>
  )
}

// <--------------------------------< Main Function >-------------------------------->
export const MainPageView = (props) => {
  return (
    <div className="container m-4 text-center border">
      <h1>Main Page Diagram Ideas</h1>
      <MchartPie />
    </div>
  )
}
