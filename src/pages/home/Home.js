import { useState } from 'react'

import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

const Home = () => {
  const [sideOpen, setSideOpen] = useState(false)

  return(
    <div
      className='globalContainer'
      style={{transition: '.5s ease-in-out', transform: `translateX(${sideOpen ? '80vw' : '0'})`}}
    >
      <Navbar sideOpen={sideOpen} setSideOpen={setSideOpen} />
      <div
        className='globalWrapper'
        onClick={() => setSideOpen(false)}
      >
        {JSON.stringify(sideOpen)}
      </div>
      <Sidebar />
    </div>
  )
}

export default Home