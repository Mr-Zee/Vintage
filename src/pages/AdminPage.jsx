import React, { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/productService";
import { Edit2, Trash2, X, UploadCloud } from "lucide-react";
import Modal from "../components/Modal";

export default function AdminPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    title: "",
    code: "",
    material: "Stainless Steel",
    badge: "",
    description: "",
  });

  // --- Modal State & Helpers ---
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success",
    onConfirm: null,
  });

  const showModal = (title, message, type = "success", onConfirm = null) => {
    setModal({ isOpen: true, title, message, type, onConfirm });
  };

  const materialOptions = ["Gold", "Silver", "Platinum", "Stainless Steel", "Leather"];

  const load = async () => {
    const data = await getProducts();
    setList(data);
  };

  useEffect(() => {
    load();
  }, []);

  const onEdit = (p) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      code: p.reviews,
      material: p.material,
      badge: p.badge || "",
      description: p.description || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", code: "", material: "Stainless Steel", badge: "", description: "" });
    setFile(null);
  };

  // --- Updated Delete Logic ---
  const handleDeleteClick = (id) => {
    showModal(
      "Are you sure?",
      "This masterpiece will be permanently removed from your inventory.",
      "confirm",
      async () => {
        setModal((prev) => ({ ...prev, isOpen: false }));
        try {
          await deleteProduct(id);
          await load();
        } catch (err) {
          showModal("Error", "Could not delete the item.", "error");
        }
      }
    );
  };

  // --- Updated Submit Logic ---
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("code", form.code);
      fd.append("material", form.material);
      fd.append("badge", form.badge);
      fd.append("description", form.description);

      if (editingId) {
        if (file) {
          fd.append("image", file);
        } else {
          const currentItem = list.find((p) => p.id === editingId);
          fd.append("image", currentItem.image);
        }
        await updateProduct(editingId, fd);
        showModal("Success", "The product has been updated successfully.");
      } else {
        if (!file) {
          setLoading(false);
          return showModal("Required", "Please upload an image.", "error");
        }
        fd.append("image", file);
        await createProduct(fd);
        showModal("Success", "New product added to inventory.");
      }
      cancelEdit();
      load();
    } catch (err) {
      showModal("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fcfaf7] min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">
            {editingId ? "Edit Product" : "New Product"}
          </h1>
        </header>

        {/* --- FORM SECTION --- */}
        <form onSubmit={onSubmit} className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 mb-10">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="sm:col-span-3">
              <label className="text-sm font-bold uppercase text-neutral-600">Title</label>
              <input
                className="w-full mt-1 border-b-2 border-neutral-400 py-2 focus:border-neutral-900 outline-none transition"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="sm:col-span-3">
              <label className="text-sm font-bold uppercase text-neutral-600">Description</label>
              <textarea
                rows="3"
                placeholder="Describe the product details..."
                className="w-full mt-1 border-b-2 border-neutral-400 py-2 focus:border-neutral-900 outline-none transition bg-transparent resize-none"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-bold uppercase text-neutral-600">Badge</label>
              <input
                className="w-full mt-1 border-b-2 border-neutral-400 py-2 focus:border-neutral-900 outline-none transition"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-bold uppercase text-neutral-600">Code ID</label>
              <input
                className="w-full mt-1 border-b-2 border-neutral-400 py-2 focus:border-neutral-900 outline-none transition"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-bold uppercase text-neutral-600">Material</label>
              <select
                className="w-full mt-1 border-b-2 border-neutral-400 py-2 focus:border-neutral-900 outline-none transition bg-transparent"
                value={form.material}
                onChange={(e) => setForm({ ...form, material: e.target.value })}
              >
                {materialOptions.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-bold uppercase text-neutral-600">Image</label>
              <input
                type="file"
                className="block w-full text-sm text-neutral-500 mt-2 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button className="px-6 bg-neutral-900 text-white py-3 rounded-xl font-bold hover:bg-black transition disabled:opacity-50">
              {loading ? "Processing..." : editingId ? "Save Changes" : "Add to Inventory"}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="px-6 bg-neutral-200 text-neutral-600 rounded-xl font-bold hover:bg-neutral-300">
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* --- INVENTORY LIST --- */}
        <h2 className="text-xl font-bold mb-6 px-2 text-neutral-900">Inventory List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((p) => (
            <div key={p.id} className="group bg-white rounded-3xl border border-neutral-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-square overflow-hidden bg-neutral-50">
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.title} />
                {p.badge && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold">
                   {p.badge}
                 </span>
                )}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEdit(p)} className="p-2 bg-white/90 backdrop-blur shadow-sm text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDeleteClick(p.id)} className="p-2 bg-white/90 backdrop-blur shadow-sm text-red-600 rounded-full hover:bg-red-600 hover:text-white transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">{p.material}</p>
                <h3 className="font-bold text-neutral-900 truncate mb-1">{p.title}</h3>
                <p className="text-xs mb-2">{p.description}</p>
                <span className="text-xs text-neutral-500 font-medium">Code: {p.reviews}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal 
        {...modal} 
        onClose={() => setModal({ ...modal, isOpen: false })} 
      />
    </div>
  );
}