import React, { useMemo, useState, useEffect } from "react"
import { LayoutGrid, List, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react"
import ProductCard from "../components/ProductCard"
import { getProducts } from "../services/productService";

const ITEMS_PER_PAGE = 12;

function Container({ children, className = "" }) {
  return <div className={["mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className].join(" ")}>{children}</div>
}

function Checkbox({ label, checked, onChange, count }) {
  return (
    <label className="flex items-center justify-between gap-3 text-sm text-neutral-700 cursor-pointer py-1">
      <span className="flex items-center gap-3">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-neutral-300 text-neutral-950 focus:ring-neutral-950"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>{label}</span>
      </span>
      {typeof count === "number" ? <span className="text-xs text-neutral-400">({count})</span> : null}
    </label>
  )
}

function Collapsible({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-t border-neutral-200 pt-4">
      <button type="button" className="flex w-full items-center justify-between text-left" onClick={() => setOpen((s) => !s)}>
        <span className="text-sm font-semibold text-neutral-900">{title}</span>
        <ChevronDown className={["h-4 w-4 text-neutral-500 transition", open ? "rotate-180" : ""].join(" ")} />
      </button>
      {open ? <div className="mt-3 space-y-2">{children}</div> : null}
    </div>
  )
}

export default function ProductsPage() {
  const [view, setView] = useState("grid")
  const [sort, setSort] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setAllProducts(data);
    })();
  }, []);

  const [material, setMaterial] = useState({ Gold: false, Silver: false, Platinum: false, "Stainless Steel": false, Leather: false })

  useEffect(() => { setCurrentPage(1); }, [material, sort]);

  const counts = useMemo(() => {
    const c = { material: { Gold: 0, Silver: 0, Platinum: 0, "Stainless Steel": 0, Leather: 0 } }
    allProducts.forEach((p) => {
      if (c.material[p.material] !== undefined) c.material[p.material]++
    })
    return c
  }, [allProducts])

  const filtered = useMemo(() => {
    const pickedMat = Object.entries(material).filter(([, v]) => v).map(([k]) => k)

    let list = allProducts.filter((p) => {
      return pickedMat.length ? pickedMat.includes(p.material) : true
    })

    if (sort === "alpha-asc") list = [...list].sort((a, b) => a.title.localeCompare(b.title))
    if (sort === "alpha-desc") list = [...list].sort((a, b) => b.title.localeCompare(a.title))
    return list
  }, [allProducts, material, sort])

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">Filter By</h3>
        <button onClick={() => setIsFilterDrawerOpen(false)} className="lg:hidden"><X className="h-5 w-5" /></button>
      </div>
      <Collapsible title="Material">
        {Object.keys(material).map(k => (
          <Checkbox 
            key={k} 
            label={k} 
            count={counts.material[k]} 
            checked={material[k]} 
            onChange={v => setMaterial(s => ({ ...s, [k]: v }))} 
          />
        ))}
      </Collapsible>

      <div className="pt-4">
        <button 
          onClick={() => setMaterial({ Gold: false, Silver: false, Platinum: false, "Stainless Steel": false, Leather: false })}
          className="text-sm font-bold text-neutral-400 hover:text-neutral-900"
        >
          CLEAR
        </button>
      </div>

      <button onClick={() => setIsFilterDrawerOpen(false)} className="w-full rounded-full bg-black py-3 text-white font-semibold lg:hidden">
        Show {filtered.length} Items
      </button>
    </div>
  );

  return (
    <div className="bg-[#f7f4ef] min-h-screen pb-20">
      <Container className="py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-display text-neutral-900">Our Collection</h1>
          <p className="mt-4 text-neutral-500 max-w-lg mx-auto italic">Exquisite timepieces and jewelry curated for elegance.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block sticky top-24 h-fit bg-white p-6 rounded-3xl shadow-sm ring-1 ring-black/5">
            <FiltersContent />
          </aside>

          <main>
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm ring-1 ring-black/5 mb-6">
              <button 
                onClick={() => setIsFilterDrawerOpen(true)}
                className="flex items-center gap-2 lg:hidden px-4 py-2 border rounded-full text-sm font-medium"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>

              <div className="hidden sm:block text-sm font-medium text-neutral-500">
                <span className="text-neutral-500">{filtered.length}</span> items available
              </div>

              <div className="flex items-center gap-3">
                <select 
                  className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 appearance-none pr-10 relative"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                  value={sort} 
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="newest">New Arrivals</option>
                  <option value="alpha-asc">Name: A to Z</option>
                  <option value="alpha-desc">Name: Z to A</option>
                </select>
                
                <div className="hidden sm:flex border-l border-neutral-100 pl-3 gap-1">
                   <button onClick={() => setView("grid")} className={`p-2 rounded-xl transition ${view === 'grid' ? 'bg-neutral-900 text-white shadow-lg' : 'text-neutral-400 hover:bg-neutral-50'}`}><LayoutGrid size={18}/></button>
                   <button onClick={() => setView("list")} className={`p-2 rounded-xl transition ${view === 'list' ? 'bg-neutral-900 text-white shadow-lg' : 'text-neutral-400 hover:bg-neutral-50'}`}><List size={18}/></button>
                </div>
              </div>
            </div>

            <div className={view === "grid" ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6" : "flex flex-col gap-4"}>
              {paginatedProducts.map(p => <ProductCard key={p.id} product={p} variant={view} />)}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button 
                  disabled={currentPage === 1} 
                  onClick={() => {setCurrentPage(c => c - 1); window.scrollTo(0,0)}}
                  className="p-3 bg-white border rounded-full disabled:opacity-20 shadow-sm"
                >
                  <ChevronLeft size={20}/>
                </button>
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {setCurrentPage(i + 1); window.scrollTo(0,0)}}
                      className={`w-11 h-11 rounded-full text-sm font-bold transition ${currentPage === i + 1 ? 'bg-black text-white' : 'bg-white border text-neutral-400'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  disabled={currentPage === totalPages} 
                  onClick={() => {setCurrentPage(c => c + 1); window.scrollTo(0,0)}}
                  className="p-3 bg-white border rounded-full disabled:opacity-20 shadow-sm"
                >
                  <ChevronRight size={20}/>
                </button>
              </div>
            )}
          </main>
        </div>
      </Container>

      <div className={`fixed inset-0 z-[100] lg:hidden transition-transform duration-500 ease-in-out ${isFilterDrawerOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterDrawerOpen(false)} />
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] p-8 shadow-2xl">
          <FiltersContent />
        </div>
      </div>
    </div>
  )
}