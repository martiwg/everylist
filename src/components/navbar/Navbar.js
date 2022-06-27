import styles from './Navbar.module.css'

const Navbar = (props) => {
  return(
    <div className={styles.barContainer}>
      <div
        className={styles.sideBtn}
        onClick={() => props.setSideOpen(!props.sideOpen)}
      >
        <div style={{width: '1.5rem', height: '1.5rem', opacity: props.sideOpen ? 0 : 1, transition: '.5s ease-in-out', position: 'absolute', top: '50%', left: '0', transform: 'translate(0, -50%)'}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height='1.5rem'>
            <path d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.65 419.3 32 384 32zM312.3 273.6l-112 104C195.8 381.8 189.9 384 184 384c-3.25 0-6.5-.6562-9.594-2C165.7 378.2 160 369.5 160 360v-208c0-9.531 5.656-18.19 14.41-22c8.75-3.75 18.94-2.062 25.94 4.406l112 104C317.2 242.1 320 249.3 320 256S317.2 269 312.3 273.6z"/>
          </svg>
        </div>
        <div style={{width: '1.5rem', height: '1.5rem', opacity: props.sideOpen ? 1 : 0, transition: '.5s ease-in-out', position: 'absolute', top: '50%', left: '0', transform: 'translate(0, -50%)'}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height='1.5rem'>
            <path d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.65 419.3 32 384 32zM288 360c0 9.531-5.656 18.19-14.41 22C270.5 383.3 267.3 384 264 384c-5.938 0-11.81-2.219-16.34-6.406l-112-104C130.8 269 128 262.7 128 256s2.781-13.03 7.656-17.59l112-104c7.031-6.469 17.22-8.156 25.94-4.406C282.3 133.8 288 142.5 288 152V360z"/>
          </svg>
        </div>
      </div>
      <a
        className={styles.newBtn}
        href='/create'
        rel='noopener noreferrer'
      >
        New List
      </a>
    </div>
  )
}

export default Navbar