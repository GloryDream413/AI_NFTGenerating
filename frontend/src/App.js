import React from 'react'
import './App.css'
import { Footer, Blog, Possibility, Header } from './containers'
import { Navbar } from './components'
import './App.css'
import { useState, createContext } from 'react'
export const UserContext = createContext(null)
const App = () => {
  const [nftRoute, setNftRoute] = useState('')
  return (
    <UserContext.Provider value={{ nftRoute, setNftRoute }}>
      <div>
        <div className='gradient__bg'>
          <Navbar />
          <Header />
        </div>
        <Possibility />
        <Blog />
        <Footer />
      </div>
    </UserContext.Provider>
  )
}

export default App
