import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

class MyCalendar extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (<Calendar locale="en-EN"/>);
    }
}

export default Calendar;

