import React, { Component } from 'react'
import HeroSection from './HeroSection/HeroSection'
import NavigationBar from './NavigationBar'



class Header extends Component {

  render() {
    return (
      <div >
        <NavigationBar />
        <HeroSection />
      </div>)
  }
}

export default Header