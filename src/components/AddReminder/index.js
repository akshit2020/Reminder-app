import React, { useState, useContext } from "react";
import "./addreminder.scss";
import { store } from '../../store';


const AddReminder = ({ date, handleAddNew }) => {
    const [reminderDate, setReminderDate] = useState(date || new Date());
    const [title, setTitle] = useState("");
    const remStarttime = new Date().toLocaleTimeString().split(':')[0]+':'+new Date().toLocaleTimeString().split(':')[1];
    let newDateObj = new Date(new Date().getTime() + 30*60000) // reminder end time
    const remEndtime = newDateObj.toLocaleTimeString().split(':')[0]+':'+newDateObj.toLocaleTimeString().split(':')[1];;
    const [startTime, setStartTime] = useState(remStarttime)
    const [endTime, setEndTime] = useState(remEndtime)
    const [location, seLocation] = useState("")
    const globalState = useContext(store);
    const { dispatch } = globalState;
    let[animateCont, animateContfn] = useState(false);
    let [titleErr, errToggle] = useState(false);
    let [locErr, locerrToggle] = useState(false);
    let [starttimeErr, starterrToggle] = useState(false);
    let [endtimeErr, enderrToggle] = useState(false);
    let [dateErr, dateerrToggle] = useState(false);

    const hideReminder = () => {
        handleAddNew();
    }
    const handleDateChange = (e) => {
        setReminderDate(e.target.value)
    }

    const validationSuccess = () => {
        
        let flag = true;
        let titleVal = title.replace(/\s/g, '');
        let locVal = location.replace(/\s/g, '');
        if(titleVal.length === 0){
            errToggle(true)
            flag = false;
        }

        if(reminderDate === ''){
            dateerrToggle(true)
            flag = false;
        }

        if(startTime === ''){
            starterrToggle(true)
            flag = false;
        }

        if(endTime === ''){
            enderrToggle(true)
            flag = false;
        }

        if(endTime.split(':').join('') < startTime.split(':').join('')){
            starterrToggle(true)
            enderrToggle(true)
            flag = false;
        }

        if(locVal.length === 0){
            locerrToggle(true)
            flag = false;
        }

        return flag;
    }

    const submitEvent = () => {
        if(validationSuccess()){
            dispatch({
                type: "ADD_EVENT",
                title,
                startTime,
                endTime,
                reminderDate, 
                location
            })
            // handleAddNew()
            animateContfn(true)

            setTimeout(() => {
                // handleAddNew()
                animateContfn(false)
            }, 800);
        }
    }

    return (
        <div className="new_reminder">
            {animateCont && <div className="success__msg">Reminder added Successfully</div>}
            <span className="new_reminder__close" onClick={hideReminder}>X</span>
            <h1>Add New Reminder</h1>
            <div className={`${titleErr ? 'show-err' : ''}`}><input type="text" placeholder="Add title" value={title} onChange={(e) => { setTitle(e.target.value) }} onFocus={() => {errToggle(false)}}/></div>
            <div className={`${dateErr ? 'show-err' : ''}`}><input type="date" value={reminderDate} placeholder={reminderDate} onChange={handleDateChange} onFocus={() => {dateerrToggle(false)}}/></div>
            <div className={`${starttimeErr ? 'show-err':''}`}><input type="time" value={startTime} onChange={(e) => { setStartTime(e.target.value) }} onFocus={() => {starterrToggle(false)}}/></div>
            <div className={`${endtimeErr ? 'show-err':''}`}> <input type="time" value={endTime} onChange={(e) => { setEndTime(e.target.value) }} onFocus={() => {enderrToggle(false)}}/></div>
            <div className={`${locErr ? 'show-err':''}`}><input type="text" value={location} onChange={(e) => { seLocation(e.target.value) }} onFocus={() => {locerrToggle(false)}}/></div>
            <div className="new_reminder__add" onClick={submitEvent}>Add</div>
        </div>
    )
}

export default AddReminder