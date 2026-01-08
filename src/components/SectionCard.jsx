import React from "react"
import { ChevronRight } from "lucide-react"

export default function SectionCard({
  title,
  subtitle,
  priceText,
  cta,
  image,
  align = "left",
  className = "",
}) {
  const isRight = align === "right"
  return (
    <div className={["relative overflow-hidden rounded-3xl shadow-soft gold-ring", className].join(" ")}>
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className={["absolute inset-0", isRight ? "bg-gradient-to-l from-black/70 via-black/35 to-black/10" : "bg-gradient-to-r from-black/70 via-black/35 to-black/10"].join(" ")} />
      <div className={["relative h-full p-6 sm:p-8 flex flex-col justify-end", isRight ? "items-end text-right" : "items-start text-left"].join(" ")}>
        <h3 className="font-display text-3xl text-white">{title}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/70">{subtitle}</p>
        {priceText ? <p className="mt-3 text-sm text-white/80">{priceText}</p> : null}
        <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15 transition">
          {cta} <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
