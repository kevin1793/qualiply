import LoginComponent from '../components/LoginComponent';
import NavBarComponent from './../components/NavBarComponent';

const LoginPage = () => {
  return (
    <div className="homePageWrapper">
        <NavBarComponent/>

      <div className="jobListCont">
        <LoginComponent/>
      </div>
    </div>
  );
};

export default LoginPage;