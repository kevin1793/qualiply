// Home Page Component
import './SignUpComponent.css';
import { useNavigate  } from 'react-router-dom';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const SignUpPageComponent = () => {

  const navigate  = useNavigate ();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const initialFormData = {
    hiring: '',
    email: '',
    password: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  
  function navigateLogin () {
    navigate('/login'); 
  };

  const handleSubmit = async (e) => {
    console.log(' onSubmit={handleSubmit}',formData);
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth ,formData.email, formData.password);
      setFormData(initialFormData);
      try {
        // Add a new document with a generated ID
        var email =formData.email;
        var hiring =formData.hiring;
        var password =formData.password;
        await addDoc(collection(firestore, 'users'), {
          email,
          hiring,
          password
        });
        
        setSuccess('Thanks for signing up! Please log in!');
        const timer = setTimeout(() => {
          setSuccess('');
        }, 5000);
      } catch (error) {
        alert(error.message);
      }
    } catch (error) {
      if(error.message.includes('Firebase: Error (auth/email-already-in-use)')){
        setError('Email already in use!');
      }else{
        setError(error.message);
      }
      const timer = setTimeout(() => {
        setError('');
      }, 5000);

      console.log('ERROR',error.message)
    }
  };

  const formChange = (e) => {
    const formName = e.target.id;
    const val= e.target.value;
    setFormData({
      ...formData,
      [formName]: val,
    });
  };

  return (
    <div className="pageCont signUpPageCont">
      <div className='pageTitleCont'>
        <h2>Time To Sign Up!</h2>
        <p>Are you hiring or looking to be hired?</p>
      </div>
      <div className='signUpCont'>
        <form  onSubmit={handleSubmit}>
          <input
            type="text" 
            value={formData.email}
            required={true}
            id='email'
            onChange={formChange}
            placeholder='Email'>
          </input>
          <input 
            type="password" 
            value={formData.password}
            id='password'
            required={true}
            onChange={formChange}
            placeholder="Password"
          ></input>
          <div className='radioLine'>
            <input type="radio"
            onChange={formChange}
            required={true}
             id="hiring" name="hiring" value="looking"></input>
            <label >Looking For Work</label>
          </div>
          <div className='radioLine'>
            <input type="radio"
            required={true}
            onChange={formChange}
             id="hiring" name="hiring" value='hiring'></input>
            <label >Im Hiring</label>
          </div>
          {error && <p className='formError'>{error}</p>}
          {success && <p className='formSuccess'>{success}</p>}
          <button >Sign Up</button>
        </form>
        <div className='loginLink' ><a onClick={navigateLogin}>Login</a></div>
      </div>
    </div>
  );
};

export default SignUpPageComponent;