import React, { useState, useEffect, useContext } from 'react';
import Timeline from "./components/Reminders";
import AddReminder from "./components/AddReminder";
import { store } from './store.js';
import './App.scss';
import Calendar from 'react-calendar';

const App = () => {
  const [date, setDate] = useState(new Date());
  let [isAddNewOpen, showHideAddNew] = useState(false)

  const handleAddNew = () => {
    showHideAddNew(!isAddNewOpen)
  };

  const { state } = useContext(store);

  
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(state));
  });

  const formattedDate = date.toLocaleDateString().split("/").reverse().join("-")
  
  const attachRem = (activeStartDate, date, view) => {
    let fetchedDate = activeStartDate.date.toLocaleDateString().split("/").reverse().join("-");
    let classApp;
    const dots = state[fetchedDate] ? state[fetchedDate].length : 0;
    if(dots >= 3){
      classApp = 'dots reminders__three'
    }else if(dots === 2){
      classApp = 'dots reminders__two'
    }else if(dots === 1){
      classApp = 'dots reminders__one'
    }

    if(dots !== 0){
      return <span className={classApp}></span>;
    }
  }

  return (
    <div className="App">
      <div className="container">
        <Calendar
          onChange={setDate}
          value={date}
          prev2Label={null}
          next2Label={null}
          tileContent = {(activeStartDate, date, view) => (attachRem(activeStartDate, date, view))}
        />
        {isAddNewOpen ?
          <AddReminder date={formattedDate} handleAddNew={handleAddNew} />
          :
          <Timeline date={date} handleAddNew={handleAddNew} events={state[formattedDate]} />}
      </div>
    </div>
  );
}

export default App;
