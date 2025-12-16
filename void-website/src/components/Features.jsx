
import { Bot, Zap, Code2, Sparkles } from 'lucide-react';

const features = [
    {
        icon: <Bot className="w-6 h-6 text-purple-400" />,
        title: 'Chat',
        description: 'Ask questions about your codebase, debug errors, or generate code snippets. All with your favorite LLM.',
    },
    {
        icon: <Zap className="w-6 h-6 text-yellow-400" />,
        title: 'Quick Edit',
        description: 'Edit code faster than ever. Just select, type your instruction, and watch the magic happen.',
    },
    {
        icon: <Code2 className="w-6 h-6 text-blue-400" />,
        title: 'Tab',
        description: 'Smart autocomplete that understands your project context and style.',
    },
    {
        icon: <Sparkles className="w-6 h-6 text-green-400" />,
        title: 'Agent Mode',
        description: 'Let Void take control. Plan, execute, and verify complex tasks autonomously.',
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-black relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        The AI Features You Love.
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Everything you expect from a modern AI code editor, built for privacy and performance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
