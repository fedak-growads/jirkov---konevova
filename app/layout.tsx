import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { property } from "@/data/property";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const typeLabel = property.type === "byt" ? "Byt" : "Nemovitost";
const propertyTitle = `${typeLabel} ${property.layout}, ${property.street}, ${property.city}`;
const formattedPrice = new Intl.NumberFormat("cs-CZ").format(property.price) + " Kč";

// Build description dynamically from property data so link previews
// (Facebook, WhatsApp, Messenger, …) always reflect the actual property.
const ownershipLabel =
  property.parameters.find((p) => p.label === "Vlastnictví")?.value || "";
const areaLabel =
  property.parameters.find((p) => p.label === "Užitná plocha")?.value || "";
const floorLabel =
  property.parameters.find((p) => p.label.startsWith("z "))
    ? property.parameters.find((p) => p.label.startsWith("z "))?.value
    : "";

const propertyDescriptionShort =
  `${typeLabel} ${property.layout}, ${areaLabel}` +
  (floorLabel ? `, ${floorLabel}` : "") +
  (ownershipLabel ? `, ${ownershipLabel.toLowerCase()} vlastnictví` : "") +
  `. ${property.city}.`;

const propertyDescriptionLong = `${propertyDescriptionShort} Nabízí ${property.agent.name} — Realiťák roku 2025.`;

export const metadata: Metadata = {
  metadataBase: new URL(`https://${property.slug}.jelencicovamarie.cz`),
  title: `${propertyTitle} – ${formattedPrice} | ${property.agent.name}`,
  description: `${propertyTitle}, cena ${formattedPrice}. ${propertyDescriptionLong}`,
  robots: { index: true, follow: true },
  openGraph: {
    title: `${propertyTitle} – ${formattedPrice}`,
    description: propertyDescriptionLong,
    locale: "cs_CZ",
    type: "website",
    images: [property.heroImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${propertyTitle} – ${formattedPrice}`,
    description: propertyDescriptionShort,
    images: [property.heroImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // enables env(safe-area-inset-*) on iOS Safari
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="cs"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        {pixelId && (
          <>
            <Script id="fb-pixel" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');fbq('track','ViewContent',{content_name:'property:${property.slug}',content_category:'realestate'});`}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        {children}
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
