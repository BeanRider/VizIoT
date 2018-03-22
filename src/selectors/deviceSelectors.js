// Returns a list of device objects
import AnalyticsRequest from '../data/records/AnalyticsRequest';
import { ConnectionMetric } from '../data/metrics/ConnectionMetric';
import DataReducerTypes from '../constants/DataReducerTypes';
import { convertDateTypeToString } from '../utility/TimeUtility';
import { DateConstants } from '../constants/DateConstants';
import GeoDimension from '../data/dimensions/GeoDimension';

export const selectDeviceList = ({ devices: { deviceList: { value } } }) => {
  return value;
};

export const selectNumberOfDevices = state => {
  let deviceList = selectDeviceList(state);
  return deviceList ? deviceList.length : 0;
};

export const selectEntireNetwork = ({ devices: { entireNetwork } }) => {
  return entireNetwork;
};

/**
 * Returns a map of device.macAddr -> last seen
 */
export const selectLastSeen = ({ devices: { lastSeen: { value } } }) => {
  return value;
};

export const selectNumberOfConnections = ({
  devices: { numberOfConnections: { value } },
}) => {
  return value;
};

export const selectPercentUnsecuredToday = state => {
  // const { analytics } = state;
  // const key = new AnalyticsRequest({
  //   dimensions: [],
  //   metrics: [ConnectionMetric.PERCENT_SECURED],
  //   reducer: DataReducerTypes.INDIVIDUAL,
  //   startTime: convertDateTypeToString[DateConstants.TODAY](),
  //   endTime: convertDateTypeToString[DateConstants.NOW](),
  // }).hashCode();

  // const percentSecured = analytics.values[key].report.data.rows.metrics[0];
  return '~';
};

export const selectMostPopularHost = state => {
  // const { analytics } = state;
  // const key = new AnalyticsRequest({
  //   dimensions: [GeoDimension.DOMAIN],
  //   metrics: [ConnectionMetric.HITS],
  //   reducer: DataReducerTypes.INDIVIDUAL,
  //   startTime: convertDateTypeToString[DateConstants.TODAY](),
  //   endTime: convertDateTypeToString[DateConstants.NOW](),
  // }).hashCode();

  // const rows = analytics.values[key].report.data.rows;
  // const mostPopularDomain = rows.reduce(
  //   (acc, { dimensions, metrics }) => {
  //     const { hits } = acc;
  //     if (metrics[0] > hits) {
  //       return {
  //         domainName: dimensions[0],
  //         hits,
  //       }
  //     }
  //     return acc;
  //   },
  //   { domainName: '~', hits: 0 }
  // );
  return '~';
};

export const selectBusiestDevice = state => {
  const map = selectNumberOfConnections(state);
  const mostPopularEntry = Object.keys(map).reduce(
    (acc, k) => {
      let value = map[k];
      if (value > acc.value) {
        return {
          name: k,
          value,
        };
      }
      return acc;
    },
    { name: '~', value: 0 }
  );
  return mostPopularEntry;
};