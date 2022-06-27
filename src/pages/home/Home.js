import { useState } from 'react'

import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Landing from './landing/Landing'

import styles from './Home.module.css'

const Home = () => {
  const [sideOpen, setSideOpen] = useState(false)

  return(
    <>
      <div className='globalContainer'>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', position: 'relative', width: '100vw',transition: '.5s ease-in-out', transform: `translateX(${sideOpen ? '80vw' : '0'})`, flexGrow: 1, backdropFilter: 'blur(10px)'}}>
          <div style={{position: 'absolute', filter: 'blur(68px)', zIndex: 0, opacity: .45, top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-75%, -60%)'}}>
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="visual" viewBox="0 0 900 900" width="1000" height="1000" version="1.1" fill='#0ff'>
                <g transform="translate(442.6386720326994 465.0162779808579)">
                  <path d="M108.8 -159.4C129.4 -134.7 126.5 -87.5 130.1 -48.8C133.8 -10.1 143.9 20 135.8 43.8C127.6 67.6 101.1 85.2 75.4 106C49.8 126.8 24.9 150.9 0.2 150.6C-24.5 150.4 -49 125.8 -72.1 104.1C-95.3 82.5 -117.1 63.8 -122.6 41.1C-128.2 18.5 -117.6 -8.1 -106.1 -31.7C-94.7 -55.3 -82.3 -75.8 -64.5 -101.3C-46.6 -126.8 -23.3 -157.4 10.4 -171.7C44.1 -186 88.2 -184 108.8 -159.4"/>
                </g>
              </svg>
            </div>
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -60%)'}}>
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="visual" viewBox="0 0 900 900" width="1000" height="1000" version="1.1" fill='rgb(208, 225, 43)'>
                <g xmlns="http://www.w3.org/2000/svg" transform="translate(476.8915343137146 460.18925321899974)">
                  <path d="M101.5 -159.7C114.9 -130 97.6 -78.1 99 -40.1C100.4 -2.1 120.6 21.8 120.8 44.9C121.1 68 101.4 90.2 77.9 115.4C54.5 140.6 27.2 168.8 0.5 168.1C-26.3 167.5 -52.5 137.9 -81.7 114.6C-110.8 91.2 -142.9 74 -160.4 46C-177.8 18 -180.7 -20.8 -160.6 -42.8C-140.6 -64.8 -97.6 -70 -67 -94.1C-36.4 -118.2 -18.2 -161.1 12.9 -178.9C44.1 -196.7 88.2 -189.4 101.5 -159.7"/>
                </g>
              </svg>
            </div>
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -45%)'}}>
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="visual" viewBox="0 0 900 900" width="1000" height="1000" version="1.1" fill='rgb(187, 0, 255)'>
                <g transform="translate(476.8915343137146 460.18925321899974)">
                  <path d="M101.5 -159.7C114.9 -130 97.6 -78.1 99 -40.1C100.4 -2.1 120.6 21.8 120.8 44.9C121.1 68 101.4 90.2 77.9 115.4C54.5 140.6 27.2 168.8 0.5 168.1C-26.3 167.5 -52.5 137.9 -81.7 114.6C-110.8 91.2 -142.9 74 -160.4 46C-177.8 18 -180.7 -20.8 -160.6 -42.8C-140.6 -64.8 -97.6 -70 -67 -94.1C-36.4 -118.2 -18.2 -161.1 12.9 -178.9C44.1 -196.7 88.2 -189.4 101.5 -159.7"/>
                </g>
              </svg>
            </div>
          </div>
          <Navbar sideOpen={sideOpen} setSideOpen={setSideOpen} />
          <div
            className='globalWrapper'
            onClick={() => setSideOpen(false)}
            >
            <Landing />
          </div>
          <Sidebar />
        </div>
      </div>
    </>
  )
}

export default Home