'use es6';

import React from 'react';
import BeanList from './BeanList';
import ListItem from './ListItem';
import Grid from './BeanUILibrary/Grid';
import TruncateString from './BeanUILibrary/TruncateString';
import moment from 'moment';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as theme from '../styles/base/viz-theme';
import CardWrapper from './BeanUILibrary/CardWrapper';

const FillHeightOrMore = styled(BeanList)`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: left;
  margin-top: 30px;

  .flex-row {
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
`;

const LeftWrapper = styled.div`
  padding: 0 0 0 17px;
  text-wrap: normal;
`;

const Content = styled.div`
  font-size: 1.36rem;
  font-weight: 600;
  font-style: italic;
  color: #23558edb;
  margin-top: -2px;
`;

const RightWrapper = styled.div`
  height: 100%;
  padding-left: 17px;
  padding-right: 17px;
  flex-direction: column;
  flex-shrink: 0;
  align-items: flex-start;
  font-size: 1.22rem;
  color: ${theme.LIGHTER_COLOR};
`;

const SmallCopy = styled.span`
  font-size: 1.1rem;
`;

const Card = styled(CardWrapper)`
  font-size: 1rem;
  
  ${props =>
    props.theme === 'log'
      ? `color: ${theme.OFF_BLACK};`
      : 'color: hsl(220, 20.7%, 55.8%);'}
  
  ${props =>
    props.theme === 'log' &&
    `
    border-top-right-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
    border-bottom-left-radius: 20px !important;
    border-top-left-radius: 8px !important;
  `}
  
  ${props => (props.theme === 'log' ? 'height: 4.1rem;' : 'height: 8.0rem;')}

  ${props =>
    props.theme === 'log' &&
    'background-color: rgb(255, 255, 255, 0.95) !important;'}
      
  ${props =>
    props.theme === 'log' && 'box-shadow: 0px 0px 10px #888 !important;'}
  
  .flex-row {
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
`;

const LightH5 = styled.h5`
  font-weight: 300 !important;
`;
const HostName = ({ name }) => name && <LightH5>{name}</LightH5>;

const HostList = ({ hosts }) => {
  let lastSeenHost = null;

  const hostItems = hosts.map((host, i) => {
    const itemToRender = (
      <ListItem key={host.timestamp + host.name}>
        <HostName
          name={lastSeenHost !== 'google-home-mini' && 'google-home-mini'}
        />
        <Card noPadding={true} theme={'log'}>
          <Grid>
            <LeftWrapper>
              {/*<SmallCopy>{host.origin || 'Unknown origin'}</SmallCopy>*/}
              <Content>{host.name}</Content>
            </LeftWrapper>
            <RightWrapper className="flex-center-parent">
              <div>
                <TruncateString className="deviceListItem__count m-right-1">
                  {moment.unix(host.timestamp).format('h:mm:ss')}
                </TruncateString>
                {/*<span>msg</span>*/}
              </div>
            </RightWrapper>
          </Grid>
        </Card>
      </ListItem>
    );

    lastSeenHost = 'google-home-mini';

    return itemToRender;
  });

  return <FillHeightOrMore>{hostItems}</FillHeightOrMore>;
};

HostList.defaultProps = { hosts: [] };
HostList.propType = {
  hosts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default HostList;
