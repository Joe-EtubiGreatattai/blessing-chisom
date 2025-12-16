
import { ArrowRight, Terminal, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <div
                    className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors cursor-pointer"
                >
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>The open source AI code editor</span>
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                </div>

                <h1
                    className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-tight"
                >
                    Code with <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                        Intelligence.
                    </span>
                </h1>

                <p
                    className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
                >
                    Void is an open source Cursor alternative. Full privacy. Fully-featured. Use any LLM, anywhere. Powered by VS Code.
                </p>

                <div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button className="h-12 px-8 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all flex items-center gap-2">
                        Download Beta
                    </button>
                    <button className="h-12 px-8 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-all border border-white/10 flex items-center gap-2">
                        <Terminal className="w-5 h-5" />
                        View on GitHub
                    </button>
                </div>

                {/* Mock UI/Screenshot Area */}
                <div
                    className="mt-20 relative rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-sm shadow-2xl overflow-hidden aspect-video w-full max-w-6xl mx-auto ring-1 ring-white/10"
                >
                    <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                        <div className="text-center">
                            <p className="text-sm">App Interface Mockup</p>
                            <p className="text-xs opacity-50">(Placeholder for Void Editor Screenshot)</p>
                        </div>
                    </div>
                    {/* Fake Code lines for visual interest if no image */}
                    <div className="p-4 space-y-2 opacity-20">
                        <div className="w-1/3 h-4 bg-gray-600 rounded"></div>
                        <div className="w-1/2 h-4 bg-gray-600 rounded"></div>
                        <div className="w-2/3 h-4 bg-gray-600 rounded"></div>
                    </div>
                </div>

            </div>
        </section>
    );
}
