// Home Page Component
import './PostJobComponent.css';
import { useNavigate  } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { firestore } from '../firebase';

const PostJobComponent = () => {
  const navigate  = useNavigate ();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    pay:null,
    description:'',
    workLocationType:'',
    skills:[],
    workType:'',
    city:'',
    state:'',
    location:[],
    levels:[],
    skills:[],
    search:''
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

const [skills, setSkills] = useState([]);
const [skillInput, setSkillInput] = useState('');

const [errors,setErrors]  = useState([]);
const options = [
  "Senior",
  "Mid",
  "Junior",
  "Entry"
];

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ];

  function addSkill(){
    console.log(formData)
    if(skillInput.length && !skills.includes(skillInput)){
      console.log('skills',skillInput);
      var arr = skills;
      arr.push(skillInput)
      formData.skills = arr;
      setSkillInput('');
    }
  }

  function removeSkill(s){
    console.log(s,formData.skills);
    var arr = formData.skills;
    arr = arr.filter(e => e !== s);
    formData.skills = arr;
    setFormData({
      ...formData,
      ['skills']: arr
    });
    setSkills(arr);
  }

  const postJob = async (event) => {
    setLevelsData()
    console.log('postJob',formData);
    console.log('postJob',checkedOptions);
    
    event.preventDefault();
    var search = formData.title.replaceAll(' ','').toLowerCase();
    setFormData({
      ...formData,
      'search': search
    });
    setFormData({
      ...formData,
      'location': [formData.city,formData.state]
    });
    if( formData.title &&
      formData.company &&
      formData.description &&
      formData.workLocationType &&
      formData.skills &&
      formData.workType &&
      formData.city &&
      formData.state &&
      formData.levels ){
      try {
        // Add a new document with a generated ID
        await addDoc(collection(firestore, 'jobPosts'), formData);
        alert('Data added successfully');
        navigate('/profile'); 
        // setFormData({
        //   title: '',
        //   company: '',
        //   pay: '',
        //   description: '',
        //   workLocationType: '',
        //   skills: [],
        //   workType: '',
        //   city: '',
        //   state: '',
        //   location: '',
        //   levels: []
        // });
        // setSkills([]);
        // setErrors([]);
      } catch (error) {
        alert(error.message);
      }
    }else{
      var errs = [];
      if (!formData.title) errs.push('Missing Title');
      if (!formData.company) errs.push('Missing Company');
      if (!formData.description) errs.push('Missing Description');
      if (!formData.workLocationType) errs.push('Missing Work Location Type');
      if (!formData.skills.length) errs.push('Missing Skills');
      if (!formData.workType) errs.push('Missing Work Type');
      if (!formData.city) errs.push('Missing City');
      if (!formData.state) errs.push('Missing State');
      if (!formData.levels.length) errs.push('Missing Job Levels');
      setErrors(errs);
    }
  };

  // CHECKBOXES
  const [checkedOptions, setCheckedOptions] = useState({});

  // Handle change event for checkboxes
  const handleCheckboxChange = (event) => {
      console.log('handleCheckboxChange',event.target,event.target.value)
      const { name, checked } = event.target;
      setCheckedOptions((prevCheckedOptions) => ({
          ...prevCheckedOptions,
          [name]: checked
          
      }));
      setLevelsData()
  };

  function setLevelsData(){
    var levs = [];
      for(var e in checkedOptions){
        console.log('e',e)
        if(checkedOptions[e] == true){
          levs.push(e);
        }
      }
      formData.levels = levs;
  }

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
            name='title'
            value={formData.title}
            onChange={handleChange} 
            placeholder='Job Title'>
          </input>
          <input 
            type="text"
            name='company'
            className='inputLine'
            required
            value={formData.company}
            onChange={handleChange} 
            placeholder="Company"
          ></input>
          <textarea 
            type="text"
            name='description'
            value={formData.description}
            onChange={handleChange} 
            placeholder="Description"
          ></textarea>
          <div className='radioLine'>
            <input type="radio"
            onChange={handleChange}
            name="workLocationType"
            id="workLocationType_remote"  value="Remote"></input>
            <label for="html">Remote</label>
          </div>
          <div className='radioLine'>
            <input type="radio" 
            onChange={handleChange}
            name="workLocationType"
            id="workLocationType_inOffice"  value="In Office"></input>
            <label for="html">In Office</label>
          </div>
          <div className='radioLine'>
            <input type="radio"
            onChange={handleChange}
            name="workLocationType"
             id="workLocationType_hybrid" value="Hybrid"></input>
            <label for="html">Hybrid</label>
          </div>
          <div className=''>
            <input 
            className='inputLine'
              type="text" 
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              placeholder="Skills Required  ex) HTML or CSS"
            ></input>
            <div className='btn addSkill' onClick={addSkill}>Add Skill</div>

            {skills.length>0 &&
            <div className='skillsArrCont'>
            {skills.map(s =>(
              <div className='skillsArrItem' key={s} onClick={e => removeSkill(s)}><div>{s}</div><div className='skillX'>X</div></div>
            ))}
            </div>}
          </div>

          <div className='radioLine'>
            <input type="radio"
            onChange={handleChange} 
             id="workType_fulltime" name="workType" value="Fulltime"></input>
            <label >Fulltime</label>
          </div>
          <div className='radioLine'>
            <input type="radio"
            onChange={handleChange} 
             id="workType_contract" name="workType" value="Contract"></input>
            <label >Contract</label>
          </div>
          <input
            type="number" 
            className='inputLine'
            value={formData.pay}
            name='pay'
            onChange={handleChange} 
            placeholder='Salary or Hourly Amount'>
          </input>
          <input 
            type="text" 
            className='inputLine'
            name='city'
            value={formData.city}
            onChange={handleChange} 
            placeholder="City"
          ></input>
          <select
            id="state"
            name='state'
            className='inputLine'
            value={formData.state}
            onChange={handleChange} 
          >
            <option value="" disabled>Select a state</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
          <div className='jobLevel'>
            <h3>Job Level:</h3>
            {options.map((option, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    name={option}
                    checked={checkedOptions[option] || false}
                    onChange={handleCheckboxChange}
                  />
                  {option}
                </label>
              </div>
            ))}
        </div>
          <button type='submit'  onClick={postJob}>Post Job</button>
          {errors && errors.length ?
            <div className='errorBox'>
              {errors.map( err =>
                <div key={err}>
                  {err}
                </div>
              )}
            </div>
          :''
          }
        </form>
      </div>
    </div>
  );
};

export default PostJobComponent;