import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-slate-100">
      {/* Background gradients */}
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[42%] w-[42%] rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[42%] w-[42%] rounded-full bg-purple-600/20 blur-[120px]" />
      
      <section className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        {/* Badge */}
        <div className="mb-8">
          <span className="inline-flex items-center rounded-full border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm px-4 py-1.5 text-xs font-medium tracking-wide text-blue-400 shadow-sm transition-colors hover:bg-slate-800/50 hover:text-blue-300">
            <span className="mr-2 flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            Production-style Task Management
          </span>
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text pb-2 text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Manage your work with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            Ordo.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl md:mt-10">
          A minimal task management platform for organizing projects,
          assigning tasks, tracking progress, and collaborating with your
          team in real-time.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-6">
          <Link
            href="/register"
            className="group relative flex h-14 w-full min-w-[160px] items-center justify-center rounded-xl bg-blue-600 px-8 text-base font-semibold text-white shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.7)] sm:w-auto"
          >
            Get Started
            <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <Link
            href="/login"
            className="flex h-14 w-full min-w-[160px] items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800/20 px-8 text-base font-semibold text-slate-300 backdrop-blur-md transition-all hover:border-slate-600 hover:bg-slate-800/60 hover:text-white sm:w-auto"
          >
            Sign In
          </Link>
        </div>

        {/* Floating Mockup Element */}
        <div className="mt-16 sm:mt-24 w-full max-w-4xl rounded-2xl border border-slate-700/40 bg-slate-900/50 p-2 sm:p-4 backdrop-blur-xl shadow-2xl relative overflow-hidden hidden sm:block transition-transform hover:scale-[1.02] duration-500">
           <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none"></div>
           <div className="aspect-[16/9] w-full rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center p-8">
             <div className="w-full flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="h-4 w-1/4 bg-slate-800 rounded-full"></div>
             </div>
             <div className="flex-1 w-full flex gap-4">
                <div className="w-1/4 h-full bg-slate-800/50 rounded-lg"></div>
                <div className="flex-1 h-full bg-slate-800/30 rounded-lg flex flex-col gap-4 p-4">
                   <div className="h-8 w-1/3 bg-slate-800 rounded-md"></div>
                   <div className="h-24 w-full bg-slate-800/50 rounded-md"></div>
                   <div className="h-24 w-full bg-slate-800/50 rounded-md"></div>
                </div>
             </div>
           </div>
        </div>
      </section>
    </main>
  );
}
