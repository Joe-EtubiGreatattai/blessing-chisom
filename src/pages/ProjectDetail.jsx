import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Calendar, PenTool, X, Download, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetail = ({ projects }) => {
    const { id } = useParams();
    const [lightboxImage, setLightboxImage] = useState(null);

    const project = projects.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
                <Link to="/" className="text-indigo-600 hover:text-indigo-800">Back to Work</Link>
            </div>
        );
    }

    const renderLayout = () => {
        switch (project.category) {
            case 'Logo':
                return <LogoLayout project={project} setLightboxImage={setLightboxImage} />;
            case 'Fliers':
                return <FlierLayout project={project} setLightboxImage={setLightboxImage} />;
            case 'Marketing':
                return <MarketingLayout project={project} setLightboxImage={setLightboxImage} />;
            default:
                return <StandardLayout project={project} setLightboxImage={setLightboxImage} />;
        }
    };

    return (
        <main className="animate-in fade-in duration-500 bg-white min-h-screen">
            <Lightbox
                image={lightboxImage}
                onClose={() => setLightboxImage(null)}
            />
            {renderLayout()}
        </main>
    );
};

// --- Shared Components ---

const Lightbox = ({ image, onClose }) => (
    <AnimatePresence>
        {image && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                onClick={onClose}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 bg-white/10 rounded-full"
                >
                    <X size={24} />
                </button>
                <motion.img
                    src={image}
                    alt="Enlarged view"
                    className="max-w-full max-h-full object-contain shadow-2xl"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        )}
    </AnimatePresence>
);

const BackButton = ({ className = "text-gray-600" }) => (
    <Link
        to="/"
        className={`inline-flex items-center hover:opacity-75 transition-opacity text-sm font-medium ${className}`}
    >
        <ArrowLeft size={16} className="mr-2" /> Back to Work
    </Link>
);

const ProjectMeta = ({ project, className = "" }) => (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-100 ${className}`}>
        <div>
            <span className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">Role</span>
            <span className="text-sm font-medium text-gray-900">{project.role}</span>
        </div>
        <div>
            <span className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">Year</span>
            <span className="text-sm font-medium text-gray-900">{project.year}</span>
        </div>
        <div className="md:col-span-2">
            <span className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">Tools</span>
            <span className="text-sm font-medium text-gray-900">{project.tools}</span>
        </div>
    </div>
);

// --- Layout Definitions ---

// 1. Logo Layout: Minimal, centered, focus on the symbol on a neutral background
const LogoLayout = ({ project, setLightboxImage }) => {
    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <BackButton className="mb-8" />

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold tracking-wider uppercase mb-4">
                    {project.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
                    {project.title}
                </h1>
                <p className="text-xl text-gray-500 leading-relaxed">
                    {project.description}
                </p>
            </div>

            {/* Main Stage */}
            <div className="bg-gray-50 rounded-3xl p-8 md:p-20 mb-16 flex items-center justify-center shadow-inner min-h-[500px]">
                <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={project.image}
                    alt={project.title}
                    className="max-h-[400px] w-auto drop-shadow-2xl cursor-zoom-in hover:scale-105 transition-transform duration-300"
                    onClick={() => setLightboxImage(project.image)}
                />
            </div>

            {/* Grid of details/process */}
            {project.images && project.images.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {project.images.slice(1).map((img, idx) => (
                        <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-8 flex items-center justify-center hover:shadow-lg transition-shadow duration-300 cursor-zoom-in" onClick={() => setLightboxImage(img)}>
                            <img src={img} alt="Variation" className="max-h-64 object-contain" />
                        </div>
                    ))}
                </div>
            )}

            <ProjectMeta project={project} className="max-w-4xl mx-auto" />

            {(project.challenge || project.solution) && (
                <div className="max-w-3xl mx-auto mt-16 space-y-12">
                    {project.challenge && (
                        <section>
                            <h3 className="text-2xl font-bold mb-4 font-serif">The Challenge</h3>
                            <p className="text-gray-600 leading-relaxed">{project.challenge}</p>
                        </section>
                    )}
                    {project.solution && (
                        <section>
                            <h3 className="text-2xl font-bold mb-4 font-serif">The Vision</h3>
                            <p className="text-gray-600 leading-relaxed">{project.solution}</p>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
};

// 2. Flier Layout: Showcase full documents, grid based
const FlierLayout = ({ project, setLightboxImage }) => (
    <div className="bg-stone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-12">
                <BackButton />
                {/* <button className="p-2 hover:bg-white rounded-full transition-colors" title="Share Project">
                    <Share2 size={20} className="text-gray-500" />
                </button> */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Details Column */}
                <div className="lg:col-span-4 space-y-8 sticky top-8 self-start">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">{project.title}</h1>
                        <div className="flex gap-2 flex-wrap mb-6">
                            <span className="px-2 py-1 border border-gray-300 rounded text-xs text-gray-500 uppercase font-bold">{project.category}</span>
                            <span className="px-2 py-1 border border-gray-300 rounded text-xs text-gray-500 uppercase font-bold">{project.year}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg mb-8">{project.description}</p>
                        <ProjectMeta project={project} className="border-y-2 border-stone-200" />
                    </div>
                </div>

                {/* Gallery Column */}
                <div className="lg:col-span-8 space-y-8">
                    {project.images && project.images.map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-4 shadow-sm rounded-lg"
                        >
                            <img
                                src={img}
                                alt={`${project.title} page ${idx + 1}`}
                                className="w-full h-auto cursor-zoom-in"
                                onClick={() => setLightboxImage(img)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// 3. Marketing Layout: Collage / Masonry style, full width immersive
const MarketingLayout = ({ project, setLightboxImage }) => {
    return (
        <div>
            {/* Immersive Header */}
            <div className="w-full h-[50vh] relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8 md:p-16">
                    <div className="max-w-7xl mx-auto w-full">
                        <BackButton className="text-white mb-6 hover:text-white/80" />
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{project.title}</h1>
                        <p className="text-xl text-white/90 max-w-2xl">{project.description}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="md:col-span-2 lg:col-span-3 mb-8">
                    <ProjectMeta project={project} />
                </div>

                {project.images && project.images.map((img, idx) => (
                    <motion.div
                        key={idx}
                        className={`relative group overflow-hidden rounded-xl ${idx === 0 ? 'md:col-span-2 md:row-span-2 aspect-video' : 'aspect-square'
                            }`}
                        onClick={() => setLightboxImage(img)}
                        whileHover={{ y: -4 }}
                    >
                        <img src={img} alt="" className="w-full h-full object-cover cursor-zoom-in" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </motion.div>
                ))}

                {project.challenge && (
                    <div className="md:col-span-2 lg:col-span-3 bg-indigo-900 text-white p-12 rounded-3xl mt-8">
                        <h3 className="text-2xl font-bold mb-4">The Campaign Challenge</h3>
                        <p className="text-lg leading-relaxed opacity-90">{project.challenge}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

// 4. Fallback Standard Layout (Original)
const StandardLayout = ({ project, setLightboxImage }) => {
    // Reusing the simplifed version of the original layout
    return (
        <div>
            <div className="w-full h-[60vh] relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 md:p-16">
                    <BackButton className="text-white mb-auto mt-4" />
                    <h1 className="text-white text-5xl font-bold mb-4">{project.title}</h1>
                    <span className="text-white/80 text-xl">{project.category}</span>
                </div>
            </div>
            <div className="max-w-4xl mx-auto px-6 py-16">
                <ProjectMeta project={project} />
                <div className="prose prose-lg mt-8">
                    <p>{project.description}</p>
                </div>
                {project.images && (
                    <div className="space-y-8 mt-16">
                        {project.images.map((img, i) => (
                            <img key={i} src={img} alt="" className="rounded-lg shadow-lg w-full" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProjectDetail;
