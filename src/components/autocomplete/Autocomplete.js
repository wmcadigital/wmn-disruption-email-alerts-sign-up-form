import React from 'react';

// Import contexts
// import { ModeContext } from 'globalState/ModeContext';

// Import components
import ServiceAutoComplete from './ServiceAutocomplete';

const AutoComplete = (props) => {
  const { service, setTriggered } = props;
  // Do a switch on the mode, then return the component related to that
  const autoCompleteToShow = () => {
    // This is used as a template html for the title of the autocomplete box. It changes depending on the mode
    const autoCompleteTitle = (text) => {
      return (
        <div className="wmnds-col-1">
          <h4>{text}</h4>
        </div>
      );
    };

    return (
      <div className="wmnds-grid">
        {autoCompleteTitle(`Search for a ${service} service`)}
        <ServiceAutoComplete type={service} setTriggered={setTriggered} />
      </div>
    );
  };

  // Render the correct component based on logic in switch statement above
  return <>{autoCompleteToShow()}</>;
};

export default AutoComplete;