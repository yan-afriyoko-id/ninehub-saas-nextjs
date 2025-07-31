import MainLayout from "./components/MainLayout";
import SeoCard from "./components/SeoCard";
import StructuredData, { organizationSchema, faqSchema, reviewSchema } from "./components/StructuredData";
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import Hero from "./components/homepage/hero";
import TrustedBy from "./components/homepage/TrustedBy";
import Features from "./components/homepage/Features";
import ProductPreview from "./components/homepage/ProductPreview";
import Benefits from "./components/homepage/Benefits";
import Testimonials from "./components/homepage/Testimonials";
import PricingPreview from "./components/homepage/PricingPreview";
import FAQ from "./components/homepage/FAQ";
import FinalCTA from "./components/homepage/FinalCTA";

export default function HomePage() {
  return (
    <>
      <SeoCard 
        title="Analytics Pro - Transform Your Business With Smart Analytics"
        description="Unlock the power of data-driven decisions with our advanced analytics platform. Get insights that drive growth and optimize your operations with AI-powered analytics."
        keywords="analytics, business intelligence, data analytics, AI analytics, dashboard, reporting, business insights, data visualization, real-time analytics, predictive analytics"
        ogImage="/og-image.jpg"
        ogUrl="https://analyticspro.com"
        canonicalUrl="https://analyticspro.com"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Analytics Pro",
          "description": "Advanced analytics platform with AI-powered insights for business growth",
          "url": "https://analyticspro.com",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "29",
            "priceCurrency": "USD",
            "description": "Professional analytics platform with AI-powered insights"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "2500"
          },
          "provider": {
            "@type": "Organization",
            "name": "Analytics Pro",
            "url": "https://analyticspro.com"
          }
        }}
      />
      
      {/* Additional Structured Data */}
      <StructuredData data={organizationSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={reviewSchema} />
      
      {/* Performance Optimizer */}
      <PerformanceOptimizer />
      
      <MainLayout>
        <Hero />
        <TrustedBy />
        <Features />
        <ProductPreview />
        <Benefits />
        <Testimonials />
        <PricingPreview />
        <FAQ />
        <FinalCTA />
      </MainLayout>
    </>
  );
}