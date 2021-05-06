import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import ReactAdminIcons from '@jswork/react-admin-icons';

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
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: noop
  };

  constructor(inProps) {
    super(inProps);
    const { lng, lat } = inProps;
    this.state = {
      lng,
      lat
    };
  }

  shouldComponentUpdate(inProps) {
    const { lng, lat } = inProps;
    if (lat !== this.state.lat || lng !== this.state.lng) {
      this.setState({ lng, lat });
    }
    return true;
  }

  handleSearch = (inValue) => {
    const { appKey, onChange } = this.props;
    const url = `https://apis.map.qq.com/ws/geocoder/v1/?address=${inValue}&key=${appKey}`;
    fetch(url).then((res) => {
      const { location } = res.result;
      onChange({
        target: { value: { ...location, address: inValue } }
      });
    });
  };

  render() {
    const {
      className,
      appKey,
      value,
      lng,
      lat,
      onChange,
      ...props
    } = this.props;
    const _lng = this.state.lng;
    const _lat = this.state.lat;
    return (
      <div
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}
        {...props}>
        <Input.Search
          placeholder="请录入地址"
          defaultValue={value}
          enterButton
          onChange={this.handleChange}
          onSearch={this.handleSearch}
        />
        <div className="is-lnglat">
          <Input readOnly value={_lng} name="lng" placeholder="经度" />
          <Input readOnly value={_lat} name="lat" placeholder="纬度" />
        </div>
      </div>
    );
  }
}
