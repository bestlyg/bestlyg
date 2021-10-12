---
title: 通过点击事件获取WebGL定位
nav:
  title: 个人博客
  path: /blogs
  order: 1
group:
  title: WebGL
  path: /webgl
  order: 3
---

# 通过点击事件获取 WebGL 定位

## 差异

### CANVAS DOM

- 原点：DOM 元素的左上角
- 1 个单位：1 个像素
- x 轴：水平向右
- y 轴：水平向下

### WEBGL

- 原点：CANVAS 中心点
- 1 个单位的宽：canvas 宽度的一半
- 1 个单位的长：canvas 长度的一半
- x 轴：水平向右
- y 轴：水平向上
- z 轴：水平向屏幕外

## 转换方法

1. 监听 canvas 元素的点击事件
1. 触发点击事件后获取参数
   - **clientX** 鼠标基于浏览器左上角的水平像素距离
   - **clientY** 鼠标基于浏览器左上角的垂直像素距离
1. 通过 canvas 元素获取参数
   - **top** dom 元素基于浏览器左上角的垂直像素距离
   - **left** dom 元素基于浏览器左上角的水平像素距离
   - **width** dom 元素的宽
   - **height** dom 元素的高
1. 计算鼠标基于 DOM 左上角的参数
   - **x = clientX - left** 鼠标基于 DOM 左上角的水平像素距离
   - **y = clientY - top** 鼠标基于 DOM 左上角的垂直像素距离
1. 转化为在 webgl 中的参数
   - **x = (x - width) / width**
   - **y = -(y - height) / height** y 轴方向要取反
