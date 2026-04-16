import { useState } from "react";

// --- Mock data (replace with API/context) ---
const MOCK_PROJECTS = [
  { id: 1, name: "Sunrise Residency", client: "Mehta Builders" },
  { id: 2, name: "Galaxy Mall Fit-out", client: "Orbit Infra" },
  { id: 3, name: "Green Villa Phase 2", client: "Patel Constructions" },
];

const MOCK_PRODUCTS = [
  { id: 1, name: "Aluminium Channel", unit: "kg", price: 120 },
  { id: 2, name: "Glass Panel 6mm", unit: "pcs", price: 850 },
  { id: 3, name: "Door Handle Set", unit: "set", price: 450 },
  { id: 4, name: "Rubber Gasket", unit: "mtr", price: 35 },
  { id: 5, name: "Brass Hinge", unit: "pcs", price: 75 },
];

// ─── helpers ──────────────────────────────────────────────────────────────────
const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-gray-300 transition";

function Field({ label, required, children, className = "" }) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

// ─── Inline Add Project ────────────────────────────────────────────────────────
function AddProjectInline({ onAdd, onClose }) {
  const [p, setP] = useState({ name: "", client: "" });
  const sp = (k, v) => setP((prev) => ({ ...prev, [k]: v }));
  return (
    <div className="mt-2 p-4 border border-dashed border-indigo-300 rounded-xl bg-indigo-50/40 space-y-3">
      <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">New Project</p>
      <div className="grid grid-cols-2 gap-3">
        <input type="text" placeholder="Project name" value={p.name}
          onChange={(e) => sp("name", e.target.value)} className={inputCls} />
        <input type="text" placeholder="Client name" value={p.client}
          onChange={(e) => sp("client", e.target.value)} className={inputCls} />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onClose}
          className="px-3 py-1.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
          Cancel
        </button>
        <button type="button" disabled={!p.name || !p.client} onClick={() => { onAdd(p); onClose(); }}
          className="px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-40 transition">
          Add & Select
        </button>
      </div>
    </div>
  );
}

// ─── Product Line Row ──────────────────────────────────────────────────────────
function ProductRow({ row, index, products, onChange, onRemove, showRemove }) {
  const selected = products.find((p) => p.id === Number(row.productId));

  const handleProductChange = (id) => {
    const prod = products.find((p) => p.id === Number(id));
    onChange(index, "productId", id);
    if (prod) {
      onChange(index, "unit", prod.unit);
      onChange(index, "price", prod.price);
    }
  };

  const lineTotal =
    row.quantity && row.price
      ? (parseFloat(row.quantity) * parseFloat(row.price)).toFixed(2)
      : null;

  return (
    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 space-y-3">
      {/* Row header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Item {index + 1}
        </span>
        {showRemove && (
          <button type="button" onClick={() => onRemove(index)}
            className="text-xs text-red-400 hover:text-red-600 font-medium transition">
            Remove
          </button>
        )}
      </div>

      {/* Product select */}
      <select value={row.productId} onChange={(e) => handleProductChange(e.target.value)}
        className={inputCls}>
        <option value="">Select product…</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      {/* Qty + Unit + Price */}
      {selected && (
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Qty</label>
            <input type="number" placeholder="0" min="0" value={row.quantity}
              onChange={(e) => onChange(index, "quantity", e.target.value)}
              className={inputCls} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Unit</label>
            <input type="text" value={row.unit} readOnly
              className={`${inputCls} bg-gray-100 text-gray-400 cursor-not-allowed`} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Rate (₹)</label>
            <input type="number" placeholder="0.00" min="0" step="0.01" value={row.price}
              onChange={(e) => onChange(index, "price", e.target.value)}
              className={inputCls} />
          </div>
        </div>
      )}

      {/* Line total */}
      {lineTotal && (
        <div className="flex justify-end">
          <span className="text-xs text-gray-400">
            Line Total: <span className="font-semibold text-gray-700">₹ {lineTotal}</span>
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
const emptyItem = () => ({ productId: "", quantity: "", unit: "", price: "" });

export default function AddSale({ initialData = null, isEdit = false, onSubmit, onCancel }) {
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [products] = useState(MOCK_PRODUCTS);
  const [showAddProject, setShowAddProject] = useState(false);

  const [form, setForm] = useState({
    projectId: initialData?.projectId || "",
    saleDate: initialData?.saleDate || new Date().toISOString().split("T")[0],
    items: initialData?.items || [emptyItem()],
    discount: initialData?.discount || "",
    notes: initialData?.notes || "",
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleItemChange = (i, key, val) => {
    const items = [...form.items];
    items[i] = { ...items[i], [key]: val };
    set("items", items);
  };
  const addItem = () => set("items", [...form.items, emptyItem()]);
  const removeItem = (i) => set("items", form.items.filter((_, idx) => idx !== i));

  const handleAddProject = (proj) => {
    const created = { ...proj, id: Date.now() };
    setProjects((prev) => [...prev, created]);
    set("projectId", created.id);
  };

  const selectedProject = projects.find((p) => p.id === Number(form.projectId));

  const subtotal = form.items.reduce((sum, row) => {
    const val = row.quantity && row.price
      ? parseFloat(row.quantity) * parseFloat(row.price) : 0;
    return sum + val;
  }, 0);

  const discountAmt = form.discount ? (subtotal * parseFloat(form.discount)) / 100 : 0;
  const grandTotal = (subtotal - discountAmt).toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ ...form, subtotal: subtotal.toFixed(2), grandTotal });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-0.5">Sale</p>
            <h1 className="text-lg font-semibold text-gray-800">
              {isEdit ? "Edit Sale" : "Add Sale"}
            </h1>
          </div>
          {onCancel && (
            <button onClick={onCancel} className="text-sm text-gray-400 hover:text-gray-600 transition">
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">

          {/* ── Project ── */}
          <Field label="Project" required>
            <select value={form.projectId} onChange={(e) => set("projectId", e.target.value)}
              required className={inputCls}>
              <option value="">Select a project…</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name} — {p.client}</option>
              ))}
            </select>

            {/* Project meta */}
            {selectedProject && (
              <p className="mt-1.5 text-xs text-gray-400">
                Client: <span className="font-medium text-gray-600">{selectedProject.client}</span>
              </p>
            )}

            {!showAddProject && (
              <button type="button" onClick={() => setShowAddProject(true)}
                className="mt-2 text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                <span className="text-sm">+</span> Add new project
              </button>
            )}
            {showAddProject && (
              <AddProjectInline onAdd={handleAddProject} onClose={() => setShowAddProject(false)} />
            )}
          </Field>

          {/* ── Sale Date ── */}
          <Field label="Sale Date" required>
            <input type="date" value={form.saleDate}
              onChange={(e) => set("saleDate", e.target.value)}
              required className={inputCls} />
          </Field>

          {/* ── Products ── */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Products <span className="text-red-400">*</span>
            </label>
            <div className="space-y-3">
              {form.items.map((row, i) => (
                <ProductRow
                  key={i}
                  row={row}
                  index={i}
                  products={products}
                  onChange={handleItemChange}
                  onRemove={removeItem}
                  showRemove={form.items.length > 1}
                />
              ))}
            </div>
            <button type="button" onClick={addItem}
              className="mt-3 text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
              <span className="text-base">+</span> Add Product
            </button>
          </div>

          {/* ── Summary ── */}
          {subtotal > 0 && (
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="text-sm font-medium text-gray-700">₹ {subtotal.toFixed(2)}</span>
              </div>

              {/* Discount */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                <span className="text-sm text-gray-500">Discount (%)</span>
                <input
                  type="number" placeholder="0" min="0" max="100" value={form.discount}
                  onChange={(e) => set("discount", e.target.value)}
                  className="w-20 border border-gray-200 rounded-lg px-2 py-1 text-sm text-right text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between px-4 py-3 bg-indigo-50 border-t border-indigo-100">
                <span className="text-sm font-semibold text-indigo-700">Grand Total</span>
                <span className="text-base font-bold text-indigo-700">₹ {grandTotal}</span>
              </div>
            </div>
          )}

          {/* ── Notes ── */}
          <Field label="Notes">
            <textarea rows={2} placeholder="Optional notes…" value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              className={`${inputCls} resize-none`} />
          </Field>

          {/* ── Submit ── */}
          <div className="pt-2 flex gap-3 justify-end border-t border-gray-100">
            {onCancel && (
              <button type="button" onClick={onCancel}
                className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition">
                Cancel
              </button>
            )}
            <button type="submit"
              className="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600  hover:bg-indigo-700 transition shadow-sm">
              {isEdit ? "Update Sale" : "Save Sale"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}