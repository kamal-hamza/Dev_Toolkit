import { useState } from 'react';
import moment from 'moment';
import '../CSS/Calendar.css'

const Calendar = () => {

    const [currentMonth, setCurrentMonth] = useState(moment());

    const nextMonth = () => {
        setCurrentMonth(currentMonth.clone().add(1, 'month'));
    };

    const prevMonth = () => {
        setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
    };

    const renderHeader = () => {
        return (
            <div className='header'>
                <button onClick={prevMonth}>Previous</button>
                <h2>{currentMonth.format('MMMM YYYY')}</h2>
                <button onClick={nextMonth}>Next</button>
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = currentMonth.clone().startOf('month');
        const monthEnd = currentMonth.clone().endOf('month');
        const startDate = monthStart.clone().subtract(monthStart.day(), 'days');
        const endDate = monthEnd.clone().add(6 - monthEnd.day(), 'days');
    
        const days = [];
        let day = startDate.clone();
    
        while (day.isBefore(endDate, 'day')) {
            days.push(
                <div
                    key={day.format('YYYY-MM-DD')} 
                    className={`day ${day.isSame(currentMonth, 'month') ? '' : 'inactive'}`} 
                    onClick={() => handleDayClick(day)}
                >
                    {day.format('D')}
                </div>
            );
            day.add(1, 'day');
        }
        return days;
    };


    const renderDays = () => {
            const weekdays = moment.weekdays();
            return weekdays.map(day => (
                <div key={day} className='day'>
                    {day}
                </div>
            ));
    };

    

    const handleDayClick= (day) => {
        // Implement check for tasks in this day
    }

    return (
        <div className='calendar'>
            {renderHeader()}
            <div className='days'>{renderDays()}</div>
            <div className='cells'>{renderCells()}</div>
        </div>
    );
};

export default Calendar;