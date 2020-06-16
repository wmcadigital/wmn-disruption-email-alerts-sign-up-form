/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FormContext } from '../../FormContext';
import SectionStepInfo from './SectionStepInfo';
import GenericError from '../GenericError';

const FullName = ({ setCurrentStep }) => {
  const [internalFormState, formDispatch] = useContext(FormContext);
  const { firstName, lastName } = internalFormState;
  const { handleSubmit, register, errors, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      FirstName: firstName || '',
      LastName: lastName || '',
    },
  });
  const { submitCount } = formState;
  const onSubmit = (val) => {
    setCurrentStep('Email');
    formDispatch({
      type: 'UPDATE_CUSTOMER_NAME',
      payload: val.FirstName,
    });
    formDispatch({
      type: 'UPDATE_CUSTOMER_SURNAME',
      payload: val.LastName,
    });
  };
  return (
    <>
      <SectionStepInfo section="Section 1 of 2" description="About you" />
      {Object.keys(errors).length > 0 && submitCount > 0 ? (
        <GenericError />
      ) : null}
      <fieldset className="wmnds-fe-fieldset wmnds-m-b-xl">
        <legend className="wmnds-fe-fieldset__legend wmnds-col-1">
          <h2>What is your name?</h2>
          <p>
            We’ll use this information to personalise your email
            <br /> notifications so they aren’t marked as spam.
          </p>
        </legend>
        {/* wmnds-fe-group--error */}
        <div className="wmnds-col-1 wmnds-col-md-2-5">
          <div
            className={`wmnds-fe-groupp ${
              errors.FirstName ? 'wmnds-fe-group--error' : ''
            }`}
          >
            <label className="wmnds-fe-label" htmlFor="FirstName">
              First Name
            </label>
            {errors.FirstName && (
              <span className="wmnds-fe-error-message">
                Enter your first name
              </span>
            )}
            <div className="wmnds-m-b-lg">
              <input
                ref={register({ required: true, maxLength: 20 })}
                className={`wmnds-fe-input ${
                  errors.FirstName ? 'wmnds-fe-input--error' : ''
                }`}
                id="FirstName"
                name="FirstName"
                type="text"
                inputMode="text"
                spellCheck="false"
              />
            </div>
          </div>
          <div
            className={`wmnds-fe-groupp ${
              errors.LastName ? 'wmnds-fe-group--error' : ''
            }`}
          >
            <label className="wmnds-fe-label" htmlFor="LastName">
              Last Name
            </label>
            {errors.LastName && (
              <span className="wmnds-fe-error-message">
                Enter your last name
              </span>
            )}
            <div className="">
              <input
                ref={register({ required: true, maxLength: 20 })}
                className={`wmnds-fe-input ${
                  errors.LastName ? 'wmnds-fe-input--error' : ''
                }`}
                id="LastName"
                name="LastName"
                type="text"
                inputMode="text"
                spellCheck="false"
              />
            </div>
          </div>
        </div>
      </fieldset>
      <button
        type="button"
        className="wmnds-btn wmnds-btn--disabled wmnds-col-1 wmnds-m-t-md"
        onClick={handleSubmit(onSubmit)}
      >
        Continue
      </button>
    </>
  );
};

FullName.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
};

export default FullName;