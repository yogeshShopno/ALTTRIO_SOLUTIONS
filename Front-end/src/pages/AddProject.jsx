import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Building2, User, MapPin, Briefcase, Calendar, DollarSign, Plus, Trash2, Box, CheckSquare } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { API_ENDPOINTS } from '../utils/endpoints';

const AddProject = () => {
  const navigate = useNavigate();
  const { addProject, products } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    projectId: '',
    projectName: '',
    projectType: '',
    status: 'Design',
    
    clientName: '',
    clientNumber: '',
    clientGst: '',
    clientPan: '',
    mobileNo: '',

    locationName: '',
    locationEmail: '',
    locationDesc: '',

    salesPersonName: '',
    salesPersonNumber: '',

    startDate: '',
    deliveryDate: '',

    totalAmount: '',
    receivedAmount: '',

    items: [{ productId: '', quantity: 1 }],

    stages: {
      design: { finalQuotation: false, glassTypology: false, coatingType: false },
      production: {
        aluminium: { purchase: false, cutting: false, coating: false },
        glass: { purchase: false, received: false },
        hardware: { purchase: false, received: false },
        tracking: { cutting: false, assembly: false, glassFitting: false, ready: false, productionDate: '' }
      }
    }
  });

  const balanceAmount = (Number(formData.totalAmount) || 0) - (Number(formData.receivedAmount) || 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStageChange = (category, subCategory, field, value) => {
    setFormData(prev => ({
      ...prev,
      stages: {
        ...prev.stages,
        [category]: {
          ...prev.stages[category],
          ...(subCategory ? {
            [subCategory]: {
              ...prev.stages[category][subCategory],
              [field]: value
            }
          } : {
            [field]: value
          })
        }
      }
    }));
  };

  const handleAddItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { productId: '', quantity: 1 }]
    }));
  };

  const handleRemoveItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData(prev => {
      const newItems = [...prev.items];
      newItems[index][field] = value;
      return { ...prev, items: newItems };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = { ...formData, balanceAmount };
      
      // Attempt to hit the static/mocked endpoint. This uses our universal error/success handler
      try {
        await api.post(API_ENDPOINTS.PROJECTS.CREATE, payload);
      } catch (err) {
        // Handled by interceptor, continuing locally for static usage
        console.warn('API call failed, continuing with local context state.');
      }
      
      addProject({
        id: formData.projectId || Date.now().toString(),
        name: formData.projectName,
        category: formData.projectType || 'Generic',
        items: formData.items,
        stage: 'A',
        status: formData.status === 'Completed' ? 'Completed' : 'Pending',
        ...payload
      });
      
      toast.success('Project added successfully!');
      navigate('/projects');
    } catch (error) {
      toast.error('Failed to save project locally');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/projects')} className="h-10 w-10 !p-0">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Project</h1>
            <p className="text-gray-500 font-medium mt-1">Create a new project master record.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => navigate('/projects')}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            <Save size={18} />
            <span>{isSubmitting ? 'Saving...' : 'Save Project'}</span>
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="text-brand" size={24} />
            <h2 className="text-lg font-bold text-gray-900">Project Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Input
              label="Project ID"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              placeholder="Leave empty to auto-generate"
            />
            <Input
              label="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
              placeholder="e.g. Skyline Residency"
            />
            <Select
              label="Project Type"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
              options={[
                { label: 'Generic', value: 'Generic' },
                { label: 'Premium', value: 'Premium' },
                { label: 'Residential', value: 'Residential' },
              ]}
            />
            <Select
              label="Project Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={[
                { label: 'Design', value: 'Design' },
                { label: 'Production', value: 'Production' },
                { label: 'Dispatch', value: 'Dispatch' },
                { label: 'Installation', value: 'Installation' },
                { label: 'Completed', value: 'Completed' },
                { label: 'Reminder', value: 'Reminder' },
                { label: 'Service part for client', value: 'Service' },
              ]}
            />
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="text-brand" size={24} />
              <h2 className="text-lg font-bold text-gray-900">Client Information</h2>
            </div>
            <div className="space-y-4">
              <Input
                label="Client Name"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Contact Number"
                  name="clientNumber"
                  value={formData.clientNumber}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Mobile No"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="GST No"
                  name="clientGst"
                  value={formData.clientGst}
                  onChange={handleChange}
                />
                <Input
                  label="PAN No"
                  name="clientPan"
                  value={formData.clientPan}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="text-brand" size={24} />
              <h2 className="text-lg font-bold text-gray-900">Location & Contact</h2>
            </div>
            <div className="space-y-4">
              <Input
                label="Location Name"
                name="locationName"
                value={formData.locationName}
                onChange={handleChange}
                required
              />
              <Input
                label="Email Address"
                type="email"
                name="locationEmail"
                value={formData.locationEmail}
                onChange={handleChange}
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="locationDesc"
                  value={formData.locationDesc}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none transition-all resize-none min-h-[90px]"
                  placeholder="Enter location description..."
                ></textarea>
              </div>
            </div>
          </Card>
        </div>

        {/* Dynamic Products / Items Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Box className="text-brand" size={24} />
              <h2 className="text-lg font-bold text-gray-900">Project Products/Items</h2>
            </div>
            <Button type="button" variant="outline" onClick={handleAddItem} className="h-9">
              <Plus size={16} /> Add Product
            </Button>
          </div>
          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={index} className="flex items-end gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                <div className="flex-1">
                  <Select
                    label="Select Product"
                    value={item.productId}
                    onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                    options={products.map(p => ({ label: p.name, value: p.id }))}
                    required
                  />
                </div>
                <div className="w-32">
                  <Input
                    type="number"
                    label="Quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    required
                    min="1"
                  />
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 h-[42px]"
                  onClick={() => handleRemoveItem(index)}
                  disabled={formData.items.length === 1}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Detailed Stages Tracking */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <CheckSquare className="text-brand" size={24} />
            <h2 className="text-lg font-bold text-gray-900">Project Stages Tracking</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Design Stage */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-700 pb-2 border-b">Design Phase</h3>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand" 
                  checked={formData.stages.design.finalQuotation}
                  onChange={(e) => handleStageChange('design', null, 'finalQuotation', e.target.checked)} />
                <span className="text-sm text-gray-600">Final Quotation</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand"
                  checked={formData.stages.design.glassTypology}
                  onChange={(e) => handleStageChange('design', null, 'glassTypology', e.target.checked)} />
                <span className="text-sm text-gray-600">Glass Typology and colour</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand"
                  checked={formData.stages.design.coatingType}
                  onChange={(e) => handleStageChange('design', null, 'coatingType', e.target.checked)} />
                <span className="text-sm text-gray-600">Coating type and colour</span>
              </label>
            </div>

            {/* Production Tracking Stage */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-700 pb-2 border-b">Production Tracking</h3>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand"
                  checked={formData.stages.production.tracking.cutting}
                  onChange={(e) => handleStageChange('production', 'tracking', 'cutting', e.target.checked)} />
                <span className="text-sm text-gray-600">Cutting Status</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand"
                  checked={formData.stages.production.tracking.assembly}
                  onChange={(e) => handleStageChange('production', 'tracking', 'assembly', e.target.checked)} />
                <span className="text-sm text-gray-600">Assembly Status</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand"
                  checked={formData.stages.production.tracking.glassFitting}
                  onChange={(e) => handleStageChange('production', 'tracking', 'glassFitting', e.target.checked)} />
                <span className="text-sm text-gray-600">Glass Fitting</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand"
                  checked={formData.stages.production.tracking.ready}
                  onChange={(e) => handleStageChange('production', 'tracking', 'ready', e.target.checked)} />
                <span className="text-sm text-gray-600">Ready Status</span>
              </label>
              <div className="mt-2">
                <Input 
                  type="date" 
                  label="Production Date"
                  value={formData.stages.production.tracking.productionDate}
                  onChange={(e) => handleStageChange('production', 'tracking', 'productionDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Material Status */}
          <div className="mt-8 space-y-4">
            <h3 className="font-bold text-gray-700 pb-2 border-b">Material Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-sm mb-3">Aluminium</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" checked={formData.stages.production.aluminium.purchase} onChange={(e) => handleStageChange('production', 'aluminium', 'purchase', e.target.checked)} /> Purchase</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" checked={formData.stages.production.aluminium.cutting} onChange={(e) => handleStageChange('production', 'aluminium', 'cutting', e.target.checked)} /> Cutting</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" checked={formData.stages.production.aluminium.coating} onChange={(e) => handleStageChange('production', 'aluminium', 'coating', e.target.checked)} /> Coating</label>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-sm mb-3">Glass</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" checked={formData.stages.production.glass.purchase} onChange={(e) => handleStageChange('production', 'glass', 'purchase', e.target.checked)} /> Purchase</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" checked={formData.stages.production.glass.received} onChange={(e) => handleStageChange('production', 'glass', 'received', e.target.checked)} /> Received</label>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-sm mb-3">Hardware</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" checked={formData.stages.production.hardware.purchase} onChange={(e) => handleStageChange('production', 'hardware', 'purchase', e.target.checked)} /> Purchase</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" checked={formData.stages.production.hardware.received} onChange={(e) => handleStageChange('production', 'hardware', 'received', e.target.checked)} /> Received</label>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="text-brand" size={24} />
              <h2 className="text-lg font-bold text-gray-900">Sales Person</h2>
            </div>
            <div className="space-y-4">
              <Input
                label="Name"
                name="salesPersonName"
                value={formData.salesPersonName}
                onChange={handleChange}
              />
              <Input
                label="Number"
                name="salesPersonNumber"
                value={formData.salesPersonNumber}
                onChange={handleChange}
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="text-brand" size={24} />
              <h2 className="text-lg font-bold text-gray-900">Timeline</h2>
            </div>
            <div className="space-y-4">
              <Input
                type="date"
                label="Start Date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
              <Input
                type="date"
                label="Delivery Date"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
                required
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="text-brand" size={24} />
              <h2 className="text-lg font-bold text-gray-900">Financials</h2>
            </div>
            <div className="space-y-4">
              <Input
                type="number"
                label="Total Amount"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleChange}
                required
              />
              <Input
                type="number"
                label="Received Amount"
                name="receivedAmount"
                value={formData.receivedAmount}
                onChange={handleChange}
                required
              />
              <div className="pt-2 mt-2 border-t border-gray-100">
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-bold text-gray-700">Balance Amount</span>
                  <span className={`text-lg font-bold ${balanceAmount > 0 ? 'text-amber-500' : 'text-emerald-500'}`}>
                    ₹{balanceAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
