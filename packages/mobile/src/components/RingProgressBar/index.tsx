import React, { useEffect, useState } from 'react';
import { Canvas } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { DPR } from '@/utils';
import styles from './index.module.scss';
import { useInterval } from 'ahooks';

const size = 480;

const clear = (ctx: any) => {
  ctx.beginPath();
  ctx.fillStyle = 'transparent';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.clearRect(0, 0, size, size);
  ctx.closePath();
};
const drawArc = (
  ctx: any,
  startAngle: number,
  endAngle: number,
  color: string,
  x: number,
  y: number,
  radius: number
) => {
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = color;
  ctx.arc(x, y, radius, startAngle, endAngle, false);
  ctx.stroke();
  ctx.closePath();
};
const startAngle = (157.5 / 180) * Math.PI;
const endAngle = percent => percent * (225 / 180) * Math.PI + startAngle;
/*
 * 弧形进度条 -  封装方法
 * id: canvas-id
 * dp: 设备像素比，通过获取设备信息计算出来
 * color: 进度条颜色
 */
const draw = (ctx: any, percent: number, color: string) => {
  const x = (size / 2) * DPR;
  const y = (size / 2) * DPR;
  const radius = ((size - 40) / 2) * DPR;
  clear(ctx);
  drawArc(ctx, startAngle, endAngle(1), '#ECEEF3', x, y, radius);
  if (percent > 0) {
    drawArc(ctx, startAngle, endAngle(percent), color, x, y, radius);
  }
};

export function RingProgressBar({ percent }: { percent: number }) {
  useEffect(() => {
    Taro.nextTick(() => {
      Taro.createSelectorQuery()
        .select('#ringProgressBar')
        .fields({ node: true, size: true })
        .exec(res => {
          if (!res[0]) return;
          const canvas = res[0].node;
          canvas.width = size * DPR;
          canvas.height = size * DPR;
          const ctx = canvas.getContext('2d');
          draw(ctx, percent, '#FF8952');
        });
    });
  }, [percent]);
  return (
    <Canvas
      className={styles.canvas}
      canvasId="ringProgressBar"
      id="ringProgressBar"
      type="2d"
      disableScroll
    ></Canvas>
  );
}
const step = 0.001;
const time = 1000 / 60;
export function useRingProgressBar(initPercent = 0.5) {
  const [curPercent, setCurPercent] = useState(initPercent);
  const [percent, _setPercent] = useState(initPercent);
  const setPercent = (v: number) => {
    v = Math.min(v, 1);
    v = Math.max(v, 0);
    _setPercent(v);
  };
  useInterval(
    () => {
      const flag = curPercent > percent ? -1 : 1;
      let next = curPercent + flag * step;
      if ((curPercent > percent && next < percent) || (curPercent < percent && next > percent))
        next = percent;
      setCurPercent(next);
    },
    curPercent === percent ? undefined : time
  );
  return {
    percent,
    setPercent,
    tag: <RingProgressBar percent={curPercent} />,
  };
}
