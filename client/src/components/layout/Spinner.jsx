import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <div>
    <img
      src={spinner}
      style={{
        width: '200px',
        margin: 'auto',
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      alt="Loading..."
    />
  </div>
);

export default Spinner;
