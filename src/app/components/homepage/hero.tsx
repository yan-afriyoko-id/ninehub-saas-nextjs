export default function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white py-24 px-4 sm:px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <span className="inline-block bg-blue-600/30 backdrop-blur-sm text-blue-200 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-500/30">
            🚀 Now with AI-Powered Analytics
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your Business
            <span className="block text-blue-300">With Smart Analytics</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Unlock the power of data-driven decisions with our advanced analytics platform. 
            Get insights that drive growth and optimize your operations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Start Free Trial
          </button>
          <button className="border-2 border-blue-400/30 hover:border-blue-400/50 text-white px-6 sm:px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
            Watch Demo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-lg font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-gray-300 text-sm">
              Monitor your data in real-time with live dashboards
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
            <p className="text-gray-300 text-sm">
              Get predictive analytics and smart recommendations
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="text-lg font-semibold mb-2">Enterprise Security</h3>
            <p className="text-gray-300 text-sm">
              Bank-level encryption and compliance standards
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}