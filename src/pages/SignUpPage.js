import SignUpComponent from './../components/SignUpComponent';
import NavBarComponent from './../components/NavBarComponent';

const SignUpPage = () => {
  return (
    <div className="homePageWrapper">
        <NavBarComponent/>

      <div className="jobListCont">
        <SignUpComponent/>
      </div>
    </div>
  );
};

export default SignUpPage;