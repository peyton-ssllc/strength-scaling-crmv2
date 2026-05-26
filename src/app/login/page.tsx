import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#030712] px-4 text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(46,175,255,0.18),transparent_38%),linear-gradient(180deg,#020617_0%,#06101f_55%,#020617_100%)]" />
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-sky-400 text-sm font-black text-slate-950">
            SS
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Strength Scaling CRM</h1>
            <p className="text-sm text-slate-400">Internal SDR operating system</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-300">Email</span>
            <input
              className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-black/25 px-3 text-sm outline-none ring-sky-300/20 placeholder:text-slate-600 focus:ring-4"
              placeholder="rep@strengthscaling.com"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-300">Password</span>
            <input
              type="password"
              className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-black/25 px-3 text-sm outline-none ring-sky-300/20 placeholder:text-slate-600 focus:ring-4"
              placeholder="••••••••"
            />
          </label>
        </div>

        <Link
          href="/queue"
          className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-sky-400 px-4 text-sm font-semibold text-slate-950 shadow-[0_0_28px_rgba(46,175,255,0.28)] transition hover:bg-sky-300"
        >
          Continue to My Queue <ArrowRight className="size-4" />
        </Link>
      </Card>
    </main>
  );
}
