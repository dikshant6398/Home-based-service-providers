import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';
import axios from 'axios';
import url from '../url';
import Spinner from '../spinner/Spinner';

const Logout = () => {
  const { dispatch, state: { socket } } = useContext(userContext);
  const navigate = useNavigate();

  const callLogOut = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (token && token !== "null" && token !== "undefined") {
        await axios.get(`${url}/api/client/signout`, {
          headers: {
            Authorization: token,
            Accept: "application/json",
          },
        });
      }
    } catch (err) {
      console.log("Server logout notice (handled):", err.message);
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
      localStorage.removeItem("city");
      localStorage.removeItem("postalCode");
      dispatch({ type: "offline" });
      dispatch({ type: "location", payload: { city: 'default', postalCode: 0 } });
      navigate('/');
    }
  };

  useEffect(() => {
    callLogOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Spinner />;
};

export default Logout;