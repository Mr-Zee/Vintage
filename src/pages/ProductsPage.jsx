import React, { useMemo, useState, useEffect } from "react"
import { LayoutGrid, List, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react"
import ProductCard from "../components/ProductCard"
import { products as allProducts } from "../data/products"

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
  const [sort, setSort] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)

  // Filter States
  const [category, setCategory] = useState({ Watches: false, Bangles: false, Mens: false, Womens: false })
  const [material, setMaterial] = useState({ Gold: false, Silver: false, Platinum: false, "Stainless Steel": false, Leather: false })
  const [movement, setMovement] = useState({ Automatic: false, Quartz: false, Mechanical: false, Hybrid: false })
  const [stone, setStone] = useState({ Diamond: false, Ruby: false, Emerald: false, Sapphire: false, Pearl: false, None: false })
  const [priceMax, setPriceMax] = useState(10000)

  useEffect(() => { setCurrentPage(1); }, [category, material, movement, stone, priceMax, sort]);

  const counts = useMemo(() => {
    const c = {
      category: { Watches: 0, Bangles: 0, Mens: 0, Womens: 0 },
      material: { Gold: 0, Silver: 0, Platinum: 0, "Stainless Steel": 0, Leather: 0 },
    }
    allProducts.forEach((p) => {
      if (c.category[p.category] !== undefined) c.category[p.category]++
      if (c.material[p.material] !== undefined) c.material[p.material]++
    })
    return c
  }, [])

  const filtered = useMemo(() => {
    const pickedCat = Object.entries(category).filter(([, v]) => v).map(([k]) => k)
    const pickedMat = Object.entries(material).filter(([, v]) => v).map(([k]) => k)
    const pickedMov = Object.entries(movement).filter(([, v]) => v).map(([k]) => k)
    const pickedStone = Object.entries(stone).filter(([, v]) => v).map(([k]) => k)

    let list = allProducts.filter((p) => {
      const catOk = pickedCat.length ? pickedCat.includes(p.category) : true
      const matOk = pickedMat.length ? pickedMat.includes(p.material) : true
      const movOk = pickedMov.length ? pickedMov.includes(p.movement) : true
      const stoneOk = pickedStone.length ? pickedStone.includes(p.stone) : true
      return catOk && matOk && movOk && stoneOk && p.price <= priceMax
    })

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price)
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [category, material, movement, stone, priceMax, sort])

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const FiltersContent = () => (
    <div className="space-y-6">
              <h3 className="text-sm font-semibold text-neutral-900">Refine Your Search</h3>
      <div className="flex items-center justify-between lg:hidden">
        <h3 className="text-lg font-bold">Filters</h3>
        <button onClick={() => setIsFilterDrawerOpen(false)}><X className="h-6 w-6" /></button>
      </div>
      <Collapsible title="Category">
        <Checkbox label="Watches" count={counts.category.Watches} checked={category.Watches} onChange={(v) => setCategory(s => ({ ...s, Watches: v }))} />
        {/* <Checkbox label="Bangles" count={counts.category.Bangles} checked={category.Bangles} onChange={(v) => setCategory(s => ({ ...s, Bangles: v }))} /> */}
        <Checkbox label="Men's" count={counts.category.Mens} checked={category.Mens} onChange={(v) => setCategory(s => ({ ...s, Mens: v }))} />
        <Checkbox label="Women's" count={counts.category.Womens} checked={category.Womens} onChange={(v) => setCategory(s => ({ ...s, Womens: v }))} />
      </Collapsible>
      <Collapsible title="Price Range">
        <input type="range" min={0} max={10000} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full accent-neutral-950" />
        <div className="flex justify-between text-xs mt-1"><span>AED 0</span><span>AED {priceMax}</span></div>
      </Collapsible>
      <Collapsible title="Material">
        {Object.keys(material).map(k => (
          <Checkbox key={k} label={k} count={counts.material[k]} checked={material[k]} onChange={v => setMaterial(s => ({ ...s, [k]: v }))} />
        ))}
      </Collapsible>
      <button onClick={() => setIsFilterDrawerOpen(false)} className="w-full rounded-full bg-black py-3 text-white font-semibold lg:hidden">Show Results</button>
    </div>
  );

  return (
    <div className="bg-[#f7f4ef] min-h-screen pb-20">
      <Container className="py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-display text-neutral-900">Our Collection</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block sticky top-24 h-fit bg-white p-6 rounded-3xl shadow-sm ring-1 ring-black/5">
            <FiltersContent />
          </aside>

          {/* Main List */}
          <main>
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm ring-1 ring-black/5 mb-6">
              <button 
                onClick={() => setIsFilterDrawerOpen(true)}
                className="flex items-center gap-2 lg:hidden px-4 py-2 border rounded-full text-sm font-medium"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>

              <div className="hidden sm:block text-sm text-neutral-500">
                {filtered.length} items found
              </div>

              <div className="flex items-center gap-3">
                <select className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <div className="hidden sm:flex border-l pl-2 gap-1">
                   <button onClick={() => setView("grid")} className={`p-2 rounded-lg ${view === 'grid' ? 'bg-black text-white' : ''}`}><LayoutGrid size={18}/></button>
                   <button onClick={() => setView("list")} className={`p-2 rounded-lg ${view === 'list' ? 'bg-black text-white' : ''}`}><List size={18}/></button>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className={view === "grid" ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6" : "flex flex-col gap-4"}>
              {paginatedProducts.map(p => <ProductCard key={p.id} product={p} variant={view} />)}
            </div>

            {/* Responsive Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                <button 
                  disabled={currentPage === 1} 
                  onClick={() => {setCurrentPage(c => c - 1); window.scrollTo(0,0)}}
                  className="p-2 border rounded-full disabled:opacity-20"
                >
                  <ChevronLeft size={20}/>
                </button>
                
                <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-none px-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {setCurrentPage(i + 1); window.scrollTo(0,0)}}
                      className={`min-w-[40px] h-10 rounded-full text-sm font-bold transition ${currentPage === i + 1 ? 'bg-black text-white' : 'bg-white border'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  disabled={currentPage === totalPages} 
                  onClick={() => {setCurrentPage(c => c + 1); window.scrollTo(0,0)}}
                  className="p-2 border rounded-full disabled:opacity-20"
                >
                  <ChevronRight size={20}/>
                </button>
              </div>
            )}
          </main>
        </div>
      </Container>

      {/* Mobile Filter Drawer */}
      <div className={`fixed inset-0 z-[100] lg:hidden transition-transform duration-300 ${isFilterDrawerOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsFilterDrawerOpen(false)} />
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-6 max-h-[85vh] overflow-y-auto">
          <FiltersContent />
        </div>
      </div>
    </div>
  )
}