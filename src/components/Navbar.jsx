import React, { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { Search, Heart, ShoppingBag, Watch } from "lucide-react"

function Container({ children, className = "" }) {
  return <div className={["mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className].join(" ")}>{children}</div>
}

const linkBase = "text-xs font-semibold tracking-[0.22em] transition"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "transition",
        scrolled ? "bg-black/70 backdrop-blur-xl border-b border-white/10" : "bg-black/35 backdrop-blur-md",
      ].join(" ")}
    >
      <Container className="py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full glass gold-ring">
              <Watch className="h-5 w-5" />
            </span>
            <span className="font-semibold tracking-wide">LUXE</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-white/80">
            <NavLink to="/" end className={({ isActive }) => [linkBase, isActive ? "text-white" : "hover:text-white"].join(" ")}>HOME</NavLink>
            <NavLink to="/products" className={({ isActive }) => [linkBase, isActive ? "text-white" : "hover:text-white"].join(" ")}>PRODUCTS</NavLink>
            <NavLink to="/about" className={({ isActive }) => [linkBase, isActive ? "text-white" : "hover:text-white"].join(" ")}>ABOUT US</NavLink>
            <NavLink to="/contact" className={({ isActive }) => [linkBase, isActive ? "text-white" : "hover:text-white"].join(" ")}>CONTACT US</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <button className="grid h-10 w-10 place-items-center rounded-full glass hover:bg-white/10" aria-label="Search">
              <Search className="h-5 w-5 text-white/90" />
            </button>
            <button className="grid h-10 w-10 place-items-center rounded-full glass hover:bg-white/10" aria-label="Wishlist">
              <Heart className="h-5 w-5 text-white/90" />
            </button>
            <button className="relative grid h-10 w-10 place-items-center rounded-full glass hover:bg-white/10" aria-label="Cart">
              <ShoppingBag className="h-5 w-5 text-white/90" />
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-gold-300 text-[11px] font-extrabold text-neutral-950">2</span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}
