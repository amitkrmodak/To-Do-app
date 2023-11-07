import logo from './logo.svg';
import './App.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import bg_desktop_light from './images/bg-desktop-light.jpg';
import bg_desktop_dark from './images/bg-desktop-dark.jpg';
import icon_moon from './images/icon-moon.svg';
import icon_sun from './images/icon-sun.svg';
import icon_cross from './images/icon-cross.svg';
import icon_check from './images/icon-check.svg';

function App() {
  const [defaultInputValue, setDefaultInputValue] = useState('create a new To Do');
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isDarkMode, setIsdarkMode] = useState(false);
  const [showCross, setShowCross] = useState(false);
  const addToDo = (e) => {
    if (e.key === 'Enter') {
      setNewTodo(e.target.value);
      if (newTodo.trim() !== '') {
        setTodos([...todos, newTodo]);
        setNewTodo('');
      }
      setDefaultInputValue('create a new To Do');
    }
  }
  const enableDarkMode = (e) => {
    setIsdarkMode(true);
  }
  const enableLightMode = (e) => {
    setIsdarkMode(false);
  }
  return (
    <div className="App">
      <header className="App-header" >
        {!isDarkMode && <img src={bg_desktop_light} alt="logo" />}
        {isDarkMode && <img src={bg_desktop_dark} alt="logo" /> }
      </header>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='Container'>
          <header>
            <span className='heading'>TODO</span>
            <span> 
              {!isDarkMode && <img src={icon_moon} onClick={enableDarkMode}/> }
              {isDarkMode && <img src={icon_sun} onClick={enableLightMode}/> }
            </span>
          </header>

          <InputGroup className="mb-3">
            <Form.Control aria-label="Text input with checkbox" type='text' placeholder={defaultInputValue} onKeyDown={addToDo}

            />
          </InputGroup>
          <div className='list'>
            <table striped bordered hover size="sm">
              <tbody>
                {todos.map((todo, index) => (
                <tr key={index}>
                  <td>{todo}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
