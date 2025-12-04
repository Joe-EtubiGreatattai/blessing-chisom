import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

const Home = ({ projects }) => {
    const navigate = useNavigate();

    const handleProjectClick = (project) => {
        navigate(`/project/${project.id}`);
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {projects.map((item) => (
                    <ProjectCard key={item.id} item={item} onClick={handleProjectClick} />
                ))}
            </div>
        </main>
    );
};

export default Home;
