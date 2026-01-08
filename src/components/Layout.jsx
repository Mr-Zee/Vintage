import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Layout() {
  return (
    <div className="min-h-screen font-body">
      <Navbar />
      {/* Sticky navbar offset */}
      <div className="pt-20">
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}
