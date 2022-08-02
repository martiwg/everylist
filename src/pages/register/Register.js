import { useState, useRef, useContext } from 'react'

import { setDoc, doc, collection, query, where, getDocs } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebaseConfig'

import Div100vh from 'react-div-100vh'

import styles from './Register.module.css'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../Store'
import Toast from '../../components/toast/Toast'

const Register = () => {
  const [state, setState] = useContext(Context)

  const [showLogin, setShowLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const nameRef = useRef()
  const surnameRef = useRef()
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const navigate = useNavigate()
  
  const clearValues = () => {
    setName('')
    setSurname('')
    setUsername('')
    setEmail('')
    setPassword('')
  }

  const addNoti = (message, type) => {
    setState(prev => ({...prev, notis: [
      {message: message, type: type},
      ...prev.notis
    ]}))
  }

  const handleSignUpError = (err) => {
    switch(err.code){
      case 'auth/email-already-in-use':
        addNoti('Email already in use', 'error')
        break
      case 'auth/invalid-email':
        addNoti('Invalid email', 'error')
        emailRef.current.focus()
        break
      case 'auth/weak-password':
        addNoti('Password is too weak', 'error')
        passwordRef.current.focus()
        break
      case 'auth/username-already-in-use':
        addNoti('Username already in use', 'error')
        usernameRef.current.focus()
        break
      default:
        addNoti('Something went wrong', 'error')
        break
    }
  }

  const handleLogInError = (err) => {
    switch(err.code){
      case 'auth/user-not-found':
        addNoti('User not found', 'error')
        emailRef.current.focus()
        break
      case 'auth/wrong-password':
        addNoti('Wrong password', 'error')
        passwordRef.current.focus()
        break
      default:
        addNoti('Something went wrong', 'error')
        break
    }
  }

  const checkIsUsernameTaken = async () => {
    const usernameRef = collection(db, 'users')
    const q = query(usernameRef, where('username', '==', username))
    
    const snapshot = await getDocs(q)
    if(snapshot.size > 0){
      return true
    }
  }

  const handleSignUp = async () => {
    if(loading) return

    if(name.length === 0){
      nameRef.current.focus()
      return
    }
    if(surname.length === 0){
      surnameRef.current.focus()
      return
    }
    if(username.length < 3){
      usernameRef.current.focus()
      return
    }

    setLoading(true)

    const usernameTaken = await checkIsUsernameTaken()

    if(usernameTaken){
      handleSignUpError({ code: 'auth/username-already-in-use' })
      setLoading(false)
      return
    }
    
    try{
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          setDoc(doc(db, 'users', userCredential.user.uid), {
            uid: userCredential.user.uid,
            email: email,
            friends: [],
            name: name,
            surname: surname,
            username: username,
            itemHistory: [],
          })
          .then(() => {
            navigate('/')
          })
        })
        .catch(err => {
          handleSignUpError(err)
        })
    }catch{
      clearValues()
      handleSignUpError({ code: 'auth/unknown-error' })
    }

    setLoading(false)
  }

  const handleLogIn = async () => {
    if(loading) return

    if(email.length === 0){
      emailRef.current.focus()
      return
    }
    if(password.length === 0){
      passwordRef.current.focus()
      return
    }

    setLoading(true)

    try{
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/')
        })
        .catch(err => {
          handleLogInError(err)
        })
    }catch{
      clearValues()
      handleLogInError({ code: 'auth/unknown-error' })
    }

    setLoading(false)
  }
  
  return (
    <Div100vh className='globalContainer' style={{minHeight: 'unset', transition: '.5s ease'}}>
      <Toast />
      <div className='globalWrapper'>
        <div className={styles.container}>
          <div className={styles.title}>
            {
              showLogin ? 'Log In!' : 'Sign Up!'
            }
          </div>
          {
            !showLogin &&
            <>
              <div style={{display: 'flex', gap: '1rem', width: '100%'}}>
                <div>
                  <div className={styles.boxTitle}>
                    name
                  </div>
                  <input
                    ref={nameRef}
                    className={styles.input}
                    type='text'
                    maxLength={50}
                    value={name}
                    onChange={e => setName(e.target.value.trim().charAt(0).toUpperCase() + e.target.value.trim().slice(1))}
                  />
                </div>
                <div>
                  <div className={styles.boxTitle}>
                    surname
                  </div>
                  <input
                    ref={surnameRef}
                    className={styles.input}
                    type='text'
                    maxLength={50}
                    value={surname}
                    onChange={e => setSurname(e.target.value.trim().charAt(0).toUpperCase() + e.target.value.trim().slice(1))}
                  />
                </div>
              </div>
              <div className={styles.boxTitle}>
                usename
              </div>
              <input
                ref={usernameRef}
                className={styles.input}
                type='text'
                maxLength={16}
                value={username}
                onChange={e => setUsername(e.target.value.trim().toLowerCase())}
              />
            </>
          }
          <div className={styles.boxTitle}>
            email
          </div>
          <input
            ref={emailRef}
            className={styles.input}
            type='email'
            maxLength={50}
            value={email}
            onChange={e => setEmail(e.target.value.trim())}
          />
          <div className={styles.boxTitle}>
            password
          </div>
          <input
            ref={passwordRef}
            className={styles.input}
            type='password'
            maxLength={50}
            value={password}
            onChange={e => setPassword(e.target.value.trim())}
          />
          <div
            className={styles.signUpBtn}
            style={{opacity: loading ? 0.5 : 1}}
            onClick={() => {
              if(showLogin){
                handleLogIn()
              }else{
                handleSignUp()
              }
            }}
          >
            {
              showLogin ? 'Login' : 'Sign Up'
            }
          </div>
          <div className={styles.bottomTextWrapper}>
            <span className={styles.bottomText}>
              {
                showLogin
                ?
                'New around here?'
                :
                'Already have an account?'
              }
              &nbsp;
            </span>
            <span
              className={styles.bottomText}
              style={{fontWeight: 700, fontSize: '.8rem'}}
              onClick={() => {
                clearValues()
                setShowLogin(!showLogin)
              }}
            >
              {
                showLogin
                ?
                'Sign Up'
                :
                'Log In'
              }
            </span>
          </div>
        </div>
      </div>
    </Div100vh>
  )
}

export default Register