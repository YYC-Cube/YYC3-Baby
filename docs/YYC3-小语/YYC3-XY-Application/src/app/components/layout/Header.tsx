import React from 'react';
import { Leaf } from 'lucide-react';

export interface HeaderProps {
  userData?: { name?: string };
}

export const Header: React.FC<HeaderProps> = ({ userData }) => (
  <header className="glass-header px-4 py-3 flex justify-between items-center sticky top-0 z-40">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-md">
        <Leaf size={16} className="text-white" />
      </div>
      <span className="text-emerald-700" style={{ fontWeight: 600 }}>小语AI</span>
    </div>
    <div className="text-sm text-gray-500">{userData?.name || 'User'}</div>
  </header>
);
