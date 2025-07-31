export default function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="mb-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Join thousands of companies that have already revolutionized their operations with our platform. 
            Start your free trial today and see the difference for yourself.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Start Free Trial
          </button>
          <button className="border-2 border-blue-400/30 hover:border-blue-400/50 text-white px-6 sm:px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
            Schedule Demo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="text-lg font-semibold mb-2">14-Day Free Trial</h3>
            <p className="text-gray-300 text-sm">
              No credit card required. Full access to all features.
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Instant Setup</h3>
            <p className="text-gray-300 text-sm">
              Get started in minutes with our guided onboarding.
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="text-3xl mb-2">🛡️</div>
            <h3 className="text-lg font-semibold mb-2">Enterprise Security</h3>
            <p className="text-gray-300 text-sm">
              Bank-level encryption and SOC 2 compliance.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700/50">
          <p className="text-gray-300 mb-4">
            Trusted by 10,000+ companies worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-white font-semibold">TechFlow</div>
            <div className="text-white font-semibold">InnovateCorp</div>
            <div className="text-white font-semibold">GrowthLab</div>
            <div className="text-white font-semibold">ScaleUp</div>
            <div className="text-white font-semibold">FutureTech</div>
          </div>
        </div>
      </div>
    </section>
  );
} 