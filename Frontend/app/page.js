import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#0b1020] dark:to-[#07101a] text-gray-900 dark:text-gray-100">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-violet-600 flex items-center justify-center text-white font-bold">F</div>
            <div className=" sm:block">
              <div className="text-lg font-semibold">Freelenso</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Develop By DevSyntra</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm hover:underline">Features</Link>
            <Link href="#pricing" className="text-sm hover:underline">Pricing</Link>
            <Link href="#contact" className="text-sm hover:underline">Contact</Link>
            <Link href="/auth" className="ml-2 px-4 py-2 rounded-md bg-gradient-to-r from-sky-400 to-violet-600 text-white text-sm font-semibold shadow">Get Started</Link>
          </nav>

          <div className="md:hidden">
            <Link href="/auth" className="px-3 py-2 rounded-md bg-slate-800 text-white text-sm">Start</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">Run your freelance business — <span className="text-sky-500">projects, clients</span> and <span className="text-violet-500">invoices</span> in one place</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl">Freelenso helps freelancers and small teams organize work, communicate with clients, and get paid faster. Simple workflow, beautiful UI and powerful automations.</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/auth" className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-sky-400 to-violet-600 text-white font-semibold shadow hover:scale-[1.01] transition">Get started — It&apos;s free</Link>
              <a href="#features" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200">Learn more</a>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="text-sm">
                <div className="font-semibold">Trusted by</div>
                <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">Agencies</div>
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">Studios</div>
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">Freelancers</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full h-80 sm:h-96 lg:h-[420px] rounded-xl overflow-hidden shadow-lg bg-white/60 dark:bg-gradient-to-br dark:from-[#071421] dark:via-[#081621]">
            <Image src="/freelenso.png" 
              alt="dashboard mockup" 
              fill 
              className="object-fill" 
              sizes="(max-width: 1024px) 100vw, 50vw" 
              priority />
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mt-16">
          <h2 className="text-2xl font-semibold">Powerful features for freelancers</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">Everything you need to run projects and manage clients — without the clutter.</p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-white dark:bg-[#0f1724] rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="text-2xl font-bold mb-2">📁 Projects</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Organize tasks, milestones, deadlines and budgets with a simple project view.</div>
            </div>
            <div className="p-5 bg-white dark:bg-[#0f1724] rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="text-2xl font-bold mb-2">👥 Clients</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Store client details, contacts, and communication history for quick access.</div>
            </div>
            <div className="p-5 bg-white dark:bg-[#0f1724] rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="text-2xl font-bold mb-2">📄 Invoices</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Create, send and track invoices. Auto-generate numbers and PDF exports.</div>
            </div>
            <div className="p-5 bg-white dark:bg-[#0f1724] rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="text-2xl font-bold mb-2">📅 Calendar</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Keep deadlines and meetings in sync — never miss a due date again.</div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mt-12">
          <h2 className="text-2xl font-semibold">Pricing</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">Simple plans that scale with your freelance business.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-white dark:bg-[#071427] border border-gray-100 dark:border-gray-800 text-center">
              <div className="text-sm font-semibold">Free</div>
              <div className="text-2xl font-bold mt-2">₹0</div>
              <div className="text-xs text-gray-500 mt-2">Everything freelancers need</div>
              <Link href={'/auth'}><button className="mt-4 px-4 py-2 bg-sky-500 text-white rounded">Start Free</button></Link> 
            </div>

            {/* <div className="p-6 rounded-lg bg-white dark:bg-[#071427] border border-gray-100 dark:border-gray-800 text-center">
              <div className="text-sm font-semibold">Pro</div>
              <div className="text-2xl font-bold mt-2">₹69 / mo</div>
              <div className="text-xs text-gray-500 mt-2">Everything freelancers need With AI</div>
              <button className="mt-4 px-4 py-2 bg-violet-600 text-white rounded">coming soon...</button>
            </div> */}

            <div className="p-6 rounded-lg bg-white dark:bg-[#071427] border border-gray-100 dark:border-gray-800 text-center">
              <div className="text-sm font-semibold">Agency</div>
              <div className="text-2xl font-bold mt-2">Contact</div>
              <div className="text-xs text-gray-500 mt-2">Custom for teams</div>
              <button className="mt-4 px-4 py-2 border border-gray-200 rounded">Contact Sales</button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 bg-gradient-to-r from-sky-50 to-violet-50 dark:from-[#06111a] dark:to-[#081226] p-8 rounded-lg">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold">Ready to organize your freelance business?</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Start with the free plan and upgrade as you scale.</p>
            {/* <div className="mt-4 flex gap-4">
              <Link href="/auth" className="px-6 py-3 bg-gradient-to-r from-sky-400 to-violet-600 text-white rounded">Get started</Link>
              <a href="#pricing" className="px-6 py-3 border rounded">See plans</a>
            </div> */}
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="mt-12 py-8 text-sm text-gray-500">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div>© {new Date().getFullYear()} Freelenso — Built for freelancers</div>
            <div className="flex gap-4">
              <Link href="/">Privacy</Link>
              <Link href="/">Terms</Link>
              <Link href="/">Contact</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
