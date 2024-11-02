const theme = {
    button: {
        primary: `group w-full relative overflow-hidden rounded-lg p-[1px] hover:scale-105 transition-transform duration-300`,
        primaryGradient: `absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] hover:animate-[spin_1s_linear_infinite]`,
        content: `inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950/80 px-4 py-3 text-sm font-medium backdrop-blur-xl text-white hover:text-white hover:font-bold`,
        secondary: `group w-full relative overflow-hidden rounded-lg p-[1px] hover:scale-105 transition-transform duration-300`,
        secondaryGradient: `absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00FF9D_0%,#00A2FF_50%,#00FF9D_100%)] hover:animate-[spin_1s_linear_infinite]`
    },
    card: {
        container: `relative overflow-hidden rounded-lg p-[1px] bg-slate-950`,
        gradient: `absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00FF9D_0%,#00A2FF_50%,#00FF9D_100%)]`,
        content: `relative z-10 bg-slate-950 rounded-lg p-4 backdrop-blur-3xl`
    },
    neonText: {
        title: `text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500`,
        price: `font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse`
    },
    nav: {
        container: `bg-slate-950/80 shadow-[0_0_15px_rgba(0,162,255,0.3)] backdrop-blur-xl`
    },
    animations: {
        neonPulse: `animate-[glow_2s_ease-in-out_infinite] shadow-[0_0_20px_rgba(226,203,255,0.5)]`,
        glitch: `hover:animate-[glitch_0.3s_cubic-bezier(.25,.46,.45,.94)_both]`,
        cartBadge: `animate-[pulse_1.5s_ease-in-out_infinite] bg-gradient-to-r from-[#00FF9D] to-[#00A2FF]`,
        slideIn: `animate-[slideIn_0.3s_ease-out_forwards]`
    },
    divider: {
        gradient: `h-[1px] bg-gradient-to-r from-[#00FF9D] via-[#00A2FF] to-[#E2CBFF]`
    }
}

export default theme