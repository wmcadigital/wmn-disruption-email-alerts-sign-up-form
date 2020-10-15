import React, { useState } from 'react';
import Intro from './components/Intro';
import Form from './components/Form/Form';
// Import contexts
import { FormDataProvider } from './globalState/FormDataContext';
import HeaderAndBreadcrumb from './components/HeaderAndBreadCrumb';

import SubmitSuccess from './components/Form/Step10SubmitConfirmation/Success';
import SubmitError from './components/Form/Step10SubmitConfirmation/Error';
import { getSearchParam } from './helpers/URLSearchParams';

function App() {
  const [isFormStarted, setIsFormStarted] = useState(false);
  const [formSubmitStatus, setFormSubmitStatus] = useState(null);

  if (getSearchParam('email') && !isFormStarted) {
    setIsFormStarted(true);
  }

  return (
    <>
      <HeaderAndBreadcrumb
        isFormStarted={isFormStarted}
        formSubmitStatus={formSubmitStatus}
      />
      <main className="wmnds-container wmnds-container--main wmnds-p-b-lg wmnds-grid">
        {!isFormStarted ? (
          <Intro setIsFormStarted={setIsFormStarted} />
        ) : (
          <FormDataProvider>
            {isFormStarted && formSubmitStatus === null && (
              <Form
                setFormSubmitStatus={setFormSubmitStatus}
                formSubmitStatus={formSubmitStatus}
              />
            )}

            {formSubmitStatus && <SubmitSuccess />}

            {formSubmitStatus === false && <SubmitError />}
          </FormDataProvider>
        )}
      </main>
    </>
  );
}

export default App;
