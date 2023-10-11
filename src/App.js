import React, { useEffect } from 'react';
import SideBar from './SideBar';
import './App.css';
import Chat from './Chat';
import { login, selectUser, logout } from "./features/userSlice";
import Login from './Login';
import { useDispatch, useSelector} from "react-redux";
import { auth } from './firebase';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {

      if (authUser){
        dispatch(login({
          uid : authUser.uid,
          photo : authUser.photoURL,
          email : authUser.email,
          displayName : authUser.displayName,
        }));
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch])
  return (
    <div className="app">
      {user ? (
        <>
          <SideBar />
          <Chat />
        </>

      ) : (
        <Login />
      )

      }

    </div>
  );
}

export default App;
