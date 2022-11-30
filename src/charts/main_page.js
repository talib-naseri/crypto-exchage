import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import React, { useLayoutEffect, useRef } from 'react'

const GOLD_DATA = [
  {
    category: 'Sold',
    amount: 755,
  },
  {
    category: 'Remaining',
    amount: 2265,
  },
]

const TOKEN_DATA = [
  {
    category: 'Sold',
    amount: 10000000,
  },
  {
    category: 'Remaining',
    amount: 30000000,
  },
]

// <---------------------------------< Design Ideas >-------------------------------->
const MchartPie = ({ tokenData, goldData }) => {
  const chartRef = useRef(null)

  // Chart Default Settings
  const newPieChartSetting = {
    startAngle: -180,
    endAngle: 0,
    innerRadius: am5.percent(65),
  }

  const seriesSetting = {
    name: 'Series',
    valueField: 'amount',
    categoryField: 'category',
    startAngle: -180,
    endAngle: 0,
    legendLabelText: '{category}:',
  }

  const sliceTemplateSetting = {
    stroke: am5.color('#fff'),
    strokeWidth: 2,
    strokeOpacity: 0.4,
    toggleKey: 'none',
  }

  const labelsSetting = {
    centerX: am5.percent(50),
    centerY: am5.percent(100),
    populateText: true,
    fontWeight: 'bold',
    // fontSize: "125%"
  }

  const legendSetting = {
    x: am5.percent(50),
    centerX: am5.percent(50),
  }

  useLayoutEffect(() => {
    // ====> create Root
    const root = am5.Root.new('chartdiv')
    root.setThemes([am5themes_Animated.new(root)])

    // ====> create Chart
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        ...newPieChartSetting,
        layout: root.verticalLayout,
      }),
    )

    // ====> Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        ...seriesSetting,
        legendValueText: '[bold]{value}[/] QRFID',
      }),
    )

    series
      .get('colors')
      .set('colors', [am5.color('#419d8d'), am5.color('#9fe0ea')])

    series.ticks.template.set('forceHidden', true)
    series.labels.template.set('forceHidden', true)

    series.slices.template.setAll({
      ...sliceTemplateSetting,
    })

    series.children.push(
      am5.Label.new(root, {
        ...labelsSetting,
        text: '40M QRFID',
      }),
    )

    series.appear(600)
    chart.appear(200)

    series.data.setAll(tokenData)

    // Add legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        ...legendSetting,
        layout: root.verticalLayout,
      }),
    )

    legend.data.setAll(series.dataItems)

    return () => {
      root.dispose()
    }
  }, [])

  useLayoutEffect(() => {
    // ====> create Root
    const root = am5.Root.new('chartdiv1')
    root.setThemes([am5themes_Animated.new(root)])

    // ====> create Chart
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        ...newPieChartSetting,
        layout: root.verticalLayout,
      }),
    )

    // ====> Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        ...seriesSetting,
        legendValueText: '[bold]{value}[/] Kg',
      }),
    )

    series
      .get('colors')
      .set('colors', [am5.color('#d07a00'), am5.color('#f2f695')])

    series.ticks.template.set('forceHidden', true)
    series.labels.template.set('forceHidden', true)

    series.slices.template.setAll({
      ...sliceTemplateSetting,
    })

    series.children.push(
      am5.Label.new(root, {
        ...labelsSetting,
        text: '{valueSum} kg',
      }),
    )

    series.appear(600)
    chart.appear(200)

    series.data.setAll(goldData)

    // Add legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        ...legendSetting,
        layout: root.verticalLayout,
      }),
    )

    legend.data.setAll(series.dataItems)

    return () => {
      root.dispose()
    }
  }, [])

  return (
    <>
      <h2>Pie Chart (mchart)</h2>
      <div className="row row-cols-1 row-cols-md-2 m-3">
        <div
          id="chartdiv"
          className="col"
          style={{ width: '100%', minHeight: '300px' }}
        ></div>
        <div
          id="chartdiv1"
          className="col"
          style={{ width: '100%', minHeight: '300px' }}
        ></div>
      </div>
    </>
  )
}

// <--------------------------------< Main Function >-------------------------------->
export const MainPageView = (props) => {
  return (
    <div className="container m-4 text-center border">
      <h1>Main Page Diagram Ideas</h1>
      <MchartPie tokenData={TOKEN_DATA} goldData={GOLD_DATA} />
    </div>
  )
}
