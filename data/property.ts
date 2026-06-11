/**
 * Property data — single source of truth for this landing page.
 * Edit values here; components read from this object.
 */

export type PropertyStatus = "available" | "reserved" | "sold";
export type PropertyType = "byt" | "dum" | "pozemek" | "komercni";
export type Ownership = "osobni" | "druzstevni";

export type Parameter = { value: string; label: string };

export type Benefit = {
  icon: string;
  title: string;
  description: string;
};

export type BenefitCategory = {
  label: string;
  items: Benefit[];
};

export type POI = {
  icon: string;
  name: string;
  distance: string;
  coords?: { lat: number; lng: number };
};

export type POICategory = {
  label: string;
  items: POI[];
};

export type Photo = {
  src: string;
  alt: string;
};

export type PhotoCategory = {
  label: string;
  photos: Photo[];
};

export type WalkStep = {
  src: string;
  step: string;
  title: string;
  body: string;
};

export type FAQ = {
  q: string;
  a: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  context: string;
};

export const property = {
  // ─── Identity ──────────────────────────────────────────
  slug: "jirkov-konevova",
  status: "available" as PropertyStatus,
  type: "byt" as PropertyType,
  layout: "3+1",

  // ─── Address ──────────────────────────────────────────
  street: "Koněvova",
  city: "Jirkov",
  district: "Jirkov",
  region: "Ústecký kraj",

  // Map coordinates — Koněvova 1171, Jirkov (z Kurzy.cz)
  coords: { lat: 50.502981, lng: 13.445411 },

  // ─── Pricing ──────────────────────────────────────────
  price: 3_850_000,
  priceNote: "vč. provize realitní makléřky a kompletního právního servisu",

  // ─── Hero ─────────────────────────────────────────────
  heroTagline: "Prodej bytu 3+1 · Jirkov",
  heroTitle: "Byt 3+1\nKoněvova, Jirkov",
  heroSubtitle: "Koněvova · 2. patro · 63 m² · osobní vlastnictví",
  heroCta: "Zjistit více informací",
  heroImage: "/photos/hero-drone.jpg",
  // Slideshow v hero (swipe na mobilu, auto-rotace, Ken Burns).
  heroSlides: [
    { src: "/photos/hero-drone.jpg", alt: "Cihlový dům s výhledem na Krušné hory — letecký pohled" },
    { src: "/photos/zahrada-1.jpg", alt: "Zahrada u domu" },
    { src: "/photos/01.jpg", alt: "Obývací pokoj s jídelním koutem" },
    { src: "/photos/03.jpg", alt: "Kuchyně po rekonstrukci" },
  ],
  // Statistiky-chipsy v hero.
  heroStats: [
    { icon: "📐", label: "63 m²" },
    { icon: "🏠", label: "3+1" },
    { icon: "🧱", label: "Cihlový dům" },
    { icon: "🔨", label: "Po rekonstrukci" },
  ],

  // ─── Description ──────────────────────────────────────
  descriptionEyebrow: "O nemovitosti",
  descriptionTitle: "Byt 3+1 po rekonstrukci v nejlepší lokalitě Jirkova",
  descriptionLead:
    "Rodinný byt 3+1 o ploše 63 m² ve 2. patře cihlového domu, osobní vlastnictví. Po rekonstrukci, s balkonem a prostorným sklepem. V domě navíc možnost využití společné dílny. Jedna z nejvyhledávanějších lokalit Jirkova.",
  descriptionBlocks: [
    {
      icon: "👨‍👩‍👧‍👦",
      heading: "Pro koho je ideální",
      body: "Rodina s dětmi — tři pokoje, balkon a klidná, vyhledávaná lokalita s veškerou občanskou vybaveností na dosah. Skvělí sousedé.",
    },
    {
      icon: "📐",
      heading: "Dispozice (63 m²)",
      body: "Obývací pokoj 20,7 m², dva pokoje (12,6 a 10,2 m²), kuchyně 7,4 m², předsíň 6,3 m², koupelna 5,3 m² a šatna 2,8 m². K bytu balkon a prostorný sklep, v domě navíc možnost využití společné dílny. Půdorys v galerii.",
    },
    {
      icon: "🧱",
      heading: "Cihlový dům a komfort",
      body: "Cihlová stavba — lepší akustika i tepelná pohoda než panelové domy. Vytápění i ohřev vody plynem. Byt je po rekonstrukci, ve výborném stavu.",
    },
    {
      icon: "🪟",
      heading: "Balkon a úložný prostor",
      body: "K bytu patří balkon pro venkovní posezení, prostorný sklep a vestavěná šatna 2,8 m². Místa na věci i odpočinek je dost.",
    },
    {
      icon: "📍",
      heading: "Nejlepší lokalita Jirkova",
      body: "Jedna z nejvyhledávanějších adres ve městě. Obchody, školy i centrum v docházkové vzdálenosti, Chomutov ~5 min autem. Klidné, zelené okolí se skvělými sousedy.",
    },
  ],

  // ─── Matterport ───────────────────────────────────────
  matterport: {
    enabled: true,
    embedId: "gGu3p1KgWSf",
    title: "Virtuální prohlídka bytu Koněvova, Jirkov",
  },

  // ─── Video walkthrough ─────────────────────────────────
  // Video je v procesu — po dotočení doplnit YouTube ID nebo MP4 cestu
  // a flipnout enabled: true.
  video: {
    enabled: false,
    youtubeId: "",
    src: "/videos/jirkov-konevova.mp4",
    poster: "/videos/jirkov-konevova-poster.jpg",
    title: "Videoprohlídka bytu Koněvova, Jirkov",
  },

  // ─── Parameters ───────────────────────────────────────
  parameters: [
    { value: "63 m²", label: "Užitná plocha" },
    { value: "2. patro", label: "cihlový dům" },
    { value: "3+1", label: "Dispozice" },
    { value: "Osobní", label: "Vlastnictví" },
    { value: "Balkon", label: "+ prostorný sklep" },
    { value: "Dílna", label: "možnost využití v domě" },
    { value: "1 054 Kč", label: "Fond oprav / měsíc" },
    { value: "Šatna", label: "vestavěná · 2,8 m²" },
  ] as Parameter[],

  // ─── Benefits (3 categories) ──────────────────────────
  benefitCategories: [
    {
      label: "Lokalita",
      items: [
        {
          icon: "📍",
          title: "Nejlepší lokalita Jirkova",
          description: "Jedna z nejvyhledávanějších adres ve městě — klid i dostupnost zároveň.",
        },
        {
          icon: "🛒",
          title: "Vybavenost na dosah",
          description: "Obchody, školy, lékaři i MHD v docházkové vzdálenosti.",
        },
        {
          icon: "🤝",
          title: "Skvělí sousedé",
          description: "Klidný, udržovaný cihlový dům s dobrými mezilidskými vztahy.",
        },
      ],
    },
    {
      label: "Bydlení",
      items: [
        {
          icon: "🧱",
          title: "Cihlový dům",
          description: "Lepší akustika a tepelná pohoda než panel — a vyšší dlouhodobá hodnota.",
        },
        {
          icon: "🔨",
          title: "Po rekonstrukci",
          description: "Byt ve výborném stavu — nastěhujete se bez dalších investic.",
        },
        {
          icon: "🪟",
          title: "Balkon",
          description: "Venkovní prostor přímo u bytu.",
        },
        {
          icon: "🧰",
          title: "Prostorný sklep + dílna v domě",
          description: "K bytu náleží prostorný sklep. V domě je navíc možnost využití společné dílny — kutilové ocení.",
        },
      ],
    },
    {
      label: "Investice",
      items: [
        {
          icon: "📜",
          title: "Osobní vlastnictví",
          description: "Žádné komplikace s družstvem — snadná hypotéka, snadný převod.",
        },
        {
          icon: "🏦",
          title: "Nízký fond oprav",
          description: "Jen 1 054 Kč/měsíc — výrazně méně než u většiny bytů této velikosti.",
        },
        {
          icon: "💡",
          title: "Nízké náklady na provoz",
          description: "Cihla drží teplo, fond oprav jen 1 054 Kč/měsíc, vytápění i ohřev vody úsporným plynem.",
        },
      ],
    },
  ] as BenefitCategory[],

  // ─── Mortgage Calculator ──────────────────────────────
  mortgage: {
    defaultDownPaymentPct: 20,
    defaultTermYears: 25,
    defaultRatePct: 4.9,
  },

  // ─── Monthly running costs (SVJ fees) ─────────────────
  // 1 054 Kč/měs — fond oprav. Vytápění a ohřev vody plynem
  // (~28 143 Kč/rok pro 4člennou rodinu) jsou samostatné náklady.
  monthlyFees: {
    enabled: true,
    amount: 1054,
    context: "fond oprav · fixní měsíční náklad",
    note: "Fond oprav.",
  },

  // ─── Walkthrough (cinematic "procházka bytem") ────────
  // Vyplní se po nahrání fotek — zatím placeholder pořadí.
  walkthrough: {
    enabled: true,
    eyebrow: "Procházka bytem",
    title: "Pojďte dál — projděte si byt jako doma",
    steps: [
      {
        src: "/photos/10.jpg",
        step: "Když vejdete",
        title: "Předsíň · 6,3 m²",
        body: "Vstup s úložným prostorem — a hned je vidět světlý obývací pokoj.",
      },
      {
        src: "/photos/01.jpg",
        step: "Hlavní prostor",
        title: "Obývací pokoj · 20,7 m²",
        body: "Srdce bytu po rekonstrukci — prostor pro gauč, jídelní stůl i celou rodinu.",
      },
      {
        src: "/photos/03.jpg",
        step: "Tady se vaří",
        title: "Kuchyně · 7,4 m²",
        body: "Kuchyně po rekonstrukci s vestavěnými spotřebiči, bílý cihlový obklad.",
      },
      {
        src: "/photos/05.jpg",
        step: "Klidný konec dne",
        title: "Ložnice · 12,6 m²",
        body: "Klidný pokoj s výhledem do zeleně. Cihlový dům = ticho a tepelná pohoda.",
      },
      {
        src: "/photos/06.jpg",
        step: "Pro děti",
        title: "Dětský pokoj · 10,2 m²",
        body: "Hotový dětský pokoj — nebo pracovna a pokoj pro hosty.",
      },
      {
        src: "/photos/08.jpg",
        step: "Každé ráno",
        title: "Koupelna · 5,3 m²",
        body: "Po rekonstrukci — vana, dřevěné obklady. K bytu i šatna 2,8 m².",
      },
      {
        src: "/photos/balkon-1.jpg",
        step: "Ranní káva",
        title: "Balkon",
        body: "Venkovní prostor přímo u bytu s výhledem do zeleně.",
      },
    ] as WalkStep[],
  },

  // ─── Gallery ──────────────────────────────────────────
  photoCategories: [
    {
      label: "Interiér",
      photos: [
        { src: "/photos/01.jpg", alt: "Obývací pokoj s jídelním koutem" },
        { src: "/photos/02.jpg", alt: "Obývací pokoj — pohled na sedací soupravu" },
        { src: "/photos/03.jpg", alt: "Kuchyně po rekonstrukci" },
        { src: "/photos/04.jpg", alt: "Kuchyně — spotřebiče" },
        { src: "/photos/05.jpg", alt: "Ložnice s výhledem do zeleně" },
        { src: "/photos/06.jpg", alt: "Dětský pokoj" },
        { src: "/photos/07.jpg", alt: "Druhý dětský pokoj / pracovna" },
        { src: "/photos/08.jpg", alt: "Koupelna po rekonstrukci" },
        { src: "/photos/09.jpg", alt: "Koupelna — vana a WC" },
        { src: "/photos/10.jpg", alt: "Předsíň" },
      ],
    },
    {
      label: "Balkon a zahrada",
      photos: [
        { src: "/photos/balkon-1.jpg", alt: "Balkon s výhledem do zeleně" },
        { src: "/photos/zahrada-1.jpg", alt: "Zahrada u domu" },
        { src: "/photos/zahrada-2.jpg", alt: "Zelená plocha u domu" },
        { src: "/photos/zahrada-3.jpg", alt: "Zahrada s pergolou" },
      ],
    },
    {
      label: "Exteriér a okolí",
      photos: [
        { src: "/photos/hero-drone.jpg", alt: "Cihlový dům s výhledem na Krušné hory — letecký pohled" },
        { src: "/photos/exterier-1.jpg", alt: "Cihlový dům Koněvova, Jirkov" },
        { src: "/photos/exterier-3.jpg", alt: "Letecký pohled na dům a okolí" },
        { src: "/photos/exterier-2.jpg", alt: "Letecký pohled na dům a okolí" },
      ],
    },
    {
      label: "Půdorys",
      photos: [
        { src: "/photos/pudorys.jpg", alt: "Půdorys bytu — 63 m², 3+1" },
      ],
    },
  ] as PhotoCategory[],

  // ─── Location POI ─────────────────────────────────────
  // TODO: ověřit přesné vzdálenosti od Koněvovy v Jirkově
  poiCategories: [
    {
      label: "Obchody a služby",
      items: [
        { icon: "🛒", name: "Tesco", distance: "~450 m · 6 min pěšky", coords: { lat: 50.4995686, lng: 13.4448817 } },
        { icon: "📮", name: "Česká pošta", distance: "~350 m · 5 min pěšky", coords: { lat: 50.5002503, lng: 13.4471567 } },
        { icon: "💊", name: "Lékárna", distance: "v centru Jirkova" },
        { icon: "🏥", name: "Zdravotní středisko", distance: "v dosahu" },
      ],
    },
    {
      label: "Školy",
      items: [
        { icon: "🏫", name: "Základní škola", distance: "~10 min pěšky", coords: { lat: 50.5029428, lng: 13.4343995 } },
        { icon: "👶", name: "Mateřská škola", distance: "v dosahu pěšky" },
      ],
    },
    {
      label: "Doprava a centrum",
      items: [
        { icon: "🏛", name: "Náměstí Dr. E. Beneše", distance: "~400 m · 5 min pěšky · centrum", coords: { lat: 50.5000609, lng: 13.4480268 } },
        { icon: "🌳", name: "Městský park", distance: "v dosahu pěšky" },
        { icon: "🚌", name: "Zastávka MHD", distance: "v dosahu" },
        { icon: "🚗", name: "Chomutov", distance: "~5 km · 10 min autem" },
      ],
    },
  ] as POICategory[],

  // ─── Agent (Marie) ────────────────────────────────────
  agent: {
    name: "Marie Rákos Jelenčičová",
    role: "Realitní makléřka · Chomutov, Jirkov a okolí",
    photo: "/images/marie-portret.jpg",
    phone: "+420 731 579 550",
    phoneLink: "tel:+420731579550",
    whatsappLink: "https://wa.me/420731579550",
    email: "marie.jelencicova@orionis.cz",
    awards: [
      "★ Realiťák roku 2025",
      "1. místo · Ústecký kraj",
      "1. místo · okres Chomutov",
    ],
  },

  // ─── Social proof ─────────────────────────────────────
  testimonials: [
    {
      quote:
        "Vše zařídila — od vyklizení bytu, přes jeho předání až po převody energií. Její lidský přístup a profesionalita mi celý proces nesmírně usnadnily. Vřele doporučuji.",
      author: "Olga Tomovová",
      context: "Prodej bytu",
    },
    {
      quote:
        "Profesionální, rychlý a hlavně ochotný přístup. Když jsem měl dotaz, vše vysvětlila — a pomohla i s věcmi, které byly nad rámec naší spolupráce. Po celou dobu jsem mohl být v naprostém klidu.",
      author: "Turčík",
      context: "Prodej nemovitosti",
    },
    {
      quote:
        "S paní Jelenčičovou jsem spolupracoval už podruhé. Během pár dní bylo vše vyřešené a já prakticky nemusel nic řešit. Pokud budu v budoucnu prodávat, obrátím se jedině na ni.",
      author: "Tom Greiner",
      context: "Opakovaná spolupráce · Prodej bytu",
    },
  ] as Testimonial[],

  // ─── FAQ ──────────────────────────────────────────────
  faq: [
    {
      q: "Jak je to s hypotékou na osobní vlastnictví?",
      a: "Osobní vlastnictví je pro hypotéku ideální — banka může nemovitost zastavit přímo, sazby jsou typicky nižší než u družstevních bytů. Marie spolupracuje s hypoteční poradkyní, která zdarma porovná nabídky bank a připraví výpočet na míru. Zaškrtněte v poptávce „Chci řešit i hypotéku\".",
    },
    {
      q: "Jaké jsou měsíční a roční náklady na provoz?",
      a: "Fond oprav je 1 054 Kč/měsíc. Vytápění a ohřev vody jsou plynem — pro čtyřčlennou rodinu s malými dětmi to vychází zhruba 28 143 Kč ročně. Konkrétní spotřebu probereme na prohlídce.",
    },
    {
      q: "Mohu přijít na prohlídku ještě tento týden?",
      a: "Ano. Stačí vyplnit formulář — Marie vám obvykle do 30 minut zavolá a domluvíme termín, který vám vyhovuje. Prohlídky se snažíme domluvit v co nejkratším čase.",
    },
  ] as FAQ[],
} as const;

export type Property = typeof property;
