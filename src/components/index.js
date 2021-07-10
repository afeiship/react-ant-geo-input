import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Tooltip, Input } from 'antd';
import md5 from 'blueimp-md5';
import ReactAdminIcons from '@jswork/react-admin-icons';

/*
https://lbs.qq.com/faq/serverFaq/webServiceKey
2. 签名计算(sig)：
请求路径+”?”+请求参数+SK进行拼接，并计算拼接后字符串md5值，即为签名(sig)：
要求：请求参数必须是未进行任何编码（如urlencode）的原始数据
md5("/ws/geocoder/v1?key=5Q5BZ-5EVWJ-SN5F3-*****&location=28.7033487,115.8660847SWvT26ypwq5Nwb5RvS8cLi6NSoH8HlJX")
*/

const CLASS_NAME = 'react-ant-geo-input';

export default class ReactAntGeoInput extends Component {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static propTypes = {
    /**
     * The extended className for component.
     */
    className: PropTypes.string,
    /**
     * The map appKey from `https://apis.map.qq.com/`.
     */
    appKey: PropTypes.string,
    /**
     * SecretKey from `https://lbs.qq.com/dev/console/application/mine`.
     */
    secretKey: PropTypes.string,
    /**
     * The changed value.
     */
    value: PropTypes.string,
    /**
     * The longtitude of the address.
     */
    lng: PropTypes.number,
    /**
     * The latitude of the address.
     */
    lat: PropTypes.number,
    /**
     * The change handler.
     */
    onChange: PropTypes.func,
    /**
     * The handler when has error caught.
     */
    onError: PropTypes.func,
    /**
     * If lat/lng should be editalbe.
     */
    readOnly: PropTypes.bool
  };

  static defaultProps = {
    onChange: noop,
    onError: noop,
    readOnly: false,
    appKey: '5Q5BZ-5EVWJ-SN5F3-K6QBZ-B3FAO-RVBWM',
    secretKey: 'SWvT26ypwq5Nwb5RvS8cLi6NSoH8HlJX'
  };

  constructor(inProps) {
    super(inProps);
    const { lng, lat, value } = inProps;
    this.state = {
      busy: false,
      value,
      lng,
      lat
    };
  }

  shouldComponentUpdate(inProps) {
    const { value, lng, lat } = inProps;
    if (lat !== this.state.lat) {
      this.setState({ lat });
    }
    if (lng !== this.state.lng) {
      this.setState({ lng });
    }
    if (value !== this.state.value) {
      this.setState({ value });
    }
    return true;
  }

  handleSearch = (inValue) => {
    const { appKey, secretKey, onChange, onError } = this.props;
    const path = `/ws/geocoder/v1?key=${appKey}&address=${inValue}`;
    const sig = md5(path + secretKey);
    const url = `/ws/geocoder/v1?key=${appKey}&address=${inValue}&sig=${sig}`;
    this.setState({ busy: true });
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        let location = { lat: 0, lng: 0 };
        if (res.status !== 0) {
          onError({ target: { value: 'nodata' } });
        } else {
          location = res.result.location;
        }
        this.setState(location);
        onChange({ target: { value: { ...location, value: inValue } } });
      })
      .finally(() => {
        this.setState({ busy: false });
      });
  };

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    const { name, value } = inEvent.target;
    this.setState({ [name]: parseFloat(value) || value }, () => {
      const { busy, ...theState } = this.state;
      onChange({ target: { value: theState } });
    });
  };

  render() {
    const {
      className,
      appKey,
      secretKey,
      value,
      lng,
      lat,
      readOnly,
      onChange,
      ...props
    } = this.props;
    const _lng = this.state.lng;
    const _lat = this.state.lat;
    const busy = this.state.busy;

    return (
      <div
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}
        {...props}>
        <Input.Search
          placeholder="请录入地址"
          defaultValue={value}
          enterButton
          name="value"
          loading={busy}
          onChange={this.handleChange}
          onSearch={this.handleSearch}
        />
        <div className="is-lnglat">
          <Input
            addonBefore={
              <Tooltip title="经度">
                <ReactAdminIcons value="component" />
              </Tooltip>
            }
            readOnly={readOnly}
            name="lng"
            onChange={this.handleChange}
            value={_lng}
            placeholder="经度"
          />
          <Input
            addonBefore={
              <Tooltip title="纬度">
                <ReactAdminIcons value="engine" />
              </Tooltip>
            }
            readOnly={readOnly}
            name="lat"
            value={_lat}
            onChange={this.handleChange}
            placeholder="纬度"
          />
        </div>
      </div>
    );
  }
}
