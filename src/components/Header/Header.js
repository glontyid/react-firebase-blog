import React, {useContext} from 'react'
import {Route} from "react-router-dom";
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "firebase";

const Header = (props) => {
  const {auth} = useContext(Context)
  const [user] = useAuthState(auth);
  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const {user} = await auth.signInWithPopup(provider)
    console.log(user)
  }
  return (
    <nav className="container navbar navbar-light justify-content-between" style={{height:'66px'}}>
      <Route to={'/'} className="navbar-brand">

        {user ?
          <div>
          <span className="mr-2"><img src={user.photoURL} alt={user.photoURL} style={{borderRadius: '50%', width:'50px', height:'50px'}}/></span>
          <span>{user.displayName}</span>
          </div>
          :
          <span>Пользователь не автоизован</span>
        }

      </Route>
      {user ?
        <button onClick={() => auth.signOut()} className="btn btn-outline-danger my-2 my-sm-0" type="submit">Sign out</button>
      :
        <button onClick={login} className="btn btn-outline-success my-2 my-sm-0" type="submit">Sign in</button>
      }
    </nav>
  )
}

export default Header;