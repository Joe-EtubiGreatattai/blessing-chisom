import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Parallax } from 'react-scroll-parallax';
import ProjectCard from '../components/ProjectCard';

const Home = ({ projects }) => {
    const navigate = useNavigate();

    const handleProjectClick = (project) => {
        navigate(`/project/${project.id}`);
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {projects.map((item, index) => (
                    <Parallax
                        key={item.id}
                        translateY={index % 2 === 0 ? [-10, 10] : [10, -10]}
                        opacity={[0.8, 1]}
                        className="col-span-1"
                    >
                        <ProjectCard item={item} onClick={handleProjectClick} />
                    </Parallax>
                ))}
            </div>
        </main>
    );
};

export default Home;
