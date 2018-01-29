import React from 'react'
import AppTitle from '../components/AppTitle'
import { connect } from 'react-redux'
import Grid from '../components/BeanUILibrary/Grid'
import GridItem from '../components/BeanUILibrary/GridItem'
import BarGraphCard from '../components/BarGraphCard'
import {
  selectAllDevices, selectAllLogsAsMap, selectAllLogsAsRequestsPerSecond,
  selectAllTimeranges
} from '../selectors/logEventSelector'
import CardWrapper from '../components/BeanUILibrary/CardWrapper'
import DeviceList from '../components/DeviceList'

class VizIoT extends React.Component {
  state = {
    isOpen: false
  }

  renderBarChartCards () {
    return this.props.devices.map((device, i) => {
      const {ip, port} = device
      const deviceKey = `${ip}:${port}`
      console.log(`deviceKey = ${deviceKey}`)

      const thisHistData = this.props.histogramLogs[deviceKey]
      const thisTimerange = this.props.timeranges[deviceKey]
      console.log('thisHistData')
      console.log(thisHistData)
      return (
        <GridItem
          key={deviceKey + i}
          size={{'xs': 12, 'md': 12, 'lg': 4}}
          space="p-right-6 p-bot-6">
          <BarGraphCard
            timerange={thisTimerange}
            device={device}
            data={thisHistData.map(({tally}) => {
              return tally
            })
            }/>
        </GridItem>
      )
    })
  }

  render () {
    const {devices} = this.props
    return (
      <div className="">
        <div className="tint-background">
          <div className="padded-container">
            <div className="medium-spacer"/>
            <AppTitle/>
            <div className="small-spacer"/>

            <Grid gutter={3}>
              <GridItem size={{'md': 12, 'lg': 2}}>
                <h6 className="wide-letter deviceList__title">DEVICES</h6>
                <CardWrapper noPadding={true}>
                  <DeviceList devices={devices}/>
                </CardWrapper>
              </GridItem>
              <GridItem size={{'md': 12, 'lg': 10}}>
                <h6 className="wide-letter deviceList__title">ACTIVITY<i className="material-icons">trending_up</i></h6>
                <Grid gutter={1}>
                  {this.renderBarChartCards()}
                </Grid>
              </GridItem>
            </Grid>
            <div className="large-spacer"/>
            <div className="large-spacer"/>
            <div className="large-spacer"/>
            <div className="large-spacer"/>
            <div className="large-spacer"/>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    devices: selectAllDevices(state),
    histogramLogs: selectAllLogsAsRequestsPerSecond(state),
    timeranges: selectAllTimeranges(state),
  }
}
export default connect(mapStateToProps)(VizIoT)