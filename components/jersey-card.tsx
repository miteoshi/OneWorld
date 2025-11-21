"use client";
import { useState } from "react";

interface JerseyCardProps {
  jersey: {
    id: number;
    name: string;
    price: number;
    color: string;
    material: string;
    description: string;
    image: string;
  };
  onSelect: (jersey: any) => void;
}

export default function JerseyCard({ jersey, onSelect }: JerseyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      onClick={() => onSelect(jersey)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-sm border border-white/10 bg-white/5 aspect-square mb-4">
        <div
          className={`w-full h-full transition-transform duration-500 ease-out ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        >
          <img
            src={jersey.image || "/placeholder.svg"}
            alt={jersey.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            className="px-6 py-2 bg-[#fca86f] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#fdb981] transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(jersey);
            }}
          >
            View Details
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide group-hover:text-[#fca86f] transition-colors duration-200">
              {jersey.name}
            </h3>
            <p className="text-xs opacity-60 mt-1">{jersey.color}</p>
          </div>
          <span className="text-base font-bold">${jersey.price}</span>
        </div>
        <p className="text-xs opacity-70 line-clamp-2">{jersey.material}</p>
      </div>
    </div>
  );
}
