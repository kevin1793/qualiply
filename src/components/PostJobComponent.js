// Home Page Component
import './PostJobComponent.css';
import { useNavigate  } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { firestore } from '../firebase';

const PostJobComponent = () => {

  const [data, setData] = useState('');

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [pay, setPay] = useState('');
  const [description, setDescription] = useState('');
  const [workLocationType, setWorkLocationType] = useState('');
  const [skills, setSkills] = useState([]);
  const [workType, setWorkType] = useState('');
  const [location, setLocation] = useState('');
  const [levels, setLevels] = useState([]);

// title: 'React Frontend Developer'
// company:'Amazon'
// pay:'$120,000'
// description: 'lorem Ipsum'
// workLocationType:'remote'
// skills:['React','HTML','CSS','JS']
// workType:'fulltime'
// location:'Dallas, TX' 
// levels:['Junior','Mid','Senior']

  const locationChange = (event) => {
    setLocation(event.target.value); // Update state with the input value
  };

  const postJob = async (event) => {
    console.log('postJob',event);
    event.preventDefault();
    var search = title.replaceAll(' ','').toLowerCase();
    try {
      // Add a new document with a generated ID
      await addDoc(collection(firestore, 'jobPosts'), {
        title,
        company,
        description,
        workLocationType,
        skills,
        workType,
        location,
        levels,
        search
      });
      alert('Data added successfully');
      
      // Clear the form fields
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="postJobCont">
      <div className='postJobTitleCont'>
        <h2>Step One of Finding Your Perfect Hire</h2>
      </div>
      <div className='postJobSearchCont'>
        <form>
          <input
            className='inputLine'
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
            placeholder='Job Title'>
          </input>
          <input 
            type="text" 
            className='inputLine'
            value={company}
            onChange={(e) => setCompany(e.target.value)} 
            placeholder="Company"
          ></input>
          
          <textarea 
            type="text" 
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Description'"
          ></textarea>
          <div className='radioLine'>
            <input type="radio" 
            onChange={(e) => setWorkLocationType(e.target.value)} 
            id="workLocationType_remote" name="workLocationType" value="Remote"></input>
            <label for="html">Remote</label>
          </div>
          <div className='radioLine'>
            <input type="radio" 
            onChange={(e) => setWorkLocationType(e.target.value)} 
            id="workLocationType_inOffice" name="workLocationType" value="In Office"></input>
            <label for="html">In Office</label>
          </div>
          <div className='radioLine'>
            <input type="radio"
            onChange={(e) => setWorkLocationType(e.target.value)} 
             id="workLocationType_hybrid" name="workLocationType" value="Hybrid"></input>
            <label for="html">Hybrid</label>
          </div>
          <input 
          className='inputLine'
            type="text" 
            value={skills}
            onChange={(e) => setSkills(e.target.value)} 
            placeholder="Skills Required  ex) HTML,CSS"
          ></input>
          <div className='radioLine'>
            <input type="radio"
            onChange={(e) => setWorkType(e.target.value)} 
             id="workType_fulltime" name="workType" value="Fulltime"></input>
            <label for="html">Fulltime</label>
          </div>
          <div className='radioLine'>
            <input type="radio"
            onChange={(e) => setWorkType(e.target.value)} 
             id="workType_contract" name="workType" value="Contract"></input>
            <label for="html">Contract</label>
          </div>
          <input
            type="number" 
            className='inputLine'
            value={pay}
            onChange={(e) => setPay(e.target.value)} 
            placeholder='Salary or Hourly Amount'>
          </input>
          <input 
            type="text" 
            className='inputLine'
            value={location}
            onChange={(e) => setLocation(e.target.value)} 
            placeholder="Location"
          ></input>
          <input 
            type="text" 
            className='inputLine'
            value={levels}
            onChange={(e) => setLevels(e.target.value)} 
            placeholder="Job Levels ex) senior,junior"
          ></input>
            {/* const [title, setTitle] = useState('');
            const [company, setCompany] = useState('');
            const [pay, setPay] = useState('');
            const [description, setDescription] = useState('');
            const [workLocationType, setLocationType] = useState('');
            const [skills, setSkills] = useState([]);
            const [workType, setWorkType] = useState('');
            const [location, setLocation] = useState('');
            const [levels, setLevels] = useState([]); */}

          <button type='submit'  onClick={postJob}>Post Job</button>
        </form>
      </div>
    </div>
  );
};

// title: 'React Frontend Developer'
// company:'Amazon'
// pay:'$120,000'
// description: 'lorem Ipsum'
// workLocationType:'remote'
// skills:['React','HTML','CSS','JS']
// workType:'fulltime'
// location:'Dallas, TX' 
// levels:['Junior','Mid','Senior']

export default PostJobComponent;