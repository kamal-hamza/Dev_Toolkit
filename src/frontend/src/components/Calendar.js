import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios'
import '../CSS/Calendar.css'

const Calendar = () => {

    const [csrfToken, setCsrfToken] = useState('');
    const [currentMonth, setCurrentMonth] = useState(moment());

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/csrfToken/');
                setCsrfToken(response.data.csrfToken);
            } catch (error) {
                console.log("An error occured while fetching csrf token:", error);
            }
        };
        if (!csrfToken) {
            fetchCsrfToken();    
        }
    }, [csrfToken]);

    const nextMonth = () => {
        setCurrentMonth(currentMonth.clone().add(1, 'month'));
    };

    const prevMonth = () => {
        setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
    };

    const renderHeader = () => {
        return (
            <div className='header'>
                <h2>{currentMonth.format('MMMM YYYY')}</h2>
                <div>
                    <button onClick={prevMonth} className='prev_button'>Previous</button>
                    <button onClick={nextMonth} className='next_button'>Next</button>
                </div>
            </div>
        );
    };

    const renderCells = (weekday) => {
        const monthStart = currentMonth.clone().startOf('month');
        const monthEnd = currentMonth.clone().endOf('month');
        const startDate = monthStart.clone().subtract(monthStart.day(), 'days');
        const endDate = monthEnd.clone().add(6 - monthEnd.day(), 'days');

        const days = [];
        let day = startDate.clone();

        while (day.isBefore(endDate, 'day')) {
            const day_val = day.format('YYYY-MM-DD');
            days.push(
                <div
                    key={day.format('YYYY-MM-DD')}
                    className={`day ${day.isSame(currentMonth, 'month') ? '' : 'inactive'}`}
                    onClick={() => handleDayClick(day_val)}
                >
                    {day.format('D')}
                </div>
            );
            day.add(1, 'day');
        }
        const filteredDays = days.filter(d => moment(d.key).format('dddd') === weekday);
        return filteredDays;
    };

    const renderDays = () => {
        const weekdays = moment.weekdays();
        return weekdays.map(day => (
            <div key={day} className='weekday'>
                {day}
                {renderCells(day)}
            </div>
        ));
    };

    

    const handleDayClick = async (day) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found. user is not logged in');
                return;
            }
            const response = await axios.post('http://127.0.0.1:8000/return_tasks/', {day}, {
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Authorization': 'Token ' + token,
                }
            });
            console.log(response.data.tasks)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='calendar'>
            {renderHeader()}
            <div className='days'>{renderDays()}</div>
        </div>
    );
};

export default Calendar;