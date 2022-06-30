import { useEffect, useState } from 'react'

import styles from './Landing.module.css'

const Landing = () => {
  const [showCards, setShowCards] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowCards(true)
    }, 200)
  }, [])

  return(
    <div className={styles.container}>
      <div className={styles.title}>
        Shopping <span className={styles.gradientText}>Lists</span> made Easy
      </div>
      <div className={styles.subtitle}>
        Create, Edit and Share your shopping lists with friends and family
      </div>
      <a
        className={styles.createBtn}
        href='/create'
        rel='noopener noreferrer'
      >
        <span>
          Create a List
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height='1rem' width='1rem' fill='#fff'>
          <path d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"/>
        </svg>
      </a>
      {
        showCards &&
        <div className={styles.floatingCards}>
          <div className={styles.progressCard}>
            <div className={styles.progressTop}>
              <div className={styles.progressTitle}>
                Groceries
              </div>
              <div className={styles.progressRatioWrapper}>
                <div className={styles.progressRatio}>
                  21 / 27
                </div>
              </div>
            </div>
            <div className={styles.progressBottom}>
              <div className={styles.outterBar}>
                <div className={styles.innerBar} style={{width: `${21 / 27 * 100}%`}}>
                  <div className={styles.progressBtn}/>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.shareCard}>
            <div className={styles.shareCardCircle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" height='2rem' width='2rem' fill='rgb(66, 171, 252)'>
                <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"/>
              </svg>
            </div>
            <div className={styles.shareText}>
              Share
            </div>
          </div>
          <div className={styles.notiCard}>
            <span className={styles.notiText}>
              Mark just picked up
            </span>
            <span className={styles.notiText} style={{color: 'var(--color-red)'}}>
              "Milk"
            </span>
            <span className={styles.notiText}>
              !
            </span>
          </div>
        </div>
      }
    </div>
  )
}

export default Landing