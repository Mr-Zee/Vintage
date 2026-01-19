import React from "react"
import { Heart, ShoppingCart, Star } from "lucide-react"

function formatMoney(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)
}

// ✅ WhatsApp redirect helpers
const WHATSAPP_NUMBER = "97167980664"
const buildWhatsAppLink = (product) => {
  const text = `Hi, I want to buy:
${product.title} (${formatMoney(product.price)})

Image: ${product.image}

Is it available?`

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export default function ProductCard({ product, variant = "grid" }) {
  const { title, price, oldPrice, rating, reviews, badge, image, inStock } =
    product

  if (variant === "list") {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-white text-neutral-950 shadow-soft ring-1 ring-black/5">
        <div className="flex gap-4 p-4">
          <div className="relative h-28 w-36 overflow-hidden rounded-2xl bg-neutral-100">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            {badge ? (
              <div
                className={[
                  "absolute left-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                  inStock ? "bg-gold-300 text-neutral-950" : "bg-red-500 text-white",
                ].join(" ")}
              >
                {badge}
              </div>
            ) : null}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold">{title}</h4>
                <div className="mt-1 flex items-center gap-2 text-xs text-neutral-700">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="font-semibold">{rating.toFixed(1)}</span>
                  </div>
                  <span className="text-neutral-400">•</span>
                  <span>({reviews})</span>
                </div>
              </div>

              {/* <button
                className="grid h-9 w-9 place-items-center rounded-full bg-neutral-100 text-neutral-900 ring-1 ring-black/10 transition hover:bg-neutral-200"
                aria-label="Add to wishlist"
                type="button"
              >
                <Heart className="h-4 w-4" />
              </button> */}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="text-base font-extrabold">{formatMoney(price)}</span>
              {oldPrice ? (
                <span className="text-sm font-semibold text-neutral-400 line-through">
                  {formatMoney(oldPrice)}
                </span>
              ) : null}
            </div>

            {/* ✅ WhatsApp redirect */}
            <a
              href={buildWhatsAppLink(product)}
              target="_blank"
              rel="noreferrer"
              className={[
                "mt-3 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                inStock
                  ? "bg-neutral-950 text-white hover:bg-neutral-900"
                  : "bg-neutral-200 text-neutral-500 pointer-events-none",
              ].join(" ")}
            >
              <ShoppingCart className="h-4 w-4" />
              {inStock ? "Whatsapp" : "Out of Stock"}
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white text-neutral-950 shadow-soft ring-1 ring-black/5">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />

        {badge ? (
          <div
            className={[
              "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold",
              inStock ? "bg-gold-300 text-neutral-950" : "bg-red-500 text-white",
            ].join(" ")}
          >
            {badge}
          </div>
        ) : null}

        {/* <button
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-neutral-900 shadow ring-1 ring-black/10 transition hover:bg-white"
          aria-label="Add to wishlist"
          type="button"
        >
          <Heart className="h-4 w-4" />
        </button> */}
      </div>

      <div className="p-4">
        <h4 className="line-clamp-2 text-sm font-semibold">{title}</h4>

        <div className="mt-2 flex items-center gap-2 text-xs text-neutral-700">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="font-semibold">{rating.toFixed(1)}</span>
          </div>
          <span className="text-neutral-400">•</span>
          <span>({reviews})</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-base font-extrabold">{formatMoney(price)}</span>
          {oldPrice ? (
            <span className="text-sm font-semibold text-neutral-400 line-through">
              {formatMoney(oldPrice)}
            </span>
          ) : null}
        </div>

        {/* ✅ WhatsApp redirect */}
        <a
          href={buildWhatsAppLink(product)}
          target="_blank"
          rel="noreferrer"
          className={[
            "mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition",
            inStock
              ? "bg-neutral-950 text-white hover:bg-neutral-900"
              : "bg-neutral-200 text-neutral-500 pointer-events-none",
          ].join(" ")}
        >
          <ShoppingCart className="h-4 w-4" />
          {inStock ? "Whatsapp" : "Out of Stock"}
        </a>
      </div>
    </div>
  )
}
