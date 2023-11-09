
import './App.css';
import React, { useState, useEffect } from 'react';
import bg_desktop_light from './images/bg-desktop-light.jpg';
import bg_desktop_dark from './images/bg-desktop-dark.jpg';
import bg_mobile_light from './images/bg-mobile-light.jpg';
import bg_mobile_dark from './images/bg-mobile-dark.jpg';
import icon_moon from './images/icon-moon.svg';
import icon_sun from './images/icon-sun.svg';
import icon_cross from './images/icon-cross.svg';
import icon_check from './images/icon-check.svg';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  const [isDarkMode, setIsdarkMode] = useState(false);
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
      setValue("");
    }
  }
  const enableDarkMode = (e) => {
    setIsdarkMode(true);
  }
  const enableLightMode = (e) => {
    setIsdarkMode(false);
  }
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  }
  const handleCheckboxChange = (idx) => {
    const newItems = todos.map((item, index) => {
      if (idx === index) {
        return {
          ...item,
          isCompleted: !item.isCompleted
        }
      } else {
        return item
      }
    })
    setTodos(newItems)
  }
  const selectAll = () => {
    const newItems = todos.map((item, index) => {
      return {
        ...item,
        isCompleted: true,
      }
    })
    setTodos(newItems)
  }
  const textDecorationStyle = (isChecked) => isChecked ? 'line-through' : 'none';
  const back_color = (isDarkMode) => isDarkMode ? 'black' : 'white';
  const blue_text= (isDarkMode) => isDarkMode ? 'blue' : 'black';
  const onInput =(e) => setValue(e.target.value);
  useEffect(() => {
    let count = todos.length;
    console.log(count);
    todos.forEach((todo, index) => {
      if (todo.isCompleted === true) {
        count = count - 1;
      }
    });
    setOnGoingCount(count)
  }, [todos]);

  const handleDrop = (droppedItem) => {
    if (!droppedItem.destination) return;
    var updatedList = [...todos];
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    setTodos(updatedList);
  };
  return (
    <div className="App" style={{backgroundColor: back_color(isDarkMode)}}>
      {!isDarkMode && <div className="App-header">
        <img src={bg_desktop_light} alt="logo" className='bg-desktop-light'/>
        <img src={bg_mobile_light} alt="logo" className='bg-mobile-light'/>
      </div>
      }
      {isDarkMode && <div className="App-header">
         <img src={bg_desktop_dark} alt="logo" className='bg-desktop-dark'/>
         <img src={bg_mobile_dark} alt="logo" className='bg-mobile-dark'/>
      </div>
      }
      {/* <div className= {
          isDarkMode? 'Container light':'Container dark'
        } style={{ display: 'flex', justifyContent: 'center' }}> */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='Container'>
          <header>
            <span className='heading'>TODO</span>
            <span>
              {!isDarkMode && <img src={icon_moon} onClick={enableDarkMode} />}
              {isDarkMode && <img src={icon_sun} onClick={enableLightMode} />}
            </span>
          </header>
          <div>
            <input placeholder='Create a new To do' value={value} onInput={onInput} onKeyDown={addToDo}></input>
          </div>
          <div style={{ width: '100%', backgroundColor: back_color(isDarkMode) }}>
          {/* <DragDropContext onDragEnd={handleDrop}>
              <Droppable droppableId="list-container">
                {(provided) => (
                  <div
                    className="list-container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                  {todos.map((todo, index) => (
                      <Draggable key={todo} draggableId={todo} index={index}>
                        {(provided) => (
                          <div
                            className="item-container"
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            {todo.title}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext> */}
            <ul>
              {todos.map((todo, index) => (

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <input type="checkbox" checked={todo.isCompleted} onChange={() => handleCheckboxChange(index)} />
                    <li key={index}>
                      <p style={{ textDecoration: textDecorationStyle(todo.isCompleted),  color: back_color(!isDarkMode) }}>{todo.title}</p>
                    </li>
                  </div>

                  <div>
                    <img src={icon_cross} style={{ marginRight: '10px' }} onClick={() => deleteTodo(index)} />
                  </div>
                </div>
              ))}
              <li>
                <div className='footer'>
                  <span style={{color: blue_text(isDarkMode)}}>{onGoingCount} items left</span>
                    <span className='desktopNavbar' style={{color: blue_text(isDarkMode)}} onClick={selectAll}>All</span>
                    <span className='desktopNavbar' style={{color: blue_text(isDarkMode)}}>Active</span>
                    <span className='desktopNavbar' style={{color: blue_text(isDarkMode)}}>Completed</span>
                    <span style={{color: blue_text(isDarkMode)}}>Clear Completed</span>
                </div>
              </li>

              <li className='mobileNavbar'>
                  <span style={{color: blue_text(isDarkMode)}} onClick={selectAll}>All</span>
                  <span style={{color: blue_text(isDarkMode)}}>Active</span>
                  <span style={{color: blue_text(isDarkMode)}}>Completed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
