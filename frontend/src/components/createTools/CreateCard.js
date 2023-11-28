import React, { useState, useRef } from 'react';
import './CreateCard.css';
import trashIcon from "../../icons/trash-solid.svg";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import socket from '../../controller/socket.js';

const CreateCard = ({ headerColor }) => {
  const cardRef = useRef();
  const [listItems, setListItems] = useState([""]);
  const userId = JSON.parse(localStorage.getItem('id'));
  const { projectId } = useParams();
  // getCookie = (name) {
  //   const cookieArray = document.cookie.split(';');
  //   for (let i = 0; i < cookieArray.length; i++){
  //     const cookiepa
  //   }
  // }

  const saveCardToDb = async () => {
    // toiminnallisuus listan luomiselle
    const cardElement = cardRef.current;
    const cardData = {
      title: cardElement.querySelector('.card-title').value,
      description: cardElement.querySelector('.card-description').value,
      projectId: projectId,
      listItems: listItems.map(item => ({ task: item, isDone: false }))
    };
    console.log(cardData);
    // TODO lomakkeen tietojen tallennus tietokantaan
    try {
      await axios.post(`http://localhost:8123/card/create-card/`,
        cardData,
        {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        });
      // emittaa tieto että projekti on päivitetty
      //TODO: tämä saattaa muuttua kun projektisivu tulee käyttöön
      socket.emit("project:update", projectId);
    } catch (error) {
      console.error('Virhe tallennettaessa:', error);
    }

  };

  const addNewListItem = () => {
    setListItems([...listItems, '']);
  };

  const handleListItemChange = (event, index) => {
    const newListItems = [...listItems];
    newListItems[index] = event.target.value;
    setListItems(newListItems);
  };

  const handleDeleteListItem = (event, index) => {
    event.preventDefault();
    const newListItems = [...listItems];
    newListItems.splice(index, 1);
    setListItems(newListItems);
  };


  return (
    <div className='createCard'>
      <div className='card'>
        <div className='card-header custom-header' style={{ backgroundColor: headerColor }}>
        </div>
        <div className='card-body'>
          <form>
            <div className='form-group' ref={cardRef}>
              <label>Title</label>
              <input type='text' className='form-control card-title' placeholder='Add title...' />

              <label>Description</label>
              <textarea className='form-control card-description' rows='3' placeholder='Add description...'></textarea>

              <label>List items</label>
              {listItems.map((item, index) => (
                <div key={index} className='row flex-nowrap'>
                  <div className='col-10'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Add list items...'
                      value={item}
                      onChange={(event) => handleListItemChange(event, index)}
                    />
                  </div>
                  <div className='col-2 d-flex justify-content-end custom-column'>
                    <button className='btn btn-secondary btn-deleteTask' onClick={(event) => handleDeleteListItem(event, index)}>
                      <img className='trash-icon' src={trashIcon} alt='delete' />
                    </button>
                  </div>
                </div>
              ))}

              <button type='button' className='btn btn-outline-dark' onClick={addNewListItem}>Add New</button>
            </div>
          </form>
        </div>
        <div>
          <div className='buttons-container'>
            <button className='btn btn-outline-dark primary-button' onClick={saveCardToDb}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
