import { describe, it, expect } from 'vitest';
import esTranslations from '../src/locales/es.json' assert { type: 'json' };
import enTranslations from '../src/locales/en.json' assert { type: 'json' };

describe('Translations', () => {
  it('should have the same keys in both languages', () => {
    const esKeys = Object.keys(esTranslations).sort();
    const enKeys = Object.keys(enTranslations).sort();
    expect(esKeys).toEqual(enKeys);
  });

  it('should have no empty translation values', () => {
    Object.entries(esTranslations).forEach(([key, value]) => {
      expect(typeof value).toBe('string');
      expect(value.trim().length).toBeGreaterThan(0);
    });
    Object.entries(enTranslations).forEach(([key, value]) => {
      expect(typeof value).toBe('string');
      expect(value.trim().length).toBeGreaterThan(0);
    });
  });

  it('should have meaningful translations for all keys', () => {
    Object.entries(esTranslations).forEach(([key, esValue]) => {
      const enValue = enTranslations[key];
      // Each translation should be unique (not just a copy of the key)
      expect(esValue.toLowerCase()).not.toEqual(key.toLowerCase());
      expect(enValue.toLowerCase()).not.toEqual(key.toLowerCase());
    });
  });

  it('should have navigation keys', () => {
    const navKeys = ['nav_projects', 'nav_about', 'nav_skills', 'nav_contact'];
    navKeys.forEach(key => {
      expect(esTranslations[key]).toBeDefined();
      expect(enTranslations[key]).toBeDefined();
    });
  });

  it('should have hero keys', () => {
    const heroKeys = ['hero_greeting', 'hero_title', 'hero_bio', 'hero_cta_projects', 'hero_cta_contact'];
    heroKeys.forEach(key => {
      expect(esTranslations[key]).toBeDefined();
      expect(enTranslations[key]).toBeDefined();
    });
  });

  it('should have about section keys', () => {
    const aboutKeys = ['about_title', 'about_subtitle', 'about_text', 'about_highlight_code', 'about_highlight_education', 'about_highlight_mention', 'about_highlight_team', 'about_highlight_agile'];
    aboutKeys.forEach(key => {
      expect(esTranslations[key]).toBeDefined();
      expect(enTranslations[key]).toBeDefined();
    });
  });

  it('should have contact section keys', () => {
    const contactKeys = ['contact_title', 'contact_text', 'contact_button'];
    contactKeys.forEach(key => {
      expect(esTranslations[key]).toBeDefined();
      expect(enTranslations[key]).toBeDefined();
    });
  });

  it('should have footer key', () => {
    expect(esTranslations.footer_text).toBeDefined();
    expect(enTranslations.footer_text).toBeDefined();
    expect(typeof esTranslations.footer_text).toBe('string');
    expect(typeof enTranslations.footer_text).toBe('string');
  });

  it('should have Spanish text that is not English', () => {
    const spanishWords = ['desarrollador', 'proyectos', 'habilidades', 'contacto', 'sobre', 'mí', 'envíame', 'contáctame'];
    const esText = Object.values(esTranslations).join(' ').toLowerCase();
    const hasSpanishWord = spanishWords.some(word => esText.includes(word.toLowerCase()));
    expect(hasSpanishWord).toBe(true);
  });

  it('should have English text that is not Spanish', () => {
    const englishWords = ['developer', 'projects', 'skills', 'contact', 'about', 'me', 'send', 'view'];
    const enText = Object.values(enTranslations).join(' ').toLowerCase();
    const hasEnglishWord = englishWords.some(word => enText.includes(word.toLowerCase()));
    expect(hasEnglishWord).toBe(true);
  });
});
