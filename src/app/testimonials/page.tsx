'use client';

import { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';

export default function TestimonialsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO",
      company: "TechFlow Inc.",
      avatar: "SJ",
      content: "Analytics Pro has transformed how we make decisions. The AI insights have helped us increase revenue by 40% in just 6 months. The platform is intuitive and the support team is incredibly responsive.",
      rating: 5,
      industry: "SaaS"
    },
    {
      name: "Michael Chen",
      role: "Head of Analytics",
      company: "GrowthLab",
      avatar: "MC",
      content: "The real-time dashboards and custom reporting features have given us unprecedented visibility into our business metrics. It's like having a crystal ball for our data.",
      rating: 5,
      industry: "E-commerce"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "InnovateCorp",
      avatar: "ER",
      content: "The integration capabilities are amazing. We connected all our tools seamlessly and now have a single source of truth for all our marketing data. Game changer!",
      rating: 5,
      industry: "Fintech"
    },
    {
      name: "David Kim",
      role: "CTO",
      company: "ScaleUp Solutions",
      avatar: "DK",
      content: "Enterprise-grade security with the simplicity of a consumer app. Our compliance team was impressed, and our developers love the API. Perfect balance.",
      rating: 5,
      industry: "Healthcare"
    },
    {
      name: "Lisa Thompson",
      role: "VP of Operations",
      company: "FutureTech",
      avatar: "LT",
      content: "The predictive analytics feature has helped us optimize our supply chain and reduce costs by 25%. The ROI was immediate and continues to grow.",
      rating: 5,
      industry: "AI/ML"
    },
    {
      name: "James Wilson",
      role: "Data Scientist",
      company: "DataFlow Analytics",
      avatar: "JW",
      content: "As a data scientist, I appreciate the advanced analytics capabilities. The platform handles complex queries efficiently and the visualization options are excellent.",
      rating: 5,
      industry: "Analytics"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              What Our Customers Say
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join thousands of satisfied customers who trust Analytics Pro to power their business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Start Free Trial
              </button>
              <button className="border-2 border-blue-400/30 hover:border-blue-400/50 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 text-center">
                        {/* Rating */}
                        <div className="flex justify-center mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-xl text-gray-300 leading-relaxed mb-8 italic">
                          &quot;{testimonial.content}&quot;
                        </blockquote>

                        {/* Author */}
                        <div className="flex items-center justify-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                              {testimonial.avatar}
                            </span>
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-white">{testimonial.name}</div>
                            <div className="text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</div>
                            <div className="text-blue-400 text-xs">{testimonial.industry}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="text-3xl font-bold text-blue-400 mb-2">98%</div>
                <div className="text-gray-300">Customer Satisfaction</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="text-3xl font-bold text-blue-400 mb-2">10,000+</div>
                <div className="text-gray-300">Active Users</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
                <div className="text-gray-300">Uptime</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                <div className="text-gray-300">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Join Our Happy Customers
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start your journey with Analytics Pro today and see the difference data-driven decisions can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Start Free Trial
              </button>
              <button className="border-2 border-blue-400/30 hover:border-blue-400/50 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 