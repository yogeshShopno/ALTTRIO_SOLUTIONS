import React, { useState } from 'react';
import {
  Plus,
  Briefcase,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  ChevronRight,
  Target,
  Layers,
  Factory
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input, Select } from '../components/ui/Input';

import { useEffect } from 'react';

const ProjectForm = ({ onSave, onCancel }) => {
  const { products } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    items: [{ productId: '', quantity: 1 }]
  });



  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { productId: '', quantity: 1 }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      status: 'Pending',
      stage: 'A'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Project Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="e.g. DLF Galleria"
        required
      />

      <Select
        label="Project Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        options={[
          { label: 'Aluminium', value: 'Aluminium' },
          { label: 'Glass', value: 'Glass' },
          { label: 'Hardware', value: 'Hardware' },
        ]}
        required
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Project Items</label>
          <Button type="button" variant="outline" className="h-8 text-xs" onClick={handleAddItem}>
            <Plus size={14} /> Add Item
          </Button>
        </div>

        {formData.items.map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="flex-1">
              <Select
                value={item.productId}
                onChange={(e) => {
                  const newItems = [...formData.items];
                  newItems[idx].productId = e.target.value;
                  setFormData({ ...formData, items: newItems });
                }}
                options={products.map(p => ({ label: p.name, value: p.id }))}
                required
              />
            </div>
            <div className="w-24">
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const newItems = [...formData.items];
                  newItems[idx].quantity = e.target.value;
                  setFormData({ ...formData, items: newItems });
                }}
                required
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Create Project</Button>
      </div>
    </form>
  );
};

const StageModal = ({ isOpen, onClose, currentStage, onSelect }) => {
  const stages = [
    { id: 'A', name: 'Aluminium', color: 'bg-gray-500' },
    { id: 'G', name: 'Glass', color: 'bg-white-500' },
    { id: 'H', name: 'Hardware', color: 'bg-black-500' },
    { id: 'C', name: 'Coating', color: 'bg-gray-500' },
    { id: 'O', name: 'Order', color: 'bg-amber-500' },
    { id: 'F', name: 'Final Finishing', color: 'bg-emerald-500' },
  ];

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Project Stage">
      <div className="grid grid-cols-1 gap-4">
        {stages.map((stage) => (
          <button
            key={stage.id}
            onClick={() => { onSelect(stage.id); onClose(); }}
            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${currentStage === stage.id
              ? 'border-brand bg-brand/5'
              : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
              }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 ${stage.color} rounded-lg flex items-center justify-center  font-bold`}>
                {stage.id}
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900">{stage.name}</p>
                <p className="text-xs text-gray-500">Stage {stage.id}</p>
              </div>
            </div>
            {currentStage === stage.id && (
              <CheckCircle2 className="text-brand" size={24} />
            )}
          </button>
        ))}
      </div>
    </Modal>
  );
};

export const Projects = () => {
  const { projects, addProject, updateProjectStatus, updateProjectStage } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isStageModalOpen, setIsStageModalOpen] = useState(false);
  useEffect(() => {
    // MetallicCSS - import only JavaScript
    import('metallicss');
  }, [isFormOpen]);

  const handleSaveProject = (data) => {
    addProject(data);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Active Projects</h1>
          <p className="text-gray-500 font-medium mt-1">Monitor manufacturing stages and completion status.</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus size={20} />
          <span>New Project</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {projects.map((project) => (
          <Card key={project.id} className="group transition-all flex flex-col metallicss"
            style={{
              backgroundColor: '#c0c0c0'
            }}>
            <div className='bg-white p-5'>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant={project.category === 'Aluminium' ? 'brand' : 'info'}>
                    {project.category}
                  </Badge>
                  <div className="flex gap-1">
                    <button className="p-1.5 text-gray-400 hover:text-gray-900 rounded-md transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand transition-colors">
                  {project.name}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Layers size={14} />
                    <span>{project.items.length} Items</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target size={14} />
                    <span>Stage {project.stage}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Progress</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${project.status === 'Completed' ? 'bg-emerald-500' : 'bg-brand shadow-[0_0_8px_rgba(79,70,229,0.4)]'
                          }`}
                        style={{ width: project.status === 'Completed' ? '100%' : project.status === 'In Progress' ? '65%' : '15%' }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-gray-700">
                      {project.status === 'Completed' ? '100%' : project.status === 'In Progress' ? '65%' : '15%'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200 text-brand">
                      <Factory size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Current Stage</p>
                      <p className="text-sm font-bold text-gray-900">
                        {project.stage === 'A' ? 'Aluminium Cutting' : project.stage === 'G' ? 'Glass Fitting' : project.stage === 'O' ? 'Quality Check' : 'Finishing'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 !p-0"
                    onClick={() => { setSelectedProject(project); setIsStageModalOpen(true); }}
                  >
                    <ChevronRight size={18} />
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex gap-2">
                <Select
                  className="flex-1"
                  value={project.status}
                  onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                  options={[
                    { label: 'Pending', value: 'Pending' },
                    { label: 'In Progress', value: 'In Progress' },
                    { label: 'Completed', value: 'Completed' },
                  ]}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Create New Project">
        <ProjectForm onSave={handleSaveProject} onCancel={() => setIsFormOpen(false)} />
      </Modal>

      <StageModal
        isOpen={isStageModalOpen}
        onClose={() => setIsStageModalOpen(false)}
        currentStage={selectedProject?.stage}
        onSelect={(stage) => updateProjectStage(selectedProject.id, stage)}
      />
    </div>
  );
};

export default Projects;
