import React, { useState } from 'react';
import { Plus, X, Trash2, Package, Layers } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input, Select } from '../ui/Input';

export const ProductForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    unitType: '',
    unit: '',
    category: '',
    stock: 0,
    materials: [{ name: '', ratio: 1 }]
  });

  const handleAddMaterial = () => {
    setFormData({
      ...formData,
      materials: [...formData.materials, { name: '', ratio: 1 }]
    });
  };

  const handleRemoveMaterial = (index) => {
    const newMaterials = formData.materials.filter((_, i) => i !== index);
    setFormData({ ...formData, materials: newMaterials });
  };

  const handleMaterialChange = (index, field, value) => {
    const newMaterials = [...formData.materials];
    newMaterials[index][field] = value;
    setFormData({ ...formData, materials: newMaterials });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input 
          label="Product Name" 
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Standard Frame"
          required
        />
      <div className="grid grid-cols-2 gap-4">

        <Input 
          label="Unit Type" 
          value={formData.unitType}
          onChange={(e) => setFormData({ ...formData, unitType: e.target.value })}
          placeholder="mm, sqft, pcs"
          required
        />
         <Input 
          label="Unit" 
          value={formData.unit}
          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          placeholder="1,2,3..."
          required
        />
      </div>

      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select 
          label="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          options={[
            { label: 'Aluminium', value: 'Aluminium' },
            { label: 'Glass', value: 'Glass' },
            { label: 'Hardware', value: 'Hardware' },
            { label: 'Coating', value: 'Coating' },
            { label: 'Accessories', value: 'Accessories' },
            { label: 'Others', value: 'Others' },

          ]}
          required
        />
        <Input 
          label="Opening Stock"
          type="number"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
          required
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            <Layers size={16} /> Materials / Composition
          </label>
          <Button type="button" variant="outline" className="h-8 text-xs py-1" onClick={handleAddMaterial}>
            <Plus size={14} /> Add Row
          </Button>
        </div>
        
        <div className="space-y-3">
          {formData.materials.map((mat, index) => (
            <div key={index} className="flex gap-3 items-end p-3 bg-gray-50 rounded-xl border border-gray-100 animate-in fade-in slide-in-from-top-2">
              <div className="flex-1">
                <Input 
                  label={index === 0 ? "Material Name" : ""}
                  value={mat.name}
                  onChange={(e) => handleMaterialChange(index, 'name', e.target.value)}
                  placeholder="Material"
                  required
                />
              </div>
              <div className="w-24">
                <Input 
                  label={index === 0 ? "Ratio" : ""}
                  type="number"
                  value={mat.ratio}
                  onChange={(e) => handleMaterialChange(index, 'ratio', Number(e.target.value))}
                  required
                />
              </div>
              {formData.materials.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => handleRemoveMaterial(index)}
                  className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">save Product</Button>
      </div>
    </form>
  );
};
