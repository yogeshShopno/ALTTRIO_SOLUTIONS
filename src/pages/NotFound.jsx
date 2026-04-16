import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileSearch, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-brand/10 blur-3xl rounded-full scale-150"></div>
        <div className="relative w-32 h-32 bg-white rounded-3xl shadow-xl border border-gray-100 flex items-center justify-center text-brand animate-bounce-slow">
          <FileSearch size={64} strokeWidth={1.5} />
        </div>
      </div>

      <h1 className="text-8xl font-black text-gray-900 tracking-tighter mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg">
        The page you are looking for doesn't exist or has been moved to a different module in the manufacturing suite.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          variant="secondary" 
          onClick={() => navigate(-1)}
          className="px-8"
        >
          <ArrowLeft size={18} />
          Go Back
        </Button>
        <Button 
          onClick={() => navigate('/dashboard')}
          className="px-8 shadow-lg shadow-brand/25"
        >
          <Home size={18} />
          Dashboard
        </Button>
      </div>

      <div className="mt-16 pt-8 border-t border-gray-100 w-full max-w-xs transition-opacity duration-1000 opacity-50">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          The Indian Menufecturer
        </p>
      </div>
    </div>
  );
};

export default NotFound;
