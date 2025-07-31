export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO at TechFlow",
      avatar: "👩‍💼",
      rating: 5,
      text: "This platform has transformed how we handle our data. The analytics are incredible and the customer support is outstanding."
    },
    {
      name: "Michael Chen",
      role: "CTO at InnovateCorp",
      avatar: "👨‍💻",
      rating: 5,
      text: "The integration was seamless and the performance is unmatched. We've seen a 300% increase in efficiency since switching."
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager at GrowthLab",
      avatar: "👩‍🎨",
      rating: 5,
      text: "The AI-powered insights have given us a competitive edge. The platform is intuitive and the results speak for themselves."
    },
    {
      name: "David Kim",
      role: "Founder at StartupXYZ",
      avatar: "👨‍💼",
      rating: 5,
      text: "Best investment we've made this year. The ROI was immediate and the scalability is exactly what we needed."
    },
    {
      name: "Lisa Thompson",
      role: "Operations Director at ScaleUp",
      avatar: "👩‍🔬",
      rating: 5,
      text: "The security features give us peace of mind, and the mobile optimization is perfect for our remote team."
    },
    {
      name: "Alex Morgan",
      role: "VP Engineering at FutureTech",
      avatar: "👨‍🔧",
      rating: 5,
      text: "The API documentation is excellent and the developer experience is top-notch. Highly recommend for any tech team."
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their business with our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700/50"
            >
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-4">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-300 leading-relaxed italic">
                &quot;{testimonial.text}&quot;
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-gray-700/50">
            <div className="flex items-center mr-4">
              <span className="text-2xl font-bold text-blue-400">4.9</span>
              <span className="text-gray-300 ml-2">/ 5</span>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-300 ml-4">Based on 2,500+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
} 