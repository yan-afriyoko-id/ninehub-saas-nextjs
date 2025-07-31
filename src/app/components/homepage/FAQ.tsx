'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the 14-day free trial work?",
      answer: "You can start your free trial immediately with full access to all features. No credit card required. At the end of the trial, you can choose to upgrade to a paid plan or your account will be paused."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. There are no long-term contracts or cancellation fees."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use bank-level encryption (AES-256) and follow SOC 2 Type II compliance standards with 99.9% uptime guarantee."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes! We offer 24/7 email support for all plans, live chat for Professional and Enterprise plans, and dedicated phone support for Enterprise customers."
    },
    {
      question: "Can I integrate with my existing tools?",
      answer: "We offer 100+ integrations with popular tools like Slack, Zapier, Salesforce, and more. We also provide a comprehensive API for custom integrations."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about our platform. Can't find the answer you're looking for? Contact our support team.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-700/50 transition-all duration-300 group focus:"
              >
                <h3 className="text-lg font-semibold text-white pr-4 group-hover:text-blue-300 transition-colors duration-300">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg 
                    className={`w-5 h-5 text-gray-400 transition-all duration-300 ${
                      openIndex === index ? 'rotate-180 text-blue-400' : 'group-hover:text-blue-300'
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <div className="border-t border-gray-700/50 pt-4">
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-300 mb-6">
            Still have questions? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Contact Support
            </button>
            <button className="border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-gray-200 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-700/50">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
