"use client";

import { useEffect } from "react";

interface JerseyModalProps {
  jersey: {
    id: number;
    name: string;
    price: number;
    color: string;
    material: string;
    description: string;
    image: string;
  };
  onClose: () => void;
}

export default function JerseyModal({ jersey, onClose }: JerseyModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div
          className="bg-black border border-white/10 rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="flex items-center justify-center">
              <div className="w-full aspect-square overflow-hidden rounded-sm border border-white/10">
                <img
                  src={jersey.image || "/placeholder.svg"}
                  alt={jersey.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <p className="text-xs tracking-[0.35em] uppercase opacity-70 mb-4">
                  Product Details
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
                  {jersey.name}
                </h2>
                <p className="text-2xl font-bold text-[#fca86f] mb-6">
                  ${jersey.price}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="border-b border-white/10 pb-4">
                    <p className="text-xs uppercase tracking-wider opacity-60 mb-2">
                      Color
                    </p>
                    <p className="text-sm">{jersey.color}</p>
                  </div>
                  <div className="border-b border-white/10 pb-4">
                    <p className="text-xs uppercase tracking-wider opacity-60 mb-2">
                      Material
                    </p>
                    <p className="text-sm">{jersey.material}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider opacity-60 mb-2">
                      Description
                    </p>
                    <p className="text-sm leading-relaxed opacity-90">
                      {jersey.description}
                    </p>
                  </div>
                </div>

                {/* <div className="mb-8">
                  <p className="text-xs uppercase tracking-wider opacity-60 mb-3">
                    Size
                  </p>
                  <div className="flex gap-3">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                      <button
                        key={size}
                        className="w-10 h-10 border border-white/20 hover:border-[#fca86f] hover:text-[#fca86f] transition-colors duration-200 text-xs font-semibold uppercase"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div> */}
              </div>

              <div className="flex flex-col gap-3">
                {/* <button className="w-full bg-[#fca86f] text-black py-3 font-semibold uppercase tracking-wider hover:bg-[#fdb981] transition-colors duration-200">
                  Add to Cart
                </button> */}
                <button
                  onClick={onClose}
                  className="w-full border border-white/20 text-foreground py-3 font-semibold uppercase tracking-wider hover:border-white/40 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
