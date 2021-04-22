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
  const [titleValueChanger, setTitleValueChanger] = useState('')
  const [valueChanger, setValueChanger] = useState('')
  const [posts, loading] = useCollectionData(
    firestore.collection('posts').orderBy('createdAt')
  )

  firestore.collection('posts').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      firestore.collection('posts').doc(doc.id).update({
        docToken: doc.id
      })
    })
  })

  const postMessage = async (e) => {
    if (user) {
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
    } else {
      alert('Авторизуйтесь, пожалуйста')
    }
  }

  const deletePost = async (e) => {
    let postToken = e.target.getAttribute('data-id');
    firestore.collection('posts').doc(postToken).delete();
  }

  const updatePost = async (e) => {
    const postToken = e.target.getAttribute('data-id');
    const inputBlock = e.target.closest('.jumbotron').querySelector('.input-group__doc-change');
    let postTitle = e.target.closest('.jumbotron').querySelector('.input-title').value;
    let postText = e.target.closest('.jumbotron').querySelector('.input-message').value;

    firestore.collection('posts').doc(postToken).update({
      title: postTitle,
      text: postText,
    });

    inputBlock.classList.remove('active')
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
        { posts.length ?
          posts.map((post, index) =>
            <div className="jumbotron position-relative" key={index}>
              <h1 className="display-4">{post.title}</h1>
              <p className="lead">{post.text}</p>
              <hr className="my-4"/>
              <p>Author: {post.displayName} / {post.email}</p>
              { user && user.uid === post.uid ?
                <div className="d-flex justify-content-end" style={{position:'absolute',top:'1rem',right:'1rem'}}>
                  <button type="button" className="close mr-2" style={{fontSize: '1rem'}} data-id={post.docToken} onClick={(e) => e.target.closest('.jumbotron').querySelector('.input-group__doc-change').classList.toggle('active')} aria-label="Close">
                    change
                  </button>
                  <button type="button" className="close" style={{fontSize: '1rem'}} data-id={post.docToken} onClick={(e) => deletePost(e)} aria-label="Close">
                    delete
                  </button>
                </div>
                :
                false
              }
              <div className="input-group m-2 position-absolute input-group__doc-change" style={{bottom:'0',left:'0'}}>
                <input type="text" className="form-control input-title" style={{width:'25%',borderRadius:'.25rem 0 0 .25rem'}} onChange={event => setTitleValueChanger(event.target.value)} defaultValue={post.title} placeholder="Title"/>
                <input type="text" className="form-control input-message mr-2" style={{width:'65%',borderRadius:'0 .25rem .25rem 0'}} onChange={event => setValueChanger(event.target.value)} defaultValue={post.text} placeholder="Message"/>
                <button className="btn btn-outline-success" type="button" data-id={post.docToken} onClick={(e) => updatePost(e)}>Update</button>
              </div>
            </div>
          )
          :
          <div className="text-center font-italic m-5">Нет постов</div>
        }
      </div>
    </div>
  )
}

export default Posts