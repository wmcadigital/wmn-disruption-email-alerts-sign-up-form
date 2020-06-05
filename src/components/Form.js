/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext } from 'react';
import { useForm, FormContext } from 'react-hook-form';
import { FormContextStore } from '../globalState/FormDataContext';
import Step1Name from './steps/Step1Name/Step1Name';
import Email from './steps/Email';
// import AddService from './steps/AddService';
// import Summary from './steps/Summary';
// import Success from './steps/Success';
// import Error from './steps/Error';

import style from './Form.module.scss';

const Form = () => {
  const [internalFormState] = useContext(FormContextStore);
  const methods = useForm({
    mode: 'onBlur',
  }); // Trigger validation onBlur events (config for react hook form lib)
  const { currentStep } = internalFormState;
  const [currentStepState, setCurrentStep] = useState('FullName');
  const handleGoBack = () => {
    if (currentStep === 'Email') {
      return setCurrentStep('FullName');
    }
    if (currentStep === 'AddService') {
      return setCurrentStep('Email');
    }
    if (currentStep === 'Summary') {
      return setCurrentStep('AddService');
    }
  };
  const STEPS = {
    1: <Step1Name />,
    2: <Email setCurrentStep={setCurrentStep} />,
    // AddService: <AddService setCurrentStep={setCurrentStep} />,
    // Summary: <Summary setCurrentStep={setCurrentStep} />,
    // Success: <Success />,
    // Error: <Error />,
  };

  return (
    <FormContext {...methods}>
      <div className="wmnds-col-1 wmnds-col-md-3-4">
        {currentStepState !== 'FullName' &&
        currentStepState !== 'Success' &&
        currentStepState !== 'Error' ? (
          <button
            type="button"
            className={`${style.asLink} wmnds-link wmnds-m-b-sm`}
            onClick={() => {
              handleGoBack();
            }}
          >
            Back
          </button>
        ) : null}
        <div
          className={` ${
            currentStepState !== 'Success' && currentStepState !== 'Error'
              ? `${style.formWrapper} wmnds-p-lg`
              : ''
          }`}
        >
          {/* <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          autoComplete="on"
        > */}
          {STEPS[currentStep]}
          {/* </form> */}
        </div>
      </div>
    </FormContext>
  );
};

export default Form;
