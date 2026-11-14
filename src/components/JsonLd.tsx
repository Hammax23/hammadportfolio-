import { site } from "@/data/site";

export function JsonLd() {
  const sameAs = [site.upwork].filter(Boolean);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.fullName,
    alternateName: site.name,
    url: site.url,
    image: `${site.url}/images/hammad-portrait.png`,
    jobTitle: site.role,
    description: site.seo.description,
    email: site.email,
    telephone: "+923004403622",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    worksFor: {
      "@type": "Organization",
      name: "Canadian Corporation",
    },
    hasOccupation: site.workHistory.map((job) => ({
      "@type": "Occupation",
      name: job.role,
      occupationLocation: {
        "@type": "City",
        name: "Lahore",
      },
      experienceRequirements: "6+ years",
      occupationLocationType: "https://schema.org/TelecommuteLocation",
      responsibilities: job.summary,
      description: `${job.role} at ${job.company} (${job.start} to ${job.end})`,
    })),
    knowsAbout: [
      "Next.js",
      "Laravel",
      "React Native",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Live Sockets",
      "SaaS",
      "API Development",
    ],
    sameAs,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: `${site.fullName} Portfolio`,
    alternateName: "hammadiftikhar.com",
    description: site.seo.description,
    publisher: { "@id": `${site.url}/#person` },
    inLanguage: "en",
    hasPart: [
      { "@type": "WebPage", "@id": `${site.url}/`, name: "Home", url: site.url },
      ...site.nav.map((item) => ({
        "@type": "WebPage",
        "@id": `${site.url}${item.href}`,
        name: item.label,
        url: `${site.url}${item.href}`,
      })),
    ],
  };

  const siteNav = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": `${site.url}/#navigation`,
    name: "Main navigation",
    hasPart: site.nav.map((item) => ({
      "@type": "WebPage",
      name: item.label,
      url: `${site.url}${item.href}`,
    })),
  };

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${site.url}/#profilepage`,
    url: site.url,
    name: site.seo.title,
    description: site.seo.description,
    mainEntity: { "@id": `${site.url}/#person` },
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#person` },
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#service`,
    name: `${site.fullName} Full Stack Engineering`,
    url: site.url,
    image: `${site.url}/images/hammad-portrait.png`,
    description: site.seo.description,
    provider: { "@id": `${site.url}/#person` },
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "AdministrativeArea", name: "Remote Worldwide" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: site.url,
      servicePhone: "+923004403622",
    },
    serviceType: [
      "Full Stack Development",
      "Web Application Development",
      "Mobile App Development",
      "API Development",
      "SaaS Development",
    ],
  };

  const projectList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${site.url}/#projects`,
    name: "Selected projects by Hammad Iftikhar",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: site.projects.length,
    itemListElement: site.projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        image: `${site.url}${project.image}`,
        keywords: project.stack.join(", "),
        creator: { "@id": `${site.url}/#person` },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNav) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectList) }}
      />
    </>
  );
}
