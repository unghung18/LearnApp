import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarMenu from '../NavBar/NavBar'

const Default = () => {
    return (
        <>
            <NavbarMenu />
            <Outlet />
        </>
    )
}

export default Default