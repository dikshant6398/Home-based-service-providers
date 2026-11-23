import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';
import axios from 'axios';
import url from '../url';
import Spinner from '../spinner/Spinner';

const Login = () => {
  const navigate = useNavigate();
  const { dispatch, state: { socket } } = useContext(userContext);

  const callLogOut = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (token && token !== "null" && token !== "undefined") {
        await axios.get(`${url}/api/provider/signout`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (err) {
      console.log("Server provider logout notice (handled):", err.message);
    } finally {
      // ALWAYS clear local state and navigate regardless of server response
      if (socket && typeof socket.disconnect === 'function') {
        socket.disconnect();
      }
      sessionStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("onLine");
      dispatch({ type: "offline" });
      navigate('/');
    }
  };

  useEffect(() => {
    callLogOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Spinner />;
};

export default Login;