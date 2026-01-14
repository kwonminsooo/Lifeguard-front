import type { Hospital } from '../types';

interface HospitalCardProps {
  hospital: Hospital;
  rank: number;
}

export default function HospitalCard({ hospital, rank }: HospitalCardProps) {
  return (
    <div className="flex gap-4 p-5 bg-gray-50 rounded-lg border border-gray-200 transition-all hover:shadow-md hover:-translate-y-0.5 md:flex-col">
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full font-bold text-lg md:self-start">
        #{rank}
      </div>
      <div className="flex-1">
        <h3 className="m-0 mb-2 text-gray-800 text-xl font-semibold">{hospital.name}</h3>
        <p className="my-1 text-gray-600 text-sm">{hospital.address}</p>
        {hospital.distance && (
          <p className="my-1 text-gray-600 text-sm">거리: {hospital.distance}km</p>
        )}
        {hospital.rating && (
          <p className="my-1 text-gray-600 text-sm">평점: {hospital.rating}/5.0</p>
        )}
        {hospital.phone && (
          <p className="my-1 text-gray-600 text-sm">전화: {hospital.phone}</p>
        )}
        <div className="flex flex-wrap gap-2 mt-3">
          {hospital.specialties.map((specialty, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-indigo-50 text-indigo-500 rounded-full text-sm font-medium"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
