import { BrowserRouter, Route, Routes } from "react-router-dom";
import PastelesList from './components/PastelesList.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PastelesList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
