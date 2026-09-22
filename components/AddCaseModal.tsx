import React, { useState } from 'react';
import { Case, CaseCategory, CaseStatus } from '../types';
import Button from './ui/Button';
import { XCircleIcon } from '../constants';

interface AddCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCase: (newCase: Omit<Case, 'id'>) => void;
}

const initialCaseState: Omit<Case, 'id'> = {
  clientName: '',
  clientAge: 0,
  location: '',
  date: '',
  category: CaseCategory.C,
  status: CaseStatus.ACTIVE,
  narrative: '',
  insurer: '',
  startDate: new Date().toISOString().split('T')[0],
  estimatedCloseDate: '',
  documents: [],
  internalNotes: '',
};

const AddCaseModal: React.FC<AddCaseModalProps> = ({ isOpen, onClose, onAddCase }) => {
  const [newCaseData, setNewCaseData] = useState<Omit<Case, 'id'>>(initialCaseState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setNewCaseData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCase(newCaseData);
    setNewCaseData(initialCaseState);
  };

  if (!isOpen) {
    return null;
  }
  
  const inputStyles = "w-full bg-[#24292A] border border-[#d0d03d]/30 rounded-lg px-3 py-2 text-white placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#d0d03d] transition-colors";

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4 animate-fade-in-fast"
      onClick={onClose}
    >
      <div 
        className="bg-[#313435] border border-[#d0d03d]/30 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center border-b border-[#d0d03d]/20 pb-4 mb-6">
            <h2 className="text-2xl font-bold text-white">Añadir Nuevo Caso</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <XCircleIcon className="w-8 h-8"/>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#A1A1AA] block mb-1">Nombre del Cliente</label>
                <input type="text" name="clientName" value={newCaseData.clientName} onChange={handleChange} className={inputStyles} required />
              </div>
               <div>
                <label className="text-sm font-medium text-[#A1A1AA] block mb-1">Edad del Cliente</label>
                <input type="number" name="clientAge" value={newCaseData.clientAge} onChange={handleChange} className={inputStyles} required />
              </div>
            </div>
            
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-[#A1A1AA] block mb-1">Ubicación</label>
                    <input type="text" name="location" value={newCaseData.location} onChange={handleChange} className={inputStyles} required />
                </div>
                <div>
                    <label className="text-sm font-medium text-[#A1A1AA] block mb-1">Aseguradora</label>
                    <input type="text" name="insurer" value={newCaseData.insurer} onChange={handleChange} className={inputStyles} required />
                </div>
             </div>

            <div>
              <label className="text-sm font-medium text-[#A1A1AA] block mb-1">Descripción del Caso</label>
              <textarea name="narrative" value={newCaseData.narrative} onChange={handleChange} rows={4} className={inputStyles} required />
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-[#A1A1AA] block mb-1">Estado</label>
                    <select name="status" value={newCaseData.status} onChange={handleChange} className={inputStyles}>
                      <option value={CaseStatus.ACTIVE}>Activo</option>
                      <option value={CaseStatus.RESOLVED}>Resuelto</option>
                    </select>
                </div>
                 <div>
                    <label className="text-sm font-medium text-[#A1A1AA] block mb-1">Categoría</label>
                    <select name="category" value={newCaseData.category} onChange={handleChange} className={inputStyles}>
                      <option value={CaseCategory.A}>A</option>
                      <option value={CaseCategory.B}>B</option>
                      <option value={CaseCategory.C}>C</option>
                    </select>
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-[#A1A1AA] block mb-1">Fecha del Incidente</label>
                    <input type="date" name="date" value={newCaseData.date} onChange={handleChange} className={inputStyles} required />
                </div>
                 <div>
                    <label className="text-sm font-medium text-[#A1A1AA] block mb-1">Fecha de Inicio del Caso</label>
                    <input type="date" name="startDate" value={newCaseData.startDate} onChange={handleChange} className={inputStyles} required />
                </div>
            </div>

            <div className="pt-6 flex justify-end gap-4">
              <Button type="button" variant="secondary" onClick={onClose} className="w-auto">Cancelar</Button>
              <Button type="submit" variant="primary" className="w-auto">Guardar Caso</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCaseModal;