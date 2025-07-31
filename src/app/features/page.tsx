import MainLayout from '../components/MainLayout';

export default function FeaturesPage() {
  const features = [
    {
      category: "Analytics & Insights",
      items: [
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
          icon: "📈",
          title: "Custom Reports",
          description: "Generate comprehensive reports with automated scheduling and custom branding options.",
          color: "from-green-500 to-green-600"
        }
      ]
    },
    {
      category: "Integrations & API",
      items: [
        {
          icon: "🔗",
          title: "Seamless Integrations",
          description: "Connect with 100+ popular tools and services through our comprehensive API and webhooks.",
          color: "from-orange-500 to-orange-600"
        },
        {
          icon: "⚙️",
          title: "RESTful API",
          description: "Full REST API with comprehensive documentation and SDKs for all major languages.",
          color: "from-indigo-500 to-indigo-600"
        },
        {
          icon: "🔄",
          title: "Webhook Support",
          description: "Real-time data synchronization with configurable webhooks for instant updates.",
          color: "from-pink-500 to-pink-600"
        }
      ]
    },
    {
      category: "Security & Performance",
      items: [
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
          color: "from-yellow-500 to-yellow-600"
        },
        {
          icon: "📱",
          title: "Mobile-First Design",
          description: "Access your data anywhere with our responsive mobile app and optimized web interface.",
          color: "from-teal-500 to-teal-600"
        }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Powerful Features
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Everything you need to analyze, optimize, and grow your business with confidence.
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

        {/* Features Sections */}
        {features.map((category, categoryIndex) => (
          <section key={categoryIndex} className="py-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  {category.category}
                </h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((feature, index) => (
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
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of businesses that trust our platform to power their growth.
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