import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('SEO Meta Tags', () => {
  let layoutContent: string;

  beforeAll(() => {
    layoutContent = readFileSync(join(__dirname, '../src/layouts/Layout.astro'), 'utf-8');
  });

  it('should have a meta description tag', () => {
    expect(layoutContent).toContain('meta name="description"');
  });

  it('should have a viewport meta tag', () => {
    expect(layoutContent).toContain('meta name="viewport"');
    expect(layoutContent).toContain('initial-scale');
  });

  it('should have robots meta tag allowing indexing with extended directives', () => {
    expect(layoutContent).toContain('meta name="robots"');
    expect(layoutContent).toContain('index');
    expect(layoutContent).toContain('follow');
    expect(layoutContent).toContain('max-image-preview:large');
    expect(layoutContent).toContain('max-snippet:-1');
    expect(layoutContent).toContain('max-video-preview:-1');
  });

  it('should NOT have a keywords meta tag (Google does not use it)', () => {
    expect(layoutContent).not.toContain('meta name="keywords"');
  });

  it('should NOT have a generator meta tag (security best practice)', () => {
    expect(layoutContent).not.toContain('meta name="generator"');
  });

  it('should have author meta tag', () => {
    expect(layoutContent).toContain('meta name="author"');
    expect(layoutContent).toContain('Patricio Betancourt');
  });

  it('should have canonical link tag', () => {
    expect(layoutContent).toContain('link rel="canonical"');
  });

  it('should have hreflang alternate links', () => {
    expect(layoutContent).toContain('link rel="alternate" hreflang="es"');
    expect(layoutContent).toContain('link rel="alternate" hreflang="en"');
    expect(layoutContent).toContain('link rel="alternate" hreflang="x-default"');
  });

  it('should have Open Graph meta tags', () => {
    expect(layoutContent).toContain('meta property="og:type"');
    expect(layoutContent).toContain('meta property="og:locale"');
    expect(layoutContent).toContain('meta property="og:site_name"');
    expect(layoutContent).toContain('meta property="og:url"');
    expect(layoutContent).toContain('meta property="og:title"');
    expect(layoutContent).toContain('meta property="og:description"');
    expect(layoutContent).toContain('meta property="og:image"');
  });

  it('should have Open Graph image dimensions', () => {
    expect(layoutContent).toContain('meta property="og:image:width"');
    expect(layoutContent).toContain('meta property="og:image:height"');
  });

  it('should have Open Graph image alt text', () => {
    expect(layoutContent).toContain('meta property="og:image:alt"');
  });

  it('should have Twitter Card meta tags', () => {
    expect(layoutContent).toContain('meta name="twitter:card"');
    expect(layoutContent).toContain('summary_large_image');
    expect(layoutContent).toContain('meta name="twitter:url"');
    expect(layoutContent).toContain('meta name="twitter:title"');
    expect(layoutContent).toContain('meta name="twitter:description"');
    expect(layoutContent).toContain('meta name="twitter:image"');
  });

  it('should have Twitter image alt text', () => {
    expect(layoutContent).toContain('meta name="twitter:image:alt"');
  });

  it('should have JSON-LD structured data', () => {
    expect(layoutContent).toContain('application/ld+json');
    expect(layoutContent).toContain('@context');
    expect(layoutContent).toContain('https://schema.org');
  });

  it('should have JSON-LD Person structured data', () => {
    expect(layoutContent).toContain('"@type": "Person"');
    expect(layoutContent).toContain('"jobTitle"');
    expect(layoutContent).toContain('"sameAs"');
    expect(layoutContent).toContain('github.com');
    expect(layoutContent).toContain('linkedin.com');
  });

  it('should have JSON-LD WebSite structured data', () => {
    expect(layoutContent).toContain('"@type": "WebSite"');
  });

  it('should have JSON-LD Organization structured data', () => {
    expect(layoutContent).toContain('"@type": "Organization"');
  });

  it('should include Vercel Analytics', () => {
    expect(layoutContent).toContain('@vercel/analytics');
    expect(layoutContent).toContain('Analytics');
  });

  it('should include Vercel Speed Insights', () => {
    expect(layoutContent).toContain('@vercel/speed-insights');
    expect(layoutContent).toContain('SpeedInsights');
  });

  it('should have theme-color meta tag', () => {
    expect(layoutContent).toContain('meta name="theme-color"');
  });

  it('should set lang attribute dynamically', () => {
    expect(layoutContent).toContain('html lang={lang}');
  });

  it('should have preconnect links for fonts', () => {
    expect(layoutContent).toContain('preconnect');
    expect(layoutContent).toContain('fonts.googleapis.com');
    expect(layoutContent).toContain('fonts.gstatic.com');
  });

  it('should have PWA meta tags for mobile browsers', () => {
    expect(layoutContent).toContain('meta name="apple-mobile-web-app-capable"');
    expect(layoutContent).toContain('meta name="apple-mobile-web-app-status-bar-style"');
    expect(layoutContent).toContain('meta name="apple-mobile-web-app-title"');
  });

  it('should have multiple favicon formats', () => {
    expect(layoutContent).toContain('link rel="icon" type="image/png"');
    expect(layoutContent).toContain('link rel="icon" type="image/svg+xml"');
  });

  it('should have msapplication-TileColor for Windows tiles', () => {
    expect(layoutContent).toContain('meta name="msapplication-TileColor"');
  });

  it('should have email: prefix in JSON-LD Person email', () => {
    expect(layoutContent).toContain('"email": "mailto:patobetan8@gmail.com"');
  });

  it('should have sameAs in JSON-LD Organization', () => {
    // Organization should also have sameAs for social links
    const orgSection = layoutContent.substring(
      layoutContent.indexOf('"@type": "Organization"'),
      layoutContent.indexOf('"@type": "Person"')
    );
    expect(orgSection).toContain('sameAs');
  });
});

describe('Robots.txt', () => {
  let robotsContent: string;

  beforeAll(() => {
    const publicDir = join(__dirname, '../public');
    robotsContent = readFileSync(join(publicDir, 'robots.txt'), 'utf-8');
  });

  it('should allow all user agents', () => {
    expect(robotsContent).toContain('User-agent: *');
    expect(robotsContent).toContain('Allow: /');
  });

  it('should reference sitemap URL', () => {
    expect(robotsContent).toContain('Sitemap:');
    expect(robotsContent).toContain('sitemap.xml');
  });

  it('should disallow API paths', () => {
    expect(robotsContent).toContain('Disallow: /api/');
  });

  it('should have proper formatting with comments', () => {
    expect(robotsContent).toContain('#');
  });
});

describe('Sitemap', () => {
  let sitemapContent: string;

  beforeAll(() => {
    const publicDir = join(__dirname, '../public');
    sitemapContent = readFileSync(join(publicDir, 'sitemap.xml'), 'utf-8');
  });

  it('should have proper XML declaration', () => {
    expect(sitemapContent).toContain('<?xml');
    expect(sitemapContent).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  });

  it('should include both language versions', () => {
    expect(sitemapContent).toContain('patriciobet.dev/');
    expect(sitemapContent).toContain('patriciobet.dev/en/');
  });

  it('should have hreflang alternates', () => {
    expect(sitemapContent).toContain('xhtml:link');
    expect(sitemapContent).toContain('hreflang="es"');
    expect(sitemapContent).toContain('hreflang="en"');
    expect(sitemapContent).toContain('hreflang="x-default"');
  });

  it('should have priority and changefreq values', () => {
    expect(sitemapContent).toContain('<priority>');
    expect(sitemapContent).toContain('<changefreq>');
  });

  it('should have lastmod dates', () => {
    expect(sitemapContent).toContain('<lastmod>');
  });
});

describe('Astro Configuration', () => {
  let configContent: string;

  beforeAll(() => {
    configContent = readFileSync(join(__dirname, '../astro.config.mjs'), 'utf-8');
  });

  it('should have site configured', () => {
    expect(configContent).toContain("site: 'https://patriciobet.dev'");
  });
});

describe('Image SEO', () => {
  let projectsContent: string;

  beforeAll(() => {
    projectsContent = readFileSync(join(__dirname, '../src/components/Projects.astro'), 'utf-8');
  });

  it('should have width and height attributes on project images', () => {
    expect(projectsContent).toContain('width="400"');
    expect(projectsContent).toContain('height="250"');
  });

  it('should have lazy loading on project images', () => {
    expect(projectsContent).toContain('loading="lazy"');
  });

  it('should have alt text on project images', () => {
    expect(projectsContent).toContain('alt=');
  });
});

describe('Favicon', () => {
  it('should have an SVG favicon', () => {
    const publicDir = join(__dirname, '../public');
    const faviconSvg = join(publicDir, 'favicon.svg');
    const content = readFileSync(faviconSvg, 'utf-8');
    expect(content).toContain('<svg');
    expect(content).toContain('viewBox');
  });
});

describe('Semantic HTML Structure', () => {
  let allComponents: string;

  beforeAll(() => {
    const componentsDir = join(__dirname, '../src/components');
    const files = ['Hero.astro', 'Projects.astro', 'About.astro', 'Skills.astro', 'Contact.astro', 'Header.astro', 'Footer.astro'];
    allComponents = files
      .map(f => readFileSync(join(componentsDir, f), 'utf-8'))
      .join('\n');
  });

  it('should use semantic section elements with aria-labelledby', () => {
    expect(allComponents).toContain('aria-labelledby');
  });

  it('should have proper heading hierarchy', () => {
    // Hero should have h1
    const heroContent = readFileSync(join(__dirname, '../src/components/Hero.astro'), 'utf-8');
    expect(heroContent).toContain('<h1');
    // Other sections should have h2
    ['Projects', 'About', 'Skills', 'Contact'].forEach(section => {
      const content = readFileSync(join(__dirname, `../src/components/${section}.astro`), 'utf-8');
      expect(content).toContain('h2');
    });
  });

  it('should use proper ARIA roles', () => {
    const headerContent = readFileSync(join(__dirname, '../src/components/Header.astro'), 'utf-8');
    const footerContent = readFileSync(join(__dirname, '../src/components/Footer.astro'), 'utf-8');
    expect(headerContent).toContain('role="banner"');
    expect(footerContent).toContain('role="contentinfo"');
  });

  it('should have aria-label on navigation elements', () => {
    const headerContent = readFileSync(join(__dirname, '../src/components/Header.astro'), 'utf-8');
    const footerContent = readFileSync(join(__dirname, '../src/components/Footer.astro'), 'utf-8');
    expect(headerContent).toContain('aria-label="Main navigation"');
    expect(footerContent).toContain('aria-label="Redes sociales"');
  });

  it('should use article elements for project cards', () => {
    const projectsContent = readFileSync(join(__dirname, '../src/components/Projects.astro'), 'utf-8');
    expect(projectsContent).toContain('<article');
  });

  it('should have rel="noopener noreferrer" on external links', () => {
    const heroContent = readFileSync(join(__dirname, '../src/components/Hero.astro'), 'utf-8');
    const projectsContent = readFileSync(join(__dirname, '../src/components/Projects.astro'), 'utf-8');
    expect(heroContent).toContain('noopener noreferrer');
    expect(projectsContent).toContain('noopener noreferrer');
  });
});
