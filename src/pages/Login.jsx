import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Factory, Lock, Mail, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('admin@bharatmfg.in');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand rounded-2xl text-white shadow-xl shadow-brand/30 mb-6">
            <Factory size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2 font-medium">BharatMfg SaaS Platform</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <Input 
              label="Email Address"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
            />
            
            <Input 
              label="Password"
              type="password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand" />
                <span className="text-gray-500 font-medium">Remember me</span>
              </label>
              <a href="#" className="font-semibold text-brand hover:text-brand-hover">Forgot password?</a>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Sign In</span>
                  <ArrowRight size={20} />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-xl">
            <p className="text-xs text-amber-800 leading-relaxed">
              <span className="font-bold flex items-center gap-1 mb-1 italic uppercase tracking-wider">
                Note:
              </span>
              New user registrations are currently <strong>Pending until confirmation</strong> by the main administrator.
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-gray-500 font-medium">
          Don't have an account? <a href="#" className="text-brand font-bold">Request Access</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
