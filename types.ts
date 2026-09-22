export enum CaseCategory {
  A = 'A',
  B = 'B',
  C = 'C',
}

export enum CaseStatus {
  AVAILABLE = 'Available',
  ACTIVE = 'Active',
  RESOLVED = 'Resolved',
}

export interface DocumentChecklist {
  dni: boolean;
  denuncia: boolean;
  estudioMedico: boolean;
}

export interface CaseDocument {
  name: string;
  url: string;
  uploadedAt: string;
}

export interface Case {
  id: string;
  clientName: string;
  clientAge: number;
  location: string;
  date: string; // Incident date
  lesionGrade?: number;
  materialDamage?: number;
  responsibility?: number;
  category: CaseCategory;
  status: CaseStatus;
  narrative: string;
  insurer: string;
  score?: number;
  checklist?: DocumentChecklist;
  estimatedCompensation?: number;

  // Fields for case management
  startDate?: string;
  estimatedCloseDate?: string;
  documents?: CaseDocument[];
  internalNotes?: string;
  clientPhone?: string;
  clientEmail?: string;
  clientAddress?: string;
}

export interface Lawyer {
  name: string;
  email: string;
  firm: string;
  location: string;
  ranking: number;
  totalRanked: number;
  stats: {
    casesCompleted: number;
    activeCases: number;
    conversionRate: number;
    averageCaseValue: number;
    successRate: number;
    clientSatisfaction: number;
    averageCaseDuration: number;
  };
  experience: string;
  certifications: string[];
}

export interface Notification {
  id: string;
  message: string;
  caseId: string;
  read: boolean;
  timestamp: string;
}