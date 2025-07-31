import Script from 'next/script';

interface StructuredDataProps {
  data: object;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  );
}

// Predefined structured data schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Analytics Pro",
  "url": "https://analyticspro.com",
  "logo": "https://analyticspro.com/logo.png",
  "description": "Advanced analytics platform with AI-powered insights for business growth",
  "foundingDate": "2024",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "support@analyticspro.com"
  },
  "sameAs": [
    "https://twitter.com/analyticspro",
    "https://linkedin.com/company/analyticspro",
    "https://facebook.com/analyticspro"
  ]
};

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://analyticspro.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Features",
      "item": "https://analyticspro.com/features"
    }
  ]
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does the 14-day free trial work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can start your free trial immediately with full access to all features. No credit card required. At the end of the trial, you can choose to upgrade to a paid plan or your account will be paused."
      }
    },
    {
      "@type": "Question",
      "name": "Can I cancel my subscription anytime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can cancel your subscription at any time from your account settings. There are no long-term contracts or cancellation fees."
      }
    }
  ]
};

export const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Analytics Pro",
  "description": "Advanced analytics platform with AI-powered insights",
  "brand": {
    "@type": "Brand",
    "name": "Analytics Pro"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "2500"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Sarah Johnson"
      },
      "reviewBody": "This platform has transformed how we handle our data. The analytics are incredible and the customer support is outstanding."
    }
  ]
}; 