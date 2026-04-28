<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Locus - Your Travel Command Center</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Anuphan:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', 'Anuphan', sans-serif;
            background-color: #020617; /* Slate 950 */
            color: #f8fafc;
            overflow: hidden;
        }
        .glass {
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .hero-bg {
            background-image: linear-gradient(to right, rgba(2, 6, 23, 0.9), rgba(2, 6, 23, 0.4)), 
                              url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000');
            background-size: cover;
            background-position: center;
        }
        .custom-scrollbar::-webkit-scrollbar {
            height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
        }
        .nav-item:hover .nav-icon {
            color: #2dd4bf; /* Teal 400 */
        }
    </style>
</head>
<body class="h-screen flex">

    <!-- Sidebar (Left Rail) -->
    <aside class="w-16 flex flex-col items-center py-8 border-r border-white/10 z-20 bg-[#020617]">
        <div class="mb-10 text-teal-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/></svg>
        </div>
        <nav class="flex flex-col gap-8 flex-1">
            <div class="nav-item cursor-pointer text-slate-500 transition-colors"><svg class="nav-icon" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg></div>
            <div class="nav-item cursor-pointer text-slate-500 transition-colors"><svg class="nav-icon" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L16 4m0 13V4m0 0L9 7"/></svg></div>
            <div class="nav-item cursor-pointer text-slate-500 transition-colors"><svg class="nav-icon" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
            <div class="nav-item cursor-pointer text-slate-500 transition-colors"><svg class="nav-icon" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg></div>
        </nav>
        <div class="mt-auto text-slate-600 cursor-pointer hover:text-white transition-colors">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 hero-bg relative overflow-hidden flex flex-col">
        
        <!-- Header / Greeting -->
        <header class="p-10 z-10">
            <div class="flex justify-between items-start">
                <div>
                    <h1 class="text-4xl font-bold tracking-tight mb-2">สวัสดี, Zeroz</h1>
                    <p class="text-slate-300 font-light tracking-wide">วันนี้หัวใจของคุณอยากจะไปเต้นที่ไหน?</p>
                </div>
                <div class="glass px-4 py-2 rounded-2xl flex items-center gap-4">
                    <div class="text-right">
                        <div class="text-sm font-semibold text-teal-400">กรุงเทพมหานคร</div>
                        <div class="text-xs text-slate-400">PM 2.5: 42 (ปานกลาง)</div>
                    </div>
                    <div class="w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7a5 5 0 100 10 5 5 0 000-10zM2 13h2a1 1 0 100-2H2a1 1 0 100 2zm18 0h2a1 1 0 100-2h-2a1 1 0 100 2zM11 2v2a1 1 0 100 2V2a1 1 0 100-2zm0 18v2a1 1 0 100 2v-2a1 1 0 100-2zM5.99 4.58a1 1 0 111.41 1.41L5.99 4.58zm12.02 12.02a1 1 0 111.41 1.41l-1.41-1.41zM5.99 19.42a1 1 0 11-1.41-1.41l1.41 1.41zm12.02-12.02a1 1 0 11-1.41-1.41l1.41 1.41z"/></svg>
                    </div>
                </div>
            </div>
        </header>

        <div class="flex-1 flex p-10 gap-10 overflow-hidden">
            <!-- Left: Primary Actions -->
            <section class="w-2/3 flex flex-col gap-6 z-10">
                <div class="grid grid-cols-1 gap-4">
                    <!-- Card 1: Has target -->
                    <button class="group glass p-6 rounded-3xl text-left flex items-center gap-6 hover:bg-white/10 hover:scale-[1.01] transition-all duration-300">
                        <div class="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                            <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold mb-1">มีที่ในใจแล้ว</h3>
                            <p class="text-slate-400 text-sm">ระบุพิกัดที่คุณอยากไป แล้วให้เราจัดการเส้นทางให้</p>
                        </div>
                        <div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                        </div>
                    </button>

                    <!-- Card 2: AI Selection -->
                    <button class="group glass p-6 rounded-3xl text-left flex items-center gap-6 hover:bg-white/10 hover:scale-[1.01] transition-all duration-300 border-indigo-500/30 border">
                        <div class="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                            <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <h3 class="text-xl font-semibold mb-1">ช่วยเลือกให้หน่อย</h3>
                                <span class="bg-indigo-500 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter">AI Powered</span>
                            </div>
                            <p class="text-slate-400 text-sm">ตอบคำถามสั้นๆ แล้ว Locus จะค้นหาจุดหมายที่ใช่ที่สุดสำหรับคุณ</p>
                        </div>
                        <div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                        </div>
                    </button>

                    <!-- Card 3: Interests -->
                    <button class="group glass p-6 rounded-3xl text-left flex items-center gap-6 hover:bg-white/10 hover:scale-[1.01] transition-all duration-300">
                        <div class="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                            <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold mb-1">สำรวจตามความสนใจ</h3>
                            <p class="text-slate-400 text-sm">เลือกหมวดหมู่ที่ชอบ — ภูเขา, คาเฟ่, ทะเล หรือ Road Trip</p>
                        </div>
                        <div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                        </div>
                    </button>
                </div>

                <!-- Horizontal Category List -->
                <div class="mt-4">
                    <div class="flex items-center justify-between mb-3 px-2">
                        <div class="flex items-center gap-2">
                            <svg class="text-teal-400" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                            <h4 class="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">สำรวจด่วน</h4>
                        </div>
                        <button class="text-xs text-teal-400 hover:underline">ดูทั้งหมด</button>
                    </div>
                    <div class="flex gap-4 overflow-x-auto pb-4 custom-scrollbar no-scrollbar flex-nowrap">
                        <div class="min-w-[120px] flex-shrink-0 glass p-5 rounded-[2rem] flex flex-col items-center gap-3 cursor-pointer hover:bg-teal-500/20 transition-all border-teal-500/20 border group shadow-xl">
                            <div class="text-3xl transition-transform group-hover:scale-125">🌲</div>
                            <span class="text-xs font-black text-slate-200">ป่าไม้</span>
                        </div>
                        <div class="min-w-[120px] flex-shrink-0 glass p-5 rounded-[2rem] flex flex-col items-center gap-3 cursor-pointer hover:bg-blue-500/20 transition-all border-white/5 border group shadow-xl">
                            <div class="text-3xl transition-transform group-hover:scale-125">🌊</div>
                            <span class="text-xs font-black text-slate-200">ทะเล</span>
                        </div>
                        <div class="min-w-[120px] flex-shrink-0 glass p-5 rounded-[2rem] flex flex-col items-center gap-3 cursor-pointer hover:bg-red-500/20 transition-all border-white/5 border group shadow-xl">
                            <div class="text-3xl transition-transform group-hover:scale-125">🍖</div>
                            <span class="text-xs font-black text-slate-200">ของกิน</span>
                        </div>
                        <div class="min-w-[120px] flex-shrink-0 glass p-5 rounded-[2rem] flex flex-col items-center gap-3 cursor-pointer hover:bg-amber-500/20 transition-all border-white/5 border group shadow-xl">
                            <div class="text-3xl transition-transform group-hover:scale-125">☕</div>
                            <span class="text-xs font-black text-slate-200">คาเฟ่</span>
                        </div>
                        <div class="min-w-[120px] flex-shrink-0 glass p-5 rounded-[2rem] flex flex-col items-center gap-3 cursor-pointer hover:bg-purple-500/20 transition-all border-white/5 border group shadow-xl">
                            <div class="text-3xl transition-transform group-hover:scale-125">💃</div>
                            <span class="text-xs font-black text-slate-200">สถานบันเทิง</span>
                        </div>
                    </div>
                </div>

                <!-- Region Selection Grid -->
                <div class="mt-6">
                    <div class="flex items-center gap-2 mb-4 px-2">
                        <svg class="text-teal-400" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L16 4m0 13V4m0 0L9 7"/></svg>
                        <h4 class="text-sm font-bold text-slate-200">เลือกภูมิภาค</h4>
                    </div>
                    <div class="grid grid-cols-3 gap-3">
                        <button class="glass p-3 rounded-xl flex items-center gap-3 hover:bg-white/5 transition-all text-left">
                            <div class="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]"></div>
                            <span class="text-xs font-medium text-slate-300">ภาคเหนือ</span>
                        </button>
                        <button class="glass p-3 rounded-xl flex items-center gap-3 hover:bg-white/5 transition-all text-left">
                            <div class="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div>
                            <span class="text-xs font-medium text-slate-300">ภาคอีสาน</span>
                        </button>
                        <button class="glass p-3 rounded-xl flex items-center gap-3 hover:bg-white/5 transition-all text-left">
                            <div class="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></div>
                            <span class="text-xs font-medium text-slate-300">ภาคกลาง</span>
                        </button>
                        <button class="glass p-3 rounded-xl flex items-center gap-3 hover:bg-white/5 transition-all text-left">
                            <div class="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
                            <span class="text-xs font-medium text-slate-300">ภาคตะวันออก</span>
                        </button>
                        <button class="glass p-3 rounded-xl flex items-center gap-3 hover:bg-white/5 transition-all text-left">
                            <div class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                            <span class="text-xs font-medium text-slate-300">ภาคตะวันตก</span>
                        </button>
                        <button class="glass p-3 rounded-xl flex items-center gap-3 hover:bg-white/5 transition-all text-left">
                            <div class="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
                            <span class="text-xs font-medium text-slate-300">ภาคใต้</span>
                        </button>
                    </div>
                </div>
            </section>

            <!-- Right: Insights Sidebar -->
            <section class="w-1/3 flex flex-col gap-6 z-10">
                <!-- Trending / Recent -->
                <div class="glass flex-1 p-5 rounded-3xl overflow-hidden flex flex-col">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="font-bold text-sm">กำลังฮิตในสัปดาห์นี้</h3>
                        <button class="text-[10px] text-teal-400 hover:underline font-semibold">ดูเพิ่มเติม</button>
                    </div>
                    <div class="space-y-4 overflow-y-auto custom-scrollbar pr-2">
                        <!-- Trend Item 1 -->
                        <div class="flex gap-4 cursor-pointer group relative">
                            <div class="absolute -left-2 -top-2 w-6 h-6 bg-teal-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center z-10 shadow-lg border-2 border-[#020617]">1</div>
                            <div class="w-16 h-16 bg-slate-800 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl">
                                <img src="https://images.unsplash.com/photo-1528181304800-2f190854b798?auto=format&fit=crop&q=80&w=200" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                            </div>
                            <div class="flex flex-col justify-center">
                                <span class="text-xs font-bold text-slate-100">แม่กำปอง, เชียงใหม่</span>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="text-[10px] text-slate-400">อากาศ 18°C</span>
                                    <span class="w-1 h-1 rounded-full bg-slate-600"></span>
                                    <span class="text-[10px] text-teal-400 font-medium">กำลังฮิต</span>
                                </div>
                            </div>
                            <div class="ml-auto flex items-center">
                                <svg class="text-slate-600 group-hover:text-teal-400 transition-colors" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                            </div>
                        </div>

                        <!-- Trend Item 2 -->
                        <div class="flex gap-4 cursor-pointer group relative">
                            <div class="absolute -left-2 -top-2 w-6 h-6 bg-slate-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center z-10 shadow-lg border-2 border-[#020617]">2</div>
                            <div class="w-16 h-16 bg-slate-800 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl">
                                <img src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=200" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                            </div>
                            <div class="flex flex-col justify-center">
                                <span class="text-xs font-bold text-slate-100">เกาะกูด, ตราด</span>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="text-[10px] text-slate-400">ทะเลสงบ</span>
                                    <span class="w-1 h-1 rounded-full bg-slate-600"></span>
                                    <span class="text-[10px] text-emerald-400 font-medium">เหมาะพักผ่อน</span>
                                </div>
                            </div>
                            <div class="ml-auto flex items-center">
                                <svg class="text-slate-600 group-hover:text-teal-400 transition-colors" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                            </div>
                        </div>

                        <!-- Trend Item 3 -->
                        <div class="flex gap-4 cursor-pointer group relative">
                            <div class="absolute -left-2 -top-2 w-6 h-6 bg-slate-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center z-10 shadow-lg border-2 border-[#020617]">3</div>
                            <div class="w-16 h-16 bg-slate-800 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl">
                                <img src="https://images.unsplash.com/photo-1510797215324-95aa89f43c33?auto=format&fit=crop&q=80&w=200" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                            </div>
                            <div class="flex flex-col justify-center">
                                <span class="text-xs font-bold text-slate-100">เขาค้อ, เพชรบูรณ์</span>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="text-[10px] text-slate-400">มีทะเลหมอก</span>
                                    <span class="w-1 h-1 rounded-full bg-slate-600"></span>
                                    <span class="text-[10px] text-blue-400 font-medium">ใกล้กรุงเทพ</span>
                                </div>
                            </div>
                            <div class="ml-auto flex items-center">
                                <svg class="text-slate-600 group-hover:text-teal-400 transition-colors" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Gas Price Widget (Moved Below) -->
                <div class="glass p-5 rounded-3xl border-t border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex flex-col">
                            <h3 class="font-bold text-sm">ราคาน้ำมันวันนี้</h3>
                            <a href="https://oil-price.bangchak.co.th/BcpOilPrice2/th" target="_blank" class="text-[9px] text-teal-500 uppercase tracking-tighter font-bold hover:underline">ข้อมูลจาก: Bangchak Corporation</a>
                        </div>
                        <div class="flex items-center gap-1.5 bg-slate-900/50 px-2 py-1 rounded-lg border border-white/5">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span class="text-[10px] text-slate-400">อัปเดต: 05:45 น.</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div class="bg-white/5 p-3 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                            <div class="flex items-center gap-2 mb-1">
                                <div class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                <span class="text-[10px] text-slate-400 font-semibold uppercase">Gasohol 95</span>
                            </div>
                            <div class="flex items-baseline gap-1">
                                <span class="text-lg font-black text-white">38.45</span>
                                <span class="text-[10px] text-slate-500 font-bold">฿/L</span>
                            </div>
                        </div>
                        <div class="bg-white/5 p-3 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                            <div class="flex items-center gap-2 mb-1">
                                <div class="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div>
                                <span class="text-[10px] text-slate-400 font-semibold uppercase">Diesel B7</span>
                            </div>
                            <div class="flex items-baseline gap-1">
                                <span class="text-lg font-black text-white">32.94</span>
                                <span class="text-[10px] text-slate-500 font-bold">฿/L</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Background Overlay Detail -->
        <div class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none"></div>
    </main>

</body>
</html>