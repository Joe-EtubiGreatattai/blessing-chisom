import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const ProjectCard = ({ item, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = item.images || [item.image];

    useEffect(() => {
        let interval;
        if (isHovered && images.length > 1) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }, 1500); // Change image every 1.5 seconds
        } else {
            setCurrentImageIndex(0);
        }
        return () => clearInterval(interval);
    }, [isHovered, images.length]);

    const sizeClasses = {
        small: 'md:col-span-1 aspect-square min-h-[300px]',
        medium: 'md:col-span-1 lg:col-span-1 aspect-[4/3] min-h-[350px]',
        large: 'md:col-span-2 lg:col-span-2 aspect-[16/9] min-h-[400px]'
    };

    return (
        <div
            className={`group relative overflow-hidden rounded-lg cursor-pointer ${sizeClasses[item.size] || 'col-span-1 aspect-square min-h-[300px]'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClick(item)}
        >
            {/* Image Container with Crossfade Animation */}
            <div className="w-full h-full relative bg-gray-100">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`${item.title} - Image ${idx + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${idx === currentImageIndex
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-105'
                            }`}
                        style={{
                            transitionProperty: 'opacity, transform',
                        }}
                    />
                ))}
            </div>

            {/* Progress Indicators for multiple images */}
            {isHovered && images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1 rounded-full transition-all duration-300 ${idx === currentImageIndex
                                ? 'w-6 bg-white'
                                : 'w-1.5 bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            )}

            {/* Overlay - visible on hover */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 flex flex-col justify-end items-start p-6 text-white">
                    <span className="text-xs font-bold tracking-widest uppercase mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {item.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                        {item.title}
                    </h3>
                    {item.subtitle && (
                        <p className="text-sm text-gray-200 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                            {item.subtitle}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;