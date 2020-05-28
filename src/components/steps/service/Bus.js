import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import style from './Bus.module.scss';

function Bus(props) {
  const { serviceNumber, routeName, handleRemove } = props;
  const onClick = () => {
    console.log('remove');
    handleRemove(serviceNumber);
  };
  return (
    <div className={`${style.serviceWrapper} wmnds-m-b-md`}>
      <div
        className={`wmnds-disruption-indicator-medium
        wmnds-col-auto wmnds-m-r-md`}
      >
        {serviceNumber}
      </div>
      <strong className="wmnds-col-auto">{routeName}</strong>
      <button
        type="button"
        className={style.removeBtn}
        onClick={() => {
          onClick();
        }}
      >
        <Icon
          iconName="general-cross"
          className={`general-cross ${style.closeIcon}`}
        />
      </button>
    </div>
  );
}
Bus.propTypes = {
  serviceNumber: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};

export default Bus;