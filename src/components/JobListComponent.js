// Job List Component

import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase';

import { FaMoneyBill } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaAt } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";

// import { useLocation } from 'react-router-dom';

const JobListComponent = () => {
  const [data, setData] = useState([]);

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const queryObject = {};


  useEffect(() => {
    console.log('url',url)
    var searchArr = url.search.split('?');
    console.log('searchArr',searchArr)

    var titleSearch = '';

    for(var i in searchArr){
      if(searchArr[i].length){
        var searchItem = searchArr[i].split('=')[0];
        var searchValue = searchArr[i].split('=')[1].replaceAll('%20','');
        if(searchItem && searchValue){
          if(searchItem == 'job'){
            titleSearch = searchValue.toLowerCase();
          }
        }
      }
    }
    console.log('titleSearch',titleSearch)
    const fetchData = async () => {
      try {
        // Create a query with a filter condition
        // const q = query(collection(firestore, 'jobPosts'), where('age', '>=', filterAge));
        var q;
        if(titleSearch){
          //  q = query(collection(firestore, 'jobPosts'), where('search', '>=', titleSearch));

           q = query(
            collection(firestore, 'jobPosts'),
            where('search', '>=', titleSearch),
            where('search', '<', titleSearch + '\uf8ff') // Ensures the range includes all strings starting with titlePrefix
          );
        }else{
           q = query(collection(firestore, 'jobPosts'));
        }
        const querySnapshot = await getDocs(q);
        const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('dataList',dataList)
        setData(dataList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  const parseItems = (itemsString) => {
    return itemsString.split(',').map(item => item.trim());
  };


  return (
    <div className="jobListWrapper">
      <div className="jobListCont">
        {data.map(job => (
          <div className="jobBox" key={job.id}>
            <div className="infoCont">
              <h2>{job.title}</h2>
              <div className="companyLocationLine">
                <h3>{job.company}</h3>
                <div className="locationLine">
                <FaAt />   
                <button className="skillsButtonWide" >{job.location} </button> <button className='skillsButtonWide capitalize-text'>{job.workLocationType}</button>
                </div>
              </div>                   
              {/* <p>{job.description}</p> */}
              <div className="jobLine">
                <span className="jobIcon"><FaMoneyBill /></span><button className="skillsButtonWide">{job.pay?job.pay:'???'}</button><button className="skillsButtonWide  capitalize-text">{job.workType}</button>
              </div>
              {/* <div className="jobLine">
                <span className="jobIcon" ><FaLocationArrow /></span><span>{job.location} | <span className='capitalize-text'>{job.workLocation}</span></span>
              </div> */}
              {/* <div className="jobLine">
                <span className="jobIcon " ><FaSearch /></span>
                {job.skills.map((skill, index) => (
                  <button className="skillsButton" key={index}>{skill}</button>
                ))}
              </div> */}
              <div className="jobLine">
                <span className="jobIcon " ><FaSearch /></span>
                {parseItems(job.skills).map((level, index) => (
                  <button className="skillsButton" key={index}>{level}</button>
                ))}
              </div>
              <div className="jobLine">
                <span className="jobIcon " ><FaUserCog /></span>
                {parseItems(job.levels).map((level, index) => (
                  <button className="skillsButton" key={index}>{level}</button>
                ))}
              </div>
            </div>
            <div className="applyInfoCont">
              <button>Apply</button>
              <button>More Info</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListComponent;