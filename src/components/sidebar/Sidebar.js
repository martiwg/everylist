import { useContext } from 'react'
import { Context } from '../../Store'

import { auth } from '../../firebaseConfig'

import styles from './Sidebar.module.css'

const Sidebar = () => {
  const [state, setState] = useContext(Context)

  return(
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>

        </div>
        <div>

          {
            state.uid &&
            <div
              className={styles.logoutBtn}
              onClick={() => auth.signOut()}
            >
              Log Out
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar