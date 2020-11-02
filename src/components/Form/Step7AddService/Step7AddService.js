import React, { useContext } from 'react';
import Button from 'components/shared/Button/Button';
// import { getNodeText } from '@testing-library/react';
import { FormDataContext } from '../../../globalState/FormDataContext';
// Import components
import SectionStepInfo from '../../shared/SectionStepInfo/SectionStepInfo';
import AddBusService from './AddBusService/AddBusService';
import AddTramService from './AddTramService/AddTramService';
import AddTrainService from './AddTrainService/AddTrainService';

function Step7AddService() {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { BusServices, TramServices, TrainServices } = formDataState.formData;

  const getNextStep = (incrementAmount) => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: formDataState.currentStep + incrementAmount,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        return false;
      }}
    >
      <div>
        {/* Subsection */}
        <SectionStepInfo section="Section 2 of 2" description="Services" />
        <h2 className="wmnds-col-1 wmnds-col-lg-4-5">Add a service</h2>
        <p className="wmnds-col-1 wmnds-col-lg-4-5">
          We’ll send an automatic disruption alert for each service you add.
        </p>

        <AddBusService />

        <AddTramService />

        <AddTrainService />

        {/* Continue button */}
        {((BusServices && BusServices.length > 0) ||
          (TramServices && TramServices.length > 0) ||
          (TrainServices && TrainServices.length > 0)) && (
          <Button
            btnClass="wmnds-btn wmnds-col-1 wmnds-m-t-xl"
            type="submit"
            text="Continue"
            onClick={() => {
              getNextStep(2);
            }}
          />
        )}
      </div>
    </form>
  );
}

export default Step7AddService;