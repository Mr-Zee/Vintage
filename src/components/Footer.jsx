import React from "react"
import { Watch, Instagram, Twitter, Facebook, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom";
import Logo from "../../Images/logo2.png"

const supportLinks = [
  { label: "Contact Us", to: "/contact" },
  // { label: "Shipping Info", to: "/contact" },
];

const socialLinks = [
  { 
    Icon: Facebook, 
    label: "Facebook", 
    href: "https://www.facebook.com/share/16duBcLYE1/"
  },
  { 
    Icon: Instagram, 
    label: "Instagram", 
    href: "https://www.instagram.com/vintag.hub?igsh=MWV5djZhMXMydHF4NQ=="
  },
  { 
  Icon: MessageCircle, 
  label: "WhatsApp", 
  href: "https://wa.me/971567980664" 
}
];

function Container({ children, className = "" }) {
  return <div className={["mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className].join(" ")}>{children}</div>
}

export default function Footer() {
  return (
    <footer className="bg-[#7a6046] text-white/90">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="inline-flex items-center gap-2">
              {/* <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
                <Watch className="h-5 w-5" />
              </span> */}
              {/* <span className="font-semibold tracking-wide">VINTAG</span> */}
               <img 
                            src={Logo} 
                            alt="VINTAG Logo" 
                            className="h-8 w-auto object-contain hover:opacity-80 transition-opacity" 
                          />
            </div>
            <p className="mt-4 text-sm leading-6 text-white/75">
              Crafting timeless elegance with premium watches since 2025.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/15 ring-1 ring-white/15 transition"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide">Shop</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {["Watches", "Bangles", "New Arrivals", "Best Sellers"].map(
                (t) => (
                  <li key={t}>
                    <Link className="hover:text-white" to="/products">
                      {t}
                    </Link>
                    {/* <a className="hover:text-white" href="/products">{t}</a> */}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide">Support</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {supportLinks.map((item) => (
                <li key={item.to}>
                  <Link className="hover:text-white" to={item.to}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wide mb-4">
              Behind Wholesale plaza, Murshid Bazar, Deira dubai
            </h4>
            <h4 className="text-sm font-semibold tracking-wide">
              +971 56 798 0664
            </h4>
            <h4 className="text-sm font-semibold tracking-wide">
              +971 56 788 5953
            </h4>
            <h4 className="text-sm font-semibold tracking-wide">
              +971 56 735 8935
            </h4>
          </div>
          {/* <div>
            <h4 className="text-sm font-semibold tracking-wide">Newsletter</h4>
            <p className="mt-4 text-sm text-white/75">Subscribe to get special offers and updates.</p>
            <div className="mt-4 flex gap-3">
              <input
                className="w-full rounded-full bg-white/10 px-4 py-2.5 text-sm placeholder:text-white/50 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-gold-300/60"
                placeholder="Your email"
              />
              <button className="btn bg-gold-300 text-neutral-950 hover:bg-gold-200">Subscribe</button>
            </div>
          </div> */}
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-xs text-white/70 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Vintag Store. All rights reserved.</p>
          {/* <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service"].map((t) => (
              <a key={t} className="hover:text-white" href="#">{t}</a>
            ))}
          </div> */}
        </div>
      </Container>
    </footer>
  );
}
