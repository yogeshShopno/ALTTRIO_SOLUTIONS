import { useState } from "react";

// ─── Constants ─────────────────────────────────────────────────────────────────
const STAGES = ["Aluminium", "Glass", "Hardware", "Fitting", "Order", "Complete"];

const STATUS_CONFIG = {
  pending:     { label: "Pending",     cls: "bg-yellow-50 text-yellow-600 border-yellow-200" },
  "in-progress": { label: "In Progress", cls: "bg-blue-50 text-blue-600 border-blue-200" },
  success: { label: "Success", cls: "bg-emerald-50 text-emerald-600 border-emerald-200" },
};

const STAGE_CONFIG = {
  Aluminium: { color: "bg-slate-200 text-slate-600", done: "bg-slate-600 " },
  Glass: { color: "bg-cyan-100 text-cyan-700", done: "bg-cyan-600 " },
  Hardware: { color: "bg-orange-100 text-orange-700", done: "bg-orange-500 " },
  Fitting: { color: "bg-purple-100 text-purple-700", done: "bg-purple-600 " },
  Order: { color: "bg-pink-100 text-pink-700", done: "bg-pink-600 " },
  Complete: { color: "bg-emerald-100 text-emerald-700", done: "bg-emerald-600 " },
};

// ─── Mock data ─────────────────────────────────────────────────────────────────
const MOCK_PROJECTS = [
  {
    id: 1, name: "Sunrise Residency", client: "Mehta Builders",
    purchaseTotal: 142500, saleTotal: 198000,
    status: "in-progress", stages: ["Aluminium", "Glass"],
  },
  {
    id: 2, name: "Galaxy Mall Fit-out", client: "Orbit Infra",
    purchaseTotal: 390000, saleTotal: 520000,
    status: "success", stages: ["Aluminium", "Glass", "Hardware", "Fitting", "Order", "Complete"],
  },
  {
    id: 3, name: "Green Villa Phase 2", client: "Patel Constructions",
    purchaseTotal: 67000, saleTotal: 0,
    status: "pending", stages: [],
  },
  {
    id: 4, name: "City Square Tower", client: "Urban Developers",
    purchaseTotal: 215000, saleTotal: 280000,
    status: "in-progress", stages: ["Aluminium", "Glass", "Hardware"],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white " +
  "focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-gray-300 transition";

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

function initials(name = "") {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function fmt(n) {
  return "₹ " + Number(n).toLocaleString("en-IN");
}

// Avatar colors cycling
const AVATAR_COLORS = [
  "bg-indigo-500", "bg-emerald-500", "bg-orange-500",
  "bg-pink-500", "bg-cyan-500", "bg-purple-500",
];

// ─── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, onEdit }) {
  const avatarColor = AVATAR_COLORS[project.id % AVATAR_COLORS.length];
  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.pending;
  const profit = project.saleTotal - project.purchaseTotal;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4">

      {/* Top row: avatar + name + status */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`${avatarColor} w-11 h-11 rounded-xl flex items-center justify-center  font-bold text-sm flex-shrink-0`}>
            {initials(project.name)}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 leading-tight">{project.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{project.client}</p>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border whitespace-nowrap ${status.cls}`}>
          {status.label}
        </span>
      </div>

      {/* Financials */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-gray-50 rounded-xl py-2.5 px-2">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Purchase</p>
          <p className="text-xs font-bold text-gray-700">{fmt(project.purchaseTotal)}</p>
        </div>
        <div className="bg-gray-50 rounded-xl py-2.5 px-2">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Sale</p>
          <p className="text-xs font-bold text-gray-700">{fmt(project.saleTotal)}</p>
        </div>
        <div className={`rounded-xl py-2.5 px-2 ${profit >= 0 ? "bg-emerald-50" : "bg-red-50"}`}>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Profit</p>
          <p className={`text-xs font-bold ${profit >= 0 ? "text-emerald-600" : "text-red-500"}`}>
            {profit >= 0 ? "+" : ""}{fmt(profit)}
          </p>
        </div>
      </div>

      {/* Stages */}
      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Stages</p>
        <div className="flex flex-wrap gap-1.5">
          {STAGES.map((s) => {
            const done = project.stages.includes(s);
            const cfg = STAGE_CONFIG[s];
            return (
              <span key={s}
                className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition ${done ? cfg.done : cfg.color}`}>
                {done && <span className="mr-0.5">✓</span>}{s}
              </span>
            );
          })}
        </div>
      </div>

      {/* Stage progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div
          className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${(project.stages.length / STAGES.length) * 100}%` }}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button onClick={() => onEdit(project)}
          className="flex-1 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
          Edit
        </button>
        <button
          className="flex-1 py-1.5 rounded-lg text-xs font-medium bg-indigo-600  hover:bg-indigo-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
}

// ─── Add / Edit Project Dialog ─────────────────────────────────────────────────
function ProjectDialog({ project = null, onSave, onClose }) {
  const isEdit = !!project;
  const [form, setForm] = useState({
    name: project?.name || "",
    client: project?.client || "",
    status: project?.status || "pending",
    stages: project?.stages || [],
    purchaseTotal: project?.purchaseTotal || "",
    saleTotal: project?.saleTotal || "",
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const toggleStage = (s) =>
    set("stages", form.stages.includes(s)
      ? form.stages.filter((x) => x !== s)
      : [...form.stages, s]);

  const handleSave = () => {
    if (!form.name || !form.client) return;
    onSave({ ...form, id: project?.id || Date.now() });
    onClose();
  };

  return (
    /* Backdrop */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in">

        {/* Dialog header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-0.5">Projects</p>
            <h2 className="text-base font-semibold text-gray-800">
              {isEdit ? "Edit Project" : "Add Project"}
            </h2>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition text-lg">
            ×
          </button>
        </div>

        <div className="px-6 py-5 space-y-5 max-h-[75vh] overflow-y-auto">

          {/* Name + Client */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Project Name" required>
              <input type="text" placeholder="e.g. Sunrise Residency" value={form.name}
                onChange={(e) => set("name", e.target.value)} className={inputCls} />
            </Field>
            <Field label="Client Name" required>
              <input type="text" placeholder="e.g. Mehta Builders" value={form.client}
                onChange={(e) => set("client", e.target.value)} className={inputCls} />
            </Field>
          </div>

          {/* Status */}
          <Field label="Status">
            <div className="flex gap-2 flex-wrap mt-0.5">
              {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                <button key={key} type="button" onClick={() => set("status", key)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition
                    ${form.status === key ? cfg.cls + " ring-2 ring-offset-1 ring-current" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                  {cfg.label}
                </button>
              ))}
            </div>
          </Field>

          {/* Stages */}
          <Field label="Stages Completed">
            <div className="flex flex-wrap gap-2 mt-0.5">
              {STAGES.map((s) => {
                const done = form.stages.includes(s);
                const cfg = STAGE_CONFIG[s];
                return (
                  <button key={s} type="button" onClick={() => toggleStage(s)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition
                      ${done ? cfg.done + " border-transparent" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                    {done && "✓ "}{s}
                  </button>
                );
              })}
            </div>
          </Field>

          {/* Financials */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Purchase Total (₹)">
              <input type="number" placeholder="0" min="0" value={form.purchaseTotal}
                onChange={(e) => set("purchaseTotal", e.target.value)} className={inputCls} />
            </Field>
            <Field label="Sale Total (₹)">
              <input type="number" placeholder="0" min="0" value={form.saleTotal}
                onChange={(e) => set("saleTotal", e.target.value)} className={inputCls} />
            </Field>
          </div>
        </div>

        {/* Dialog footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end bg-gray-50/50">
          <button onClick={onClose}
            className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-100 transition">
            Cancel
          </button>
          <button onClick={handleSave} disabled={!form.name || !form.client}
            className="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600  hover:bg-indigo-700 disabled:opacity-40 transition shadow-sm">
            {isEdit ? "Update Project" : "Add Project"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Projects() {
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [dialog, setDialog] = useState(null); // null | "add" | project obj (edit)
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleSave = (data) => {
    setProjects((prev) =>
      prev.find((p) => p.id === data.id)
        ? prev.map((p) => (p.id === data.id ? data : p))
        : [...prev, data]
    );
  };

  const filtered = projects.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPurchase = projects.reduce((s, p) => s + p.purchaseTotal, 0);
  const totalSale = projects.reduce((s, p) => s + p.saleTotal, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-0.5">Module</p>
            <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
          </div>
          <button onClick={() => setDialog("add")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600  hover:bg-indigo-700 transition shadow-sm">
            <span className="text-base leading-none">+</span> Add Project
          </button>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Projects", value: projects.length, plain: true },
            { label: "Total Purchase", value: fmt(totalPurchase) },
            { label: "Total Sale", value: fmt(totalSale) },
          ].map(({ label, value, plain }) => (
            <div key={label} className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
              <p className={`font-bold text-gray-800 ${plain ? "text-2xl" : "text-lg"}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input type="text" placeholder="Search projects or clients…" value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${inputCls} max-w-xs`} />
          <div className="flex gap-2 flex-wrap">
            {["all", "pending", "in-progress", "success"].map((s) => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition
                  ${filterStatus === s
                    ? "bg-indigo-600  border-indigo-600"
                    : "bg-white text-gray-500 border-gray-200 hover:border-indigo-300"}`}>
                {s === "all" ? "All" : STATUS_CONFIG[s]?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm">No projects found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onEdit={(proj) => setDialog(proj)} />
            ))}
          </div>
        )}
      </div>

      {/* Dialog */}
      {dialog && (
        <ProjectDialog
          project={dialog === "add" ? null : dialog}
          onSave={handleSave}
          onClose={() => setDialog(null)}
        />
      )}
    </div>
  );
}