// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import"bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Itemdetail from './Components/Itemdetail.jsx';
import Search from './Components/Search.jsx';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
    <Route path="/" element={<Search />} />
    <Route path="/item/:id" element={<Itemdetail />} />
    </Routes>
  </Router>
)
