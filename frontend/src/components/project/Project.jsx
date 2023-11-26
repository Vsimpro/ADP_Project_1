import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './Project.css';

const Project = ({ key, item }) => {
  const projectRef = useRef();

  const openProjectCards = () => {
    console.log("Open projects cardpage")
  }
  //console.log(item);
  console.log("projekti id: " + item._id);
  console.log("projekti nimi: " + item.name);
  console.log("projekti kuvaus: " + item.description);
  console.log("käyttäjä id: " + item.owner);


  return (
    <div className='col-6'>
      <div className='project' ref={projectRef} onClick={openProjectCards}>
        <div className='project-header'>
          <div className="p-1">{item.name}</div>
        </div>
        <div className='project-body'>
          <div className='project-description'>
            <div className='p-2'>{item.description}</div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Project; 