import React from 'react'
import './App.css'
import { Footer, Blog, Possibility, Header } from './containers'
import { Navbar } from './components'
import './App.css'

const App = () => {
  return (
    <div>
      <div className='gradient__bg'>
        <Navbar />
        <Header />
      </div>
      <Possibility />
      <Blog />
      <Footer />
    </div>
  )
}

export default App
