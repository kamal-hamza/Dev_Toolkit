import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserList from './components/UserList.js';
import UserSignUp from './components/UserSignUp.js';
import UserLogin from './components/UserLogin.js'

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/signup' element={<UserSignUp />} />
          <Route path='/userAPI' element={<UserList />} />
          <Route path='/login' element={<UserLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
