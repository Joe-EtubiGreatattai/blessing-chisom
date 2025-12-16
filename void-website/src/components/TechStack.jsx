
import { Laptop } from 'lucide-react';

export default function TechStack() {
    return (
        <section className="py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Powered by VS Code.
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Void is a fork of VS Code. This means you keep all your favorite extensions, themes, and keybindings. Migration is seamless.
                        </p>
                        <ul className="space-y-4">
                            {['100% Extension Compatibility', 'Same Keybindings', 'Familiar Interface'].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-gray-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex-1 w-full">
                        <div className="relative rounded-xl border border-white/10 bg-black p-8 shadow-2xl">
                            {/* Abstract Visual for VS Code integration */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
                            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-32 rounded-lg bg-gray-900 border border-white/5 animate-pulse" />
                                <div className="h-32 rounded-lg bg-gray-900 border border-white/5 animate-pulse delay-75" />
                                <div className="h-32 rounded-lg bg-gray-900 border border-white/5 animate-pulse delay-150" />
                                <div className="h-32 rounded-lg bg-gray-900 border border-white/5 animate-pulse delay-200" />
                            </div>
                            <div className="mt-8 flex justify-center">
                                <span className="text-sm text-gray-500 font-mono">vscode-engine-v1.86.0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
