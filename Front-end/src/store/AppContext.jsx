import React, { createContext, useContext, useState, useMemo } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Mock Data
  const [products, setProducts] = useState([
    { id: 1, name: 'Standard Window Frame', unit: 'mm', category: 'Aluminium', materials: [{ name: 'Aluminium Alloy', ratio: 5 }], stock: 150 },
    { id: 2, name: 'Tempered Glass Panel', unit: 'sqft', category: 'Glass', materials: [{ name: 'Glass Sheet', ratio: 1 }], stock: 45 },
    { id: 3, name: 'L-Bracket Hardware', unit: 'pcs', category: 'Hardware', materials: [{ name: 'Steel', ratio: 1 }], stock: 500 },
  ]);

  const [purchases, setPurchases] = useState([
    { id: 1, productId: 1, distributor: 'Jindal Aluminium', unit: 'mm', quantity: 1000, date: '2026-04-10' },
    { id: 2, productId: 3, distributor: 'Hardy Hardware', unit: 'pcs', quantity: 200, date: '2026-04-12' },
  ]);

  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: 'South Delhi Residence', 
      category: 'Aluminium', 
      status: 'In Progress', 
      stage: 'A',
      items: [
        { productId: 1, name: 'Window Frame', quantity: 10 }
      ]
    },
    { 
      id: 2, 
      name: 'Gurgaon Tech Park', 
      category: 'Glass', 
      status: 'Pending', 
      stage: 'G',
      items: [
        { productId: 2, name: 'Glass Panel', quantity: 50 }
      ]
    }
  ]);

  // Actions
  const addProduct = (product) => setProducts([...products, { ...product, id: Date.now() }]);
  const addPurchase = (purchase) => setPurchases([...purchases, { ...purchase, id: Date.now() }]);
  const addProject = (project) => setProjects([...projects, { ...project, id: Date.now() }]);
  
  const updateProjectStatus = (id, status) => {
    setProjects(projects.map(p => p.id === id ? { ...p, status } : p));
  };

  const updateProjectStage = (id, stage) => {
    setProjects(projects.map(p => p.id === id ? { ...p, stage } : p));
  };

  const getStockSummary = useMemo(() => {
    return products.map(product => {
      const purchased = purchases
        .filter(p => p.productId === product.id)
        .reduce((sum, p) => sum + Number(p.quantity), 0);
      
      const sold = projects
        .reduce((sum, project) => {
          const item = project.items.find(i => i.productId === product.id);
          return sum + (item ? Number(item.quantity) : 0);
        }, 0);

      return {
        ...product,
        purchased,
        sold,
        available: product.stock + purchased - sold
      };
    });
  }, [products, purchases, projects]);

  const value = {
    products,
    purchases,
    projects,
    getStockSummary,
    addProduct,
    addPurchase,
    addProject,
    updateProjectStatus,
    updateProjectStage
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
