"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { setAuth } from "../../lib/auth";
import { mockLogin } from "../../lib/mockAuth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = mockLogin(email, password);

      setAuth(result.token, result.user);

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to sign in"
      );
    } finally {
      setLoading(false);
    }
  };

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
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Sign in to continue to your workspace.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 backdrop-blur-sm animate-pulse">
              {error}
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
            className="w-full h-12 rounded-xl bg-blue-600 font-medium text-white shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] transition-all hover:bg-blue-500 hover:shadow-[0_0_25px_-5px_rgba(37,99,235,0.6)] hover:-translate-y-0.5"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-8 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3">
            Demo credentials
          </p>

          <div className="flex flex-col gap-1.5">
            <p className="text-sm text-slate-400 flex justify-between">
              <span>Email:</span>
              <span className="text-slate-200 font-mono bg-slate-800/50 px-2 py-0.5 rounded">
                demo@ordo.dev
              </span>
            </p>
            <p className="text-sm text-slate-400 flex justify-between">
              <span>Password:</span>
              <span className="text-slate-200 font-mono bg-slate-800/50 px-2 py-0.5 rounded">
                password123
              </span>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-400">
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