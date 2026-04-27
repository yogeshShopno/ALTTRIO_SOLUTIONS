import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Factory, Lock, Mail, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('Pass@123');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    if (email === 'admin@gmail.com' && password === 'Pass@123') {
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 1500);
      localStorage.setItem("login", true);
    } else {
      setLoading(false);
      alert('Invalid credentials');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300"
      style={{ backgroundColor: 'var(--surface-page)' }}
    >
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6">
            <div className="w-20 flex items-center justify-center">
              <img src='/logo.jpg' alt="Logo" className="rounded-xl shadow-lg" />
            </div>
          </div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Welcome Back</h1>
          <p className="mt-2 font-medium" style={{ color: 'var(--text-muted)' }}>ALTTRIO SOLUTIONS</p>
        </div>

        <Card className="p-2">
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
                <span className="font-medium" style={{ color: 'var(--text-muted)' }}>Remember me</span>
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

          <div 
            className="mt-8 p-4 rounded-xl border"
            style={{ backgroundColor: 'var(--surface-subtle)', borderColor: 'var(--border-strong)' }}
          >
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-bold flex items-center gap-1 mb-1 italic uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
                Note:
              </span>
              This is just a demo version. this actual login will be different
            </p>
          </div>
        </Card>

        <p className="text-center mt-8 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          Don't have an account? <a href="#" className="text-brand font-bold">Register Now</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
