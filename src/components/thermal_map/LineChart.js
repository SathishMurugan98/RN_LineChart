import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
  Chart,
  VerticalAxis,
  HorizontalAxis,
  Line,
} from 'react-native-responsive-linechart';
const LineChart = () => {
  const data1 = [
    {x: -2, y: 1},
    {x: -1, y: 0},
    {x: 8, y: 13},
    {x: 9, y: 11.5},
    {x: 10, y: 12},
    {x: 12, y: 15},
    {x: 14, y: 10},
    {x: 16, y: 12},
    {x: 18, y: 7},
    {x: 20, y: 12},
    {x: 22, y: 13.5},
    {x: 24, y: 18},
  ];

  const data2 = [
    {x: -2, y: 15},
    {x: -1, y: 10},
    {x: 0, y: 12},
    {x: 1, y: 7},
    {x: 8, y: 12},
    {x: 9, y: 13.5},
    {x: 10, y: 18},
    {x: 12, y: 15},
    {x: 14, y: 10},
    {x: 16, y: 12},
    {x: 18, y: 7},
    {x: 20, y: 12},
    {x: 22, y: 13.5},
    {x: 24, y: 18},
  ];
  return (
    <ScrollView horizontal={true}>
      <View>
        <Text>Sathishkumar</Text>
      </View>
      <Chart
        style={{
          height: 400,
          width: 700,
          backgroundColor: '#e23988',
          marginLeft: -100,
        }}
        xDomain={{min: -2, max: 26}}
        yDomain={{min: -2, max: 20}}
        padding={{left: 40, top: 30, bottom: 30, right: 30}}>
        <VerticalAxis tickValues={[0, 4, 8, 12, 16, 20]} />
        <HorizontalAxis
          tickValues={[-2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26]}
        />
        <Line
          data={data1}
          smoothing="none"
          theme={{stroke: {color: 'green', width: 1}}}
        />
        <Line
          data={data2}
          smoothing="cubic-spline"
          theme={{stroke: {color: 'blue', width: 1}}}
        />
      </Chart>
    </ScrollView>
  );
};

export default LineChart;
