'use es6';

import * as R from 'ramda';
import { mapped } from 'ramda-lens'
import immLens from 'VizIoT/data/immLens';

// Lens

export const devices = R.lensProp('devices');

export const deviceList = R.compose(devices, R.lensProp('deviceList')); // note: lenses should be in left to right order.
export const deviceListValue = R.compose(deviceList, R.lensProp('value'));

export const idList = R.compose(deviceListValue, mapped, immLens('_id'));
export const nameList = R.compose(deviceListValue, mapped, immLens('name'));
export const count = R.compose(deviceListValue, R.lensProp('size'));
