export default function TrustedBy() {
  const companies = [
    { name: "TechFlow", logo: "/logos/techflow.svg", industry: "SaaS" },
    { name: "InnovateCorp", logo: "/logos/innovatecorp.svg", industry: "Fintech" },
    { name: "GrowthLab", logo: "/logos/growthlab.svg", industry: "E-commerce" },
    { name: "ScaleUp", logo: "/logos/scaleup.svg", industry: "Healthcare" },
    { name: "FutureTech", logo: "/logos/futuretech.svg", industry: "AI/ML" },
    { name: "DataFlow", logo: "/logos/dataflow.svg", industry: "Analytics" },
    { name: "CloudSync", logo: "/logos/cloudsync.svg", industry: "Cloud" },
    { name: "SmartBiz", logo: "/logos/smartbiz.svg", industry: "Enterprise" }
  ];

  // Duplicate companies for seamless loop
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section id="trusted-by" className="py-16 bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join thousands of companies that trust our platform to power their business growth.
          </p>
        </div>

        {/* Animated Logo Carousel */}
        <div className="relative">
          <div className="flex animate-scroll">
            {duplicatedCompanies.map((company, index) => (
              <div 
                key={index}
                className="flex-shrink-0 mx-8 group"
                style={{ minWidth: '200px' }}
              >
                                 <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                   <div className="text-center">
                                           <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl font-bold text-white">
                          {company.name.charAt(0)}
                        </span>
                      </div>
                     <h3 className="font-semibold text-white mb-1">
                       {company.name}
                     </h3>
                     <p className="text-sm text-gray-400">
                       {company.industry}
                     </p>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </div>

                 <div className="text-center mt-12">
           <div className="inline-flex items-center bg-white/5 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
             <span className="text-2xl font-bold text-blue-400 mr-2">10,000+</span>
             <span className="text-gray-300">companies worldwide</span>
           </div>
         </div>
      </div>


    </section>
  );
}