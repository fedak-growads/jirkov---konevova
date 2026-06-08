"use client";

import Image from "next/image";
import { property } from "@/data/property";
import { gaEvent } from "@/lib/ga";
import Reveal from "./Reveal";

export default function Agent() {
  const { agent } = property;

  return (
    <section className="py-14 md:py-20 px-6 md:px-12 bg-bg">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal text-center mb-3">
            Vaše makléřka
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-text text-center mb-10 md:mb-12">
            {agent.name}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-2xl bg-white border border-border shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start gap-6">
              <Image
                src={agent.photo}
                alt={agent.name}
                width={120}
                height={120}
                className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="font-display text-xl text-text mb-1">{agent.name}</div>
                <div className="text-sm text-text-muted mb-4">{agent.role}</div>
                <div className="flex flex-wrap gap-2">
                  {agent.awards.map((award) => (
                    <span
                      key={award}
                      className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-full bg-teal-light text-teal-dark border border-teal-mid/40"
                    >
                      {award}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-border">
              <a
                href={agent.phoneLink}
                onClick={() => gaEvent("phone_click", { source: "agent_card", property_slug: property.slug })}
                className="group flex items-center justify-center gap-2 py-4 text-sm font-medium text-text hover:bg-bg-soft transition-colors border-b sm:border-b-0 sm:border-r border-border"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-teal">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                </svg>
                <span className="tabular-nums">{agent.phone}</span>
              </a>
              <a
                href={agent.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => gaEvent("whatsapp_click", { source: "agent_card", property_slug: property.slug })}
                className="group flex items-center justify-center gap-2 py-4 text-sm font-medium text-text hover:bg-bg-soft transition-colors border-b sm:border-b-0 sm:border-r border-border"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-teal">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                </svg>
                WhatsApp
              </a>
              <a
                href={`mailto:${agent.email}`}
                onClick={() => gaEvent("email_click", { source: "agent_card", property_slug: property.slug })}
                className="group flex items-center justify-center gap-2 py-4 text-sm font-medium text-text hover:bg-bg-soft transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-teal">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                E-mail
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
