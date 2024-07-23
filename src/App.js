import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notes from './components/Notes';
import Login from './components/Login';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = localStorage.getItem('tokenStore');
        if (token) {
          const verified = await axios.get('https://notes-backend-5zui.onrender.com/users/verify', {
            headers: { Authorization: token },
          });
          setIsLogin(verified.data);
          if (!verified.data) localStorage.clear();
        } else {
          setIsLogin(false);
        }
      } catch (err) {
        console.error(err);
        setIsLogin(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <div className="App">
      {isLogin ? <Notes setIsLogin={setIsLogin} /> : <Login setIsLogin={setIsLogin} />}
    </div>
  );
}

export default App;
