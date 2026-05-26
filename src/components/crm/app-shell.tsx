"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Command, Search } from "lucide-react";
import { navItems } from "@/lib/crm-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(46,175,255,0.16),transparent_34%),linear-gradient(180deg,#020617_0%,#06101f_50%,#020617_100%)]" />
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-white/10 bg-black/35 px-4 py-5 backdrop-blur-xl lg:block">
        <Link href="/queue" className="flex items-center gap-3 px-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-sky-400 text-sm font-black text-slate-950">
            SS
          </div>
          <div>
            <div className="font-semibold tracking-tight">Strength Scaling</div>
            <div className="text-xs text-slate-400">SDR Operating System</div>
          </div>
        </Link>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-sky-300/12 text-sky-100 ring-1 ring-sky-300/20"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-slate-100",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-4 right-4 rounded-xl border border-sky-300/20 bg-sky-300/10 p-4">
          <Badge>Live Queue</Badge>
          <p className="mt-3 text-sm text-slate-200">37 due leads are ready for reps right now.</p>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#030712]/80 px-4 backdrop-blur-xl md:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-slate-400 md:flex md:w-96">
              <Search className="size-4" />
              Search leads, clients, reps
              <span className="ml-auto flex items-center gap-1 text-xs">
                <Command className="size-3" /> K
              </span>
            </div>
            <div className="lg:hidden">
              <div className="font-semibold">Strength Scaling</div>
              <div className="text-xs text-slate-400">CRM</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-slate-300">
              <Bell className="size-4" />
            </button>
            <div className="hidden text-right sm:block">
              <div className="text-sm font-semibold">Admin View</div>
              <div className="text-xs text-slate-400">Peyton</div>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
