// src/HomePage.js
// import React from 'react';
import JobListComponent from './../components/JobListComponent';
import NavBarComponent from './../components/NavBarComponent';

const HomePage = () => {
  return (
    <div className="homePageWrapper">
        <NavBarComponent/>

      <div className="jobListCont">
        <JobListComponent/>
      </div>
    </div>
  );
};

export default HomePage;