export default function Features() {
  const features = [
    {
      icon: "📊",
      title: "Advanced Analytics Dashboard",
      description: "Get real-time insights with customizable dashboards that show your most important metrics at a glance.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: "🤖",
      title: "AI-Powered Predictions",
      description: "Leverage machine learning to predict trends and identify opportunities before they happen.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: "🔗",
      title: "Seamless Integrations",
      description: "Connect with 100+ popular tools and services through our comprehensive API and webhooks.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: "📱",
      title: "Mobile-First Design",
      description: "Access your data anywhere with our responsive mobile app and optimized web interface.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: "🛡️",
      title: "Enterprise Security",
      description: "Bank-level encryption, SOC 2 compliance, and advanced security features protect your data.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: "⚡",
      title: "Lightning Fast Performance",
      description: "Built for speed with global CDN, optimized queries, and sub-second response times.",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Powerful Features That Drive Results
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to analyze, optimize, and grow your business with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700/50"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
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