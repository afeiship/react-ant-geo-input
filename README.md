# react-ant-geo-input
> Geo input for react.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-ant-geo-input
```

## properties
| Name      | Type   | Required | Default                               | Description                                                       |
| --------- | ------ | -------- | ------------------------------------- | ----------------------------------------------------------------- |
| className | string | false    | -                                     | The extended className for component.                             |
| appKey    | string | false    | '5Q5BZ-5EVWJ-SN5F3-K6QBZ-B3FAO-RVBWM' | The map appKey from `https://apis.map.qq.com/`.                   |
| secretKey | string | false    | 'SWvT26ypwq5Nwb5RvS8cLi6NSoH8HlJX'    | SecretKey from `https://lbs.qq.com/dev/console/application/mine`. |
| value     | string | false    | -                                     | The changed value.                                                |
| lng       | number | false    | -                                     | The longtitude of the address.                                    |
| lat       | number | false    | -                                     | The latitude of the address.                                      |
| onChange  | func   | false    | noop                                  | The change handler.                                               |


## usage
1. import css
  ```scss
  @import "~@jswork/react-ant-geo-input/dist/style.css";

  // or use sass
  @import "~@jswork/react-ant-geo-input/dist/style.scss";

  // customize your styles:
  $react-ant-geo-input-options: ()
  ```
2. import js
  ```js
  import ReactDemokit from '@jswork/react-demokit';
  import React from 'react';
  import ReactDOM from 'react-dom';
  import ReactAntGeoInput from '@jswork/react-ant-geo-input';
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

  ```

## documentation
- https://afeiship.github.io/react-ant-geo-input/


## license
Code released under [the MIT license](https://github.com/afeiship/react-ant-geo-input/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-ant-geo-input
[version-url]: https://npmjs.org/package/@jswork/react-ant-geo-input

[license-image]: https://img.shields.io/npm/l/@jswork/react-ant-geo-input
[license-url]: https://github.com/afeiship/react-ant-geo-input/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-ant-geo-input
[size-url]: https://github.com/afeiship/react-ant-geo-input/blob/master/dist/react-ant-geo-input.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-ant-geo-input
[download-url]: https://www.npmjs.com/package/@jswork/react-ant-geo-input
