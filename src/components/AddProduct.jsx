import { useState } from "react";

const CATEGORIES = ["Aluminium", "Glass", "Hardware"];
const MATERIALS = ["Aluminium", "Glass", "Steel", "Wood", "PVC", "Rubber", "Brass", "Zinc"];

// Pass `initialData` + `isEdit=true` for edit mode
export default function AddProduct({ initialData = null, isEdit = false, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    unit: initialData?.unit || "",
    categories: initialData?.categories || [],
    materials: initialData?.materials || [],
    openingStock: initialData?.openingStock || [{ date: "", quantity: "", category: "" }],
    newCategory: "",
  });

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  // Category multi-select toggle
  const toggleCategory = (cat) => {
    set("categories", form.categories.includes(cat)
      ? form.categories.filter((c) => c !== cat)
      : [...form.categories, cat]);
  };

  // Material multi-select toggle
  const toggleMaterial = (mat) => {
    set("materials", form.materials.includes(mat)
      ? form.materials.filter((m) => m !== mat)
      : [...form.materials, mat]);
  };

  // Opening stock rows
  const updateStock = (i, key, val) => {
    const rows = [...form.openingStock];
    rows[i] = { ...rows[i], [key]: val };
    set("openingStock", rows);
  };
  const addStockRow = () =>
    set("openingStock", [...form.openingStock, { date: "", quantity: "", category: "" }]);
  const removeStockRow = (i) =>
    set("openingStock", form.openingStock.filter((_, idx) => idx !== i));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-0.5">
              Products
            </p>
            <h1 className="text-lg font-semibold text-gray-800">
              {isEdit ? "Edit Product" : "Add Product"}
            </h1>
          </div>
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-sm text-gray-400 hover:text-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">

          {/* Row: Name + Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Product Name" required>
              <input
                type="text"
                placeholder="e.g. Aluminium Channel"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
                className={inputCls}
              />
            </Field>
            <Field label="Unit" required>
              <input
                type="text"
                placeholder="e.g. kg, pcs, ft"
                value={form.unit}
                onChange={(e) => set("unit", e.target.value)}
                required
                className={inputCls}
              />
            </Field>
          </div>

          {/* Product Category */}
          <Field label="Product Category">
            <div className="flex flex-wrap gap-2 mt-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition
                    ${form.categories.includes(cat)
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Field>

          {/* Material */}
          <Field label="Material">
            <div className="flex flex-wrap gap-2 mt-1">
              {MATERIALS.map((mat) => (
                <button
                  key={mat}
                  type="button"
                  onClick={() => toggleMaterial(mat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition
                    ${form.materials.includes(mat)
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300"
                    }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </Field>

          {/* Opening Stock */}
          <Field label="Opening Stock">
            <div className="space-y-2 mt-1">
              {form.openingStock.map((row, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <input
                    type="date"
                    value={row.date}
                    onChange={(e) => updateStock(i, "date", e.target.value)}
                    className={`${inputCls} flex-1`}
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    value={row.quantity}
                    onChange={(e) => updateStock(i, "quantity", e.target.value)}
                    className={`${inputCls} w-24`}
                  />
                  <select
                    value={row.category}
                    onChange={(e) => updateStock(i, "category", e.target.value)}
                    className={`${inputCls} flex-1`}
                  >
                    <option value="">Category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  {form.openingStock.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStockRow(i)}
                      className="text-red-400 hover:text-red-600 text-lg leading-none px-1"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addStockRow}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium mt-1 flex items-center gap-1"
              >
                <span className="text-base leading-none">+</span> Add Row
              </button>
            </div>
          </Field>

          {/* Submit */}
          <div className="pt-2 flex gap-3 justify-end border-t border-gray-100">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-sm"
            >
              {isEdit ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Helpers
const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-gray-300 transition";

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}