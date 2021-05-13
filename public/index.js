import ReactDemokit from '@jswork/react-demokit';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactAntGeoInput from '../src/main';
import './assets/style.scss';

class App extends React.Component {
  state = {
    value: '上海市浦东新区博云路2号浦软大厦5楼',
    lat: 31.202328,
    lng: 121.603882
  };

  render() {
    const { value, lat, lng } = this.state;
    return (
      <ReactDemokit
        className="p-3 app-container"
        url="https://github.com/afeiship/react-ant-geo-input">
        <ReactAntGeoInput
          value={value}
          lat={lat}
          lng={lng}
          onChange={(e) => {
            this.setState(e.target.value);
            console.log('e:', e.target.value);
          }}
        />
      </ReactDemokit>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
