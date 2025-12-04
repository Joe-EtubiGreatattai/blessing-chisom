import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

const Home = ({ projects }) => {
    const navigate = useNavigate();

    const handleProjectClick = (project) => {
        navigate(`/project/${project.id}`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
        }
    };

    // Custom layout logic for masonry grid
    const getGridClass = (size, index) => {
        switch (size) {
            case 'large':
                return 'col-span-1 md:col-span-2 row-span-1';
            case 'medium':
                return 'col-span-1 row-span-1';
            case 'small':
                return 'col-span-1 row-span-1';
            default:
                return 'col-span-1 row-span-1';
        }
    };

    return (
        <motion.main
            className="px-0 py-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="grid grid-cols-1 md:grid-cols-4 gap-0 auto-rows-fr"
                style={{ gridAutoFlow: 'dense' }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {projects.map((item, index) => (
                    <motion.div
                        key={item.id}
                        variants={itemVariants}
                        className={getGridClass(item.size, index)}
                    >
                        <ProjectCard item={item} onClick={handleProjectClick} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.main>
    );
};

export default Home;
