import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateNotes() {
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: ''
  });
  const navigate = useNavigate();

  const onChangeInput = e => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const createNote = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('tokenStore');
      if (token) {
        const { title, content, date } = note;
        const newNote = { title, content, date };

        await axios.post('/api/notes', newNote, {
          headers: { Authorization: token }
        });

        navigate('/');
      } else {
        alert("No token found. Please log in.");
      }
    } catch (err) {
      console.error("Error creating note:", err);
      alert("Failed to create note. Please try again.");
    }
  };

  return (
    <div className='create-note'>
      <h2>Create Note</h2>
      <form onSubmit={createNote} autoComplete='off'>
        <div className='row'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            value={note.title}
            id='title'
            name='title'
            required
            onChange={onChangeInput}
          />
        </div>
        <div className='row'>
          <label htmlFor='content'>Content</label>
          <textarea
            type='text'
            value={note.content}
            id='content'
            name='content'
            required
            rows="10"
            onChange={onChangeInput}
          />
        </div>
        <div className='row'>
          <label htmlFor='date'>Date</label>
          <input
            type='date'
            value={note.date}
            id='date'
            name='date'
            onChange={onChangeInput}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default CreateNotes;
