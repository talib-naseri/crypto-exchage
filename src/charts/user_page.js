import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import * as am5radar from '@amcharts/amcharts5/radar'
import { useEffect, useLayoutEffect, useState } from 'react'

const TEST_DATA = {
  minValue: 100,
  maxValue: 200,
  currentValue: 149,
}

const MchartGauge = ({ userInput, data }) => {
  useLayoutEffect(() => {
    let root = am5.Root.new('chartdiv2')

    root.setThemes([am5themes_Animated.new(root)])

    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        startAngle: -180,
        endAngle: 0,
        innerRadius: -20,
        layout: root.verticalLayout,
      }),
    )

    // ====> Measurement #1
    const axisRenderer = am5radar.AxisRendererCircular.new(root, {
      strokeOpacity: 0.1,
      minGridDistance: 100,
    })

    axisRenderer.labels.template.setAll({
      radius: 15,
    })

    const axis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: data.minValue,
        max: data.maxValue,
        strictMinMax: true,
        renderer: axisRenderer,
      }),
    )

    const createRange = (start, end, color, label) => {
      const rangeDataItem = axis.makeDataItem({
        value: start,
        endValue: end,
      })

      debugger

      const range = axis.createAxisRange(rangeDataItem)

      rangeDataItem.get('axisFill').setAll({
        visible: true,
        fill: color,
        fillOpacity: 0.8,
      })

      rangeDataItem.get('tick').setAll({
        visible: false,
      })

      // rangeDataItem.get('label').setAll({
      //   text: label,
      //   inside: true,
      //   radius: 5,
      //   fontSize: '0.9em',
      //   fill: am5.color(0xffffff),
      // })
    }

    createRange(data.minValue, data.currentValue, am5.color(0x297373), 'Safe')

    if (userInput) {
      createRange(
        data.currentValue,
        data.currentValue + +userInput,
        am5.color(0xf33107),
        'Warning',
      )
    }

    createRange(
      data.currentValue + +userInput,
      data.maxValue,
      // am5.color(0x297373),
      am5.color(0xff621f),
      'Danger',
    )

    return () => {
      root.dispose()
    }
  }, [userInput])

  return (
    <>
      <h3>Gauge Chart (mchart)</h3>
      <div>Min: {data.minValue}</div>
      <div>Current: {data.currentValue}</div>
      <div>Max: {data.maxValue}</div>
      <div>userInput: {userInput}</div>
      <div
        id="chartdiv2"
        className="border"
        style={{ width: '100%', height: 400 }}
      ></div>
    </>
  )
}

export const UserPageView = (props) => {
  const [userInput, setUserInput] = useState('')
  const [stateData, setStateData] = useState({ ...TEST_DATA })
  const maxFixer = 50
  const maxDistance = 150

  const handleChange = (event) => {
    const value = event.target.value
    const allocatedValue = Number(value) + stateData.currentValue

    if (stateData.maxValue - allocatedValue > maxDistance) {
      setStateData({ ...stateData, maxValue: allocatedValue + maxFixer })
    }

    if (allocatedValue >= stateData.maxValue) {
      setStateData({ ...stateData, maxValue: allocatedValue + maxFixer })
    }

    setUserInput(value)
  }
  return (
    <div className="container m-4 text-center border">
      <h1>User Page Diagram Ideas</h1>
      <input value={userInput} onChange={handleChange} type="Number"></input>
      <MchartGauge userInput={userInput} data={stateData} />
    </div>
  )
}
