import Link from "next/link";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-700/50 bg-slate-900/60 p-8 backdrop-blur-xl shadow-2xl">
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="inline-block text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 hover:opacity-80 transition-opacity"
          >
            Ordo.
          </Link>

          <h1 className="mt-8 text-2xl font-bold tracking-tight text-white">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Start organizing your work with Ordo.
          </p>
        </div>

        <form className="space-y-6">
          <Input
            id="name"
            label="Name"
            type="text"
            placeholder="John Doe"
            required
          />

          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            required
          />

          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl bg-blue-600 font-medium text-white shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] transition-all hover:bg-blue-500 hover:shadow-[0_0_25px_-5px_rgba(37,99,235,0.6)] hover:-translate-y-0.5"
          >
            Create Account
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
