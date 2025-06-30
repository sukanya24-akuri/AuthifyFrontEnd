import React from 'react'
import { Menubar } from '../components/Menubar'
import { Header } from '../components/Header'

export const Home = () => {
  return (
 <div className="flex flex-col items-center justify-content-center min-vh-100">
  <Menubar/>
  <Header/>
 </div>
  )
}
