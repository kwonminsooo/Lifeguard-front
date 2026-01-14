export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  distance?: number;
  specialties: string[];
  rating?: number;
  phone?: string;
}

export interface HospitalRecommendation {
  hospitals: Hospital[];
  reasoning: string;
  patientCondition: string;
}

export interface EmergencyGuidance {
  situation_summary: string;
  immediate_actions: string[];
  do_not_do: string[];
}

export interface RecommendedHospital {
  rank: number;
  hospital_id: string;
  hospital_name: string;
  hospital_phone: string;
  accept_prob: number;
  distance_km: number;
  travel_time_min: number;
  er_beds: number;
  icu_beds: number;
  trauma_icu_beds: number;
  total_er_beds: number;
  total_icu_beds: number;
  total_beds: number;
  ct_available: boolean;
  ventilator_available: boolean;
  filter_level: number;
  district_level: number;
  same_district: number;
}

export interface RankingExplanation {
  summary: string;
  details: string[];
}

export interface HospitalRecommendationResponse {
  hospitals: RecommendedHospital[];
  ranking_explanation: RankingExplanation;
}
