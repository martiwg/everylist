import { auth } from '../../firebaseConfig'

import styles from './Navbar.module.css'

const Navbar = (props) => {
  return(
    <div className={styles.barContainer}>
      <div
        className={styles.sideBtn}
        onClick={() => props.setSideOpen(!props.sideOpen)}
      >
        <div className={styles.burgerLine} />
        <div className={styles.burgerLine} style={{width: '1.5rem'}}/>
        <div className={styles.burgerLine} style={{width: '1.7rem'}}/>
      </div>
      <a
        className={styles.registerBtn}
        href={auth.currentUser ? '/create' : '/login'}
        rel='noopener noreferrer'
      >
        { auth.currentUser ? 'My Lists' : 'Sign Up' }
      </a>
    </div>
  )
}

export default Navbar