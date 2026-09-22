import React, { useState } from 'react';
import { Case, CaseStatus, CaseCategory } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import Tag from './ui/Tag';

interface CaseListProps {
  cases: Case[];
  onSelectCase: (caseData: Case) => void;
  onTakeCase: (caseId: string) => void;
  onDiscardCase: (caseId: string) => void;
}

const StatPreview: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div className="text-center">
        <p className="text-xs text-[#A1A1AA] uppercase tracking-wider">{label}</p>
        <p className="text-lg font-bold text-white">{value}</p>
    </div>
);

const CaseCard: React.FC<{ caseData: Case; onSelect: () => void; onTake: () => void; onDiscard: () => void; }> = ({ caseData, onSelect, onTake, onDiscard }) => {
  const isAvailable = caseData.status === CaseStatus.AVAILABLE;

  const blurLastName = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
      return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
    }
    return name;
  };

  return (
    <Card className="flex flex-col justify-between p-0 overflow-hidden transform hover:scale-[1.02] hover:border-[#d0d03d]/80 hover:shadow-2xl hover:shadow-[#d0d03d]/10">
      <div className="p-5 cursor-pointer" onClick={onSelect}>
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-base font-bold text-white">{caseData.id}</h3>
                <p className="text-sm text-[#A1A1AA]">{isAvailable ? blurLastName(caseData.clientName) : caseData.clientName}, {caseData.clientAge} años</p>
                <p className="text-xs text-[#A1A1AA]">{caseData.location}</p>
            </div>
            <Tag category={caseData.category}>{caseData.category}</Tag>
        </div>
      </div>
      
      {isAvailable ? (
        <>
          <div className="border-y border-[#d0d03d]/20 px-5 py-4 cursor-pointer bg-[#24292A]/60" onClick={onSelect}>
              <div className="grid grid-cols-3 gap-2">
                  <StatPreview label="Responsab." value={caseData.responsibility || 0} />
                  <StatPreview label="Lesión" value={caseData.lesionGrade || 0} />
                  <StatPreview label="Daño Mat." value={caseData.materialDamage || 0} />
              </div>
          </div>
          <div className="p-4 flex gap-3 bg-[#24292A]/40">
              <Button variant="primary" onClick={onTake} className="w-full">Tomar</Button>
              <Button variant="danger" onClick={onDiscard} className="w-full">Descartar</Button>
          </div>
        </>
      ) : (
         <div className="p-4 border-t border-[#d0d03d]/20 cursor-pointer" onClick={onSelect}>
           <p className={`text-sm font-bold ${caseData.status === CaseStatus.ACTIVE ? 'text-blue-400' : 'text-green-400'}`}>
            {caseData.status === CaseStatus.ACTIVE ? 'Activo' : 'Resuelto'}
          </p>
        </div>
      )}
    </Card>
  );
};

const CaseList: React.FC<CaseListProps> = ({ cases, onSelectCase, onTakeCase, onDiscardCase }) => {
  const [activeTab, setActiveTab] = useState<CaseStatus>(CaseStatus.AVAILABLE);

  const availableCases = cases.filter(c => c.status === CaseStatus.AVAILABLE);
  const activeCases = cases.filter(c => c.status === CaseStatus.ACTIVE);
  const resolvedCases = cases.filter(c => c.status === CaseStatus.RESOLVED);

  const casesToDisplay = cases.filter(c => c.status === activeTab);

  const getTabClasses = (tabName: CaseStatus) => {
    return activeTab === tabName
      ? 'bg-[#d0d03d] text-[#24292A] shadow-md shadow-[#d0d03d]/20'
      : 'text-[#A1A1AA] hover:bg-[#404344] hover:text-white';
  };
  
  const inactiveCounterClasses = "bg-[#24292A] text-[#A1A1AA]";

  return (
    <div className="animate-fade-in">
        <h1 className="text-4xl font-black text-white mb-2">Casos</h1>
        <p className="text-[#A1A1AA] text-lg mb-6">Explorá y gestioná los casos disponibles, activos y resueltos.</p>
        
        <div className="flex justify-between items-center mb-6">
            <div className="bg-[#313435] border border-[#d0d03d]/30 rounded-lg p-1 flex space-x-1">
                <button onClick={() => setActiveTab(CaseStatus.AVAILABLE)} className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${getTabClasses(CaseStatus.AVAILABLE)}`}>
                    Disponibles <span className={`text-xs font-bold rounded-full px-2 py-0.5 ml-1 ${activeTab === CaseStatus.AVAILABLE ? 'bg-black/20 text-[#24292A]' : inactiveCounterClasses}`}>{availableCases.length}</span>
                </button>
                <button onClick={() => setActiveTab(CaseStatus.ACTIVE)} className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${getTabClasses(CaseStatus.ACTIVE)}`}>
                    Activos <span className={`text-xs font-bold rounded-full px-2 py-0.5 ml-1 ${activeTab === CaseStatus.ACTIVE ? 'bg-black/20 text-[#24292A]' : inactiveCounterClasses}`}>{activeCases.length}</span>
                </button>
                <button onClick={() => setActiveTab(CaseStatus.RESOLVED)} className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${getTabClasses(CaseStatus.RESOLVED)}`}>
                    Resueltos <span className={`text-xs font-bold rounded-full px-2 py-0.5 ml-1 ${activeTab === CaseStatus.RESOLVED ? 'bg-black/20 text-[#24292A]' : inactiveCounterClasses}`}>{resolvedCases.length}</span>
                </button>
            </div>
        </div>
        
        {casesToDisplay.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {casesToDisplay.map(caseData => (
                <CaseCard 
                    key={caseData.id} 
                    caseData={caseData} 
                    onSelect={() => onSelectCase(caseData)}
                    onTake={() => onTakeCase(caseData.id)}
                    onDiscard={() => onDiscardCase(caseData.id)}
                />
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-[#313435]/50 border border-[#d0d03d]/30 rounded-lg">
                <p className="text-lg text-[#A1A1AA]">No hay casos en esta categoría.</p>
            </div>
        )}
    </div>
  );
};

export default CaseList;
