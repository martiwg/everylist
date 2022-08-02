import { useEffect, useState } from 'react'

import { setDoc, doc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebaseConfig'

import Div100vh from 'react-div-100vh'

import styles from './Register.module.css'

const Register = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async () => {
    if(loading) return

    setLoading(true)
    try{
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          setDoc(doc(db, 'users', userCredential.user.uid), {
            uid: userCredential.user.uid,
            email: email,
            friends: [],
            name: '',
            surname: '',
            username: '',
            itemHistory: [],
          })
        })
        .then(() => {
          window.location.pathname = '/'
        })
    }catch{
      setEmail('')
      setPassword('')
    }

    setLoading(false)
  }

  useEffect(() => {
    if(auth.currentUser){
      auth.signOut()
      window.location.pathname = '/'
    }
  }, [])
  
  return (
    <Div100vh className='globalContainer' style={{minHeight: 'unset', transition: '.5s ease'}}>
      <div className='globalWrapper'>
        <div className={styles.container}>
          <div className={styles.title}>
            Sign Up!
          </div>
          <div className={styles.boxTitle}>
            email
          </div>
          <input
            className={styles.input}
            type='email'
            maxLength={50}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className={styles.boxTitle}>
            password
          </div>
          <input
            className={styles.input}
            type='password'
            maxLength={50}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div
            className={styles.signUpBtn}
            style={{opacity: loading ? 0.5 : 1}}
            onClick={() => handleSignUp()}
          >
            Sign Up
          </div>
          <div className={styles.bottomTextWrapper}>
            <span className={styles.bottomText}>
              {
                showLogin
                ?
                'Already have an account?'
                :
                'New around here?'
              }
              &nbsp;
            </span>
            <span
              className={styles.bottomText}
              style={{fontWeight: 600}}
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