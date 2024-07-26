import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            Task <span>management</span> app
          </h1>
          <p>
            Welcome to TaskMaster, your ultimate companion for managing
            academic tasks! Designed with students in mind, our app helps you
            stay organized, meet deadlines, and boost productivity. With
            features like easy task creation, due date reminders, and a sleek,
            user-friendly interface, you'll never miss an assignment again. Sign
            up today to streamline your study life and take control of your
            academic journey!
          </p>
          <Link to="/signup" className="btn btn-hero">
            Login/Signup
          </Link>
        </div>
        <img src={main} alt="task man" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
