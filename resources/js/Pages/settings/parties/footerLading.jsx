
export default function Footer() {
    return (
        <footer className="min-h-screen bg-[#151515] relative px-10 overflow-hidden">
            <div className="absolute inset-0 bg-black/70 z-0" />

            <div className="absolute inset-0 grid grid-cols-4 pointer-events-none z-0">

                <div className="border-r border-dashed border-gray-500/30"></div>
                <div className="border-r border-dashed border-gray-500/30"></div>
                <div className="border-r border-dashed border-gray-500/30"></div>
                <div className="border-r border-dashed border-gray-500/30"></div>
                <div className="absolute top-1/2 w-full border-t border-dashed border-gray-500/20"></div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-56 relative z-10">

                {/* Column 1 */}
                <div className="space-y-4">
                    <h3 className="font-bold text-2xl">Lions Bank</h3>

                    <p className="text-gray-400 leading-relaxed">
                        A trusted financial institution,<br />
                        Lions Bank delivers secure,<br />
                        innovative, and client-focused<br />
                        banking solutions supporting individuals<br />
                        and businesses across international markets.
                    </p>
                </div>

                {/* Column 2 */}
                <div className="space-y-3">
                    <h3 className="font-bold text-2xl">Links</h3>

                    <p className="text-gray-400 hover:text-green-500 cursor-pointer transition">Home</p>
                    <p className="text-gray-400 hover:text-green-500 cursor-pointer transition">About</p>
                    <p className="text-gray-400 hover:text-green-500 cursor-pointer transition">Services</p>
                    <p className="text-gray-400 hover:text-green-500 cursor-pointer transition">Solutions</p>
                    <p className="text-gray-400 hover:text-green-500 cursor-pointer transition">Insights</p>
                </div>

                {/* Column 3 */}
                <div className="space-y-4">
                    <h3 className="font-bold text-2xl">Contact details</h3>

                    <p className="text-gray-400 leading-relaxed">
                        Lions Bank Headquarters, Financial District, Casablanca, Morocco
                    </p>

                    <p className="text-gray-400">
                        contact@lionsbank.com
                    </p>
                </div>

            </div>

            <div className="pt-28 pb-96 text-lg font-bold">
                <p>© 2026 Lions Bank. All rights reserved.</p>
            </div>

            <div className="w-10 h-10 absolute bg-green-500 rounded-full  " style={{boxShadow:'0px 0px 200px 200px #22C55E'}}></div>
            <div className="w-5 h-5 absolute top-20 right-[-45px] bg-green-500 rounded-full " style={{boxShadow:'0px 0px 200px 200px #22C55E',}}></div>
        </footer>
    )
}
