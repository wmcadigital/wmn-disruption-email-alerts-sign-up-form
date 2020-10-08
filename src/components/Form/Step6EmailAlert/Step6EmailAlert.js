import React, { useRef } from 'react';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Radios from 'components/shared/FormElements/Radios/Radios';
import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo';

const Step6EmailAlert = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const {
    register,
    handleSubmit,
    showGenericError,
    continueButton,
  } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)

  const radioButtons = [
    { text: 'Yes', value: 'yes' },
    { text: 'No', value: 'no' },
  ];
  // Labels used on inputs and for validation
  const phoneLabel = 'Mobile phone number';
  // Logic used to validate the phone field
  const phoneRegex = /^[\w!#$%&amp;'*+\-/=?^_`{|}~]+(\.[\w!#$%&amp;'*+\-/=?^_`{|}~]+)*@((([-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))$/; // Matches phone regex on server
  const phoneValidation = register({
    required: `${phoneLabel} is required`,
    pattern: {
      value: phoneRegex,
      message: `Enter an ${phoneLabel.toLowerCase()} in the correct format`,
    },
  });

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      {/* Subsection */}
      <SectionStepInfo section="Section 1 of 2" description="About you" />

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>Would you like to sign up to email alerts?</h2>
          <p>
            You’ll receive automatic disruption alerts to your email address.
          </p>
        </legend>

        <Radios
          name="EmailAlert"
          label=""
          radios={radioButtons}
          fieldValidation={register({
            required: `Please select one option to proceed`,
          })}
        />
      </fieldset>

      {/* Continue button */}
      {continueButton}
    </form>
  );
};

export default Step6EmailAlert;
