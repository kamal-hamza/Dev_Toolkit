import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import moment from 'moment';
import axios from 'axios';
import './Calendar.css';

const CSRF_TOKEN_URL = 'http://127.0.0.1:8000/csrfToken/';
const RETURN_TASKS_URL = 'http://127.0.0.1:8000/return_tasks/';
const CREATE_TASKS_URL = 'http://127.0.0.1:8000/create_task/';
const RETURN_USER_URL = 'http://127.0.0.1:8000/return_user/';

const Calendar = () => {

    ReactModal.setAppElement('#root');

    const [user, setUser] = useState(null);
    const [csrfToken, setCsrfToken] = useState('');
    const [currentMonth, setCurrentMonth] = useState(moment());
    const [popupVisible, setPopupVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [viewTaskForm, setViewTaskForm] = useState(false);
    const [taskForm, setTaskForm] = useState({
        user: null,
        title: '',
        description: '',
        deadline: '',
    });

    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    };

    const toggleTaskForm = () => {
        setViewTaskForm(!viewTaskForm);
    };

    useEffect(() => {
        ReactModal.setAppElement('#root');
    }, []);

    const getUserToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            return token;
        }
        else {
            return console.error("Token not found");
        }
    }

    useEffect(() => {
        let isMounted = true;
        const fetchUser = async () => {
            const token = getUserToken();
            if (!token) {
                console.error('Token not found. User is not logged in');
                return;
            }
            try {
                const response = await axios.get(RETURN_USER_URL, {
                    headers: {
                        'Authorization': 'Token ' + token,
                    },
                });
                if (isMounted) {
                    setUser(response.data.id);
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        if (!user) {
            fetchUser();
        }
        return () => {
            isMounted = false;
        }
    }, [user]);
    

    useEffect(() => {                                                                                 
        const fetchData = async () => {
            try {
                const response = await axios.get(CSRF_TOKEN_URL);
                setCsrfToken(response.data.csrfToken);
            } catch (error) {
                console.error("An error occurred while fetching CSRF token:", error);
            }
        };

        if (!csrfToken) {
            fetchData();
        }
    }, [csrfToken]);

    const nextMonth = () => setCurrentMonth((prevMonth) => prevMonth.clone().add(1, 'month'));
    const prevMonth = () => setCurrentMonth((prevMonth) => prevMonth.clone().subtract(1, 'month'));

    const handleDayClick = async (day) => {
        try {
            setCurrentDate(day);
            console.log("Prinitng inside handle day click...");
            console.log(currentDate);
            const token = getUserToken();
            if (!token) {
                console.error('Token not found. User is not logged in');
                return;
            }
            const response = await axios.post(RETURN_TASKS_URL, { day }, {
                headers: {
                'X-CSRFToken': csrfToken,
                'Authorization': 'Token ' + token,
                }
            }); 
            if (response.data.tasks.length > 0) {
                const task = response.data.tasks;
                if (task) {
                    setTasks(task);
                }
                else {
                    setTasks([]);
                    setCurrentDate('');
                    togglePopup();
                }
            }
            
            togglePopup();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setTaskForm((prevTaskForm) => ({
            ...prevTaskForm,
            deadline: currentDate,
        }));
    }, [currentDate]);

    const renderHeader = () => (
        <div className='header'>
            <div className='container'>
                <div className='button-container'>
                    <button onClick={prevMonth} className='btn-btn-large'>
                        <span className='btn-logo'>
                            <IoIosArrowBack className='left-arrow'/>
                        </span>
                        <span className='btn-text'>Previous</span>
                    </button>
                </div>
                <div className='title-container'>
                    <h1 className='title'>{currentMonth.format('MMMM YYYY')}</h1>
                </div>
                <div className='button-container'>
                    <button onClick={nextMonth} className='btn-btn-large'>
                        <span className='btn-text'>Next</span>
                        <span className='btn-logo'>
                            <IoIosArrowForward className='right-arrow'/>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );

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
        const filteredDays = days.filter((d) => moment(d.key).format('dddd') === weekday);
        return filteredDays;
    };

    const renderDays = () => {
        const weekdays = moment.weekdays();
        return weekdays.map((day) => (
            <div key={day} className='weekday'>
                {day}
                {renderCells(day)}
            </div>
        ));
    };

    const handleTaskFormSubmit = async () => {
        const token = getUserToken();
        if (!token) {
            console.error('Token not found. User is not logged in');
            return;
        }
        try {
            console.log(taskForm);
            axios.post(CREATE_TASKS_URL, taskForm, {
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Authorization': 'Token ' + token,
                },
            });
        togglePopup();
        } catch (error) {
            console.log(error);
        }
    };

    const handleTaskFormChange = (e) => {
        setTaskForm((prevTaskForm) => ({
            ...prevTaskForm,
            [e.target.name]: e.target.value,
            deadline: currentDate,
            user: user,
        }));
    };
    

    const popupContent = () => {
        if (viewTaskForm) {
            return (
                <div>
                    <form onSubmit={handleTaskFormSubmit}>
                        <label>Title</label>
                        <input name='title' onChange={handleTaskFormChange}/>
                        <label>Description</label>
                        <input name='description' onChange={handleTaskFormChange}/>
                        <label>DeadLine</label>
                        <input name='deadline' value={taskForm.deadline} onChange={handleTaskFormChange} readOnly/>
                        <button type='submit'>Add</button>
                    </form>
                    <button type="button" onClick={toggleTaskForm}>Close</button>
                </div>
            );
        }
        else {
            return (
                <div id='tasks'>
                    {tasks.map((task) => (
                        <div key={task.title}>{task.title}</div>
                    ))}
                    <button onClick={() => togglePopup()}>X</button>
                    <button onClick={() => toggleTaskForm()}>Add Task + </button>
                </div>
            );
        }
    };

    return (
        <div className='calendar'>
            {renderHeader()}
            <div className='calendar'>
                <div className='container'>
                    {renderDays()}
                </div>
            </div>
            <ReactModal isOpen={popupVisible} onRequestClose={() => togglePopup()} className="modal" overlayClassName="modal">
                <div className='popupContent'>
                    {popupContent()}
                </div>
            </ReactModal>
        </div>
    );

};

export default Calendar;