'use es6';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  searchForDevice,
  selectDeviceDataSamplesByDeviceMac
} from 'VizIoT/selectors/deviceSelectors';
import SectionSubtitle from '../components/SectionSubtitle';
import SectionTitle from 'VizIoT/components/SectionTitle';
import { fetchDevices } from 'VizIoT/actionsRequest/deviceRequest';
import DeviceCollection from 'VizIoT/components/device/DeviceCollection';
import BTextInput from 'UIBean/BTextInput';
import BCheckBox from 'UIBean/BCheckBox';
import { selectDeviceToLiveSamples } from 'VizIoT/selectors/packetSelector';
import { selectSingleDeviceChartConfig } from 'VizIoT/selectors/chartSelectors';
import { IndividualSizeRoom } from 'VizIoT/socket/subscribe';
import { pushRealtimeIndividualVelocitySizeSample } from 'VizIoT/actions/packetActions';
import { useSocket } from 'UIBean/hooks/useSocket';
import { useTimedFetcher } from 'UIBean/hooks/useTimedFetcher';
import Flex, { FlexDirection } from 'UIBean/Flex';
import FlexChild from 'UIBean/FlexChild';
import FlexSize from 'UIBean/FlexSize';
import { getDataKey } from 'VizIoT/utility/DataKey';
import ConnectedLineChart from 'VizIoT/containers/ConnectedLineChart';
import { BucketRecord } from 'VizIoT/data/records/BucketConfig';
import BucketProperty from 'VizIoT/constants/BucketProperty';
import BucketUnit from 'VizIoT/constants/BucketUnit';
import SelectionMode from 'VizIoT/constants/DataReducerTypes';

const TitleContainer = styled.div`
`;

const PageBackground = styled.div`
  // background-image: linear-gradient(rgb(24, 23, 60) 3%, rgb(7, 92, 142));
  min-height: 700px; // page min height
  height: 100vh;
  overflow-y: scroll;
  
  // @keyframes example {
  //   0% {transform: translateY(-10px);}
  //   100% {transform: translateY(+10px);}
  // }
`;

const PageContent = styled.div`
  padding-top: 45px;
  padding-left: 7%;
  padding-right: 7%;
`;


const ConnectedDeviceCollection = connect((state, { searchValue }) => ({
  devices: searchForDevice(searchValue)(state),
  deviceToData: selectDeviceToLiveSamples(state), // todo throttle this.
  chartConfig: selectSingleDeviceChartConfig(state),
}))(DeviceCollection);

const DeviceOverview = () => {

  useSocket(IndividualSizeRoom, pushRealtimeIndividualVelocitySizeSample);
  useTimedFetcher(fetchDevices, 300000);

  const [searchValue, setSearchValue] = useState(null);

  return (
    <PageBackground>
      <PageContent>
        <TitleContainer className="m-tb-10">
          <SectionTitle title="Devices" size="lg" cardPadding={false}/>
          <SectionSubtitle text="Explore and analyze your device activities" margins={true}/>
        </TitleContainer>
        <BTextInput
          placeholder="Search 'fridge' or 'sensor'"
          onChange={e => { setSearchValue(e.target.value) }}
          inline
        />
        <BCheckBox title={'Map'} inline />
        <Flex direction={FlexDirection.ROW}>
          <FlexSize size={{ xs: 6 }}>
            <ConnectedDeviceCollection searchValue={searchValue} mode={'LIST'} />
          </FlexSize>
          <FlexSize size={{ xs: 6 }}>
            <ConnectedLineChart
              className="main-chart"
              dataSelector={selectDeviceDataSamplesByDeviceMac('B0:CE:18:27:9F:E4')}
              chartConfig={{
                bucketConfig: new BucketRecord({
                  bucketSize: 1,
                  bucketProps: [BucketProperty.ACTIVITY_COUNT],
                  bucketUnit: BucketUnit.SECOND,
                }),
                selectionMode: SelectionMode.COMBINED,
                dataWindowSize: 60,
              }}
              title={'A6:39:E1:79:59:B0'}
              subtitle={'BYTES / SEC'}
            />
          </FlexSize>
        </Flex>
      </PageContent>
    </PageBackground>
  );
};

DeviceOverview.propTypes = {
  deviceToData: PropTypes.objectOf({
    velocity: PropTypes.number,
    total: PropTypes.number,
  }),
};

export default DeviceOverview;
