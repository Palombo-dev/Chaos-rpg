import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import CreateCharacterForm from './components/CreateCharacterForm';
import './index.css';


const App: React.FC = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create" element={<CreateCharacterForm />} />
    </Routes>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
