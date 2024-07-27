// Post Job Page

import PostJobComponent from './../components/PostJobComponent';
import NavBarComponent from './../components/NavBarComponent';

const PostJobPage = () => {
  return (
    <div className="postJobWrapper">
        <NavBarComponent/>

      <div className="jobListCont">
        <PostJobComponent/>
      </div>
    </div>
  );
};

export default PostJobPage;