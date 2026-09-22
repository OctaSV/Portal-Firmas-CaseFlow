import React, { useState } from 'react';
import { Case, CaseStatus } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import Tag from './ui/Tag';
import Tooltip from './ui/Tooltip';
import { IconoInformacion, LockClosedIcon } from '../constants';

interface CaseDetailProps {
  caseData: Case;
  onBack: () => void;
  onTakeCase: () => void;
  onDiscardCase: () => void;
}

const CaseDetailView: React.FC<{ caseData: Case; onTakeCase: () => void; onDiscardCase: () => void; }> = ({ caseData, onTakeCase, onDiscardCase }) => {
    const [activeTab, setActiveTab] = useState('docs');

    const ScoreMeter: React.FC<{ label: string; value: number, tooltip: string }> = ({ label, value, tooltip }) => (
        <div>
            <div className="flex justify-between items-center mb-1">
                <Tooltip content={tooltip}>
                <span className="text-sm font-medium text-[#A1A1AA] flex items-center">{label} <IconoInformacion className="w-4 h-4 ml-2 text-gray-500" /></span>
                </Tooltip>
                <span className="text-sm font-bold text-white">{value}/100</span>
            </div>
            <div className="w-full bg-[#d0d03d]/20 rounded-full h-2.5"><div className="bg-[#d0d03d] h-2.5 rounded-full" style={{ width: `${value}%` }}></div></div>
        </div>
    );
    
    const blurLastName = (name: string) => {
        const parts = name.split(' ');
        if (parts.length > 1) {
          return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
        }
        return name;
    };

    const getTabClasses = (tabName: string) => {
        return activeTab === tabName
            ? "text-[#d0d03d] border-[#d0d03d]"
            : "text-[#A1A1AA] border-transparent hover:text-white hover:border-gray-500";
    };

    const DocumentRow: React.FC<{ name: string, status: string, isLocked: boolean }> = ({ name, status, isLocked }) => (
         <div className="grid grid-cols-3 items-center py-3 px-2 border-b border-[#d0d03d]/20 last:border-b-0 hover:bg-[#24292A]/50 rounded-md">
            <span className="text-sm text-[#A1A1AA]">{name}</span>
            <span className={`text-sm font-semibold ${status === 'Completo' ? 'text-green-400' : 'text-[#d0d03d]'}`}>{status}</span>
            <div className="justify-self-end">
                <Button
                    variant="secondary"
                    className={`w-auto py-1 px-3 text-xs ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLocked && <LockClosedIcon className="w-4 h-4 mr-1.5" />}
                    Ver
                </Button>
            </div>
        </div>
    );

    const isAvailable = caseData.status === CaseStatus.AVAILABLE;

    return (
        <>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center">
                        {caseData.id}
                        {isAvailable && <span className="ml-3 text-sm font-semibold bg-[#d0d03d]/20 text-[#d0d03d] px-3 py-1 rounded-full border border-[#d0d03d]/30">NUEVO</span>}
                        <Tag category={caseData.category} className="ml-2 w-7 h-7 flex items-center justify-center text-sm p-0">{caseData.category}</Tag>
                    </h1>
                    <p className="text-[#A1A1AA] mt-1">Aseguradora: {caseData.insurer}</p>
                </div>
                {isAvailable && (
                    <div className="flex gap-3">
                        <Button variant="danger" onClick={onDiscardCase}>Rechazar</Button>
                        <Button variant="primary" onClick={onTakeCase}>Tomar Caso</Button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <h2 className="text-xl font-bold text-white border-b border-[#d0d03d]/20 pb-3 mb-4">Análisis IA</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <ScoreMeter label="Responsabilidad" value={caseData.responsibility || 0} tooltip="Probabilidad estimada de que la responsabilidad del siniestro recaiga sobre la contraparte." />
                            <ScoreMeter label="Grado de Lesión" value={caseData.lesionGrade || 0} tooltip="Estimación de la gravedad de las lesiones del cliente según el baremo médico."/>
                            <ScoreMeter label="Daño Material" value={caseData.materialDamage || 0} tooltip="Estimación del valor económico de los daños materiales sufridos en el vehículo." />
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-[#d0d03d]/20">
                            <div className="flex justify-between items-center bg-[#24292A] p-4 rounded-lg">
                                <p className="text-sm font-medium text-[#A1A1AA]">Indemnización Estimada (AR$)</p>
                                <p className="text-2xl font-black text-white">
                                    {caseData.estimatedCompensation?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 0 }) || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-0 overflow-hidden">
                        <div className="border-b border-[#d0d03d]/20 px-6">
                            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                <button onClick={() => setActiveTab('details')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${getTabClasses('details')}`}>Detalles del Incidente</button>
                                <button onClick={() => setActiveTab('docs')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${getTabClasses('docs')}`}>Documentación</button>
                                <button onClick={() => setActiveTab('timeline')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${getTabClasses('timeline')}`}>Cronología</button>
                            </nav>
                        </div>
                        <div className="p-6 min-h-[200px]">
                            {activeTab === 'details' && <p className="text-[#A1A1AA] leading-relaxed">{caseData.narrative}</p>}
                            {activeTab === 'docs' && (
                                <div>
                                    <div className="grid grid-cols-3 items-center py-2 px-2 text-xs text-[#A1A1AA] font-semibold">
                                        <span>Documento</span>
                                        <span>Estado</span>
                                        <span className="text-right">Acción</span>
                                    </div>
                                    <DocumentRow name="Reporte Oficial" status={caseData.checklist?.denuncia ? 'Completo' : 'Pendiente'} isLocked={isAvailable} />
                                    <DocumentRow name="DNI Cliente" status={caseData.checklist?.dni ? 'Completo' : 'Pendiente'} isLocked={isAvailable} />
                                    <DocumentRow name="Estudio Médico" status={caseData.checklist?.estudioMedico ? 'Completo' : 'Pendiente'} isLocked={isAvailable} />
                                </div>
                            )}
                            {activeTab === 'timeline' && <p className="text-[#A1A1AA] text-center py-10">La cronología del caso estará disponible aquí.</p>}
                        </div>
                    </Card>
                </div>
                
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <h2 className="text-xl font-bold text-white mb-4">Información Cliente</h2>
                        {isAvailable ? (
                             <div>
                                <div className="space-y-3 text-sm mb-4 pb-4 border-b border-[#d0d03d]/20">
                                    <div className="flex justify-between">
                                        <span className="text-[#A1A1AA] font-medium">Nombre:</span>
                                        <span className="text-white font-semibold">{blurLastName(caseData.clientName)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#A1A1AA] font-medium">Edad:</span>
                                        <span className="text-white font-semibold">{caseData.clientAge} años</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#A1A1AA] font-medium">Ubicación:</span>
                                        <span className="text-white font-semibold text-right">{caseData.location}</span>
                                    </div>
                                </div>
                                <div className="text-center bg-[#24292A]/50 backdrop-blur-sm p-4 rounded-lg border border-[#d0d03d]/20">
                                    <LockClosedIcon className="w-8 h-8 text-[#A1A1AA] mx-auto" />
                                    <p className="text-[#A1A1AA] text-sm mt-3">Los datos de contacto son confidenciales y serán visibles una vez que acepte el caso.</p>
                                    <Button variant="secondary" className="mt-4 w-full cursor-not-allowed opacity-50">Ver Contacto</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-[#A1A1AA] font-medium">Nombre:</span>
                                    <span className="text-white font-semibold">{caseData.clientName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#A1A1AA] font-medium">Edad:</span>
                                    <span className="text-white font-semibold">{caseData.clientAge} años</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#A1A1AA] font-medium">Teléfono:</span>
                                    <span className="text-white font-semibold">{caseData.clientPhone || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#A1A1AA] font-medium">Email:</span>
                                    <span className="text-white font-semibold">{caseData.clientEmail || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#A1A1AA] font-medium">Ubicación:</span>
                                    <span className="text-white font-semibold text-right">{caseData.clientAddress || caseData.location}</span>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </>
    );
};

const CaseDetail: React.FC<CaseDetailProps> = ({ caseData, onBack, onTakeCase, onDiscardCase }) => {
  return (
    <div className="animate-fade-in">
      <button onClick={onBack} className="mb-6 text-sm font-medium text-[#d0d03d] hover:text-[#eaea5f] transition-colors duration-300">
        &larr; Volver a la lista de casos
      </button>

      <CaseDetailView caseData={caseData} onTakeCase={onTakeCase} onDiscardCase={onDiscardCase} />
    </div>
  );
};

export default CaseDetail;
