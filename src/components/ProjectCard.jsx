import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

const ProjectCard = ({ item, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const videoRefs = useRef([]);

    const images = item.images || [item.image];

    // Helper function to check if file is a video
    const isVideo = (src) => {
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
        return videoExtensions.some(ext => src?.toLowerCase().endsWith(ext));
    };

    // React Spring hover animation
    const springProps = useSpring({
        boxShadow: isHovered
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            : '0 0 0 0 rgba(0, 0, 0, 0)',
        config: { tension: 300, friction: 20 }
    });

    // Auto-cycle through images continuously (slideshow effect)
    useEffect(() => {
        if (images.length <= 1) return;

        // Faster cycling on hover (1.5s), slower when not hovering (3s)
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, isHovered ? 1500 : 3000);

        return () => clearInterval(interval);
    }, [isHovered, images.length]);

    // Handle video muting based on hover state
    useEffect(() => {
        videoRefs.current.forEach((video, idx) => {
            if (video) {
                video.muted = !isHovered || idx !== currentImageIndex;
            }
        });
    }, [isHovered, currentImageIndex]);

    const sizeClasses = {
        small: 'h-full min-h-[250px]',
        medium: 'h-full min-h-[350px]',
        large: 'h-full min-h-[400px]'
    };

    return (
        <animated.div
            style={springProps}
            className={`group relative overflow-hidden cursor-pointer ${sizeClasses[item.size] || 'h-full min-h-[300px]'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClick(item)}
        >
            {/* Image/Video Container with Crossfade Animation */}
            <div className="w-full h-full relative bg-gray-100">
                {images.map((media, idx) => {
                    const isVideoFile = isVideo(media);

                    if (isVideoFile) {
                        return (
                            <video
                                key={idx}
                                ref={el => videoRefs.current[idx] = el}
                                src={media}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${idx === currentImageIndex
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-105'
                                    }`}
                                style={{
                                    transitionProperty: 'opacity, transform',
                                }}
                            />
                        );
                    }

                    return (
                        <img
                            key={idx}
                            src={media}
                            alt={`${item.title} - Image ${idx + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${idx === currentImageIndex
                                ? 'opacity-100 scale-100'
                                : 'opacity-0 scale-105'
                                }`}
                            style={{
                                transitionProperty: 'opacity, transform',
                            }}
                        />
                    );
                })}
            </div>

            {/* Progress Indicators for multiple images - Always visible */}
            {images.length > 1 && (
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
        </animated.div>
    );
};

export default ProjectCard;