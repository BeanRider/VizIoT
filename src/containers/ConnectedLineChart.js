'use es6';

import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import LineChart from '../components/LineChart';

const transformData = data => {
  if (data && data.length) {
    const catchUpSeconds = 2;
    return data.map(({ startMS, size: yData }) => {
      return {
        xData: moment
          .unix(startMS / 1000.0)
          .add(catchUpSeconds, 'seconds')
          .toDate(),
        yData,
      };
    });
  }
  return [];
};

export default connect((state, props) => {
  return {
    dataWindowSize: props.chartConfig.dataWindowSize,
    data: transformData(props.dataSelector(state)),
  };
})(LineChart);
