import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserList from './components/UserList.js';
import UserCreationForm from './components/UserCreationForm.js';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/create_user' element={<UserCreationForm />} />
          <Route path='/userAPI' element={<UserList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
