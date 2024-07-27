// src/HomePage.js
// import React from 'react';
import HomePageComponent from './../components/HomePageComponent';
import NavBarComponent from './../components/NavBarComponent';

const HomePage = () => {
  return (
    <div className="homePageWrapper">
        <NavBarComponent/>

      <div className="jobListCont">
        <HomePageComponent/>
      </div>
    </div>
  );
};

export default HomePage;