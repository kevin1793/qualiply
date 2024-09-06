// Job List Component

import './JobListComponent.css';
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

  const [infoData, setInfoData] = useState({});

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
        var searchItem = '';
        if(searchArr[i]?.length){
          searchItem = searchArr[i].split('=')[0];
        }
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
        setInfoData(dataList[0]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  const parseItems = (itemsString) => {
    console.log('itemsString',itemsString)
    if(typeof itemsString == 'string'){
      return itemsString.split(',').map(item => item.trim());
    }else{
      return itemsString;
    }
  };

  const setNewInfoData =  function(j){
    setInfoData(j);
  }


  return (
    <div className="jobListWrapper">
      <div className='listBoxCont'>
        <div className="jobBoxListCont">
          {data.map(job => (
            <div className="jobBox" key={job.id}>
              <div className="infoCont">
                <h2>{job.title}</h2>
                <div className="companyLocationLine">
                  <h3>{job.company}</h3>
                  <div className="locationLine">
                  <FaAt />   
                  <button className="skillsButtonWide" >{job.location?job.location:job.city+', '+job.state} </button> <button className='skillsButtonWide capitalize-text'>{job.workLocationType}</button>
                  </div>
                </div>                   
                {/* <p>{job.description}</p> */}
                <div className="jobLine">
                  <span className="jobIcon"><FaMoneyBill /></span><button className="skillsButtonWide">{job.pay?job.pay:'???'}</button><button className="skillsButtonWide  capitalize-text">{job.workType}</button>
                </div>
                <div className="jobLine">
                  <span className="jobIcon " ><FaSearch /></span>
                  {parseItems(job.skills).map((s, index) => (
                    <button className="skillsButton" key={index}>{s.toUpperCase()}</button>
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
                <button onClick={() => setNewInfoData(job)}>More Info</button>
              </div>
              {infoData.id == job.id?
              <div className='jobInfoBox mobile'>
              <div className='infoBoxSection'>
                {infoData.title?
                <h4 className='infoBoxTitle'>{infoData.title}</h4>:''}
                {infoData.company?
                <div className='infoBoxTitle'>{infoData.company}</div>:''}
                {infoData.city?
                <div className='infoBoxSubheader'>{infoData.city+', '+infoData.state} - {infoData.workLocationType}</div>:''}
                {infoData.location?
                <div className='infoBoxSubheader'>{infoData.location} - {infoData.workLocationType}</div>:''}
              </div>
              {infoData.pay?
              <div className='infoBoxSection'>
                <div className='infoBoxHeader'>Pay</div>
                <div className='infoBoxSubheader'>{infoData.workType}</div>
                <div className='infoBoxText'>${infoData.pay} / {infoData.workType == 'Fulltime'?'yearly':'hourly'}</div>
              </div>
              :''}
              {infoData.levels?
              <div className='infoBoxSection'>
                <div className='infoBoxHeader'>Job Level</div>
                <div className=''></div>
                <div className='infoBoxText left flex'>
                {parseItems(infoData.levels).map((s, index) => (
                  <div className='infoBoxText textArrSpace'>{s.toUpperCase()}</div>
                ))}
                </div>
    
              </div>
              :''}
              {infoData.skills?
              <div className='infoBoxSection'>
                <div className='infoBoxHeader'>Skills</div>
                <div className=''></div>
                <div className='infoBoxText left flex'>
                {parseItems(infoData.skills).map((s, index) => (
                  <div className='infoBoxText textArrSpace'>{s.toUpperCase()}</div>
                ))}
                </div>
    
              </div>
              :''}
              {infoData.description?
              <div className='infoBoxSection'>
                <div className='infoBoxHeader'>Description</div>
                <div className=''></div>
                <div className='infoBoxText'>{infoData.description}</div>
              </div>
              :''}
            </div>
              :''
            }
            </div>
            
          ))}
        </div>
        {data.length && infoData.title ?
        <div  className='jobInfoBox desktop'>
          <div className=' fixedTop'>
          <div className='infoBoxSection'>
            {infoData.title?
            <h4 className='infoBoxTitle'>{infoData.title}</h4>:''}
            {infoData.company?
            <div className='infoBoxTitle'>{infoData.company}</div>:''}
            {infoData.city?
            <div className='infoBoxSubheader'>{infoData.city+', '+infoData.state} - {infoData.workLocationType}</div>:''}
            {infoData.location?
            <div className='infoBoxSubheader'>{infoData.location} - {infoData.workLocationType}</div>:''}
          </div>
          {infoData.pay?
          <div className='infoBoxSection'>
            <div className='infoBoxHeader'>Pay</div>
            <div className='infoBoxSubheader'>{infoData.workType}</div>
            <div className='infoBoxText'>${infoData.pay} / {infoData.workType == 'Fulltime'?'yearly':'hourly'}</div>
          </div>
          :''}
          {infoData.levels?
          <div className='infoBoxSection'>
            <div className='infoBoxHeader'>Job Level</div>
            <div className=''></div>
            <div className='infoBoxText left flex'>
            {parseItems(infoData.levels).map((s, index) => (
              <div className='infoBoxText textArrSpace'>{s.toUpperCase()}</div>
            ))}
            </div>

          </div>
          :''}
          {infoData.skills?
          <div className='infoBoxSection'>
            <div className='infoBoxHeader'>Skills</div>
            <div className=''></div>
            <div className='infoBoxText left flex'>
            {parseItems(infoData.skills).map((s, index) => (
              <div className='infoBoxText textArrSpace'>{s.toUpperCase()}</div>
            ))}
            </div>

          </div>
          :''}
          {infoData.description?
          <div className='infoBoxSection'>
            <div className='infoBoxHeader'>Description</div>
            <div className=''></div>
            <div className='infoBoxText'>{infoData.description}</div>
          </div>
          :''}
        </div>
        </div>
        :''}
      </div>
    </div>
  );
};

export default JobListComponent;