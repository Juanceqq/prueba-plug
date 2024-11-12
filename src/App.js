// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PastelesList from './components/PastelesList.js'
import CreatePastel from './components/CreatePastel.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PastelesList/>}></Route>
        <Route path='/create' element={<CreatePastel/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
