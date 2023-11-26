import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Project from "./Project.jsx";
import "./Project.css";
import FloatingElements from "./FloatingElements.js";

const ProjectPage = ({ userId, HOST, PORT }) => {
  const [projectData, setProjectData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(userId)
  console.log(HOST)
  console.log(PORT)

  const divRef = useRef();

  const handleAddProject = () => {
    console.log("add new project clicked")
    setIsModalOpen(!isModalOpen);
  }

  const getProjects = (userId, HOST, PORT) => {
    axios.get(`http://${HOST}:${PORT}/project/get-projects-by-user/${JSON.parse(userId)}`)
      .then((response) => {
        console.log(response.data);
        setProjectData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (userId)
      getProjects(userId, HOST, PORT);
  }, []);
  console.log(projectData)

  return (
    <div className='container project-page'>
      <div>
        <h1>Home</h1>
        <div className="">
          <h3>Projects</h3>
          <div className="projects-container row g-3">
            {projectData.map((project, index) => (
              <Project key={index} item={project} />
            ))}
            <div className='col-6'>
              <div className='project'>
                <div className='project-header'>
                  <div className="p-1">Create New Project</div>
                </div>
                <div className='project-body' ref={divRef} onClick={handleAddProject}>
                  <div className='project-description'>
                    <div className='p-2'>Click here to add new project</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <FloatingElements onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default ProjectPage;