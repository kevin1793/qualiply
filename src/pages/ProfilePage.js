import ProfileComponent from './../components/ProfileComponent';
import NavBarComponent from './../components/NavBarComponent';


const ProfilePage = () => {
  return (
    <div className="homePageWrapper">
        <NavBarComponent/>

      <div className="jobListCont">
        <ProfileComponent/>
      </div>
    </div>
  );
};

export default ProfilePage;