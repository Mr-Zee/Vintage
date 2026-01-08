import React, { useMemo, useState } from "react"
import { LayoutGrid, List, SlidersHorizontal, ChevronDown } from "lucide-react"
import ProductCard from "../components/ProductCard"
import { products as allProducts } from "../data/products"

function Container({ children, className = "" }) {
  return <div className={["mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className].join(" ")}>{children}</div>
}

function Checkbox({ label, checked, onChange, count }) {
  return (
    <label className="flex items-center justify-between gap-3 text-sm text-neutral-700">
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
      {open ? <div className="mt-3 space-y-3">{children}</div> : null}
    </div>
  )
}

export default function ProductsPage() {
  const [view, setView] = useState("grid")
  const [sort, setSort] = useState("featured")

  const [category, setCategory] = useState({ Watches: false, Bangles: false, Mens: false, Womens: false })
  const [material, setMaterial] = useState({ Gold: false, Silver: false, Platinum: false, "Stainless Steel": false, Leather: false })
  const [movement, setMovement] = useState({ Automatic: false, Quartz: false, Mechanical: false, Hybrid: false })
  const [stone, setStone] = useState({ Diamond: false, Ruby: false, Emerald: false, Sapphire: false, Pearl: false, None: false })
  const [priceMax, setPriceMax] = useState(10000)

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
      const priceOk = p.price <= priceMax
      return catOk && matOk && movOk && stoneOk && priceOk
    })

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price)
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [category, material, movement, stone, priceMax, sort])

  const clearAll = () => {
    setCategory({ Watches: false, Bangles: false, Mens: false, Womens: false })
    setMaterial({ Gold: false, Silver: false, Platinum: false, "Stainless Steel": false, Leather: false })
    setMovement({ Automatic: false, Quartz: false, Mechanical: false, Hybrid: false })
    setStone({ Diamond: false, Ruby: false, Emerald: false, Sapphire: false, Pearl: false, None: false })
    setPriceMax(10000)
    setSort("featured")
    setView("grid")
  }

  return (
    <div className="bg-[#f7f4ef]">
      <Container className="py-12">
        <div className="text-center">
          <h1 className="font-display text-5xl text-neutral-900">All Products</h1>
          <p className="mt-3 text-sm text-neutral-600">Discover our exquisite collection of luxury timepieces and bangles</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-black/5 h-fit">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-neutral-700" />
              <h3 className="text-sm font-semibold text-neutral-900">Refine Your Search</h3>
            </div>

            <Collapsible title="Category">
              <Checkbox label="Watches" count={counts.category.Watches} checked={category.Watches} onChange={(v) => setCategory((s) => ({ ...s, Watches: v }))} />
              <Checkbox label="Bangles" count={counts.category.Bangles} checked={category.Bangles} onChange={(v) => setCategory((s) => ({ ...s, Bangles: v }))} />
              <Checkbox label="Men's" count={counts.category.Mens} checked={category.Mens} onChange={(v) => setCategory((s) => ({ ...s, Mens: v }))} />
              <Checkbox label="Women's" count={counts.category.Womens} checked={category.Womens} onChange={(v) => setCategory((s) => ({ ...s, Womens: v }))} />
            </Collapsible>

            <Collapsible title="Price Range">
              <div className="space-y-2">
                <input type="range" min={0} max={10000} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full accent-neutral-950" />
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>$0</span>
                  <span>${priceMax.toLocaleString()}</span>
                </div>
              </div>
            </Collapsible>

            <Collapsible title="Material">
              {Object.keys(material).map((k) => (
                <Checkbox key={k} label={k} count={counts.material[k] ?? undefined} checked={material[k]} onChange={(v) => setMaterial((s) => ({ ...s, [k]: v }))} />
              ))}
            </Collapsible>

            <Collapsible title="Movement Type" defaultOpen={false}>
              {Object.keys(movement).map((k) => (
                <Checkbox key={k} label={k} checked={movement[k]} onChange={(v) => setMovement((s) => ({ ...s, [k]: v }))} />
              ))}
            </Collapsible>

            <Collapsible title="Stone Type" defaultOpen={false}>
              {Object.keys(stone).map((k) => (
                <Checkbox key={k} label={k} checked={stone[k]} onChange={(v) => setStone((s) => ({ ...s, [k]: v }))} />
              ))}
            </Collapsible>

            <button className="mt-5 w-full rounded-full bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-900 transition" type="button">
              Apply Filters
            </button>
            <button className="mt-3 w-full rounded-full bg-neutral-100 px-4 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-200 transition" type="button" onClick={clearAll}>
              Clear All
            </button>
          </aside>

          <section>
            <div className="rounded-3xl bg-white px-5 py-4 shadow-soft ring-1 ring-black/5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-neutral-600">Showing 1-{filtered.length} of {allProducts.length} products</p>
                <div className="flex items-center gap-3">
                  <select className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="featured">Sort by: Featured</option>
                    <option value="price-asc">Sort by: Price (Low → High)</option>
                    <option value="price-desc">Sort by: Price (High → Low)</option>
                  </select>

                  <div className="flex overflow-hidden rounded-full border border-neutral-200">
                    <button type="button" onClick={() => setView("grid")} className={["grid h-10 w-10 place-items-center", view === "grid" ? "bg-neutral-950 text-white" : "bg-white text-neutral-700 hover:bg-neutral-100"].join(" ")} aria-label="Grid view">
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => setView("list")} className={["grid h-10 w-10 place-items-center", view === "list" ? "bg-neutral-950 text-white" : "bg-white text-neutral-700 hover:bg-neutral-100"].join(" ")} aria-label="List view">
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {view === "grid" ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} variant="list" />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
