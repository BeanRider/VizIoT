'use es6';

import keyMirror from 'keymirror';

export const tabKeys = keyMirror({
  LOGGER: null,
  OVERVIEW: null,
  DEVICES: null,
  TIME: null,
  DESTINATIONS: null,
});

export const Tabs = {
  [tabKeys.LOGGER]: {
    key: tabKeys.LOGGER,
    title: 'Logger',
    path: '/logger',
  },
  [tabKeys.OVERVIEW]: {
    key: tabKeys.OVERVIEW,
    title: 'Overview',
    path: '/overview',
  },
  [tabKeys.DEVICES]: {
    key: tabKeys.DEVICES,
    title: 'Devices',
    path: '/devices',
  },
  [tabKeys.TIME]: {
    key: tabKeys.TIME,
    title: 'Time',
    path: '/time',
  },
  [tabKeys.DESTINATIONS]: {
    key: tabKeys.DESTINATIONS,
    title: 'Destinations',
    path: '/destinations',
  },
};

export const getTabByPath = path => {
  const key = Object.keys(tabKeys).filter(k => Tabs[k].path === path);
  return Tabs[key];
};

const tabOrder = [tabKeys.OVERVIEW, tabKeys.DEVICES, tabKeys.GEOGRAPHY];
