import React, { PureComponent } from "react";
import { Text, Button, View, ScrollView } from "react-native";
import { Chart, VerticalAxis, HorizontalAxis, Line, Area, Tooltip } from 'react-native-responsive-linechart'
import * as dateFns from 'dat'

class Charts extends PureComponent {
  render() {
    return (
          <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            <Chart
              style={{ height: 300, width: '100%', marginTop: 100 }}
              data={[
                { x: -2, y: 1 },
                { x: -1, y: 0 },
                { x: 8, y: 13 },
                { x: 9, y: 11.5 },
                { x: 10, y: 12 },
                { x: 12, y: 15 },
                { x: 14, y: 10 },
                { x: 16, y: 12 },
                { x: 18, y: 7 },
                { x: 20, y: 12 },
                { x: 22, y: 13.5 },
                { x: 24, y: 18 },
              ]}
              padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
              xDomain={{ min: 0, max: 100 }}
              yDomain={{ min: -4, max: 20 }}
            >
              <VerticalAxis
                tickCount={10}
                theme={{
                  axis: { stroke: { color: '#aaa', width: 2 } },
                  ticks: { stroke: { color: '#aaa', width: 2 } },
                  labels: { formatter: (v) => v.toFixed(2) },
                }}
              />
              <HorizontalAxis
                tickCount={5}
                // theme={{
                //   axis: { stroke: { color: '#aaa', width: 2 } },
                //   ticks: { stroke: { color: '#aaa', width: 2 } },
                //   labels: { label: { rotation: 50 }, formatter: Math.round },
                // }}
              />
              <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } } }} />
              <Line theme={{ stroke: { color: 'red', width: 1 } }} 
                tooltipComponent={
                  <Tooltip theme={{ formatter: ({ y }) => y.toFixed(2) }} />
                } />
            </Chart>
          </View>
          
    );
  }
}

export default Charts;