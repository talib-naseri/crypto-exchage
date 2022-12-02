import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive'
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

    root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)])

    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        startAngle: -180,
        endAngle: 0,
        layout: root.verticalLayout,
      }),
    )

    chart.getNumberFormatter().set("numberFormat", "#.0a");

    // ====> Measurement #1
    const axisRenderer = am5radar.AxisRendererCircular.new(root, {
      strokeOpacity: 0.1,
      minGridDistance: 100,
    })

    // axisRenderer.labels.template.setAll({
    //   radius: 15,
    // })

    axisRenderer.grid.template.setAll({
      visible: false,
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

    // ====> create range
    const createRange = (start, end, color, innerRadius, label = null) => {
      const rangeDataItem = axis.makeDataItem({
        value: start,
        endValue: end,
      })

      const range = axis.createAxisRange(rangeDataItem)

      rangeDataItem.get('axisFill').setAll({
        visible: true,
        fill: color,
        fillOpacity: 0.8,
        innerRadius,
      })

      rangeDataItem.get('tick').setAll({
        visible: false,
      })

      if (label) {
        rangeDataItem.get('label').setAll({
          text: label,
          inside: true,
          radius: innerRadius / -2 - 5,
          fontSize: '0.9em',
          fill: am5.color(0xffffff),
        })
      }
    }

    createRange(data.minValue, data.currentValue, '#3e4ab8', -40)

    if (userInput) {
      createRange(
        data.currentValue,
        data.currentValue + +userInput,
        '#7880cd',
        -35,
        userInput,
      )
    }

    createRange(data.currentValue + +userInput, data.maxValue, '#b2b7e3', -20)

    // ====> create hands
    const createLabel = (x, y, value, bgColor) => {
      chart.seriesContainer.children.push(
        am5.Label.new(root, {
          fill: '#ffffff',
          x: x,
          y: y,
          centerX: am5.percent(50),
          textAlign: 'center',
          centerY: am5.percent(0),
          fontWeight: 'bold',
          fontSize: '1.5rem',
          text: `${value}`,
          background: am5.RoundedRectangle.new(root, {
            fill: '#3e4ab8',
          }),
        }),
      )
    }

    createLabel(0, -60, data.currentValue, '#19F307')
    // createLabel(0, -40, 600, '#9fb7ea')

    // ====> create hands
    const createHand = (value, color) => {
      const handDataItem = axis.makeDataItem({
        value,
      })

      const hand = handDataItem.set(
        'bullet',
        am5xy.AxisBullet.new(root, {
          sprite: am5radar.ClockHand.new(root, {
            radius: am5.percent(90),
            innerRadius: am5.percent(70),
          }),
        }),
      )

      hand.get('sprite').pin.setAll({
        forceHidden: true,
      })

      hand.get('sprite').hand.setAll({
        fill: color,
        fillOpacity: 0.9,
      })

      axis.createAxisRange(handDataItem)

      return hand
    }

    createHand(data.currentValue, '#3e4ab8')
    if (userInput) {
      createHand(+userInput + data.currentValue, '#7880cd')
    }

    return () => {
      root.dispose()
    }
  }, [userInput])

  return (
    <>
      <h3>Gauge Chart (mchart)</h3>
      <div>Start Value: {data.minValue}</div>
      <div>Current Value: {data.currentValue}</div>
      <div>End Value: {data.maxValue}</div>
      <div>User Input: {userInput}</div>
      <div
        id="chartdiv2"
        className="border"
        style={{ width: '100%', height: 500 }}
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
