'use strict';



/**
 * import json data
 */

import data from './data.json' assert {type: 'json'};



/**
 * -> select all DOM elements
 */

const tooltip = document.querySelector("[data-tooltip]");
const chartBars = document.querySelectorAll("[data-chart-bar]");



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * -> get the max day amount from data
 */

let maxDayAmount = 0;

for (let i = 0; i < data.length; i++) {
  if (data[i].amount > maxDayAmount) {
    maxDayAmount = data[i].amount;
  }
}



/**
 * -> get chart bars height as array
 * -> set the height of all bars in chart
 */

const setChartBarsHeight = function (height) {
  for (let i = 0; i < height.length; i++) {
    chartBars[i].style.transform = `scaleY(${height[i] / 100})`;
  }
}



/**
 * -> get the day amount from data
 * -> find the percentage of every number
 * -> push all number in chartBarsHeight
 */

const charBarsHeight = [];

for (let i = 0; i < data.length; i++) {
  const dayAmount = data[i].amount;
  const percentOfNum = dayAmount / maxDayAmount * 100;
  charBarsHeight.push(percentOfNum);
}

setChartBarsHeight(charBarsHeight);



/**
 * -> get top, left, and chart bar width
 * -> get tooltip height
 * -> set the gap between chart bar and tooltip
 * -> set the tooltip position
 */

const setTooltipPos = function (top, left, chartBarWidth) {
  const tooltipHeight = tooltip.offsetHeight;
  const gap = 8;

  tooltip.style.top = `${top - tooltipHeight - gap}px`;
  tooltip.style.left = `${left + chartBarWidth / 2}px`;
}



/**
 * when chart bar is hover
 * -> add active class in tooltip
 * -> get chart bar top position from window
 * -> get chart bar left position from window
 * -> get chart bar width
 * -> call setTooltipPos and pass the chart bar top, 
 *    left position and width
 */

const chartBarOnHover = function () {
  tooltip.classList.add("active");

  const barTopPos = this.getBoundingClientRect().top;
  const barLeftPos = this.getBoundingClientRect().left;
  const barWidth = this.offsetWidth;

  setTooltipPos(barTopPos, barLeftPos, barWidth);
}

addEventOnElem(chartBars, "mouseover", chartBarOnHover);



/**
 * -> hide tooltip when leave cursor from chart bar
 */

const hideTooltip = function () {
  tooltip.classList.remove("active");
}

addEventOnElem(chartBars, "mouseleave", hideTooltip);



/**
 * -> add tooltip value when hover on any bar chart
 */

const addTooltipValue = function () {
  for (let i = 0; i < data.length; i++) {
    if (data[i].day === this.dataset.chartBar) {
      tooltip.innerHTML = data[i].amount.toString();
      break;
    }
  }
}

addEventOnElem(chartBars, "mouseover", addTooltipValue);