import React from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"

function Container({ children, className = "" }) {
  return <div className={["mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className].join(" ")}>{children}</div>
}

export default function ContactPage() {
  return (
    <div className="bg-[#f7f4ef]">
      <Container className="py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="rounded-3xl bg-white p-10 shadow-soft ring-1 ring-black/5">
            <h1 className="font-display text-5xl text-neutral-900">Contact Us</h1>
            <p className="mt-3 text-sm text-neutral-600">Tell us what you need — we’ll get back within 24 hours.</p>

            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault()
                alert("Message sent! (demo)")
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-neutral-900">Full Name</label>
                  <input className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-950" placeholder="Enter your name" required />
                </div>
                <div>
                  <label className="text-sm font-semibold text-neutral-900">Email</label>
                  <input type="email" className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-950" placeholder="Enter your email" required />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-neutral-900">Subject</label>
                <input className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-950" placeholder="How can we help?" required />
              </div>

              <div>
                <label className="text-sm font-semibold text-neutral-900">Message</label>
                <textarea className="mt-2 min-h-[140px] w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-950" placeholder="Write your message..." required />
              </div>

              <button className="btn bg-neutral-950 text-white hover:bg-neutral-900">
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          </div>

          <aside className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-black/5 h-fit">
            <h2 className="text-lg font-semibold text-neutral-900">Get in touch</h2>
            <p className="mt-2 text-sm text-neutral-600">You can also reach us via the details below.</p>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-100 ring-1 ring-neutral-200">
                  <Mail className="h-5 w-5 text-neutral-800" />
                </span>
                <div>
                  <p className="font-semibold text-neutral-900">Email</p>
                  <p className="text-neutral-600">support@luxe-store.com</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-100 ring-1 ring-neutral-200">
                  <Phone className="h-5 w-5 text-neutral-800" />
                </span>
                <div>
                  <p className="font-semibold text-neutral-900">Phone</p>
                  <p className="text-neutral-600">+1 (555) 010-2025</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-100 ring-1 ring-neutral-200">
                  <MapPin className="h-5 w-5 text-neutral-800" />
                </span>
                <div>
                  <p className="font-semibold text-neutral-900">Address</p>
                  <p className="text-neutral-600">
                    88 Gold Avenue, Downtown<br />New York, NY
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-neutral-50 p-5 ring-1 ring-neutral-200">
              <p className="text-xs font-semibold tracking-[0.22em] text-neutral-500">HOURS</p>
              <p className="mt-2 text-sm text-neutral-700">Mon–Fri: 9:00 AM – 6:00 PM</p>
              <p className="mt-1 text-sm text-neutral-700">Sat: 10:00 AM – 4:00 PM</p>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  )
}
