"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { login } from "../../lib/dataService";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleUseDemo = () => {
    setEmail("demo@ordo.dev");
    setPassword("password123");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 text-slate-100 sm:px-6">
      {/* Background gradients */}
      <div className="pointer-events-none absolute left-[-12%] top-[-18%] h-[52%] w-[52%] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-18%] right-[-12%] h-[52%] w-[52%] rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-block text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 transition-opacity hover:opacity-80"
          >
            Ordo.
          </Link>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-[1.9rem]">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Sign in to continue to your workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-400 backdrop-blur-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
            className="w-full h-11 rounded-xl bg-blue-600 font-semibold text-white shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] transition-all hover:bg-blue-500 hover:shadow-[0_0_25px_-5px_rgba(37,99,235,0.6)]"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 backdrop-blur-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Demo credentials
            </p>
            <button
              type="button"
              onClick={handleUseDemo}
              className="text-xs text-blue-400 hover:text-blue-300 underline font-medium cursor-pointer"
            >
              Fill Credentials
            </button>
          </div>

          <div className="flex flex-col gap-1 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Email:</span>
              <span className="text-slate-200 font-mono">demo@ordo.dev</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Password:</span>
              <span className="text-slate-200 font-mono">password123</span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
