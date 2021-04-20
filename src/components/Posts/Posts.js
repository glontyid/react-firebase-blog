import React, {useContext, useState} from "react"
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "../loader";
import firebase from "firebase";

const Posts = () => {
  const {auth, firestore} = useContext(Context)
  const [user] = useAuthState(auth);
  const [value, setValue] = useState('')
  const [titleValue, setTitleValue] = useState('')
  const [posts, loading] = useCollectionData(
    firestore.collection('posts').orderBy('createdAt')
  )

  const postMessage = async (e) => {
    const inputTitle = e.target.closest('.input-group').querySelector('.input-title');
    const inputMessage = e.target.closest('.input-group').querySelector('.input-message');

    if (value.length > 0 && titleValue.length > 0) {
      firestore.collection('posts').add({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        title: titleValue,
        text: value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })

      setValue('')
      setTitleValue('')

      inputMessage.classList.remove('alert-danger');
      inputMessage.classList.remove('alert-success');
      inputTitle.classList.remove('alert-danger');
      inputTitle.classList.remove('alert-success');
    } else {
      if (inputTitle.value.length < 1) {
        inputTitle.classList.add('alert-danger');
      } else {
        inputTitle.classList.add('alert-success');
      }

      if (inputMessage.value.length < 1) {
        inputMessage.classList.add('alert-danger');
      } else {
        inputMessage.classList.add('alert-success');
      }
    }
  }

  const deletePost = async (e) => {
    e.stopPropagation();
    let currentPost = e.target.getAttribute('data-id')
    firestore.collection('posts').doc(currentPost).delete()
  }

  if (loading) {
    return <Loader/>
  }

  return (
    <div className="container">
      <div className="input-group mb-2">
        <input type="text" className="form-control input-title" style={{width:'25%',borderRadius:'.25rem 0 0 .25rem'}} onChange={event => setTitleValue(event.target.value)} value={titleValue} placeholder="Title"/>
        <input type="text" className="form-control input-message mr-2" style={{width:'65%',borderRadius:'0 .25rem .25rem 0'}} onChange={event => setValue(event.target.value)} value={value} placeholder="Message"/>
        <button className="btn btn-outline-primary" type="button" onClick={(e) => postMessage(e)}>Add post</button>
      </div>
      <div>
        {posts.map((post, index) =>
          <div className="jumbotron" key={index}>
            <h1 className="display-4">{post.title}</h1>
            <p className="lead">{post.text}</p>
            <hr className="my-4"/>
              <p>Author: {post.displayName} / {post.email}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Posts