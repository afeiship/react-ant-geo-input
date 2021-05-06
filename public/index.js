import ReactDemokit from '@jswork/react-demokit';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactAntGeoInput from '../src/main';
import './assets/style.scss';

class App extends React.Component {
  render() {
    return (
      <ReactDemokit
        className="p-3 app-container"
        url="https://github.com/afeiship/react-ant-geo-input">
        <ReactAntGeoInput
          value={'武汉市江岸区塔子湖街道秋桂街108号锦绣家园馨竹苑2栋1单元705'}
          lat={140}
          lng={10}
          onChange={(e) => {
            console.log('e:', e.target.value);
          }}
        />
      </ReactDemokit>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
