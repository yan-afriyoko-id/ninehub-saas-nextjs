'use client';

import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadLinks = [
      { rel: 'preload', href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'preload', href: '/og-image.jpg', as: 'image' },
    ];

    preloadLinks.forEach(link => {
      const linkElement = document.createElement('link');
      Object.assign(linkElement, link);
      document.head.appendChild(linkElement);
    });

    // Lazy load non-critical images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Service Worker registration for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Performance monitoring
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        // Report Core Web Vitals
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
              }
              if (entry.entryType === 'first-input') {
                // FID calculation: processingEnd - startTime
                const firstInputEntry = entry as PerformanceEventTiming;
                if (firstInputEntry.processingEnd && firstInputEntry.startTime) {
                  console.log('FID:', firstInputEntry.processingEnd - firstInputEntry.startTime);
                }
              }
              if (entry.entryType === 'layout-shift') {
                const layoutShiftEntry = entry as LayoutShift;
                console.log('CLS:', layoutShiftEntry.value);
              }
            }
          });
          observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        }
      });
    }

    return () => {
      // Cleanup
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => registration.unregister());
        });
      }
    };
  }, []);

  return null; // This component doesn't render anything
}

// Type definitions for performance entries
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  processingEnd: number;
  target?: EventTarget;
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  sources?: LayoutShiftAttribution[];
}

interface LayoutShiftAttribution {
  node?: Node;
  currentRect?: DOMRectReadOnly;
  previousRect?: DOMRectReadOnly;
}

// Utility functions for performance optimization
export const optimizeImages = () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Add loading="lazy" to non-critical images
    if (!img.classList.contains('critical')) {
      img.loading = 'lazy';
    }
    
    // Add decoding="async" for better performance
    img.decoding = 'async';
  });
};

export const preloadCriticalResources = () => {
  const criticalResources = [
    '/api/analytics',
    '/api/features',
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = resource;
    document.head.appendChild(link);
  });
}; 