import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  Briefcase, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, iconBg, iconColor }) => (
  <Card className="relative overflow-hidden group">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          {title}
        </p>
        <h3 className="text-3xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
          {value}
        </h3>
      </div>
      <div
        className="p-3 rounded-xl shadow-sm transition-transform group-hover:scale-110"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={24} style={{ color: iconColor }} />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2">
      <span
        className="inline-flex items-center gap-1 text-sm font-semibold"
        style={{ color: trend === 'up' ? '#059669' : '#e11d48' }}
      >
        {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {trendValue}
      </span>
      <span className="text-xs font-medium" style={{ color: 'var(--text-faint)' }}>
        vs last month
      </span>
    </div>
  </Card>
);

export const Dashboard = () => {
  const { products, purchases, projects, getStockSummary } = useApp();

  const totalStock = getStockSummary.reduce((sum, p) => sum + p.available, 0);
  const inProgressProjects = projects.filter(p => p.status === 'In Progress').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Dashboard Overview
        </h1>
        <p className="font-medium mt-1" style={{ color: 'var(--text-muted)' }}>
          Real-time statistics for your manufacturing operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Products"  value={products.length}                 icon={Package}    trend="up"   trendValue="+12%" iconBg="rgba(2,33,53,0.12)"    iconColor="var(--primary)" />
        <StatCard title="Purchases"       value={purchases.length}                icon={ShoppingCart} trend="up"  trendValue="+5%"  iconBg="rgba(37,99,235,0.12)"  iconColor="#2563eb" />
        <StatCard title="Active Projects" value={inProgressProjects}              icon={Briefcase}  trend="down" trendValue="-2%"  iconBg="rgba(217,119,6,0.12)"  iconColor="#d97706" />
        <StatCard title="Stock Units"     value={totalStock.toLocaleString()}     icon={TrendingUp} trend="up"   trendValue="+18.4%" iconBg="rgba(5,150,105,0.12)" iconColor="#059669" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Recent Projects" subtitle="Latest project activities and status.">
          <div className="space-y-3">
            {projects.slice(0, 5).map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 rounded-xl transition-all group"
                style={{
                  border: '1px solid var(--border-soft)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-strong)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-soft)'}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: project.category === 'Aluminium' ? 'rgba(99,102,241,0.12)' : 'rgba(14,165,233,0.12)',
                      color: project.category === 'Aluminium' ? '#6366f1' : '#0ea5e9',
                    }}
                  >
                    {project.category === 'Aluminium' ? <Package size={20} /> : <ShoppingCart size={20} />}
                  </div>
                  <div>
                    <h4 className="font-bold" style={{ color: 'var(--text-primary)' }}>{project.name}</h4>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{project.category} Module</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={project.status === 'In Progress' ? 'brand' : 'warning'}>
                    {project.status === 'In Progress' ? <Clock size={12} className="mr-1" /> : null}
                    {project.status}
                  </Badge>
                  <span
                    className="text-xs font-bold px-2 py-1 rounded uppercase tracking-tighter"
                    style={{ backgroundColor: 'var(--surface-subtle)', color: 'var(--text-faint)' }}
                  >
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
                  <span className="font-bold" style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
                  <span className="font-medium" style={{ color: 'var(--text-muted)' }}>
                    {item.available} / {item.stock + item.purchased} {item.unit}
                  </span>
                </div>
                <div
                  className="h-2 w-full rounded-full overflow-hidden"
                  style={{ backgroundColor: 'var(--surface-subtle)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${(item.available / (item.stock + item.purchased)) * 100}%`,
                      backgroundColor: (item.available / (item.stock + item.purchased)) < 0.2 ? '#ef4444' : 'var(--primary)',
                    }}
                  />
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
