import React, {useState} from 'react'
import {Footer, Header, SiteDrower} from '../../../conponents'

const SiteLayout = ({children}) => {
  const [isDrowerOpen, setIsDrowerOpen] = useState(false)

  const onLeftIconClicked = () => {
    setIsDrowerOpen(true)
  }

  const toggleDrawer = (value) => {
    setIsDrowerOpen(value)
  }

  return (
    <>
      <Header
        onLeftIconClicked={onLeftIconClicked}
      />
      <SiteDrower
        open={isDrowerOpen}
        onClose={value => toggleDrawer(value)}
      />
      <main>
        {children}
      </main>
      <Footer/>
    </>
  )
}

export default SiteLayout