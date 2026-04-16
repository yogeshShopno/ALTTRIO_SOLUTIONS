import React, { useState } from 'react';
import { ShoppingCart, Plus, Calendar, User, Hash, ArrowLeft } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';

const PurchaseForm = ({ onSave, onCancel }) => {
  const { products } = useApp();
  const [formData, setFormData] = useState({
    productId: '',
    distributor: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0]
  });

  const selectedProduct = products.find(p => p.id === Number(formData.productId));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      productId: Number(formData.productId),
      unit: selectedProduct?.unit || ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Select 
        label="Select Product"
        value={formData.productId}
        onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
        options={products.map(p => ({ label: p.name, value: p.id }))}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input 
          label="Distributor Name"
          icon={User}
          value={formData.distributor}
          onChange={(e) => setFormData({ ...formData, distributor: e.target.value })}
          placeholder="e.g. Acme Supplies"
          required
        />
        <Input 
          label="Purchase Date"
          type="date"
          icon={Calendar}
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input 
          label="Quantity"
          type="number"
          icon={Hash}
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          placeholder="0.00"
          required
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Unit</label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 font-medium">
            {selectedProduct ? selectedProduct.unit : '---'}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Record Purchase</Button>
      </div>
    </form>
  );
};

export const Purchases = () => {
  const { purchases, products, addPurchase } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (data) => {
    addPurchase(data);
    setIsModalOpen(false);
  };

  const getProductName = (id) => products.find(p => p.id === id)?.name || 'Unknown Product';

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Purchase Orders</h1>
          <p className="text-gray-500 font-medium mt-1">Track incoming inventory from distributors.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          <span>Record New Purchase</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-0 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Distributor</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {purchases.map((purchase) => (
                <tr key={purchase.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{getProductName(purchase.productId)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User size={14} className="text-gray-400" />
                      <span className="font-medium">{purchase.distributor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-emerald-600 font-bold">
                    +{purchase.quantity} <span className="text-xs font-medium text-gray-400">{purchase.unit}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar size={14} />
                      {new Date(purchase.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </td>
                </tr>
              ))}
              {purchases.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    No purchase history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record Purchase">
        <PurchaseForm onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Purchases;
