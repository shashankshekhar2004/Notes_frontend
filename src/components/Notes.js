import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './notes/Nav';
import Home from './notes/Home';
import CreateNotes from './notes/CreateNotes';
import EditNotes from './notes/EditNotes';

function Notes({ setIsLogin }) {
  return (
    <Router>
      <div className='notes-page'>
        <Header setIsLogin={setIsLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateNotes />} />
          <Route path='/edit/:id' element={<EditNotes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Notes;
