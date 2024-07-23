import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from 'axios';

function Home() {
    const [notes, setNotes] = useState([]);
    const [token, setToken] = useState('');

    const getNotes = async (token) => {
        try {
            const res = await axios.get('https://notes-backend-5zui.onrender.com/api/notes', {
                headers: { Authorization: token }
            });
            setNotes(res.data);
        } catch (err) {
            console.error("Error fetching notes:", err);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('tokenStore');
        setToken(storedToken);
        if (storedToken) {
            getNotes(storedToken);
        }
    }, []);

    const deleteNote = async (id) => {
        try {
            if (token) {
                await axios.delete(`https://notes-backend-5zui.onrender.com/api/notes/${id}`, {
                    headers: { Authorization: token }
                });
                // Refresh the notes after deletion
                getNotes(token);
            }
        } catch (error) {
            console.error("Error deleting note:", error);
            window.location.href = "/";
        }
    };

    return (
        <div className='note-wrapper'>
            {notes.length > 0 ? notes.map(note => (
                <div className='card' key={note._id}>
                    <h4 title={note.title}>{note.title}</h4>
                    <div className='text-wrapper'>
                        <p>{note.content}</p>
                    </div>
                    <p className='date'>{format(note.date)}</p>
                    <div className='card-footer'>
                        {note.name}
                        <Link to={`edit/${note._id}`}>Edit</Link>
                    </div>
                    <button className='close' onClick={() => deleteNote(note._id)}>X</button>
                </div>
            )) : <p>No notes available</p>}
        </div>
    );
}

export default Home;
