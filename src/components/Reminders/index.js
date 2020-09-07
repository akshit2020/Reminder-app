import React, { useState } from "react";
import "./timeline.scss"
const Timeline = ({ handleAddNew, date, events }) => {

    let [timelineExpanded, toggleTimeline] = useState(false);

    const handleClick = (e) => {
        toggleTimeline(!timelineExpanded)

    };

    const addNew = () => {
        handleAddNew();
    }

    const populateDate = () => (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
    const populateDay = () => {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const oneDay = 24 * 60 * 60 * 1000;
        const currDate = new Date();
        const selDate = date;
        let dayVal;
        const diffDays = Math.round(Math.abs((currDate - selDate) / oneDay));

        if(diffDays === 0){
            dayVal = "Today"
        }else if(diffDays <= 6){
            dayVal = "This "+days[date.getDay()]
        }else{
            dayVal = days[date.getDay()]
        }
        return dayVal;
    }


    return (
        <div className={`main-cont timeline ${timelineExpanded ? 'timeline__active' : ''}`} onClick={handleClick}>
            <div className="timeline__topbar">
                <div className="timeline__day">{populateDay()}</div>
                <div className="timeline__date">{populateDate()}</div>
                <div className="timeline__addnew" onClick={addNew}>Add New</div>
            </div>
            <div className="timeline__container">
                {events && events.map(({ title, startTime, endTime, date, location }, index) => (
                    <div className="timeline__row" key={`${startTime}_${index}`}>
                        <div className="timeline__rem-title">{title}</div>
                        <div className="timeline__rem-loc">{location}</div>
                        <div className="timeline__rem-time">{startTime}- {endTime}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Timeline