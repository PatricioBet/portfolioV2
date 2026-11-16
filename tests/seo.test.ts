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

  it('should have robots meta tag allowing indexing', () => {
    expect(layoutContent).toContain('meta name="robots"');
    expect(layoutContent).toContain('index');
    expect(layoutContent).toContain('follow');
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
});
