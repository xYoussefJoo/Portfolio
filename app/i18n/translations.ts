export type Language = "en" | "de";

export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    journey: string;
    testimonials: string;
    contact: string;
    hireMe: string;
    role: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleGradient: string;
    intro: string;
    statProjects: string;
    statAdobe: string;
    statLanguages: string;
    ctaProjects: string;
    ctaContact: string;
  };
  about: {
    tag: string;
    titleLine1: string;
    titleGradient: string;
    description: string;
    philosophyTitle: string;
    philosophyP1: string;
    philosophyP2: string;
    langTitle: string;
    langDesc: string;
    stats: {
      years: { value: string; label: string; description: string };
      projects: { value: string; label: string; description: string };
      countries: { value: string; label: string; description: string };
      satisfaction: { value: string; label: string; description: string };
    };
    checkmarks: string[];
  };
  skills: {
    tag: string;
    titleLine1: string;
    titleGradient: string;
    description: string;
    categories: {
      adobe: string;
      brand: string;
      motion: string;
    };
    expertLevel: string;
    productionReady: string;
  };
  projects: {
    tag: string;
    titleLine1: string;
    titleGradient: string;
    description: string;
    categories: {
      all: string;
      branding: string;
      packaging: string;
      advertising: string;
      editorial: string;
    };
    inquireBtn: string;
    items: {
      id: number;
      title: string;
      description: string;
    }[];
  };
  experience: {
    tag: string;
    titleLine1: string;
    titleGradient: string;
    description: string;
    items: {
      role: string;
      company: string;
      location: string;
      period: string;
      badge: string;
      description: string;
    }[];
  };
  testimonials: {
    tag: string;
    titleLine1: string;
    titleGradient: string;
    description: string;
    items: {
      name: string;
      role: string;
      company: string;
      country: string;
      text: string;
    }[];
  };
  contact: {
    tag: string;
    titleLine1: string;
    titleGradient: string;
    description: string;
    infoTitle: string;
    directEmail: string;
    globalFootprint: string;
    languages: string;
    langValue: string;
    quoteTitle: string;
    quoteDesc: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      scopeLabel: string;
      scopePlaceholder: string;
      briefLabel: string;
      briefPlaceholder: string;
      submitBtn: string;
    };
    modal: {
      sendTo: string;
      chooseMethod: string;
      gmail: string;
      gmailDesc: string;
      defaultMail: string;
      defaultMailDesc: string;
      copy: string;
      copied: string;
      copyDesc: string;
    };
  };
  footer: {
    copyright: string;
    role: string;
    backToTop: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      journey: "Journey",
      testimonials: "Testimonials",
      contact: "Contact",
      hireMe: "Hire Me",
      role: "Graphic Designer",
    },
    hero: {
      badge: "Senior Graphic Designer & Visual Artist",
      titleLine1: "Crafting Iconic",
      titleGradient: "Visual Identities",
      intro: "I am Kero Amir. With 3+ years of experience and over +200 projects delivered across the US, Germany, France, and Egypt, I create extraordinary brand experiences powered by master-level Adobe Creative Cloud expertise.",
      statProjects: "+200 Projects Delivered",
      statAdobe: "Adobe CC Suite Specialist",
      statLanguages: "English & German Fluent",
      ctaProjects: "Explore Portfolio",
      ctaContact: "Let's Talk",
    },
    about: {
      tag: "01 // BACKGROUND & REACH",
      titleLine1: "Crafting visual identities that",
      titleGradient: "transcend global borders",
      description: "I am a Senior Graphic Designer & Visual Artist with 3+ years of international experience and +200 completed projects. I specialize in creating iconic brand identities, premium packaging, high-impact marketing visuals, and motion graphics powered by master-level Adobe Creative Cloud tools.",
      philosophyTitle: "Creative Philosophy & Global Vision",
      philosophyP1: "My design journey began with a relentless curiosity for visual balance and emotional storytelling. Over the past three years, I have collaborated with clients across the United States, Germany, France, and Egypt, developing versatile aesthetics that resonate across diverse markets.",
      philosophyP2: "Whether creating a comprehensive brand identity from scratch, designing luxury packaging, or producing animated promo assets in Adobe After Effects, I ensure every pixel speaks with intent, elegance, and purpose.",
      langTitle: "Multilingual Client Communication",
      langDesc: "Fluent in English and German (Deutsch) for seamless transatlantic and European project collaboration.",
      stats: {
        years: { value: "3+", label: "Years Experience", description: "In visual identity, branding & digital graphic design" },
        projects: { value: "+200", label: "Projects Completed", description: "Delivered for global brands, agencies & startups" },
        countries: { value: "4", label: "Countries Served", description: "Active client footprint in US, Germany, France & Egypt" },
        satisfaction: { value: "100%", label: "Satisfaction Rate", description: "Consistent 5-star delivery and client retention" },
      },
      checkmarks: [
        "Master-Level Adobe CC Craftsmanship",
        "Over 200+ Delivered Brand Assets",
        "Cross-cultural Visual Localization",
        "Fast Turnaround & Print-Ready Standards",
      ],
    },
    skills: {
      tag: "02 // TOOLKIT & MASTERY",
      titleLine1: "Adobe Creative Cloud &",
      titleGradient: "visual craft mastery",
      description: "With deep command over the industry-leading Adobe Creative suite, I transform abstract concepts into unforgettable visual masterpieces.",
      categories: {
        adobe: "Adobe Creative Cloud Mastery",
        brand: "Brand Identity & Art Direction",
        motion: "Motion & Digital Art Direction",
      },
      expertLevel: "Expert Level",
      productionReady: "100% Production Ready",
    },
    projects: {
      tag: "03 // SELECTED CREATIONS",
      titleLine1: "Curated",
      titleGradient: "portfolio",
      description: "Explore standout visual identities, 3D packaging mockups, advertising campaigns, and editorial masterpieces from over 200+ completed projects.",
      categories: {
        all: "All Projects",
        branding: "Brand Identity",
        packaging: "Packaging & 3D",
        advertising: "Ad Campaigns",
        editorial: "Editorial & Print",
      },
      inquireBtn: "Inquire Project",
      items: [
        {
          id: 1,
          title: "Aura Botanica - Luxury Organic Cosmetics",
          description: "Comprehensive visual identity, botanical packaging design, and 3D product renders in Adobe Dimension & Photoshop.",
        },
        {
          id: 2,
          title: "CyberPulse - Esports Energy Drink",
          description: "High-octane can packaging, dynamic vector illustrations in Adobe Illustrator, and 3D metallic foil finish mockup.",
        },
        {
          id: 3,
          title: "Vortex Sound - Spatial Audio Identity",
          description: "Complete visual branding, custom typographic logotype, and advertising poster series for European audiophile brand.",
        },
        {
          id: 4,
          title: "NeoHaus - Architectural Studio Book",
          description: "Editorial layout, grid architecture, typography, and premium print-ready book in Adobe InDesign for Berlin studio.",
        },
        {
          id: 5,
          title: "AeroGlide - Sustainable Footwear Campaign",
          description: "High-impact social media campaign posters, typography lockups, and motion teaser storyboards for US launch.",
        },
        {
          id: 6,
          title: "Solara Spirits - Premium Gin Packaging",
          description: "Intricate vintage-modern label illustration, custom gold foil embossed mockup, and typography for Parisian distillery.",
        },
      ],
    },
    experience: {
      tag: "04 // GLOBAL JOURNEY",
      titleLine1: "3 Years &",
      titleGradient: "international reach",
      description: "From the United States & Egypt to Germany & France — a track record of +200 successful design deliveries across the globe.",
      items: [
        {
          role: "Senior Graphic Designer & Brand Consultant",
          company: "International Creative Studio",
          location: "Berlin, Germany 🇩🇪 / Paris, France 🇫🇷 (Remote & On-site)",
          period: "2025 - Present",
          badge: "Europe Expansion",
          description: "Spearheaded visual identity systems, multilingual European packaging, and luxury brand assets for high-growth startups and heritage brands across Germany and France. Surpassed 200+ completed project milestones with 100% 5-star client satisfaction.",
        },
        {
          role: "Lead Visual Designer & Adobe CC Specialist",
          company: "Global Digital Agency & Freelance",
          location: "United States 🇺🇸 / Egypt 🇪🇬",
          period: "2024 - 2025",
          badge: "Transatlantic Reach",
          description: "Delivered 120+ comprehensive branding systems, packaging mockups, and high-converting advertising campaigns for tech and consumer brands across the US and MENA. Specialized in Adobe Photoshop, Illustrator, and After Effects motion assets.",
        },
        {
          role: "Graphic & Brand Identity Designer",
          company: "Creative Studio & Independent Practice",
          location: "United States 🇺🇸 / Egypt 🇪🇬",
          period: "2023 - 2024",
          badge: "Foundational Year",
          description: "Established core design practice, executing 50+ vector identities, corporate collateral, and editorial layouts. Developed fluid workflows across Adobe Illustrator and InDesign with rapid turnaround times.",
        },
      ],
    },
    testimonials: {
      tag: "05 // CLIENT TESTIMONIALS",
      titleLine1: "Trusted by global",
      titleGradient: "studios & brands",
      description: "Endorsements from creative directors, marketing leaders, and founders across the United States, Germany, France, and Egypt.",
      items: [
        {
          name: "Maximilian Schneider",
          role: "Creative Director",
          company: "Vanguard Studio Berlin",
          country: "Germany 🇩🇪",
          text: "Kero's precision and aesthetic sensitivity in Adobe Illustrator and Photoshop are truly world-class. His fluent German communication made collaborating across Berlin seamless. He delivered our luxury packaging on time and beyond expectations.",
        },
        {
          name: "Camille Laurent",
          role: "Head of Brand Strategy",
          company: "Élégance Paris",
          country: "France 🇫🇷",
          text: "Working with Kero on our Parisian cosmetic identity was exceptional. He translated our high-fashion brand essence into iconic 3D packaging and typography. A designer who understands international luxury standards.",
        },
        {
          name: "Brandon Hayes",
          role: "VP of Marketing",
          company: "Apex Media Group",
          country: "United States 🇺🇸",
          text: "Kero has completed over 40 graphic and motion poster deliverables for our US advertising accounts. His speed, creativity, and command of Adobe Creative Cloud are unparalleled. Always our first-choice designer.",
        },
      ],
    },
    contact: {
      tag: "06 // INITIATE COLLABORATION",
      titleLine1: "Let's design your",
      titleGradient: "next masterpiece",
      description: "Have a new brand to launch, packaging to engineer, or an advertising campaign to create? Drop a message and let's craft something unforgettable.",
      infoTitle: "Design Inquiries",
      directEmail: "Direct Email",
      globalFootprint: "Global Footprint",
      languages: "Languages",
      langValue: "English & German (Deutsch) Fluent",
      quoteTitle: "Custom Project Quote?",
      quoteDesc: "Share your design scope, timeline, and deliverables. I provide comprehensive design proposals within 24 hours.",
      form: {
        nameLabel: "Your Name",
        namePlaceholder: "e.g. Alexander Weber",
        emailLabel: "Email Address",
        emailPlaceholder: "name@company.com",
        scopeLabel: "Project Scope / Deliverables",
        scopePlaceholder: "e.g. Brand Identity, 3D Packaging, Advertising Campaign",
        briefLabel: "Project Brief & Details",
        briefPlaceholder: "Tell me about your brand, visual preferences, target audience, and timeframe...",
        submitBtn: "Send Project Brief",
      },
      modal: {
        sendTo: "Send to",
        chooseMethod: "Choose how you'd like to deliver your project brief to",
        gmail: "Gmail (Web Browser)",
        gmailDesc: "Opens Google Mail in a new browser tab",
        defaultMail: "Default Mail Client",
        defaultMailDesc: "Opens Outlook, Apple Mail, Windows Mail",
        copy: "Copy Brief Details",
        copied: "Copied to Clipboard!",
        copyDesc: "Copies form message string to clipboard",
      },
    },
    footer: {
      copyright: "All rights reserved.",
      role: "Senior Graphic Designer & Visual Artist",
      backToTop: "Back to Top",
    },
  },
  de: {
    nav: {
      home: "Startseite",
      about: "Über mich",
      skills: "Fähigkeiten",
      projects: "Projekte",
      journey: "Werdegang",
      testimonials: "Referenzen",
      contact: "Kontakt",
      hireMe: "Projekt anfragen",
      role: "Grafikdesigner",
    },
    hero: {
      badge: "Senior Grafikdesigner & Visueller Künstler",
      titleLine1: "Ikonische",
      titleGradient: "Visuelle Identitäten",
      intro: "Ich bin Kero Amir. Mit über 3 Jahren Erfahrung und mehr als 200 realisierten Projekten in den USA, Deutschland, Frankreich und Ägypten erschaffe ich außergewöhnliche Markenerlebnisse – gestützt auf meisterhafte Expertise in der gesamten Adobe Creative Cloud.",
      statProjects: "+200 Projekte Realisiert",
      statAdobe: "Adobe CC Suite Spezialist",
      statLanguages: "Fließend Englisch & Deutsch",
      ctaProjects: "Portfolio Entdecken",
      ctaContact: "Kontakt Aufnehmen",
    },
    about: {
      tag: "01 // HINTERGRUND & REICHWEITE",
      titleLine1: "Visuelle Identitäten, die",
      titleGradient: "globale Grenzen überwinden",
      description: "Ich bin Senior Grafikdesigner & Visual Artist mit über 3 Jahren internationaler Erfahrung und mehr als 200 abgeschlossenen Projekten. Meine Spezialisierung liegt in ikonischen Markenidentitäten, hochwertigem Verpackungsdesign, wirkungsstarken Marketing-Visuals und Motion Design mit den branchenführenden Adobe Creative Cloud Tools.",
      philosophyTitle: "Kreative Philosophie & Globale Vision",
      philosophyP1: "Meine Reise im Design begann mit einer tiefen Leidenschaft für visuelle Ausgewogenheit und emotionales Storytelling. In den vergangenen drei Jahren habe ich erfolgreich mit Kunden in den USA, Deutschland, Frankreich und Ägypten zusammengearbeitet und anpassungsfähige Designkonzepte entwickelt.",
      philosophyP2: "Ob ganzheitliche Corporate Identities, luxuriöse Verpackungskonzepte oder animierte Promo-Assets in Adobe After Effects – jedes visuelle Detail entsteht mit höchster Sorgfalt, Eleganz und klarem Nutzen.",
      langTitle: "Mehrsprachige Kundenbetreuung",
      langDesc: "Verhandlungssicher in Deutsch und Englisch für eine reibungslose Zusammenarbeit in der DACH-Region und international.",
      stats: {
        years: { value: "3+", label: "Jahre Erfahrung", description: "In Corporate Identity, Branding & digitalem Grafikdesign" },
        projects: { value: "+200", label: "Projekte Realisiert", description: "Erfolgreich für globale Marken, Agenturen & Startups umgesetzt" },
        countries: { value: "4", label: "Betreute Länder", description: "Aktive Kundenbasis in den USA, Deutschland, Frankreich & Ägypten" },
        satisfaction: { value: "100%", label: "Zufriedenheitsrate", description: "Konsequente 5-Sterne-Qualität und langjährige Kundenbindung" },
      },
      checkmarks: [
        "Exzellente Beherrschung der Adobe Creative Cloud",
        "Über 200+ erfolgreich gelieferte Marken-Assets",
        "Interkulturelle & zielgruppengenaue Design-Adaption",
        "Schnelle Lieferzeiten & druckfertige Industriestandards",
      ],
    },
    skills: {
      tag: "02 // WERKZEUGE & EXPERTISE",
      titleLine1: "Adobe Creative Cloud &",
      titleGradient: "visuelle Meisterklasse",
      description: "Mit tiefgreifender Beherrschung der marktführenden Adobe Creative Suite verwandle ich anspruchsvolle Konzepte in unvergessliche visuelle Meisterwerke.",
      categories: {
        adobe: "Adobe Creative Cloud Expertise",
        brand: "Brand Identity & Art Direction",
        motion: "Motion Design & Digital Art",
      },
      expertLevel: "Expertenniveau",
      productionReady: "100% Produktionsreif",
    },
    projects: {
      tag: "03 // AUSGEWÄHLTE ARBEITEN",
      titleLine1: "Kuratierte",
      titleGradient: "Arbeiten & Projekte",
      description: "Entdecken Sie herausragende Markenidentitäten, 3D-Verpackungsdesigns, Werbekampagnen und Print-Kreationen aus über 200+ erfolgreichen Projekten.",
      categories: {
        all: "Alle Arbeiten",
        branding: "Brand Identity",
        packaging: "Verpackung & 3D",
        advertising: "Werbekampagnen",
        editorial: "Editorial & Print",
      },
      inquireBtn: "Projekt anfragen",
      items: [
        {
          id: 1,
          title: "Aura Botanica - Luxus-Naturkosmetik",
          description: "Ganzheitliche Markenidentität, botanisches Verpackungsdesign und fotorealistische 3D-Renderings in Adobe Dimension & Photoshop.",
        },
        {
          id: 2,
          title: "CyberPulse - Esports Energy Drink",
          description: "Dynamisches Dosendesign, Vektorillustrationen in Adobe Illustrator und 3D-Mockups mit metallischen Folieneffekten.",
        },
        {
          id: 3,
          title: "Vortex Sound - Spatial Audio Brand",
          description: "Komplettes visuelles Branding, individuelles typografisches Logo und Werbeplakat-Serie für europäische Audiomarke.",
        },
        {
          id: 4,
          title: "NeoHaus - Architektur-Buchband",
          description: "Redaktionelles Layout, typografisches Rastersystem und hochwertiges, druckfertiges Buch in Adobe InDesign für Berliner Studio.",
        },
        {
          id: 5,
          title: "AeroGlide - Nachhaltige Sneaker-Kampagne",
          description: "Wirkungsstarke Plakate für Social-Media-Kampagnen, Typografie-Konzepte und Teaser-Storyboards für den US-Marktstart.",
        },
        {
          id: 6,
          title: "Solara Spirits - Premium Gin Verpackung",
          description: "Detaillierte Vintage-Etiketten-Illustration, Heißfolienprägung-Mockups und Typografie für Pariser Premium-Destillerie.",
        },
      ],
    },
    experience: {
      tag: "04 // INTERNATIONALER WERDEGANG",
      titleLine1: "3 Jahre &",
      titleGradient: "internationale Reichweite",
      description: "Von den USA und Ägypten bis nach Deutschland und Frankreich – eine Erfolgsbilanz von über 200 gelieferten Designprojekten weltweit.",
      items: [
        {
          role: "Senior Grafikdesigner & Brand Consultant",
          company: "Internationales Kreativstudio",
          location: "Berlin, Deutschland 🇩🇪 / Paris, Frankreich 🇫🇷 (Remote & Vor Ort)",
          period: "2025 - Heute",
          badge: "Europa-Expansion",
          description: "Entwicklung ganzheitlicher Corporate Identities, mehrsprachiger europäischer Verpackungen und Premium-Brand-Assets für wachsende Startups und traditionsreiche Marken. Meilenstein von über 200+ abgeschlossenen Projekten mit 100% 5-Sterne-Zufriedenheit erreicht.",
        },
        {
          role: "Lead Visual Designer & Adobe CC Spezialist",
          company: "Globale Digitalagentur & Freelance",
          location: "USA 🇺🇸 / Ägypten 🇪🇬",
          period: "2024 - 2025",
          badge: "Transatlantische Reichweite",
          description: "Realisierung von über 120+ Branding-Systemen, 3D-Verpackungsmockups und konversionsstarken Werbekampagnen für Technologie- und Konsumgütermarken in den USA und MENA. Spezialisierung auf Photoshop, Illustrator und After Effects.",
        },
        {
          role: "Grafik- & Markenidentitäts-Designer",
          company: "Kreativstudio & Freiberufliche Praxis",
          location: "USA 🇺🇸 / Ägypten 🇪🇬",
          period: "2023 - 2024",
          badge: "Gründungsphase",
          description: "Aufbau der professionellen Designpraxis mit über 50+ Vektor-Identitäten, Geschäftsausstattungen und Editorial-Layouts. Etablierung schneller und hochpräziser Workflows in Illustrator und InDesign.",
        },
      ],
    },
    testimonials: {
      tag: "05 // KUNDENSTIMMEN",
      titleLine1: "Geschätzt von globalen",
      titleGradient: "Studios & Marken",
      description: "Empfehlungen von Creative Directors, Marketing-Leitern und Gründern aus den USA, Deutschland, Frankreich und Ägypten.",
      items: [
        {
          name: "Maximilian Schneider",
          role: "Creative Director",
          company: "Vanguard Studio Berlin",
          country: "Deutschland 🇩🇪",
          text: "Keros Präzision und sein Gespür für visuelle Ästhetik in Adobe Illustrator und Photoshop sind absolute Spitzenklasse. Die fließende deutsche Kommunikation hat die Zusammenarbeit in Berlin enorm erleichtert. Unsere Luxusverpackungen wurden termingerecht und über allen Erwartungen geliefert.",
        },
        {
          name: "Camille Laurent",
          role: "Head of Brand Strategy",
          company: "Élégance Paris",
          country: "Frankreich 🇫🇷",
          text: "Die Zusammenarbeit mit Kero an unserem Pariser Kosmetik-Branding war herausragend. Er hat das Wesen unserer Modemarke in ikonische 3D-Verpackungen und exklusive Typografie übersetzt. Ein Designer, der internationale Luxusstandards perfekt versteht.",
        },
        {
          name: "Brandon Hayes",
          role: "VP of Marketing",
          company: "Apex Media Group",
          country: "USA 🇺🇸",
          text: "Kero hat über 40 Grafik- und Motion-Poster-Deliverables für unsere US-Werbekunden realisiert. Seine Geschwindigkeit, Kreativität und Beherrschung der Adobe Creative Cloud sind unübertroffen. Jederzeit unsere erste Wahl als Designer.",
        },
      ],
    },
    contact: {
      tag: "06 // ZUSAMMENARBEIT STARTEN",
      titleLine1: "Lassen Sie uns Ihr",
      titleGradient: "nächstes Meisterwerk gestalten",
      description: "Planen Sie einen neuen Markenauftritt, exklusives Verpackungsdesign oder eine aufmerksamkeitsstarke Kampagne? Schreiben Sie mir für ein unverbindliches Erstgespräch.",
      infoTitle: "Projektanfragen",
      directEmail: "Direkte E-Mail",
      globalFootprint: "Globale Präsenz",
      languages: "Sprachen",
      langValue: "Fließend Deutsch & Englisch",
      quoteTitle: "Individuelles Projektangebot?",
      quoteDesc: "Teilen Sie Ihren Projektumfang, Zeitrahmen und gewünschte Leistungen mit. Sie erhalten innerhalb von 24 Stunden ein detailliertes Angebot.",
      form: {
        nameLabel: "Ihr Name",
        namePlaceholder: "z. B. Maximilian Müller",
        emailLabel: "E-Mail-Adresse",
        emailPlaceholder: "name@unternehmen.de",
        scopeLabel: "Projektumfang / Gewünschte Leistungen",
        scopePlaceholder: "z. B. Brand Identity, 3D-Verpackung, Werbekampagne",
        briefLabel: "Projektbriefing & Details",
        briefPlaceholder: "Beschreiben Sie Ihre Marke, gewünschte Designsprache, Zielgruppe und den Zeitplan...",
        submitBtn: "Projektbriefing Senden",
      },
      modal: {
        sendTo: "Senden an",
        chooseMethod: "Wählen Sie, wie Sie Ihr Projektbriefing übermitteln möchten an",
        gmail: "Gmail (im Webbrowser)",
        gmailDesc: "Öffnet Google Mail in einem neuen Browser-Tab",
        defaultMail: "Standard-Mail-Programm",
        defaultMailDesc: "Öffnet Outlook, Apple Mail oder Thunderbird",
        copy: "Briefing in Zwischenablage kopieren",
        copied: "In Zwischenablage kopiert!",
        copyDesc: "Kopiert den formatierten Nachrichtentext",
      },
    },
    footer: {
      copyright: "Alle Rechte vorbehalten.",
      role: "Senior Grafikdesigner & Visueller Künstler",
      backToTop: "Nach Oben",
    },
  },
};
