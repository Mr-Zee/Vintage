import React, { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/productService";
import { Edit2, Trash2, X, UploadCloud } from "lucide-react";

export default function AdminPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const materialOptions = [
    "Gold",
    "Silver",
    "Platinum",
    "Stainless Steel",
    "Leather",
  ];

  const [form, setForm] = useState({
    title: "",
    code: "",
    material: "Stainless Steel",
    badge: "",
  });
  const [file, setFile] = useState(null);

  const load = async () => {
    const data = await getProducts();
    setList(data);
  };

  useEffect(() => { load();}, []);

  const onEdit = (p) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      code: p.reviews,
      material: p.material,
      badge: p.badge || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", code: "", material: "Stainless Steel", badge: "" });
    setFile(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("code", form.code);
      fd.append("material", form.material);
      fd.append("badge", form.badge);

      if (editingId) {
        if (file) {
          fd.append("image", file);
        } else {
          const currentItem = list.find((p) => p.id === editingId);
          fd.append("image", currentItem.image);
        }
        await updateProduct(editingId, fd);
      } else {
        if (!file) return alert("Image required");
        fd.append("image", file);
        await createProduct(fd);
      }
      cancelEdit();
      load();
      alert("Success!");
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fcfaf7] min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {" "}
        {/* Widened container for 4-column grid */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">
            {editingId ? "Edit Product" : "New Product"}
          </h1>
         
        </header>
        {/* --- FORM SECTION --- */}
        <form
          onSubmit={onSubmit}
          className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 mb-10"
        >
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="sm:col-span-3">
              <label className="text-sm font-bold uppercase text-neutral-600">
                Title
              </label>
              <input
                className="w-full mt-1 border-b-2 border-neutral-400 py-2 focus:border-neutral-900 outline-none transition"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold uppercase text-neutral-600">
                Badge (Optional)
              </label>
              <input
                placeholder="e.g. New, Limited"
                className="w-full mt-1 border-b-2 border-neutral-400 py-2 focus:border-neutral-900 outline-none transition"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-bold uppercase text-neutral-600">
                Code ID
              </label>
              <input
                className="w-full mt-1 border-b-2 border-neutral-400 py-2 focus:border-neutral-900 outline-none transition"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold uppercase text-neutral-600">
                Material
              </label>
              <select
                className="w-full mt-1 border-b-2 border-neutral-400 py-2 focus:border-neutral-900 outline-none transition bg-transparent"
                value={form.material}
                onChange={(e) => setForm({ ...form, material: e.target.value })}
              >
                {materialOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-bold uppercase text-neutral-600">
                Image {editingId && "(Optional)"}
              </label>
              <input
                type="file"
                className="block w-full text-sm text-neutral-500 mt-2 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button className="px-6 bg-neutral-900 text-white py-3 rounded-xl font-bold hover:bg-black transition disabled:opacity-50">
              {loading
                ? "Processing..."
                : editingId
                  ? "Save Changes"
                  : "Add to Inventory"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 bg-neutral-200 text-neutral-600 rounded-xl font-bold hover:bg-neutral-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
        {/* --- 4-COLUMN CARD GRID --- */}
        <h2 className="text-xl font-bold mb-6 px-2 text-neutral-900">
          Inventory List
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((p) => (
            <div
              key={p.id}
              className="group bg-white rounded-3xl border border-neutral-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-neutral-50">
                <img
                  src={p.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={p.title}
                />
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(p)}
                    className="p-2 bg-white/90 backdrop-blur shadow-sm text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id).then(load)}
                    className="p-2 bg-white/90 backdrop-blur shadow-sm text-red-600 rounded-full hover:bg-red-600 hover:text-white transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                  {p.material}
                </p>
                <h3 className="font-bold text-neutral-900 truncate mb-1">
                  {p.title}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-neutral-500 font-medium">
                    Code: <span className="text-neutral-900">{p.reviews}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}