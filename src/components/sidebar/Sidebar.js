import { useContext } from 'react'
import { Context } from '../../Store'

import { auth } from '../../firebaseConfig'

import styles from './Sidebar.module.css'

const Sidebar = () => {
  const [state, setState] = useContext(Context)
  
  return(
    <div className={styles.container} onClick={() => auth.signOut()}>
    </div>
  )
}

export default Sidebar