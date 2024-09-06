// Home Page Component
import './ProfilePageComponent.css';
import { useNavigate  } from 'react-router-dom';

import { useAuth } from '../AuthContext';
import { query, where, getDocs, collection,limit } from 'firebase/firestore';
import React, { useState,useEffect } from 'react';
import { firestore } from '../firebase';

const ProfilePageComponent = () => {

  const navigate  = useNavigate ();
  const { currentUser, fetching } = useAuth();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  function navigatePostJob () {
    navigate('/postjob'); 
  };

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const q = query(
          collection(firestore, 'users'),
          where('email', '==', currentUser.email),
          limit(1)  // Fetch the latest document
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0].data();
          setUser(doc);
          console.log(doc)
        } else {
          console.log('No matching documents.');
        }
      } catch (err) {
        console.error('Error fetching document:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, []);

  return (
    <div className="pageCont">
      <div>Welcome Back!</div>
      {user && user.hiring == 'hiring' &&
        <div className='hiringCont'>HIRING
          <button onClick={navigatePostJob}>Add Job Posting</button>
        </div>
      }
    </div>
  );
};

export default ProfilePageComponent;