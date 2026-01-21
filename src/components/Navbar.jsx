import React, { useEffect, useState } from "react"
import { NavLink, Link, useLocation } from "react-router-dom"
import { Search, Heart, ShoppingBag, Watch, Menu, X } from "lucide-react"

function Container({ children, className = "" }) {
  return <div className={["mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className].join(" ")}>{children}</div>
}

const linkBase = "text-sm font-semibold tracking-[0.22em] transition relative group"
const mobileLinkBase = "text-xl font-semibold tracking-[0.15em] transition py-4 border-b border-white/10 w-full text-center"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false) 
  const location = useLocation()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || isOpen ? "bg-black backdrop-blur-xl border-b border-white/10" : "bg-black backdrop-blur-sm",
      ].join(" ")}
    >
      <Container className="py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white z-50">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 ring-1 ring-gold-300/50">
              <Watch className="h-5 w-5 text-gold-300" />
            </span>
            <span className="font-semibold tracking-widest text-lg">VINTAG</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-white/80">
            <NavLink to="/" end className={({ isActive }) => [linkBase, isActive ? "text-gold-300" : "hover:text-gold-300"].join(" ")}>
              HOME
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold-300 transition-all group-hover:w-full"></span>
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => [linkBase, isActive ? "text-gold-300" : "hover:text-gold-300"].join(" ")}>
              PRODUCTS
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold-300 transition-all group-hover:w-full"></span>
            </NavLink>
            {/* <NavLink to="/about" className={({ isActive }) => [linkBase, isActive ? "text-gold-300" : "hover:text-gold-300"].join(" ")}>
              ABOUT
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold-300 transition-all group-hover:w-full"></span>
            </NavLink> */}
            <NavLink to="/contact" className={({ isActive }) => [linkBase, isActive ? "text-gold-300" : "hover:text-gold-300"].join(" ")}>
              CONTACT
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold-300 transition-all group-hover:w-full"></span>
            </NavLink>
          </nav>

          {/* Right Actions & Mobile Toggle */}
          <div className="flex items-center gap-2 z-50">
            <button className="md:hidden grid h-10 w-10 place-items-center rounded-full text-white/90 hover:bg-white/10" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={[
            "fixed inset-0 top-[72px] bg-black z-40 md:hidden flex flex-col items-center pt-10 px-6 transition-all duration-500 ease-in-out",
            isOpen ? "opacity-100 pointer-events-auto translate-y-0 h-screen" : "opacity-0 pointer-events-none -translate-y-4"
          ].join(" ")}
        >
          <NavLink to="/" end className={({ isActive }) => [mobileLinkBase, isActive ? "text-gold-300" : "text-white/70"].join(" ")}>HOME</NavLink>
          <NavLink to="/products" className={({ isActive }) => [mobileLinkBase, isActive ? "text-gold-300" : "text-white/70"].join(" ")}>PRODUCTS</NavLink>
          {/* <NavLink to="/about" className={({ isActive }) => [mobileLinkBase, isActive ? "text-gold-300" : "text-white/70"].join(" ")}>ABOUT US</NavLink> */}
          <NavLink to="/contact" className={({ isActive }) => [mobileLinkBase, isActive ? "text-gold-300" : "text-white/70"].join(" ")}>CONTACT US</NavLink>
          
        </div>
      </Container>
    </header>
  )
}