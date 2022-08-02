import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Context } from '../../Store'
import styles from './Toast.module.css'

const Toast = () => {
  const [state, _] = useContext(Context)

  const [currNoti, setCurrNoti] = useState()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if(state.notis.length > 0){
      setCurrNoti(state.notis[0])

      setShow(true)

      setTimeout(() => {
        setShow(false)
      }, 3000)
    }
  }, [state.notis])

  return(
    <div
      className={styles.container}
      style={{
        backgroundColor: currNoti?.type === 'error' ? 'var(--color-red-transparent)' : currNoti?.type === 'warning' ? 'var(--color-yellow-transparent)' : 'var(--color-green-transparent)',
        transform: show ? 'translateY(0)' : 'translateY(-200%)',
      }}
    >
      <div className={styles.svgWrapper}>
        {
          currNoti?.type === 'error' ?
          (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='100%' height='100%' fill='var(--color-red)'>
              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"/>
            </svg>
          )
          : currNoti?.type === 'warning' ?
          (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='100%' height='100%' fill='var(--color-yellow)'>
              <path d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"/>
            </svg>
          )
          :
          (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='100%' height='100%' fill='var(--color-green)'>
              <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/>
            </svg>
          )
        }
      </div>
      <div
        className={styles.text}
        style={{
          color: currNoti?.type === 'error' ? 'var(--color-red)' : currNoti?.type === 'warning' ? 'var(--color-yellow)' : 'var(--color-green)',
        }}
      >
        {currNoti?.message.charAt(0).toUpperCase() + currNoti?.message.slice(1)}
      </div>
    </div>
  )
}

export default Toast