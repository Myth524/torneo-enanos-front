import React from 'react';

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-center bg-gray-800 p-3 rounded-lg shadow-sm w-full">
      <div className="text-teal-400 mr-3">{icon}</div>
      <div className="flex flex-col">
        <span className="font-semibold text-teal-300">{label}:</span>
        <span>{value || "No disponible"}</span>
      </div>
    </div>
  );
};

export default DetailItem;
