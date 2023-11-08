import logo from './logo.svg';
import './App.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import bg_desktop_light from './images/bg-desktop-light.jpg';
import bg_desktop_dark from './images/bg-desktop-dark.jpg';
import icon_moon from './images/icon-moon.svg';
import icon_sun from './images/icon-sun.svg';
import icon_cross from './images/icon-cross.svg';
import icon_check from './images/icon-check.svg';

function App() {
  const [todos, setTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const [isDarkMode, setIsdarkMode] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [onGoingCount, setOnGoingCount] = useState(0);
  console.log(todos);
  const addToDo = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value.trim() !== '') {
        const newTodo = {
          title: e.target.value,
          isCompleted: false,
        }
        setTodos([...todos, newTodo]);
      }
    }
  }
  const enableDarkMode = (e) => {
    setIsdarkMode(true);
  }
  const enableLightMode = (e) => {
    setIsdarkMode(false);
  }
  const deleteTodo = (index) =>
  {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  }
  const handleCheckboxChange = (idx) => {
    const newItems = todos.map((item,index)=>{
      if(idx === index){
        return {
          ...item,
          isCompleted: !item.isCompleted
        }
      }else{
        return item
      }
    })
    setTodos(newItems)
  }
  const selectAll = () =>{
    const newItems = todos.map((item,index)=>{
      return {
          ...item,
          isCompleted: true,
        }
    })
    setTodos(newItems)
  }
  const textDecorationStyle = (isChecked) => isChecked ? 'line-through' : 'none';
  useEffect(() => {
    let count =todos.length;
    console.log(count);
    todos.forEach((todo,index)=>{
      if(todo.isCompleted === true)
      {
        count=count-1;
      }
    });
    setOnGoingCount(count)
  }, [todos]);

  return (
    <div className="App">
      <header className="App-header" >
        {!isDarkMode && <img src={bg_desktop_light} alt="logo" />}
        {isDarkMode && <img src={bg_desktop_dark} alt="logo" />}
      </header>
      <div className= {
          isDarkMode? 'Container light':'Container dark'
        } style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='Container'>
          <header>
            <span className='heading'>TODO</span>
            <span>
              {!isDarkMode && <img src={icon_moon} onClick={enableDarkMode} />}
              {isDarkMode && <img src={icon_sun} onClick={enableLightMode} />}
            </span>
          </header>
          <div>
            <input placeholder='Create a new To do' onKeyDown={addToDo}></input>
          </div>
            <div style={{ backgroundColor: 'white', width: '100%' }}>
              
              <ul>
              {todos.map((todo, index) => (
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                  {/* <div>
                    <div>
                      <img src={icon_check}/>
                    </div>
                    <div>
                      
                          <li key={index}>{todo}</li>
                    </div>
                      
                  </div> */}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <input type="checkbox" checked={todo.isCompleted} onChange={()=>handleCheckboxChange(index)}/>
                    <li key={index}>
                      <p style={{textDecoration: textDecorationStyle(todo.isCompleted)}}>{todo.title}</p>
                    </li>
                  </div>
                  
                  <div>
                    <img src={icon_cross} style={{marginRight:'10px'}} onClick={()=>deleteTodo(index)}/>
                  </div>
                </div>
              ))}
              <li> 
                <div className='footer'>
                  <span>{onGoingCount} items left</span>
                  <span onClick={selectAll}>All</span>
                  <span>Active</span>
                  <span>Completed</span>
                  <span>Clear Completed</span>
                </div>
              </li>
              </ul>
            </div>
          
          {/* <InputGroup className="mb-3">
            <Form.Control aria-label="Text input with checkbox" type='text' placeholder="Create a new To Do" onKeyDown={addToDo}/>
          </InputGroup>
          <div className='list'>
          <ListGroup>
            {todos.map((todo, index) => (
              <ListGroup.Item key={index}>{todo}</ListGroup.Item>
            ))}
          </ListGroup>
          </div> */}
        </div>
      </div>

    </div>
  );
}

export default App;
