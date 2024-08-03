// Home Page Component
import './LoginComponent.css';
import { useNavigate  } from 'react-router-dom';
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPageComponent = () => {
  const navigate  = useNavigate ();
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const initialFormData = {
    email: '',
    password: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  function navigateSignUp () {
    navigate('/signUp'); 
  };

  function navigateProfile () {
    navigate('/profile'); 
  };

  const formChange = (e) => {
    const formName = e.target.id;
    const val= e.target.value;
    console.log(e.target.id,val)

    setFormData({
      ...formData,
      [formName]: val,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth,formData.email, formData.password);
      navigateProfile();
    } catch (error) {
      if(error.message.includes('(auth/invalid-email)')){
        setError('Bad credentials. Try Again!');
      }else{
        setError(error.message);
      }
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
    }
  };
  return (
    <div className="pageCont loginPageCont">
      <div className='pageTitleCont'>
        <h2>Welcome Back!</h2>
        <p>Let's get that job placement filled!</p>
      </div>
      <div className='loginCont'>
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
          {error && <p className='formError'>{error}</p>}
          <button >Login</button>
        </form>
        <div className='signUpLink' ><a onClick={navigateSignUp}>Sign Up</a></div>
      </div>
    </div>
  );
};

export default LoginPageComponent;