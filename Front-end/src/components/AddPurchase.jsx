import { useState } from "react";

// --- Mock data (replace with API/context) ---
const MOCK_PRODUCTS = [
  { id: 1, name: "Aluminium Channel", unit: "kg", categories: ["Aluminium"], materials: ["Aluminium"] },
  { id: 2, name: "Glass Panel 6mm", unit: "pcs", categories: ["Glass"], materials: ["Glass"] },
  { id: 3, name: "Door Handle Set", unit: "set", categories: ["Hardware"], materials: ["Brass"] },
];
const MOCK_DISTRIBUTORS = ["Gujarat Glass Co.", "Shree Aluminium", "National Hardware", "Raj Traders"];
const UNITS = ["kg", "pcs", "ft", "mtr", "set", "box", "ltr"];

// ─── helpers ──────────────────────────────────────────────────────────────────
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

function Badge({ label, color = "indigo" }) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
    gray: "bg-gray-100 text-gray-500 border-gray-200",
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${colors[color]}`}>
      {label}
    </span>
  );
}

// ─── Inline Add Product mini-form ─────────────────────────────────────────────
function AddProductInline({ onAdd, onClose }) {
  const [p, setP] = useState({ name: "", unit: "" });
  const sp = (k, v) => setP((prev) => ({ ...prev, [k]: v }));
  return (
    <div className="mt-2 p-4 border border-dashed border-indigo-300 rounded-xl bg-indigo-50/40 space-y-3">
      <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">New Product</p>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Product name"
          value={p.name}
          onChange={(e) => sp("name", e.target.value)}
          className={inputCls}
        />
        <input
          type="text"
          placeholder="Unit (kg, pcs…)"
          value={p.unit}
          onChange={(e) => sp("unit", e.target.value)}
          className={inputCls}
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!p.name || !p.unit}
          onClick={() => { onAdd(p); onClose(); }}
          className="px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-40 transition"
        >
          Add & Select
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AddPurchase({ initialData = null, isEdit = false, onSubmit, onCancel }) {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const [form, setForm] = useState({
    productId: initialData?.productId || "",
    distributor: initialData?.distributor || "",
    unit: initialData?.unit || "",
    quantity: initialData?.quantity || "",
    pricePerUnit: initialData?.pricePerUnit || "",
    purchaseDate: initialData?.purchaseDate || new Date().toISOString().split("T")[0],
    notes: initialData?.notes || "",
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const selectedProduct = products.find((p) => p.id === Number(form.productId));

  const handleProductChange = (id) => {
    const prod = products.find((p) => p.id === Number(id));
    set("productId", id);
    if (prod) set("unit", prod.unit);
  };

  const handleAddProduct = (newProd) => {
    const created = { ...newProd, id: Date.now(), categories: [], materials: [] };
    setProducts((prev) => [...prev, created]);
    handleProductChange(created.id);
  };

  const total =
    form.quantity && form.pricePerUnit
      ? (parseFloat(form.quantity) * parseFloat(form.pricePerUnit)).toFixed(2)
      : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ ...form, total });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-0.5">
              Purchase
            </p>
            <h1 className="text-lg font-semibold text-gray-800">
              {isEdit ? "Edit Purchase" : "Add Purchase"}
            </h1>
          </div>
          {onCancel && (
            <button onClick={onCancel} className="text-sm text-gray-400 hover:text-gray-600 transition">
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">

          {/* ── Product Select ── */}
          <Field label="Product" required>
            <select
              value={form.productId}
              onChange={(e) => handleProductChange(e.target.value)}
              required
              className={inputCls}
            >
              <option value="">Select a product…</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            {/* Product meta badges */}
            {selectedProduct && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                <Badge label={`Unit: ${selectedProduct.unit}`} color="gray" />
                {selectedProduct.categories.map((c) => <Badge key={c} label={c} color="indigo" />)}
                {selectedProduct.materials.map((m) => <Badge key={m} label={m} color="emerald" />)}
              </div>
            )}

            {/* Add new product toggle */}
            {!showAddProduct && (
              <button
                type="button"
                onClick={() => setShowAddProduct(true)}
                className="mt-2 text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
              >
                <span className="text-sm">+</span> Add new product
              </button>
            )}
            {showAddProduct && (
              <AddProductInline
                onAdd={handleAddProduct}
                onClose={() => setShowAddProduct(false)}
              />
            )}
          </Field>

          {/* ── Distributor ── */}
          <Field label="From Distributor" required>
            <input
              list="distributor-list"
              type="text"
              placeholder="Search or type distributor name"
              value={form.distributor}
              onChange={(e) => set("distributor", e.target.value)}
              required
              className={inputCls}
            />
            <datalist id="distributor-list">
              {MOCK_DISTRIBUTORS.map((d) => <option key={d} value={d} />)}
            </datalist>
          </Field>

          {/* ── Qty + Unit + Price ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Quantity" required>
              <input
                type="number"
                placeholder="0"
                min="0"
                value={form.quantity}
                onChange={(e) => set("quantity", e.target.value)}
                required
                className={inputCls}
              />
            </Field>

            <Field label="Unit" required>
              <select
                value={form.unit}
                onChange={(e) => set("unit", e.target.value)}
                required
                className={inputCls}
              >
                <option value="">Select unit</option>
                {UNITS.map((u) => <option key={u}>{u}</option>)}
              </select>
            </Field>

            <Field label="Price / Unit (₹)" required>
              <input
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={form.pricePerUnit}
                onChange={(e) => set("pricePerUnit", e.target.value)}
                required
                className={inputCls}
              />
            </Field>
          </div>

          {/* ── Total display ── */}
          {total && (
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-sm text-gray-500 font-medium">Total Amount</span>
              <span className="text-base font-semibold text-gray-800">₹ {total}</span>
            </div>
          )}

          {/* ── Purchase Date ── */}
          <Field label="Purchase Date" required>
            <input
              type="date"
              value={form.purchaseDate}
              onChange={(e) => set("purchaseDate", e.target.value)}
              required
              className={inputCls}
            />
          </Field>

          {/* ── Notes ── */}
          <Field label="Notes">
            <textarea
              rows={2}
              placeholder="Optional notes…"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              className={`${inputCls} resize-none`}
            />
          </Field>

          {/* ── Submit ── */}
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
              className="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600  hover:bg-indigo-700 transition shadow-sm"
            >
              {isEdit ? "Update Purchase" : "Save Purchase"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}