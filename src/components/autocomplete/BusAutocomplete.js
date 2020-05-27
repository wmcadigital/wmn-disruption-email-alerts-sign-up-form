import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input'; // https://www.npmjs.com/package/react-debounce-input

// Import contexts
// import { AutoCompleteContext } from 'globalState';

// Import components
// import Message from 'components/shared/Message/Message';
import Icon from '../Icon';
import BusAutoCompleteResult from './AutoCompleteResult';

const BusAutoComplete = () => {
  const [loading, setLoading] = useState(false); // Set loading state for spinner
  const [errorInfo, setErrorInfo] = useState(); // Placeholder to set error messaging
  const [searchResults, setSearchResults] = useState();
  const [busNumber, setBusNumber] = useState();
  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  const updateQuery = (query) => {
    setBusNumber(query);
  };

  useEffect(() => {
    let mounted = true; // Set mounted to true (used later to make sure we don't do events as component is unmounting)
    const source = axios.CancelToken.source(); // Set source of cancelToken
    // If autocomplete has query
    const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars
    if (busNumber) {
      setLoading(true); // Update loading state to true as we are hitting API
      axios
        .get(`${REACT_APP_API_HOST}/bus/v1/service?q=${busNumber}`, {
          headers: {
            'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
          },
          cancelToken: source.token, // Set token with API call, so we can cancel this call on unmount
        })
        .then((bus) => {
          setLoading(false); // Set loading state to false after data is received
          // If bus.data.services isn't there, then we can't map the results to it, so return null
          setSearchResults(bus.data.services);
        })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            setLoading(false); // Set loading state to false after data is received
            // Update error message
            setErrorInfo({
              title: 'Please try again',
              message: 'Apologies, we are having technical difficulties.',
            });
            // eslint-disable-next-line no-console
            console.log({ error });
          }
        });
    }

    // Unmount / cleanup
    return () => {
      mounted = false; // Set mounted back to false on unmount
      source.cancel(); // cancel the request
    };
  }, [busNumber]);

  // Function for handling keyboard/keydown events (controls the up/down arrow on autocomplete results)
  const handleKeyDown = ({ keyCode, target }) => {
    // Keycodes:
    // 40 = down arrow
    // 38 = up arrow
    // 13 = enter
    // 32 = space

    // If down arrow pressed and current target is input (we are still in autocomplete debounce) and there are results
    if (target.localName === 'input') {
      if (keyCode === 40 && searchResults.data.length) {
        resultsList.current.firstChild.focus(); // Then focus on the first child in results list
      }
    } else {
      // If down arrow and there is a next sibling/result
      if (keyCode === 40 && target.nextSibling) {
        target.nextSibling.focus(); // Then focus on next sibling/result
      }
      // Else if up arrow and there is a prev sibling/result
      else if (keyCode === 38 && target.previousSibling) {
        target.previousSibling.focus(); // Then focus on prev sibling/result
      }
      // Else if up arrow and no previous sibling
      else if (keyCode === 38) {
        debounceInput.current.focus(); // Then focus back on autoComplete input
      }
      // If enter or space pressed
      if (keyCode === 13 || keyCode === 32) {
        target.click(); // then emulate click event (select it)
      }
    }
  };
  console.log(searchResults);
  return (
    <>
      <div
        className={`wmnds-autocomplete wmnds-grid ${
          loading ? 'wmnds-is--loading' : ''
        }`}
      >
        <Icon iconName="general-search" className="wmnds-autocomplete__icon" />
        <div className="wmnds-loader" role="alert" aria-live="assertive">
          <p className="wmnds-loader__content">Content is loading...</p>
        </div>
        <DebounceInput
          type="text"
          name="busSearch"
          placeholder="Search for a service"
          className="wmnds-fe-input wmnds-autocomplete__input wmnds-col-1"
          value={busNumber || ''}
          onChange={(e) => updateQuery(e.target.value)}
          aria-label="Search for a service"
          debounceTimeout={600}
          onKeyDown={(e) => handleKeyDown(e)}
          inputRef={debounceInput}
        />
      </div>
      {/* If there is no data.length(results) and the user hasn't submitted a query and the state isn't loading then the user should be displayed with no results message, else show results */}
      {searchResults && (
        <ul className="wmnds-autocomplete-suggestions" ref={resultsList}>
          {searchResults.map((result) => (
            <BusAutoCompleteResult
              key={result.id}
              result={result}
              handleKeyDown={handleKeyDown}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default BusAutoComplete;
