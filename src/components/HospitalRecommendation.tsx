import type { HospitalRecommendation as HospitalRec } from '../types';
import HospitalCard from './HospitalCard';

interface HospitalRecommendationProps {
  recommendation: HospitalRec;
}

export default function HospitalRecommendation({ recommendation }: HospitalRecommendationProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
      <div className="mb-6 pb-4 border-b-2 border-gray-100">
        <h3 className="m-0 mb-2 text-indigo-500 text-xl font-semibold">🏥 추천 병원</h3>
        <p className="m-0 text-gray-600 text-sm font-medium">
          환자 상태: {recommendation.patientCondition}
        </p>
      </div>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
        <h4 className="m-0 mb-3 text-gray-800 text-lg font-semibold">📋 추천 이유</h4>
        <p className="m-0 text-gray-600 leading-relaxed whitespace-pre-wrap">
          {recommendation.reasoning}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {recommendation.hospitals.map((hospital, index) => (
          <HospitalCard key={hospital.id} hospital={hospital} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}
