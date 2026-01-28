import React, { useEffect, useState } from "react";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../services/productService";
import { Edit2, Trash2, X, UploadCloud } from "lucide-react";

export default function AdminPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({ title: "", code: "", material: "Stainless Steel" });
  const [file, setFile] = useState(null);

  const load = async () => {
    const data = await getProducts();
    setList(data);
  };

  useEffect(() => { load(); }, []);

  const onEdit = (p) => {
    setEditingId(p.id);
    setForm({ title: p.title, code: p.reviews, material: p.material });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", code: "", material: "Stainless Steel" });
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

    if (editingId) {
      if (file) {
        // User picked a new file
        fd.append("image", file);
      } else {
        // User did NOT pick a file, send the old URL back
        const currentItem = list.find(p => p.id === editingId);
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
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">{editingId ? "Edit Product" : "New Product"}</h1>
          <p className="text-neutral-500">Manage your inventory and S3 assets.</p>
        </header>

        {/* --- FORM SECTION --- */}
        <form onSubmit={onSubmit} className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 mb-10">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase text-neutral-400">Title</label>
              <input className="w-full mt-1 border-b-2 border-neutral-100 py-2 focus:border-neutral-900 outline-none transition" 
                     value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-neutral-400">Code ID</label>
              <input className="w-full mt-1 border-b-2 border-neutral-100 py-2 focus:border-neutral-900 outline-none transition" 
                     value={form.code} onChange={e => setForm({...form, code: e.target.value})} required />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-neutral-400">Material</label>
              <input className="w-full mt-1 border-b-2 border-neutral-100 py-2 focus:border-neutral-900 outline-none transition" 
                     value={form.material} onChange={e => setForm({...form, material: e.target.value})} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase text-neutral-400">Image {editingId && "(Optional)"}</label>
              <input type="file" className="block w-full text-sm text-neutral-500 mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200" 
                     onChange={e => setFile(e.target.files[0])} />
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button className="flex-1 bg-neutral-900 text-white py-3 rounded-xl font-bold hover:bg-black transition disabled:opacity-50">
              {loading ? "Processing..." : editingId ? "Save Changes" : "Add to Inventory"}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="px-6 bg-neutral-100 text-neutral-600 rounded-xl font-bold hover:bg-neutral-200">
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* --- THUMBNAIL LIST SECTION --- */}
        <h2 className="text-xl font-bold mb-4 px-2">Inventory List</h2>
        <div className="grid gap-3">
          {list.map((p) => (
            <div key={p.id} className="group flex items-center bg-white p-3 rounded-2xl border border-neutral-100 hover:shadow-md transition">
              <img src={p.image} className="w-20 h-20 object-cover rounded-xl bg-neutral-50" alt="" />
              
              <div className="ml-4 flex-1">
                <h3 className="font-bold text-neutral-900 leading-tight">{p.title}</h3>
                <div className="flex gap-3 mt-1 text-sm text-neutral-500">
                  <span>Code: <b className="text-neutral-800">{p.reviews}</b></span>
                  <span>•</span>
                  <span>{p.material}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => onEdit(p)} className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => deleteProduct(p.id).then(load)} className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}