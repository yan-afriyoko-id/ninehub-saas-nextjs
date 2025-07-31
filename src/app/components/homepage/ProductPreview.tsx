export default function ProductPreview() {
  const previews = [
    {
      title: "Real-time Dashboard",
      description: "Monitor your key metrics with beautiful, customizable dashboards that update in real-time.",
      icon: (
        <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: ["Live data updates", "Custom widgets", "Mobile responsive"]
    },
    {
      title: "AI Analytics Engine",
      description: "Get intelligent insights and predictions powered by advanced machine learning algorithms.",
      icon: (
        <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      features: ["Predictive analytics", "Smart recommendations", "Pattern recognition"]
    },
    {
      title: "Advanced Reporting",
      description: "Generate comprehensive reports with automated scheduling and custom branding options.",
      icon: (
        <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      features: ["Automated reports", "Custom branding", "Multiple formats"]
    }
  ];

  return (
    <section id="product-preview" className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            See Our Platform in Action
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how our powerful analytics platform can transform your business operations and drive growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {previews.map((preview, index) => (
            <div 
              key={index}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700/50"
            >
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl flex items-center justify-center border border-gray-600/50 shadow-lg">
                    {preview.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {preview.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {preview.description}
                </p>
              </div>

              <ul className="space-y-3">
                {preview.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 text-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gray-800/50 border-2 border-blue-500 text-blue-400 hover:bg-gray-700/50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm">
            Request Live Demo
          </button>
        </div>
      </div>
    </section>
  );
}