import MainLayout from '../components/MainLayout';

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for small teams and startups",
      features: [
        "Up to 5 team members",
        "Basic analytics",
        "Email support",
        "10GB storage",
        "Basic integrations",
        "Standard reports",
        "Mobile app access"
      ],
      popular: false,
      cta: "Start Free Trial",
      savings: null
    },
    {
      name: "Professional",
      price: "$99",
      period: "per month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 25 team members",
        "Advanced analytics",
        "Priority support",
        "100GB storage",
        "Advanced integrations",
        "Custom reporting",
        "API access",
        "White-label options",
        "Advanced security"
      ],
      popular: true,
      cta: "Start Free Trial",
      savings: "Save 20% with annual"
    },
    {
      name: "Enterprise",
      price: "$299",
      period: "per month",
      description: "For large organizations",
      features: [
        "Unlimited team members",
        "Custom analytics",
        "24/7 phone support",
        "Unlimited storage",
        "All integrations",
        "Custom reporting",
        "API access",
        "Dedicated account manager",
        "Custom SLA",
        "Advanced compliance",
        "On-premise option"
      ],
      popular: false,
      cta: "Contact Sales",
      savings: "Custom pricing available"
    }
  ];

  const addons = [
    {
      name: "Additional Team Members",
      price: "$10",
      period: "per member/month",
      description: "Add more team members to any plan"
    },
    {
      name: "Advanced Analytics",
      price: "$50",
      period: "per month",
      description: "AI-powered insights and predictions"
    },
    {
      name: "Custom Integrations",
      price: "$200",
      period: "one-time",
      description: "Custom API integrations and webhooks"
    },
    {
      name: "Priority Support",
      price: "$100",
      period: "per month",
      description: "24/7 phone and live chat support"
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your business. All plans include a 14-day free trial.
            </p>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className="text-gray-300">Monthly</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" id="billing-toggle" />
                <label htmlFor="billing-toggle" className="block w-16 h-8 bg-gray-600 rounded-full cursor-pointer">
                  <div className="w-6 h-6 bg-white rounded-full transform transition-transform duration-300 translate-x-1 translate-y-1"></div>
                </label>
              </div>
              <span className="text-gray-300">Annual <span className="text-green-400">(Save 20%)</span></span>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border ${
                    plan.popular 
                      ? 'border-blue-500 shadow-2xl shadow-blue-500/20 md:transform md:-translate-y-8' 
                      : 'border-gray-700/50 md:transform md:translate-y-4'
                  } hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-2">{plan.period}</span>
                    </div>
                    <p className="text-gray-300">{plan.description}</p>
                    {plan.savings && (
                      <div className="mt-2">
                        <span className="text-green-400 text-sm font-semibold">{plan.savings}</span>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-700/50 hover:bg-gray-600/50 text-white border border-gray-600/50'
                  }`}>
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Additional Services
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Customize your plan with additional features and services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {addons.map((addon, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{addon.name}</h3>
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-blue-400">{addon.price}</span>
                    <span className="text-gray-400 text-sm ml-1">{addon.period}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{addon.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-2">Can I change plans anytime?</h3>
                <p className="text-gray-300 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-300 text-sm">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-2">Is there a setup fee?</h3>
                <p className="text-gray-300 text-sm">No setup fees for any of our plans. You only pay for the plan you choose.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start your free trial today. No credit card required.
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