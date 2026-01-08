import React from "react"

function Container({ children, className = "" }) {
  return <div className={["mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className].join(" ")}>{children}</div>
}

export default function AboutPage() {
  return (
    <div className="bg-[#f7f4ef]">
      <Container className="py-14">
        <div className="rounded-3xl bg-white p-10 shadow-soft ring-1 ring-black/5">
          <h1 className="font-display text-5xl text-neutral-900">About Us</h1>
          <p className="mt-4 text-sm leading-7 text-neutral-700 max-w-3xl">
            We craft premium watches and bangles that blend modern design with timeless detail.
            Every piece is curated for quality, comfort, and everyday luxury.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { t: "Precision", d: "Trusted materials and carefully selected movements." },
              { t: "Craftsmanship", d: "Hand-finished details and premium polish." },
              { t: "Service", d: "Fast support, easy returns, and secure checkout." },
            ].map((x) => (
              <div key={x.t} className="rounded-3xl bg-neutral-50 p-6 ring-1 ring-neutral-200">
                <h3 className="text-sm font-semibold text-neutral-900">{x.t}</h3>
                <p className="mt-2 text-sm text-neutral-700 leading-6">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
