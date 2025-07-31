export default function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 text-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Analytics Pro</h3>
            <p className="text-gray-400 text-sm">
              Transform your business with powerful analytics and AI-driven insights.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/integrations" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="/api" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/docs" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="/status" className="hover:text-white transition-colors">Status</a></li>
              <li><a href="/community" className="hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">&copy; 2025 Analytics Pro. All rights reserved.</p>
                            <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                    <a href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                    <a href="/testimonials" className="text-sm text-gray-400 hover:text-white transition-colors">Testimonials</a>
                  </div>
        </div>
      </div>
    </footer>
  );
}