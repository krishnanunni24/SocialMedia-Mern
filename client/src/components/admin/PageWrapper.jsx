import React from 'react'
import { useLocation } from 'react-router-dom'
function PageWrapper(props) {
const location= useLocation()
const isHomePage = location.pathname === "/"

  return (
    <section className={`flex ${isHomePage? "justify-between" : ""} flex-col-reverse gap-2 sm:flex-row  md:pe-5 bg-background`}>
        {props.children}  
        </section>

  )
}

export default PageWrapper
