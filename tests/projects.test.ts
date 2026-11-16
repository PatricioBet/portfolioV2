import { describe, it, expect } from 'vitest';
import projectsData from '../public/projects.json' assert { type: 'json' };

describe('Projects Data', () => {
  it('should be an array', () => {
    expect(Array.isArray(projectsData)).toBe(true);
  });

  it('should have at least 10 projects', () => {
    expect(projectsData.length).toBeGreaterThanOrEqual(10);
  });

  it('should have unique IDs', () => {
    const ids = projectsData.map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have required fields for each project', () => {
    const requiredFields = ['id', 'title', 'description', 'image', 'url', 'tags'];
    projectsData.forEach(project => {
      requiredFields.forEach(field => {
        expect(project).toHaveProperty(field);
      });
    });
  });

  it('should have bilingual titles (es and en)', () => {
    projectsData.forEach(project => {
      expect(project.title).toHaveProperty('es');
      expect(project.title).toHaveProperty('en');
      expect(typeof project.title.es).toBe('string');
      expect(typeof project.title.en).toBe('string');
      expect(project.title.es.length).toBeGreaterThan(0);
      expect(project.title.en.length).toBeGreaterThan(0);
    });
  });

  it('should have bilingual descriptions (es and en)', () => {
    projectsData.forEach(project => {
      expect(project.description).toHaveProperty('es');
      expect(project.description).toHaveProperty('en');
      expect(typeof project.description.es).toBe('string');
      expect(typeof project.description.en).toBe('string');
      expect(project.description.es.length).toBeGreaterThan(0);
      expect(project.description.en.length).toBeGreaterThan(0);
    });
  });

  it('should have valid URLs', () => {
    const urlRegex = /^https?:\/\/.+/;
    projectsData.forEach(project => {
      expect(project.url).toMatch(urlRegex);
    });
  });

  it('should have non-empty tags arrays', () => {
    projectsData.forEach(project => {
      expect(Array.isArray(project.tags)).toBe(true);
      expect(project.tags.length).toBeGreaterThan(0);
      project.tags.forEach(tag => {
        expect(typeof tag).toBe('string');
        expect(tag.length).toBeGreaterThan(0);
      });
    });
  });

  it('should have image paths starting with /images/', () => {
    const imageRegex = /^\/images\/.+\.(webp|png|jpg|jpeg|svg)$/i;
    projectsData.forEach(project => {
      expect(project.image).toMatch(imageRegex);
    });
  });

  it('should have new projects from November 2026', () => {
    const newProjectIds = [
      'banana-anomaly-detection',
      'fly-rl-agent',
      'solar-backup-system',
      'nasa-space-apps-bloomwatch',
    ];
    newProjectIds.forEach(id => {
      const project = projectsData.find(p => p.id === id);
      expect(project).toBeDefined();
    });
  });
});
