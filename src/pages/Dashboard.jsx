import React, { useState } from 'react';
import { PenTool, User, Save, Edit2, Trash2 } from 'lucide-react';

const Dashboard = ({ projects, aboutData, onUpdateProjects, onUpdateAbout }) => {
    const [activeTab, setActiveTab] = useState('projects');
    const [editingProject, setEditingProject] = useState(null);

    // About Form State
    const [aboutForm, setAboutForm] = useState(aboutData);

    // Project Form State
    const [projectForm, setProjectForm] = useState({
        title: '', category: 'Logo', image: '', images: [], size: 'medium', description: '', role: '', year: '', tools: ''
    });

    const handleSaveAbout = (e) => {
        e.preventDefault();
        onUpdateAbout(aboutForm);
        alert('Profile updated!');
    };

    const handleEditProject = (project) => {
        setEditingProject(project);
        setProjectForm({ ...project, images: project.images || [] });
        window.scrollTo(0, 0);
    };

    const handleDeleteProject = (id) => {
        if (confirm('Are you sure you want to delete this project?')) {
            const updated = projects.filter(p => p.id !== id);
            onUpdateProjects(updated);
        }
    };

    // Helper to convert file to Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageUpload = async (e, type) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        try {
            if (type === 'cover') {
                const base64 = await convertToBase64(files[0]);
                setProjectForm(prev => ({ ...prev, image: base64 }));
            } else if (type === 'gallery') {
                const newImages = await Promise.all(files.map(file => convertToBase64(file)));
                setProjectForm(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image. Please try a smaller file.");
        }
    };

    const removeGalleryImage = (index) => {
        setProjectForm(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSaveProject = (e) => {
        e.preventDefault();

        // Ensure gallery includes cover if empty or simply sync logic
        const finalProjectData = {
            ...projectForm,
            // If specific logic needed for 'images' array (like sticking cover at index 0), do it here. 
            // For now, keeping them distinct but ensuring consistency.
        };

        if (editingProject) {
            // Update existing
            const updated = projects.map(p => p.id === editingProject.id ? { ...finalProjectData, id: editingProject.id } : p);
            onUpdateProjects(updated);
        } else {
            // Create new
            const newProject = { ...finalProjectData, id: Date.now() };
            onUpdateProjects([newProject, ...projects]);
        }
        setEditingProject(null);
        setProjectForm({ title: '', category: 'Logo', image: '', images: [], size: 'medium', description: '', role: '', year: '', tools: '', challenge: '', solution: '' });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 shrink-0">
                    <nav className="space-y-1">
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'projects' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <PenTool size={18} className="mr-3" /> Projects
                        </button>
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'profile' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <User size={18} className="mr-3" /> Profile
                        </button>
                    </nav>
                </aside>

                {/* Content */}
                <div className="flex-1">
                    {activeTab === 'projects' ? (
                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                                <form onSubmit={handleSaveProject} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input placeholder="Title" required className="border p-2 rounded" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} />

                                        <select
                                            required
                                            className="border p-2 rounded bg-white"
                                            value={projectForm.category}
                                            onChange={e => setProjectForm({ ...projectForm, category: e.target.value })}
                                        >
                                            <option value="Logo">Logo</option>
                                            <option value="Fliers">Fliers</option>
                                            <option value="Marketing">Marketing</option>
                                        </select>

                                        <select className="border p-2 rounded bg-white" value={projectForm.size} onChange={e => setProjectForm({ ...projectForm, size: e.target.value })}>
                                            <option value="small">Small</option>
                                            <option value="medium">Medium</option>
                                            <option value="large">Large</option>
                                        </select>

                                        <input placeholder="Role" className="border p-2 rounded" value={projectForm.role} onChange={e => setProjectForm({ ...projectForm, role: e.target.value })} />
                                        <input placeholder="Year" className="border p-2 rounded" value={projectForm.year} onChange={e => setProjectForm({ ...projectForm, year: e.target.value })} />
                                        <input placeholder="Tools" className="border p-2 rounded" value={projectForm.tools} onChange={e => setProjectForm({ ...projectForm, tools: e.target.value })} />
                                    </div>

                                    {/* Image Upload Section */}
                                    <div className="space-y-4 border-t border-gray-100 pt-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                onChange={(e) => handleImageUpload(e, 'cover')}
                                            />
                                            {projectForm.image && (
                                                <img src={projectForm.image} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded shadow ring-1 ring-gray-200" />
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                onChange={(e) => handleImageUpload(e, 'gallery')}
                                            />
                                            {projectForm.images && projectForm.images.length > 0 && (
                                                <div className="flex gap-2 mt-2 flex-wrap">
                                                    {projectForm.images.map((img, idx) => (
                                                        <div key={idx} className="relative group">
                                                            <img src={img} alt={`Gallery ${idx}`} className="h-20 w-20 object-cover rounded shadow ring-1 ring-gray-200" />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeGalleryImage(idx)}
                                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <Trash2 size={12} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-gray-100">
                                        <textarea placeholder="Description (Main summary)" required className="w-full border p-2 rounded h-32" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {(projectForm.category === 'Logo' || projectForm.category === 'Marketing') && (
                                                <textarea
                                                    placeholder="The Challenge"
                                                    className={`w-full border p-2 rounded h-32 ${projectForm.category === 'Marketing' ? 'md:col-span-2' : ''}`}
                                                    value={projectForm.challenge || ''}
                                                    onChange={e => setProjectForm({ ...projectForm, challenge: e.target.value })}
                                                />
                                            )}

                                            {projectForm.category === 'Logo' && (
                                                <textarea placeholder="The Vision (Solution)" className="w-full border p-2 rounded h-32" value={projectForm.solution || ''} onChange={e => setProjectForm({ ...projectForm, solution: e.target.value })} />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                                            <Save size={16} /> Save Project
                                        </button>
                                        {editingProject && (
                                            <button type="button" onClick={() => { setEditingProject(null); setProjectForm({ title: '', category: 'Logo', image: '', images: [], size: 'medium', description: '', role: '', year: '', tools: '' }); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            <div className="space-y-4">
                                {projects.map(p => (
                                    <div key={p.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <img src={p.image} alt={p.title} className="w-12 h-12 object-cover rounded" />
                                            <div>
                                                <h4 className="font-medium text-gray-900">{p.title}</h4>
                                                <p className="text-sm text-gray-500">{p.category}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEditProject(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={18} /></button>
                                            <button onClick={() => handleDeleteProject(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Profile</h3>
                            <form onSubmit={handleSaveAbout} className="space-y-4">
                                <input placeholder="Name" required className="w-full border p-2 rounded" value={aboutForm.name} onChange={e => setAboutForm({ ...aboutForm, name: e.target.value })} />
                                <input placeholder="Title" required className="w-full border p-2 rounded" value={aboutForm.title} onChange={e => setAboutForm({ ...aboutForm, title: e.target.value })} />
                                <input placeholder="Avatar URL" required className="w-full border p-2 rounded" value={aboutForm.avatar} onChange={e => setAboutForm({ ...aboutForm, avatar: e.target.value })} />
                                <textarea placeholder="Bio Paragraph 1" className="w-full border p-2 rounded h-24" value={aboutForm.bio1} onChange={e => setAboutForm({ ...aboutForm, bio1: e.target.value })} />
                                <textarea placeholder="Bio Paragraph 2" className="w-full border p-2 rounded h-24" value={aboutForm.bio2} onChange={e => setAboutForm({ ...aboutForm, bio2: e.target.value })} />
                                <textarea placeholder="Bio Paragraph 3" className="w-full border p-2 rounded h-24" value={aboutForm.bio3} onChange={e => setAboutForm({ ...aboutForm, bio3: e.target.value })} />
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                                    <Save size={16} /> Save Profile
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
