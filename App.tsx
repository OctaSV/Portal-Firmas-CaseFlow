
import React, { useState, useCallback } from 'react';
import { Case, CaseStatus, Notification } from './types';
import { mockLawyer, mockCases } from './data/mockData';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CaseList from './components/CaseList';
import CaseDetail from './components/CaseDetail';
import Footer from './components/Footer';

type View = 'dashboard' | 'cases' | 'detail';

const App: React.FC = () => {
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [currentView, setCurrentView] = useState<View>('cases');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleNavigate = useCallback((view: View) => {
    setCurrentView(view);
    if (view !== 'detail') {
      setSelectedCase(null);
    }
  }, []);

  const handleSelectCase = useCallback((caseData: Case) => {
    setSelectedCase(caseData);
    setCurrentView('detail');
  }, []);

  const handleTakeCase = useCallback((caseId: string) => {
    const caseToTake = cases.find(c => c.id === caseId);
    if (!caseToTake) return;

    const clientFirstName = caseToTake.clientName.split(' ')[0].toLowerCase();
    const lastNameInitial = caseToTake.clientName.split(' ').pop()?.toLowerCase().charAt(0) || 'x';
    const randomDigits = Math.floor(100 + Math.random() * 900);

    const takenCase: Case = {
        ...caseToTake,
        status: CaseStatus.ACTIVE,
        startDate: new Date().toISOString().split('T')[0],
        clientPhone: `+54 9 11 ${Math.floor(4000 + Math.random() * 2000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        clientEmail: `${clientFirstName}${lastNameInitial}${randomDigits}@emailaleatorio.com`,
        clientAddress: `Calle Falsa 123, ${caseToTake.location}, Argentina`,
    };

    setCases(prevCases =>
      prevCases.map(c => (c.id === caseId ? takenCase : c))
    );

    if (selectedCase?.id === caseId) {
        setSelectedCase(takenCase);
    }

    const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        caseId: caseId,
        message: `Estas participando de ${caseId}. Estamos a la espera de la decisión del cliente para asignarte el caso. Serás notificado.`,
        read: false,
        timestamp: new Date().toISOString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, [cases, selectedCase]);

  const handleDiscardCase = useCallback((caseId: string) => {
    setCases(prevCases => prevCases.filter(c => c.id !== caseId));
  }, []);

  const handleClearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard lawyer={mockLawyer} />;
      case 'cases':
        return <CaseList 
                  cases={cases} 
                  onSelectCase={handleSelectCase}
                  onTakeCase={handleTakeCase}
                  onDiscardCase={handleDiscardCase}
                />;
      case 'detail':
        if (selectedCase) {
          return <CaseDetail 
                    key={selectedCase.id + selectedCase.status} 
                    caseData={selectedCase} 
                    onBack={() => handleNavigate('cases')} 
                    onTakeCase={() => {
                      handleTakeCase(selectedCase.id);
                    }}
                    onDiscardCase={() => {
                        handleDiscardCase(selectedCase.id);
                        handleNavigate('cases'); // Go back to list after discarding
                    }}
                  />;
        }
        return <CaseList 
                  cases={cases} 
                  onSelectCase={handleSelectCase} 
                  onTakeCase={handleTakeCase}
                  onDiscardCase={handleDiscardCase}
                />;
      default:
        return <Dashboard lawyer={mockLawyer} />;
    }
  };

  return (
    <div className="min-h-screen text-[#FFFFFF] bg-brand-bg flex flex-col">
      <Header 
        lawyer={mockLawyer} 
        onNavigate={handleNavigate} 
        currentView={currentView}
        notifications={notifications}
        onClearNotifications={handleClearNotifications} 
      />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto flex-grow w-full z-10">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
