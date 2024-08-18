import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react';
// @ts-ignore
import * as echarts from '../ec-canvas/echarts';
import EcCanvasTaro, { ECObj } from '../ec-canvas';

interface BaseChartProps {
    canvasId: string;
    onInit?: (instance: any) => void;
    onClick?: (params: unknown) => void;
    onDblclick?: (params: unknown) => void;
    onMousewheel?: (params: unknown) => void;
    onMouseout?: (params: unknown) => void;
    onMouseup?: (params: unknown) => void;
    onMousemove?: (params: unknown) => void;
    onMousedown?: (params: unknown) => void;
}
export interface BaseChartRef {
    init: (option: any) => void;
    setOption: (option: any) => void;
}
export default forwardRef<BaseChartRef, BaseChartProps>(function BaseChart(
    {
        canvasId,
        onClick,
        onDblclick,
        onMousewheel,
        onMouseout,
        onMouseup,
        onMousemove,
        onMousedown,
        onInit,
    }: BaseChartProps,
    ref,
) {
    const [ec] = useState<ECObj>({ lazyLoad: true });
    const EcCanvasTaroRef = useRef<any>();
    const chartRef = useRef<any>();
    const init = (option: any) => {
        EcCanvasTaroRef.current.init((canvas, width, height, canvasDpr) => {
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: canvasDpr,
            });
            chartRef.current = chart;
            canvas.setChart(chart);
            chart.setOption(option);
            chart.on('click', (params: unknown) => onClick?.(params));
            chart.on('dblclick', (params: unknown) => onDblclick?.(params));
            chart.on('mousewheel', (params: unknown) => onMousewheel?.(params));
            chart.on('mouseout', (params: unknown) => onMouseout?.(params));
            chart.on('mouseup', (params: unknown) => onMouseup?.(params));
            chart.on('mousedown', (params: unknown) => onMousedown?.(params));
            chart.on('mousemove', (params: unknown) => onMousemove?.(params));
            onInit?.(chart);
            return chart;
        });
    };
    const setOption = (option: any) => {
        if (!chartRef.current) return;
        chartRef.current.setOption(option);
    };
    useImperativeHandle(ref, () => ({ init, setOption }));
    return <EcCanvasTaro ref={EcCanvasTaroRef} canvasId={canvasId} ec={ec} />;
});

/*

class BaseChart extends Component<BaseChartProps, BaseChartState> {
  state = {
    ec: {
      lazyLoad: true,
    },
  };

  chart = createRef<any>();

  refresh = (data: any) => {
    this.chart.current.init((canvas, width, height, canvasDpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: canvasDpr,
      });
      canvas.setChart(chart);
      chart.setOption(data);

      chart.on('click', (params: unknown) => this.props.onClick?.(params));
      chart.on('dblclick', (params: unknown) => this.props.onDblclick?.(params));
      chart.on('mousewheel', (params: unknown) => this.props.onMousewheel?.(params));
      chart.on('mouseout', (params: unknown) => this.props.onMouseout?.(params));
      chart.on('mouseup', (params: unknown) => this.props.onMouseup?.(params));
      chart.on('mousedown', (params: unknown) => this.props.onMousedown?.(params));
      chart.on('mousemove', (params: unknown) => this.props.onMousemove?.(params));

      return chart;
    });
  };

  render() {
    const { canvasId } = this.props;
    return <EcCanvasTaro ref={this.chart} canvasId={canvasId} ec={this.state.ec} />;
  }
}

export default BaseChart;

*/
