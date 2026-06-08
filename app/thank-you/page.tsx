import type { Metadata } from "next";
import Link from "next/link";
import { property } from "@/data/property";

export const metadata: Metadata = {
  title: `Děkuji za poptávku | ${property.agent.name}`,
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-20 bg-bg-soft">
      <div className="max-w-xl w-full bg-white border border-border rounded-2xl p-8 md:p-12 text-center shadow-sm">
        <div className="mx-auto w-14 h-14 rounded-full bg-teal-light flex items-center justify-center mb-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-7 h-7 text-teal"
          >
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="font-display text-3xl md:text-4xl text-text mb-4">
          Děkuji za poptávku
        </h1>

        <p className="text-text-muted leading-relaxed mb-2">
          Vaši zprávu jsem dostala a brzy se vám ozvu —
          obvykle <strong className="text-text">do 30 minut</strong> v pracovní době.
        </p>

        <p className="text-sm text-text-muted leading-relaxed mb-8">
          Pokud je věc urgentní, můžete mi rovnou zavolat na{" "}
          <a
            href={property.agent.phoneLink}
            className="text-teal hover:text-teal-dark font-medium"
          >
            {property.agent.phone}
          </a>
          .
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-teal transition-colors"
        >
          ← Zpět na nabídku bytu
        </Link>
      </div>
    </main>
  );
}
