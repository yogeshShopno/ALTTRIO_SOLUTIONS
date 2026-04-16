import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  Briefcase, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
  <Card className="relative overflow-hidden group">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100 shadow-sm transition-transform group-hover:scale-110`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2">
      <span className={`inline-flex items-center gap-1 text-sm font-semibold ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {trendValue}
      </span>
      <span className="text-xs text-gray-400 font-medium">vs last month</span>
    </div>
  </Card>
);

export const Dashboard = () => {
  const { products, purchases, projects, getStockSummary } = useApp();

  const totalStock = getStockSummary.reduce((sum, p) => sum + p.available, 0);
  const pendingProjects = projects.filter(p => p.status === 'Pending').length;
  const inProgressProjects = projects.filter(p => p.status === 'In Progress').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 font-medium mt-1">Real-time statistics for your manufacturing operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Products" 
          value={products.length} 
          icon={Package} 
          trend="up" 
          trendValue="+12%" 
          color="bg-brand text-brand"
        />
        <StatCard 
          title="Purchases" 
          value={purchases.length} 
          icon={ShoppingCart} 
          trend="up" 
          trendValue="+5%" 
          color="bg-blue-600 text-blue-600"
        />
        <StatCard 
          title="Active Projects" 
          value={inProgressProjects} 
          icon={Briefcase} 
          trend="down" 
          trendValue="-2%" 
          color="bg-amber-600 text-amber-600"
        />
        <StatCard 
          title="Stock Units" 
          value={totalStock.toLocaleString()} 
          icon={TrendingUp} 
          trend="up" 
          trendValue="+18.4%" 
          color="bg-emerald-600 text-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Recent Projects" subtitle="Latest project activities and status.">
          <div className="space-y-4">
            {projects.slice(0, 5).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-brand/20 hover:bg-brand/5 transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${project.category === 'Aluminium' ? 'bg-indigo-100 text-indigo-600' : 'bg-sky-100 text-sky-600'}`}>
                    {project.category === 'Aluminium' ? <Package size={20} /> : <ShoppingCart size={20} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-brand transition-colors">{project.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">{project.category} Module</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={project.status === 'In Progress' ? 'brand' : 'warning'}>
                    {project.status === 'In Progress' ? <Clock size={12} className="mr-1" /> : null}
                    {project.status}
                  </Badge>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded uppercase tracking-tighter">
                    Stage {project.stage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Stock Status" subtitle="Low stock alerts and inventory health.">
          <div className="space-y-6">
            {getStockSummary.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-700">{item.name}</span>
                  <span className="text-gray-500 font-medium">{item.available} / {item.stock + item.purchased} {item.unit}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      (item.available / (item.stock + item.purchased)) < 0.2 ? 'bg-red-500' : 'bg-brand'
                    }`}
                    style={{ width: `${(item.available / (item.stock + item.purchased)) * 100}%` }}
                  ></div>
                </div>
                {(item.available / (item.stock + item.purchased)) < 0.2 && (
                  <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider flex items-center gap-1">
                    <TrendingUp size={10} /> Critical Low Stock
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
