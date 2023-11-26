import React, { useState, useRef } from 'react';
import './CreateProject.css';
import axios from 'axios';

const CreateProject = ({ headerColor }) => {
  const projectRef = useRef();
  const userId = JSON.parse(localStorage.getItem('id'));

  const saveProjectToDb = async () => {
    // toiminnallisuus listan luomiselle
    const projectElement = projectRef.current;
    //TODO: MUOKKAA TIETUE VASTAAMAAN PROJEKTI MODELIA
    const projectData = {
      name: projectElement.querySelector('.project-name').value,
      description: projectElement.querySelector('.project-description').value,
      owner: userId,
    };
    console.log(projectData);
    // TODO lomakkeen tietojen tallennus tietokantaan
    try {
      await axios.post(`http://localhost:8123/project/create-project/`,
        projectData,
        {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        });
      // emittaa tieto että projekti on päivitetty
      //TODO: tämä saattaa muuttua kun projektisivu tulee käyttöön
      //socket.emit("project:update");
    } catch (error) {
      console.error('Virhe tallennettaessa:', error);
    }

  };

  return (
    <div className='createProject'>
      <div className='project'>
        <div className='project-header custom-header' style={{ backgroundColor: headerColor }}>
        </div>
        <div className='project-body'>
          <form>
            <div className='form-group' ref={projectRef}>
              <label>Name</label>
              <input type='text' className='form-control project-name' placeholder='Add name to project...' />

              <label>Description</label>
              <textarea className='form-control project-description' rows='3' placeholder='Add description...'></textarea>
            </div>
          </form>
        </div>
        <div>
          <div className='buttons-container'>
            <button className='btn btn-createProject' onClick={saveProjectToDb}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
