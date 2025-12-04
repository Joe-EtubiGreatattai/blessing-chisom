import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Calendar, PenTool, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetail = ({ projects }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [lightboxImage, setLightboxImage] = useState(null);

    const project = projects.find(p => p.id === parseInt(id));

    const heroImages = project?.images || [project?.image];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Auto-cycle hero images
    useEffect(() => {
        if (heroImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [heroImages.length]);

    if (!project) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
                <Link to="/" className="text-indigo-600 hover:text-indigo-800">Back to Work</Link>
            </div>
        );
    }

    const isVideo = (src) => {
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
        return videoExtensions.some(ext => src?.toLowerCase().endsWith(ext));
    };

    return (
        <main className="animate-in fade-in duration-500">
            {/* Hero Carousel Section */}
            <div className="w-full h-[60vh] md:h-[70vh] relative overflow-hidden">
                {heroImages.map((media, idx) => {
                    const isVideoFile = isVideo(media);

                    return isVideoFile ? (
                        <video
                            key={idx}
                            src={media}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentHeroIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                        />
                    ) : (
                        <img
                            key={idx}
                            src={media}
                            alt={`${project.title} ${idx + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentHeroIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                        />
                    );
                })}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 md:pb-16">
                        <Link
                            to="/"
                            className="mb-6 inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-medium"
                        >
                            <ArrowLeft size={16} className="mr-2" /> Back to Work
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold tracking-wider uppercase mb-4">
                                {project.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-2">
                                {project.title}
                            </h1>
                            {project.subtitle && (
                                <p className="text-xl md:text-2xl text-white/90 font-light">
                                    {project.subtitle}
                                </p>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Hero Progress Indicators */}
                {heroImages.length > 1 && (
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                        {heroImages.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 rounded-full transition-all duration-300 ${idx === currentHeroIndex
                                        ? 'w-8 bg-white'
                                        : 'w-1.5 bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
                    {/* Sticky Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="lg:sticky lg:top-24 space-y-8">
                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex items-center text-gray-500 mb-2">
                                    <User size={18} className="mr-2" />
                                    <span className="text-xs font-bold tracking-widest uppercase">Role</span>
                                </div>
                                <p className="text-gray-900 font-medium text-lg">{project.role}</p>
                            </div>
                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex items-center text-gray-500 mb-2">
                                    <Calendar size={18} className="mr-2" />
                                    <span className="text-xs font-bold tracking-widest uppercase">Year</span>
                                </div>
                                <p className="text-gray-900 font-medium text-lg">{project.year}</p>
                            </div>
                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex items-center text-gray-500 mb-2">
                                    <PenTool size={18} className="mr-2" />
                                    <span className="text-xs font-bold tracking-widest uppercase">Tools</span>
                                </div>
                                <p className="text-gray-900 font-medium">{project.tools}</p>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Column */}
                    <div className="lg:col-span-3 space-y-16">
                        {/* Overview Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                                Overview
                            </h2>
                            <div className="prose prose-lg prose-stone text-gray-600 leading-relaxed">
                                {project.description}
                            </div>
                        </motion.section>

                        {/* Challenge Section (if available) */}
                        {project.challenge && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative py-12 px-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl"
                            >
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">
                                    The Challenge
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    {project.challenge}
                                </p>
                            </motion.section>
                        )}

                        {/* Solution Section (if available) */}
                        {project.solution && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative py-12 px-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl"
                            >
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">
                                    The Solution
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    {project.solution}
                                </p>
                            </motion.section>
                        )}

                        {/* Image Gallery Grid */}
                        {heroImages.length > 1 && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-8">
                                    Gallery
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {heroImages.map((media, idx) => {
                                        const isVideoFile = isVideo(media);

                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                                className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
                                                onClick={() => !isVideoFile && setLightboxImage(media)}
                                            >
                                                {isVideoFile ? (
                                                    <video
                                                        src={media}
                                                        autoPlay
                                                        loop
                                                        muted
                                                        playsInline
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <img
                                                        src={media}
                                                        alt={`${project.title} detail ${idx + 1}`}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                )}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.section>
                        )}

                        {/* Outcome Section (if available) */}
                        {project.outcome && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">
                                    Outcome
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    {project.outcome}
                                </p>
                            </motion.section>
                        )}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={() => setLightboxImage(null)}
                    >
                        <button
                            onClick={() => setLightboxImage(null)}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                        >
                            <X size={32} />
                        </button>
                        <motion.img
                            src={lightboxImage}
                            alt="Enlarged view"
                            className="max-w-full max-h-full object-contain"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
};

export default ProjectDetail;
