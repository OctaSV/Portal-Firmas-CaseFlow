import React, { useState } from 'react';
import { Lawyer, Notification } from '../types';
import { NotificationIcon } from '../constants';

interface HeaderProps {
  lawyer: Lawyer;
  onNavigate: (view: 'dashboard' | 'cases') => void;
  currentView: string;
  notifications: Notification[];
  onClearNotifications: () => void;
}

const Header: React.FC<HeaderProps> = ({ lawyer, onNavigate, currentView, notifications, onClearNotifications }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const navItemClasses = "cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300";
  const activeClasses = "bg-[#d0d03d] text-[#24292A] hover:bg-[#eaea5f] hover:shadow-md hover:shadow-[#d0d03d]/40";
  const inactiveClasses = "text-[#A1A1AA] hover:bg-[#404344] hover:text-white";
  
  return (
    <header className="bg-[#24292A]/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#d0d03d]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-2xl font-bold text-white cursor-pointer" onClick={() => onNavigate('cases')}>
              Case<span className="text-[#d0d03d]">Flow</span>
            </div>
          </div>
          <nav className="flex items-center space-x-2 md:space-x-4">
            <a onClick={() => onNavigate('cases')} className={`${navItemClasses} ${currentView.includes('case') || currentView === 'detail' ? activeClasses : inactiveClasses}`}>
              Casos
            </a>
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(prev => !prev)} 
                className="p-2 rounded-full text-[#A1A1AA] hover:text-white hover:bg-[#404344] transition-colors duration-300 relative"
                aria-label="Ver notificaciones"
              >
                <NotificationIcon className="h-6 w-6" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white ring-2 ring-[#24292A]">
                    {notifications.length}
                  </span>
                )}
              </button>
              {isNotificationsOpen && (
                <div 
                  className="absolute right-0 mt-3 w-80 origin-top-right rounded-lg bg-[#313435] backdrop-blur-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-[#d0d03d]/20 animate-fade-in-fast"
                  role="menu" aria-orientation="vertical"
                >
                  <div className="p-1">
                    <div className="flex justify-between items-center px-3 py-2 border-b border-[#d0d03d]/20">
                      <h3 className="text-sm font-semibold text-white">Notificaciones</h3>
                      {notifications.length > 0 && <button onClick={() => { onClearNotifications(); setIsNotificationsOpen(false); }} className="text-xs text-[#d0d03d] hover:underline">Limpiar</button>}
                    </div>
                    {notifications.length > 0 ? (
                      <div className="max-h-80 overflow-y-auto custom-scrollbar">
                        {notifications.map(notif => (
                          <div key={notif.id} className="block px-3 py-3 text-sm text-[#A1A1AA] border-b border-[#d0d03d]/20 last:border-b-0">
                            <p className="text-white">{notif.message}</p>
                            <p className="text-xs text-[#A1A1AA]/70 mt-1">{new Date(notif.timestamp).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="px-4 py-6 text-center text-sm text-[#A1A1AA]">No hay notificaciones nuevas.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button 
              onClick={() => onNavigate('dashboard')} 
              className="flex items-center px-2 py-2 md:px-4 md:py-2 rounded-lg transition-colors duration-300 hover:bg-[#404344]"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{lawyer.name}</p>
                <p className="text-xs text-[#A1A1AA]">{lawyer.firm}</p>
              </div>
              <div className="ml-0 sm:ml-3 relative">
                <img
                  className="h-10 w-10 rounded-full object-cover border-2 border-[#d0d03d]/30"
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=3387&auto=format&fit=crop"
                  alt="Foto de perfil del abogado"
                />
              </div>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;