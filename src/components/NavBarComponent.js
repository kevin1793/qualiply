import './NavBarComponent.css';
import { useNavigate  } from 'react-router-dom';

const NavBarComponent = () => {

  const navigate  = useNavigate ();

  function handleButtonClick () {
    navigate('/'); // Navigate to the About page
  };
  function navigatePostJob () {
    navigate('/postjob'); // Navigate to the About page
  };

  return (
    <div className="NavBarWrapper">
      <div className="navBarCont">
        <div className="navIconCont"><h1 onClick={handleButtonClick}>Qualiply</h1></div>
        <div className="navBtnCont">
          <button>Login</button>
          <button  onClick={navigatePostJob}>Post Job</button>
        </div>
      </div>
    </div>
  )
};

export default NavBarComponent;