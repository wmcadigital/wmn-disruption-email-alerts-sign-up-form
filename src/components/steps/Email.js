import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { FormContextStore } from '../../FormContext';
import SectionStepInfo from './SectionStepInfo';
import GenericError from '../GenericError';

function Email({ setCurrentStep }) {
  const [internalFormState, formDispatch] = useContext(FormContextStore);
  const { email } = internalFormState;
  const { handleSubmit, register, errors } = useForm({
    mode: 'onBlur',
    defaultValues: {
      Email: email || '',
    },
  });
  const onSubmit = (val) => {
    formDispatch({
      type: 'UPDATE_FORM_EMAIL',
      payload: val.Email,
    });
  };
  return (
    <>
      <SectionStepInfo section="Section 1 of 2" description="About you" />
      {Object.keys(errors).length > 0 ? <GenericError /> : null}
      <fieldset className="wmnds-fe-fieldset wmnds-m-b-xl">
        <legend className="wmnds-fe-fieldset__legend wmnds-wmnds-col-1 wmnds-col-md-3-5 wmnds-col-lg-2-5">
          <h2 className="">What is your email address?</h2>
          <p>We’ll automatically send disruption alerts to this address</p>
        </legend>
        {/* wmnds-fe-group--error */}
        <div
          className={`wmnds-fe-groupp ${
            errors.Email ? 'wmnds-fe-group--error' : ''
          }`}
        >
          <label className="wmnds-fe-label" htmlFor="Email">
            Email address, for example name@example.com
          </label>
          {errors.Email && (
            <span className="wmnds-fe-error-message">
              {errors.Email && 'Enter your email address'}
            </span>
          )}
          <div className="wmnds-wmnds-col-1 wmnds-col-md-3-5 wmnds-col-lg-2-5">
            <input
              ref={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'invalid email address',
                },
              })}
              className={`wmnds-fe-input ${
                errors.Email ? 'wmnds-fe-input--error' : ''
              }`}
              id="Email"
              name="Email"
              type="text"
              inputMode="text"
              spellCheck="false"
            />
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
}
Email.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
};

export default Email;
