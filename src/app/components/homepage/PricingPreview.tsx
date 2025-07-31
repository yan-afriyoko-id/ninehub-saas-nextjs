export default function PricingPreview() {
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
        "Basic integrations"
      ],
      popular: false,
      cta: "Start Free Trial"
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
        "API access"
      ],
      popular: true,
      cta: "Start Free Trial"
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
        "Custom SLA"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
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
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-300">{plan.description}</p>
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

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Need a custom plan? Contact our sales team
          </p>
          <a 
            href="/pricing"
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300"
          >
            Contact Sales →
          </a>
        </div>
      </div>
    </section>
  );
} 