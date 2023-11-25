import React, { useState, useEffect } from "react";
import axios from "axios";
import Project from "./Project.jsx";

const ProjectPage = ({ userId, HOST, PORT }) => {
  const [projectData, setProjectData] = useState([]);

  console.log(userId)
  console.log(HOST)
  console.log(PORT)

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
    <div className='container homePage'>
      <div>
        <h1>Home</h1>
        <div className="">
          <h3>Projects</h3>
          <div className="projects-container">
            {projectData.map((project, index) => (
              <Project key={index} item={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;