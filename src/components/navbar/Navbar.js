import { useContext, useEffect, useState } from 'react'
import { Context } from '../../Store'

import { auth } from '../../firebaseConfig'

import styles from './Navbar.module.css'

const Navbar = (props) => {
  const [state, setState] = useContext(Context)
  return(
    <div className={styles.barContainer}>
      <div
        className={styles.sideBtn}
        onClick={() => props.setSideOpen(!props.sideOpen)}
      >
        <div className={styles.burgerLine} />
        <div className={styles.burgerLine} style={{width: '1.4rem'}}/>
        <div className={styles.burgerLine} style={{width: '1.65rem'}}/>
      </div>
      <a
        className={styles.registerBtn}
        href={auth.currentUser ? '/lists' : '/register'}
        rel='noopener noreferrer'
      >
        { state.uid ? 'My Lists' : 'Sign Up' }
      </a>
    </div>
  )
}

export default Navbar