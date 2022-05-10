import React, { /*CSSProperties, */ SFC } from 'react';
// const loading = require('./loading.svg');
import { Redirect } from 'react-router-dom';
export interface CallbackProps {}

const Callback: SFC<CallbackProps> = props => {
  // const style: CSSProperties = {
  //   position: 'absolute',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   height: '100vh',
  //   width: '100vw',
  //   top: 0,
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   backgroundColor: 'white',
  // };

  return (
    <Redirect to="/home" />
  );
};
export default Callback;
