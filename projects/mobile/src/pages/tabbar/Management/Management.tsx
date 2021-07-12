import { View } from '@tarojs/components';
import React, { useRef, useEffect } from 'react';
import { EChart } from 'echarts-taro3-react';
import './Management.scss';

const defautOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(220, 220, 220, 0.8)',
      },
    },
  ],
};
export default function Management() {
  const barChart = useRef<EChart | null>();
  useEffect(() => {
    console.log(barChart);
    barChart.current?.refresh(defautOption);
  }, []);
  return (
    <View>
      <EChart ref={chart => (barChart.current = chart)} canvasId="canvas" />
    </View>
  );
}
