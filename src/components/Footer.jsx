import React from "react"
import { Watch, Instagram, Twitter, Facebook } from "lucide-react"

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
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
                <Watch className="h-5 w-5" />
              </span>
              <span className="font-semibold tracking-wide">Watch & Bangle Store</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/75">
              Crafting timeless elegance with premium watches and exquisite bangles since 2020.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/15 ring-1 ring-white/15 transition"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide">Shop</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {["Watches", "Bangles", "New Arrivals", "Best Sellers"].map((t) => (
                <li key={t}>
                  <a className="hover:text-white" href="#">{t}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide">Support</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {["Contact Us", "Shipping Info", "Returns", "Size Guide"].map((t) => (
                <li key={t}>
                  <a className="hover:text-white" href="#">{t}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide">Newsletter</h4>
            <p className="mt-4 text-sm text-white/75">Subscribe to get special offers and updates.</p>
            <div className="mt-4 flex gap-3">
              <input
                className="w-full rounded-full bg-white/10 px-4 py-2.5 text-sm placeholder:text-white/50 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-gold-300/60"
                placeholder="Your email"
              />
              <button className="btn bg-gold-300 text-neutral-950 hover:bg-gold-200">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-xs text-white/70 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© 2025 Watch & Bangle Store. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Powered by Ready"].map((t) => (
              <a key={t} className="hover:text-white" href="#">{t}</a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
