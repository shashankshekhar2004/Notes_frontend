import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditNote() {
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: '',
        id: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getNote = async () => {
            try {
                const token = localStorage.getItem('tokenStore');
                if (id && token) {
                    const res = await axios.get(`/api/notes/${id}`, {
                        headers: { Authorization: token }
                    });
                    setNote({
                        title: res.data.title,
                        content: res.data.content,
                        date: new Date(res.data.date).toISOString().split('T')[0],
                        id: res.data._id
                    });
                }
            } catch (err) {
                setError('Failed to fetch note. Please try again.');
            }
        };
        getNote();
    }, [id]);

    const onChangeInput = e => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value });
    };

    const editNote = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('tokenStore');
            if (token) {
                const { title, content, date, id } = note;
                const newNote = { title, content, date };

                await axios.put(`/api/notes/${id}`, newNote, {
                    headers: { Authorization: token }
                });
                
                // Provide feedback to the user
                // alert('Note updated successfully!');
                navigate('/');
            }
        } catch (err) {
            setError('Failed to update note. Please try again.');
        }
    };

    return (
        <div className="create-note">
            <h2>Edit Note</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={editNote} autoComplete="off">
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={note.title} id="title"
                    name="title" required onChange={onChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" value={note.content} id="content"
                    name="content" required rows="10" onChange={onChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="date">Date</label>
                    <input type="date" value={note.date} id="date"
                    name="date" onChange={onChangeInput} />
                </div>

                <button type="submit">Save</button>
            </form>
        </div>
    );
}
