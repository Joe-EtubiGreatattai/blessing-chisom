import React from 'react';
import { Mail, Linkedin } from 'lucide-react';

const About = ({ data }) => {
    return (
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 bg-gray-200 rounded-full overflow-hidden self-center md:self-start ring-4 ring-gray-50">
                    <img
                        src={data.avatar}
                        alt={`${data.name} Avatar`}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="space-y-6 text-center md:text-left">
                    <h2 className="text-3xl font-serif text-gray-900">
                        Hi, I'm {data.name}.
                    </h2>
                    <div className="prose prose-stone text-gray-600 leading-relaxed">
                        <p>{data.bio1}</p>
                        <p>{data.bio2}</p>
                        <p>{data.bio3}</p>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                        <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                            <Mail className="mr-2 -ml-1 h-5 w-5 text-gray-400" />
                            Contact Me
                        </button>
                        <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors">
                            <Linkedin className="mr-2 -ml-1 h-5 w-5" />
                            LinkedIn
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-20">
                <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-8 text-center md:text-left">Selected Clients & Projects</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {['Zynga', 'Disney', 'Zoologist Perfumes', 'Tailtown'].map((client) => (
                        <div key={client} className="flex items-center justify-center md:justify-start grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                            <span className="text-xl font-serif text-gray-400">{client}</span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default About;
