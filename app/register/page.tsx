import Link from "next/link";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold">
            Ordo
          </Link>

          <h1 className="mt-6 text-3xl font-bold">Create your account</h1>

          <p className="mt-2 text-slate-400">
            Start organizing your work with Ordo.
          </p>
        </div>

        <form className="space-y-5">
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

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
