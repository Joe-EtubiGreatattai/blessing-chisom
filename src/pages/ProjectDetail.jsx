import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Calendar, PenTool } from 'lucide-react';

const ProjectDetail = ({ projects }) => {
    const { id } = useParams();
    const navigate = useNavigate();

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

    return (
        <main className="animate-in fade-in duration-500">
            <div className="w-full h-[50vh] md:h-[60vh] relative">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
                        <Link
                            to="/"
                            className="mb-6 inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-medium"
                        >
                            <ArrowLeft size={16} className="mr-2" /> Back to Work
                        </Link>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-2">
                            {project.title}
                        </h1>
                        <p className="text-xl text-white/90 font-light">
                            {project.subtitle || project.category}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-1 space-y-8">
                        <div className="border-t border-gray-200 pt-6">
                            <div className="flex items-center text-gray-500 mb-2">
                                <User size={18} className="mr-2" />
                                <span className="text-xs font-bold tracking-widest uppercase">Role</span>
                            </div>
                            <p className="text-gray-900 font-medium">{project.role}</p>
                        </div>
                        <div className="border-t border-gray-200 pt-6">
                            <div className="flex items-center text-gray-500 mb-2">
                                <Calendar size={18} className="mr-2" />
                                <span className="text-xs font-bold tracking-widest uppercase">Year</span>
                            </div>
                            <p className="text-gray-900 font-medium">{project.year}</p>
                        </div>
                        <div className="border-t border-gray-200 pt-6">
                            <div className="flex items-center text-gray-500 mb-2">
                                <PenTool size={18} className="mr-2" />
                                <span className="text-xs font-bold tracking-widest uppercase">Tools</span>
                            </div>
                            <p className="text-gray-900 font-medium">{project.tools}</p>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">About the Project</h2>
                        <div className="prose prose-lg prose-stone text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {project.description}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProjectDetail;
