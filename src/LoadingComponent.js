import React from 'react';
import './lg.css';

class LoadingComponent extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }
}

export default LoadingComponent;
