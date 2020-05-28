import React, { useState } from 'react';

import FullName from './steps/FullName';
import Email from './steps/Email';
import AddService from './steps/AddService';
import Summary from './steps/Summary';
import SectionTitle from './steps/SectionTitle';

import style from './Form.module.scss';

const Form = () => {
  const [currentStep, setCurrentStep] = useState('Summary');
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
    FullName: <FullName setCurrentStep={setCurrentStep} />,
    Email: <Email setCurrentStep={setCurrentStep} />,
    AddService: <AddService setCurrentStep={setCurrentStep} />,
    Summary: <Summary setCurrentStep={setCurrentStep} />,
  };
  return (
    <div className="wmnds-col-1 wmnds-col-md-3-4">
      {currentStep !== 'FullName' ? (
        <a onClick={() => handleGoBack()}> Back </a>
      ) : null}
      <SectionTitle />
      <div className={`wmnds-p-lg ${style.formWrapper}`}>
        <form autoComplete="on">{STEPS[currentStep]}</form>
      </div>
    </div>
  );
};

export default Form;