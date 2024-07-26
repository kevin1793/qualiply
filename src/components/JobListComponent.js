// Job List

import { FaMoneyBill } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaAt } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";

const JobListComponent = () => {
  // Example data
  const data = [
    { id: 1, title: 'React Frontend Developer',company:'Amazon',pay:'$120,000',
     description: 'lorem Ipsum',workLocation:'remote',skills:['React','HTML','CSS','JS'],
     workType:'fulltime',location:'Dallas, TX' ,levels:['Junior','Mid','Senior']
    },
    { id: 2, title: 'Angular Frontend Developer',
      company:'Amazon', description: 'lorem Ipsum',
      workLocation:'remote',workType:'contract',pay:'$50/hr',contractLength:'6 months',skills:['React','HTML','CSS','JS'],
      location:'Dallas, TX'  ,levels:['Junior','Senior']
    },
    { id: 3, title: 'Angular Frontend Developer',
      company:'Amazon', description: 'lorem Ipsum',
      workLocation:'remote',workType:'contract',pay:'$50/hr',contractLength:'6 months',skills:['React','HTML','CSS','JS'],
      location:'Dallas, TX'  ,levels:['Junior','Mid','Senior']
    },
    { id: 4, title: 'Angular Frontend Developer',
      company:'Amazon', description: 'lorem Ipsum',
      workLocation:'remote',workType:'contract',pay:'$50/hr',contractLength:'6 months',skills:['React','HTML','CSS','JS'],
      location:'Dallas, TX'  ,levels:['Junior']
    },
    { id: 5, title: 'Angular Frontend Developer',
      company:'Amazon', description: 'lorem Ipsum',
      workLocation:'remote',workType:'contract',pay:'$50/hr',contractLength:'6 months',skills:['React','HTML','CSS','JS'],
      location:'Dallas, TX'  ,levels:['Junior','Mid','Senior','JS']
    },
    // { id: 2, name: 'Jane Smith', age: 25 },
    // { id: 3, name: 'Alice Johnson', age: 35 },
  ];


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
                <button className="skillsButtonWide" >{job.location} </button> <button className='skillsButtonWide capitalize-text'>{job.workLocation}</button>
                </div>
              </div>                   
              {/* <p>{job.description}</p> */}
              <div className="jobLine">
                <span className="jobIcon"><FaMoneyBill /></span><button className="skillsButtonWide">{job.pay}</button><button className="skillsButtonWide  capitalize-text">{job.workType}</button>
              </div>
              {/* <div className="jobLine">
                <span className="jobIcon" ><FaLocationArrow /></span><span>{job.location} | <span className='capitalize-text'>{job.workLocation}</span></span>
              </div> */}
              <div className="jobLine">
                <span className="jobIcon " ><FaSearch /></span>
                {job.skills.map((skill, index) => (
                  <button className="skillsButton" key={index}>{skill}</button>
                ))}
              </div>
              <div className="jobLine">
                <span className="jobIcon " ><FaUserCog /></span>
                {job.levels.map((level, index) => (
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