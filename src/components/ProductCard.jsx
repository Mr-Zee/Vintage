import React from "react";
import { ShoppingCart } from "lucide-react";

const WHATSAPP_NUMBER = "97167980664";
const buildWhatsAppLink = (product) => {
  const text = `Hi, I want to inquire about:
${product.title}
Code: ${product.code}

Image: ${product.image}

Is it available?`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

export default function ProductCard({ product, variant = "grid" }) {
  const { title, image, material, reviews: code } = product;

  if (variant === "list") {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-white text-neutral-950 shadow-soft ring-1 ring-black/5">
        <div className="flex gap-4 p-4">
          <div className="relative h-38 w-36 flex-shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            {product.badge && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold">
            {product.badge}
          </span>
        )}
          </div>

          <div className="flex flex-1 flex-col justify-center">
            <h4 className="text-sm font-semibold">{title}</h4>
            <div className="mt-1 text-sm font-medium text-neutral-500">
              Code: <span className="text-neutral-950">{code}</span>
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {material}
            </div>

            <a
              href={buildWhatsAppLink({ ...product, code })}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-900"
            >
              <ShoppingCart className="h-4 w-4" />
              Whatsapp
            </a>
          </div>
        </div>
      </div>
    );
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
        {product.badge && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold">
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-4 text-center">
        <h4 className="line-clamp-1 text-sm font-semibold">{title}</h4>
        <div className="mt-1 text-sm font-medium text-neutral-500">
          Code: <span className="text-neutral-950">{code}</span>
        </div>

        <div className="mt-2 text-xs font-bold uppercase text-neutral-400">
          {material}
        </div>

        <a
          href={buildWhatsAppLink({ ...product, code })}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-900"
        >
          <ShoppingCart className="h-4 w-4" />
          Whatsapp
        </a>
      </div>
    </div>
  );
}