import React, { useEffect, useState } from "react";
import { createProduct, deleteProduct, getProducts } from "../services/productService";

function Container({ children }) {
  return <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-10">{children}</div>;
}

export default function AdminPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    price: 150,
    oldPrice: "",
    badge: "",
    category: "Watches",
    material: "Stainless Steel",
    movement: "Quartz",
    stone: "None",
    inStock: true,
  });

  const [file, setFile] = useState(null);

  const load = async () => {
    const data = await getProducts();
    setList(data);
  };

  useEffect(() => {
    load();
  }, []);

  const onChange = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("image", file);

      await createProduct(fd);
      setFile(null);
      setForm((s) => ({ ...s, title: "", badge: "", oldPrice: "" }));
      await load();
      alert("✅ Product added");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await deleteProduct(id);
    await load();
  };

  return (
    <div className="bg-[#f7f4ef] min-h-screen">
      <Container>
        <h1 className="text-4xl font-display text-neutral-900">Admin</h1>
        <p className="mt-2 text-sm text-neutral-600">Add products and upload images (stored in backend).</p>

        <form onSubmit={onSubmit} className="mt-8 bg-white rounded-3xl p-6 shadow-sm ring-1 ring-black/5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold">Title</label>
              <input
                className="mt-1 w-full rounded-xl border px-3 py-2"
                value={form.title}
                onChange={(e) => onChange("title", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Category</label>
              <select className="mt-1 w-full rounded-xl border px-3 py-2" value={form.category} onChange={(e) => onChange("category", e.target.value)}>
                <option>Watches</option>
                <option>Bangles</option>
                <option>Mens</option>
                <option>Womens</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold">Price (AED)</label>
              <input
                type="number"
                className="mt-1 w-full rounded-xl border px-3 py-2"
                value={form.price}
                onChange={(e) => onChange("price", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Old Price (optional)</label>
              <input
                type="number"
                className="mt-1 w-full rounded-xl border px-3 py-2"
                value={form.oldPrice}
                onChange={(e) => onChange("oldPrice", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Badge (optional)</label>
              <input
                className="mt-1 w-full rounded-xl border px-3 py-2"
                value={form.badge}
                onChange={(e) => onChange("badge", e.target.value)}
                placeholder="New / -10% / Elite"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Material</label>
              <input className="mt-1 w-full rounded-xl border px-3 py-2" value={form.material} onChange={(e) => onChange("material", e.target.value)} />
            </div>

            <div>
              <label className="text-sm font-semibold">Movement</label>
              <input className="mt-1 w-full rounded-xl border px-3 py-2" value={form.movement} onChange={(e) => onChange("movement", e.target.value)} />
            </div>

            <div>
              <label className="text-sm font-semibold">Stone</label>
              <input className="mt-1 w-full rounded-xl border px-3 py-2" value={form.stone} onChange={(e) => onChange("stone", e.target.value)} />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-semibold">Image</label>
              <input
                type="file"
                accept="image/*"
                className="mt-1 w-full rounded-xl border px-3 py-2"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
              />
            </div>

            <div className="sm:col-span-2 flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.inStock}
                onChange={(e) => onChange("inStock", e.target.checked)}
              />
              <span className="text-sm font-semibold">In Stock</span>
            </div>
          </div>

          <button
            disabled={loading}
            className="mt-6 rounded-full bg-neutral-950 text-white px-6 py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>

        <div className="mt-10">
          <h2 className="text-2xl font-display text-neutral-900">Products</h2>

          <div className="mt-4 grid gap-4">
            {list.map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-white p-4 rounded-2xl ring-1 ring-black/5">
                <div className="flex items-center gap-4">
                  <img src={p.image} alt={p.title} className="h-16 w-20 object-cover rounded-xl bg-neutral-100" />
                  <div>
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-sm text-neutral-600">{p.category} • AED {p.price}</div>
                  </div>
                </div>
                <button onClick={() => onDelete(p.id)} className="rounded-full px-4 py-2 bg-red-600 text-white font-semibold">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
