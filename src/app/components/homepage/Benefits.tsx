export default function Benefits() {
  const benefits = [
    {
      icon: "🚀",
      title: "Lightning Fast Performance",
      description: "Experience blazing fast loading times and smooth interactions that keep your users engaged."
    },
    {
      icon: "🛡️",
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption and compliance with industry standards."
    },
    {
      icon: "📊",
      title: "Advanced Analytics",
      description: "Get deep insights into your data with powerful analytics and customizable dashboards."
    },
    {
      icon: "🔧",
      title: "Easy Integration",
      description: "Seamlessly integrate with your existing tools and workflows with our comprehensive API."
    },
    {
      icon: "📱",
      title: "Mobile Optimized",
      description: "Perfect experience across all devices with responsive design and native mobile features."
    },
    {
      icon: "🎯",
      title: "AI-Powered Insights",
      description: "Leverage artificial intelligence to get predictive analytics and smart recommendations."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the powerful features that make our platform the preferred choice for businesses worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700/50"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/features"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl inline-block"
          >
            Explore All Features
          </a>
        </div>
      </div>
    </section>
  );
} 