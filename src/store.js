import React, { createContext, useReducer } from 'react';

const initialState = JSON.parse(localStorage.getItem("reminders") || "{}")
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {

    switch (action.type) {
      case 'ADD_EVENT':
        const {
          title,
          startTime,
          endTime,
          reminderDate, location
        } = action

        const dateEvents = state[reminderDate] || [];
        return { ...state, [reminderDate]: [...dateEvents, { title, startTime, endTime, reminderDate, location }] } // do something with the action

      default:
        return { ...state }
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }