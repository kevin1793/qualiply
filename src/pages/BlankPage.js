import BlankComponent from './../components/BlankComponent';
import NavBarComponent from './../components/NavBarComponent';

const BlankPage = () => {
  return (
    <div className="homePageWrapper">
        <NavBarComponent/>

      <div className="jobListCont">
        <BlankComponent/>
      </div>
    </div>
  );
};

export default BlankPage;