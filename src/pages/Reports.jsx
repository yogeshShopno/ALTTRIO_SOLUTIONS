import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Package, Download } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const Reports = () => {
  const { getStockSummary } = useApp();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory & Stock Reports</h1>
          <p className="text-gray-500 font-medium mt-1">Detailed breakdown of stock movement and availability.</p>
        </div>
        <Button variant="secondary">
          <Download size={20} />
          <span>Export Report</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-brand text-white border-none shadow-lg shadow-brand/30">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/70 text-sm font-bold uppercase">Total Items Tracked</p>
              <h3 className="text-4xl font-black mt-2">{getStockSummary.length}</h3>
            </div>
            <Package size={32} className="text-white/30" />
          </div>
        </Card>
        <Card className="bg-emerald-600 text-white border-none shadow-lg shadow-emerald-500/30">
           <div className="flex justify-between items-start">
            <div>
              <p className="text-white/70 text-sm font-bold uppercase">Total Purchased</p>
              <h3 className="text-4xl font-black mt-2">
                {getStockSummary.reduce((sum, item) => sum + item.purchased, 0).toLocaleString()}
              </h3>
            </div>
            <TrendingUp size={32} className="text-white/30" />
          </div>
        </Card>
        <Card className="bg-sky-600 text-white border-none shadow-lg shadow-sky-500/30">
           <div className="flex justify-between items-start">
            <div>
              <p className="text-white/70 text-sm font-bold uppercase">Total Utilized</p>
              <h3 className="text-4xl font-black mt-2">
                {getStockSummary.reduce((sum, item) => sum + item.sold, 0).toLocaleString()}
              </h3>
            </div>
            <TrendingDown size={32} className="text-white/30" />
          </div>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden" title="Live Stock Inventory">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <th className="px-6 py-4">Item Name</th>
              <th className="px-6 py-4 text-center">Opening Stock</th>
              <th className="px-6 py-4 text-center">Purchased (+)</th>
              <th className="px-6 py-4 text-center">Utilized (-)</th>
              <th className="px-6 py-4 text-right">Available Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {getStockSummary.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-center text-gray-500 font-medium">{item.stock}</td>
                <td className="px-6 py-4 text-center text-emerald-600 font-bold">+{item.purchased}</td>
                <td className="px-6 py-4 text-center text-rose-600 font-bold">-{item.sold}</td>
                <td className="px-6 py-4 text-right">
                  <Badge variant={(item.available / (item.stock + item.purchased)) < 0.2 ? 'danger' : 'brand'} className="px-3 py-1 font-bold">
                    {item.available} {item.unit}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Reports;
