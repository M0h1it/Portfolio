import './Home.css';
import profileImg from '../assets/images/profile.jpg'; // update based on actual image name/path

function Home() {
  return (
    <section className="home-section">
      <div className="home-content">
        <h1>Hello, I'm <span>Your Name</span></h1>
        <p>I am a beginner front-end developer passionate about web design and development.</p>
        <img src={profileImg} alt="Profile" className="profile-img" />
      </div>
    </section>
  );
}

export default Home;
