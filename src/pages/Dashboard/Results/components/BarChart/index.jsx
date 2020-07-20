import React from 'react';
import PropTypes from 'prop-types';
import {ResponsiveBar} from '@nivo/bar';

const BarChart = ({data, keys}) => {
  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy="name"
      margin={{top: 50, right: 130, bottom: 50, left: 60}}
      padding={0.3}
      colors={{scheme: 'paired'}}
      borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
      animate
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  keys: PropTypes.array.isRequired,
};

export default BarChart;
