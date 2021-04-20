import React, {useContext} from "react"
import {Context} from "../../index";
import firebase from "firebase";

const Login = () => {
  const {auth} = useContext(Context)
  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const {user} = await auth.signInWithPopup(provider)
    console.log(user)
  }
  return (
    <div className="container">
      <button className="btn btn-outline-success my-2 my-sm-0" onClick={login}>Войти</button>
    </div>
  )
}

export default Login