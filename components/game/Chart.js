import React, { useEffect } from 'react'
import { useState } from 'react';
import { 
    View, 
    Text, 
    Dimensions 
} from 'react-native';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit'
import GameState from '../../js/GameState';


/*
total asset value
real estate
stocks
expense value 
cash

view 

*/

 
  
  const Chart = (props) => {
    const player = GameState.players[GameState.currentPlayer]
    const { name } = props

    const [ lineData, setLineData] = useState([]);

    const line = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
        datasets: [
          {
            data: !player ? [] : lineData,
            strokeWidth: 2, // optional
            withDots: false,

          },
        ],
      };

      const chartConfig = {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 5
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
            }
      }

      useEffect(()=>{
        if(player){
          if (name === 'Cash') {
            setLineData(player.chartData.cash)
          } else 
          if (name === 'Payday') {
            setLineData(player.chartData.payday)
          }
        } 
      })

      return (
        <View>
            <Text>
                {name}
            </Text>
            <LineChart
                data={line}
                width={Dimensions.get('window').width * .75}
                height={150}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1}
                chartConfig={chartConfig}
                style={{
                    marginVertical: 8,
                    borderRadius: 5,
                    width: '90%',
                }}
            />
            
      </View>
      )
  }
  
  
  export default Chart
  