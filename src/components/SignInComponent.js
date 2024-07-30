// Home Page Component
import './SignInPageComponent.css';
import { useNavigate  } from 'react-router-dom';
import React, { useState } from 'react';

const SignInPageComponent = () => {

  const navigate  = useNavigate ();

  function handleButtonClick () {
    console.log('jobValue',jobValue);
    navigate('/jobs?job='+jobValue+'?location='+locationValue); // Navigate to the About page
  };

  const [jobValue, setJob] = useState('');
  const [locationValue, setLocation] = useState('');

  const jobChange = (event) => {
    setJob(event.target.value); // Update state with the input value
  };

  const locationChange = (event) => {
    setLocation(event.target.value); // Update state with the input value
  };

  return (
    <div className="homePageCont">
      <div className='homePageTitleCont'>
        <h2>Find Your Dream Job Now</h2>
      </div>
      <div className='homePageSearchCont'>
        <input
          type="text" 
          value={jobValue}
          onChange={jobChange} 
          placeholder='Job Title'>
        </input>
        <input 
          type="text" 
          value={locationValue}
          onChange={locationChange} 
          placeholder="Location or 'remote'"
        ></input><button  onClick={handleButtonClick}>Search</button>
      </div>
    </div>
  );
};

export default SignInPageComponent;