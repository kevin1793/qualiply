import './NavBarComponent.css';
import { useNavigate  } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const NavBarComponent = () => {
  const { currentUser, loading } = useAuth();
  const navigate  = useNavigate ();

  function handleButtonClick () {
    navigate('/'); 
  };
  function navigatePostJob () {
    navigate('/postjob'); 
  };
  function navigateProfile () {
    navigate('/profile'); 
  };
  function navigateLogin () {
    navigate('/login'); 
  };

  function navigateSignin () {
    navigate('/signup');
  };

  function logout () {
    signOut(auth);
  };

  return (
    <div className="NavBarWrapper">
      <div className="navBarCont">
        <div className="navIconCont"><h1 onClick={handleButtonClick}>Qualiply</h1></div>
        <div className="navBtnCont">
          
          {currentUser ?
          (<>
            {currentUser.email}<button  onClick={navigateProfile}>Profile</button>
            <button   onClick={logout}>Logout</button>
            </>):
          (<><button  onClick={navigateLogin}>Login</button>
          <button   onClick={navigateSignin}>Sign Up</button>
          </>
          )}
        </div>
      </div>
    </div>
  )
};

export default NavBarComponent;