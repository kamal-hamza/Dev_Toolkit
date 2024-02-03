import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserSignUp from './components/UserSignup/UserSignUp.js';
import UserLogin from './components/UserLogin/UserLogin.js'
import Calendar from './components/Calendar/Calendar.js';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/signup' element={<UserSignUp />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/calendar' element={<Calendar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
