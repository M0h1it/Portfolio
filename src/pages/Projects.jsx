import './Projects.css';
import project1 from '../assets/images/project1.png'; // replace with your image

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        <div className="project-card">
          <img src={project1} alt="Project 1" />
          <h3>Project Title</h3>
          <p>Short description of the project, tools used, and purpose.</p>
        </div>
        {/* Add more project cards as needed */}
      </div>
    </section>
  );
}

export default Projects;
