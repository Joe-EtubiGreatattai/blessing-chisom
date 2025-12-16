
import { Github, Twitter, Disc } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-black font-bold text-xs">V</div>
                        <span className="text-white font-semibold">Void</span>
                    </div>
                    <p className="text-gray-500 text-sm">© 2025 Glass Devtools, Inc.</p>
                </div>

                <div className="flex items-center gap-6">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Disc className="w-5 h-5" />
                    </a>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-400">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="mailto:hello@voideditor.com" className="hover:text-white transition-colors">hello@voideditor.com</a>
                </div>
            </div>
        </footer>
    );
}
