import React from 'react';
import { Lawyer } from '../types';
import Card from './ui/Card';
import { 
  CheckCircleIcon, 
  DocumentIcon, 
  UserIcon, 
  StarIcon, 
} from '../constants';
import Button from './ui/Button';

interface DashboardProps {
  lawyer: Lawyer;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <Card className="flex items-center p-4">
    <div className="p-3 rounded-full bg-[#24292A] text-[#d0d03d]">
      {icon}
    </div>
    <div className="ml-4">
      <p className="text-sm font-medium text-[#A1A1AA]">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  </Card>
);

const Dashboard: React.FC<DashboardProps> = ({ lawyer }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black text-white">Perfil de <span className="text-[#d0d03d]">{lawyer.name}</span></h1>
          <p className="text-[#A1A1AA] mt-1 text-lg">{lawyer.firm} - {lawyer.location}</p>
        </div>
        <Button variant="secondary" className="w-auto px-4 py-2">Editar Perfil</Button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-2 flex flex-col items-center justify-center p-4 md:p-6 text-center">
              <p className="text-base font-medium text-[#A1A1AA]">Ranking Actual</p>
              <p className="text-6xl font-extrabold text-[#d0d03d] my-1">{lawyer.ranking}</p>
              <p className="text-sm text-[#A1A1AA]">de {lawyer.totalRanked} estudios</p>
          </Card>
          <StatCard title="Casos Completados" value={lawyer.stats.casesCompleted} icon={<CheckCircleIcon className="w-8 h-8 text-[#d0d03d]" />} />
          <StatCard title="Casos Activos" value={lawyer.stats.activeCases} icon={<DocumentIcon className="w-8 h-8 text-[#d0d03d]" />} />
          <StatCard title="Conversión" value={`${lawyer.stats.conversionRate}%`} icon={<UserIcon className="w-8 h-8 text-[#d0d03d]" />} />
          <StatCard title="Satisfacción" value={`${lawyer.stats.clientSatisfaction} / 5`} icon={<StarIcon className="w-8 h-8 text-[#d0d03d]" />} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-bold text-white border-b border-[#d0d03d]/20 pb-3 mb-4">Experiencia Profesional</h2>
          <p className="text-[#A1A1AA] leading-relaxed">{lawyer.experience}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-white border-b border-[#d0d03d]/20 pb-3 mb-4">Licencias y Certificaciones</h2>
          <ul className="space-y-3">
            <li className="flex items-center justify-between text-sm text-[#A1A1AA] bg-[#24292A] p-4 rounded-lg border border-[#d0d03d]/20">
                <span className="w-[150px]">{lawyer.certifications[0]}</span>
                <Button as="a" href="#" variant="secondary" className="font-semibold py-2 px-3">Ver/Actualizar</Button>
            </li>
            <li className="flex items-center justify-between text-sm text-[#A1A1AA] bg-[#24292A] p-4 rounded-lg border border-[#d0d03d]/20">
                <span className="w-[150px]">Especialización</span>
                <Button as="a" href="#" variant="secondary" className="font-semibold py-2 px-3">Ver/Actualizar</Button>
              </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
