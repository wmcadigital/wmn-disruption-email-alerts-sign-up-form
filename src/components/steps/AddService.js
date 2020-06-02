/* eslint-disable react/button-has-type */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '../autocomplete/Autocomplete';
import { FormContext } from '../../FormContext';

import Icon from '../Icon';
import Bus from './service/Bus';
import SectionStepInfo from './SectionStepInfo';

function AddService({ setCurrentStep }) {
  const [triggered, setTriggered] = useState(null);
  const [formState, formDispatch] = useContext(FormContext);
  const [isSelectingServices, setIsSelectingServices] = useState(false)
  const { bus } = formState;
  const [hasSelectedBuses, setHasSelectedBuses] = useState(false);
  const backgroundColor = {
    backgroundColor: '#3c1053',
  };

  const onButtonClick = (e, type) => {
    e.preventDefault();
    setTriggered(type);
    setIsSelectingServices(true)
  };

  const handleSubmit = () => {
    setCurrentStep('Summary');
  };

  const handleRemove = (route) => {
    const filtered = bus.filter((busRoute) => {
      return busRoute.serviceNumber !== route;
    });
    formDispatch({
      type: 'RESET_SERVICES_BUS',
      payload: filtered,
    });
  };

  useEffect(() => {
    setHasSelectedBuses(bus.length > 0);
    setIsSelectingServices(false)
  }, [bus]);

  return (
    <div className="wmnds-col-1">
      <SectionStepInfo section="Section 2 of 2" description="Services" />
      <h2 className="">Add a service</h2>
      <p className="wmnds-col-2-3">
        You can sign up to as many services as you would like.
      </p>
      <p>You will receive an automatic email update for each disruption</p>
      {triggered !== null ? (
        <Autocomplete service={triggered} setTriggered={setTriggered} />
      ) : (
        <div>
          {hasSelectedBuses && (
            <>
              <h3 className="wmnds-fe-question">Services added</h3>
              <h4 className="wmnds-fe-question">Busses</h4>
            </>
          )}
          <div
            className={` ${
              hasSelectedBuses > 0 ? 'bdr-primary-bottom wmnds-m-b-xl' : ''
            }`}
          >
            {formState.bus &&
              formState.bus.map((busRoute) => {
                return (
                  <Bus
                    showRemove
                    handleRemove={handleRemove}
                    serviceNumber={busRoute.serviceNumber}
                    routeName={busRoute.routeName}
                    key={`${busRoute.serviceNumber}`}
                  />
                );
              })}
          </div>
          <button
            style={backgroundColor}
            className="wmnds-btn wmnds-col-1 wmnds-col-sm-auto wmnds-col-md-1-2 wmnds-m-r-lg wmnds-m-t-md"
            onClick={(e) => onButtonClick(e, 'bus')}
          >
            {`Add ${hasSelectedBuses ? 'another' : ''} bus service`}
            <Icon
              className="wmnds-btn__icon wmnds-btn__icon--right"
              iconName="general-expand"
            />
          </button>
        </div>
      )}
      {hasSelectedBuses > 0 && !isSelectingServices && (
        <button
          type="button"
          className="wmnds-btn wmnds-btn--disabled wmnds-col-1 wmnds-m-t-md"
          onClick={() => handleSubmit()}
        >
          Continue
        </button>
      )}
    </div>
  );
}

AddService.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
};

export default AddService;
