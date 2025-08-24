// src/components/Layout.tsx
import React, { useState } from 'react';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    console.log("clicked", sidebarOpen);
    setSidebarOpen((prev)=>!prev);
  };

  const handleSidebarClose = () => {
    console.log("declecked", sidebarOpen);
    
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - Always overlays on top */}
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header onMenuToggle={handleMenuToggle} sidebarOpen={sidebarOpen} />
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;