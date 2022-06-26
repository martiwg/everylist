import styles from './Navbar.module.css'

const Navbar = () => {
  return(
    <div className={styles.barContainer}>
      <div className={styles.burger}>
        <div className={styles.burgerLine}/>
        <div className={styles.burgerLine}/>
        <div className={styles.burgerLine}/>
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