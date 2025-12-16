
import { Network } from 'lucide-react';

export default function AgentMode() {
    return (
        <section className="py-24 bg-black">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Any LLM, Anywhere.
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-16">
                        Connect to Claude, GPT-4, Llama, or your own local models via Ollama. You have full control over your data and your models.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {['Claude 3.5 Sonnet', 'GPT-4o', 'Llama 3', 'DeepSeek'].map((model, i) => (
                        <div
                            key={model}
                            className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center font-mono text-sm text-gray-300"
                        >
                            {model}
                        </div>
                    ))}
                </div>

                <div className="mt-24 pt-24 border-t border-white/10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Agent Mode and MCP.
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-12">
                        Next-generation coding agents that can navigate your codebase, read docs, and execute commands.
                    </p>
                    <div className="relative w-full max-w-4xl mx-auto h-64 rounded-2xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/10 overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                        <Network className="w-16 h-16 text-purple-400 opacity-50" />
                    </div>
                </div>
            </div>
        </section>
    );
}
