import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/organisms/header/Header'

export const Workspace = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
