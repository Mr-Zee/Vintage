import React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import SectionCard from "../components/SectionCard"
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react" 
import { getProducts } from "../services/productService"
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import hero from "/Images/hb3.jpg"
import hero2 from "/Images/hb2.jpg"
import hero1 from "/Images/hb1.jpg"
import arrivals from "/Images/hb7.jpeg"
import offers from "/Images/hb8.jpeg"

const heroBg = hero;

const watchesCard =
"https://readdy.ai/api/search-image?query=elegant%20luxury%20womens%20watches%20collection%20displayed%20on%20soft%20pink%20silk%20fabric%20professional%20product%20photography%20studio%20lighting%20multiple%20rose%20gold%20and%20diamond%20watches%20sophisticated%20feminine%20arrangement%20delicate%20styling%20warm%20tones&width=800&height=1000&seq=ladycat1&orientation=portrait"
  // "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=1800&q=80"

const banglesCard =
offers
  // "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=80"

const arrivalsCard =
  arrivals;


const slides = [
  {
    image: heroBg,
    title: "Crafted to Perfection",
    subtitle: "PREMIUM SWISS MOVEMENTS",
    description: "Discover timeless pieces designed with precision. ",
    cta: "Shop Now"
  },
  {
    image: hero2,
    title: "New Arrivals",
    subtitle: "SEASONAL COLLECTION",
    description: "Experience the latest in luxury design ",
    cta: "Explore More"
  },
  {
    image: hero1,
    title: "Exclusive Offers",
    subtitle: "LIMITED TIME ONLY",
    description: "Discover our curated selection.",
    cta: "View Offers"
  }
];
function Container({ children, className = "" }) {
  return <div className={["mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className].join(" ")}>{children}</div>
}



function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[94vh] w-full overflow-hidden bg-neutral-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/85" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,154,42,0.15),transparent_50%)]" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <Container className="relative z-10 flex min-h-[88vh] items-end pb-14 md:pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <p className="text-xs font-semibold tracking-[0.35em] text-white/70 uppercase">
              {slides[currentSlide].subtitle}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] text-gold-100 sm:text-6xl">
              {slides[currentSlide].title}
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/75">
              {slides[currentSlide].description}
            </p>

            <div className="mt-7">
              <Link to="/products" className="btn-primary px-8 py-4 inline-flex items-center gap-2 font-medium text-base">
                {slides[currentSlide].cta} <ChevronRight className="h-4 w-5" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* Controls */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                index === currentSlide ? "w-6 bg-white" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-6 w-6 text-white/50" />
        </motion.div>
      </div>
    </section>
  );
}

function PromoGrid() {
  return (
    <section className="bg-[#f3efe8] py-10">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          <SectionCard
            title="Watches"
            subtitle="Timeless Elegance"
            priceText="From AED 1,899"
            cta="Shop Now"
            image={watchesCard}
            className="lg:col-span-2 min-h-[250px] sm:min-h-[300px]"
          />
          <div className="grid gap-6">
            <SectionCard
              title="Offers"
              subtitle="Exquisite Craftsmanship"
              priceText="From AED 799"
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
                {/* <a href="/products" className="mt-4 btn bg-gold-300 text-neutral-950 hover:bg-gold-200">Discover Now</a> */}
                <Link to="/products" className="mt-4 btn bg-gold-300 text-neutral-950 hover:bg-gold-200">
                Discover Now
              </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Featured() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        if (Array.isArray(data)) {
          setFeaturedProducts(data.slice(0, 8)); 
        } else {
          console.error("Backend did not return an array:", data);
          setFeaturedProducts([]); 
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setFeaturedProducts([]);
      } finally {
        setLoading(false); 
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="py-16 text-center">Loading Collection...</div>;

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
          {featuredProducts.map((p) => (
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
