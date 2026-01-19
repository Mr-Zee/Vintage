import React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import SectionCard from "../components/SectionCard"
import ProductCard from "../components/ProductCard"
import { products } from "../data/products"
import hero from "/Images/hb3.jpg"
import { Link } from "react-router-dom";

const heroBg = hero;

const watchesCard =
"https://readdy.ai/api/search-image?query=elegant%20luxury%20womens%20watches%20collection%20displayed%20on%20soft%20pink%20silk%20fabric%20professional%20product%20photography%20studio%20lighting%20multiple%20rose%20gold%20and%20diamond%20watches%20sophisticated%20feminine%20arrangement%20delicate%20styling%20warm%20tones&width=800&height=1000&seq=ladycat1&orientation=portrait"
  // "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=1800&q=80"

const banglesCard =
"https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1200&q=80"
  // "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=80"

const arrivalsCard =
  "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1800&q=80"

function Container({ children, className = "" }) {
  return <div className={["mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className].join(" ")}>{children}</div>
}

function Hero() {
  return (
    <section className="relative min-h-[94vh] overflow-hidden bg-neutral-950">
      <img src={heroBg} alt="Watch movement" className="absolute inset-0 h-full w-full object-cover opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,154,42,0.18),transparent_50%)]" />

      <Container className="relative z-10 flex min-h-[88vh] items-end pb-14 md:pb-20">
        <div className="max-w-xl">
          <p className="text-xs font-semibold tracking-[0.35em] text-white/70">PREMIUM SWISS MOVEMENTS</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-gold-100 sm:text-6xl">
            Crafted to<br /><span className="text-gold-300">Perfection</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/75">
            Discover timeless pieces designed with precision. Hand-finished details, premium materials, and modern silhouettes.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button className="btn-primary">
              Shop Now <ChevronRight className="h-4 w-4" />
            </button>
            <button className="btn-outline">Learn More</button>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center">
        <div className="flex items-center gap-3 text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </div>
      </div>
    </section>
  )
}

function PromoGrid() {
  return (
    <section className="bg-[#f3efe8] py-10">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          <SectionCard
            title="Watches"
            subtitle="Timeless Elegance"
            priceText="From $1,899"
            cta="Shop Now"
            image={watchesCard}
            className="lg:col-span-2 min-h-[250px] sm:min-h-[300px]"
          />
          <div className="grid gap-6">
            <SectionCard
              title="Chains"
              subtitle="Exquisite Craftsmanship"
              priceText="From $2,799"
              cta="Explore"
              image={banglesCard}
              align="right"
            />
            <div className="relative overflow-hidden rounded-3xl bg-neutral-900 shadow-soft gold-ring min-h-[180px] sm:min-h-[220px]">
              <img src={arrivalsCard} alt="New arrivals" className="absolute inset-0 h-full w-full object-cover opacity-90" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
              <div className="relative h-full p-6 sm:p-7 flex flex-col justify-center text-center items-center">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gold-300/15 ring-1 ring-gold-300/35">
                  <span className="text-gold-200 text-xl">★</span>
                </div>
                <h3 className="mt-3 font-display text-2xl text-white">New Arrivals</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/65">Explore our latest collection</p>
                <a href="/products" className="mt-4 btn bg-gold-300 text-neutral-950 hover:bg-gold-200">Discover Now</a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Featured() {
  return (
    <section className="bg-[#f7f4ef] py-16">
      <Container>
        <div className="text-center">
          <h2 className="font-display text-4xl text-neutral-900">Featured Collection</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600">
            Discover our handpicked selection of premium timepieces and exquisite bangles.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
           <Link className="btn bg-neutral-950 text-white hover:bg-neutral-900" to="/products">
            View All Products <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromoGrid />
      <Featured />
    </>
  )
}
