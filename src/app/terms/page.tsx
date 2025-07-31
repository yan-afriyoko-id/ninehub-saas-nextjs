import MainLayout from '../components/MainLayout';

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
        <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
            
            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="leading-relaxed">
                  By accessing and using Analytics Pro (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
                <p className="leading-relaxed mb-4">
                  Permission is granted to temporarily download one copy of the materials (information or software) on Analytics Pro&apos;s website for personal, non-commercial transitory viewing only.
                </p>
                <p className="leading-relaxed">
                  This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on Analytics Pro&apos;s website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. Service Description</h2>
                <p className="leading-relaxed">
                  Analytics Pro provides analytics and data visualization services. Our platform includes real-time dashboards, custom reporting, API access, and integration capabilities. We reserve the right to modify or discontinue any feature at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. User Accounts</h2>
                <p className="leading-relaxed mb-4">
                  You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.
                </p>
                <p className="leading-relaxed">
                  You must be at least 18 years old to use this service. By using Analytics Pro, you represent and warrant that you meet this requirement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Privacy Policy</h2>
                <p className="leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Payment Terms</h2>
                <p className="leading-relaxed mb-4">
                  Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law.
                </p>
                <p className="leading-relaxed">
                  We reserve the right to change our pricing with 30 days notice. Price changes will not affect your current billing cycle.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Termination</h2>
                <p className="leading-relaxed">
                  You may terminate your account at any time by contacting customer support. We may terminate or suspend your account immediately, without prior notice, for any reason, including breach of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
                <p className="leading-relaxed">
                  In no event shall Analytics Pro, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">9. Governing Law</h2>
                <p className="leading-relaxed">
                  These Terms shall be interpreted and governed by the laws of the jurisdiction in which Analytics Pro operates, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to Terms</h2>
                <p className="leading-relaxed">
                  We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
                <p className="leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-2 text-blue-400">
                  <p>Email: legal@analyticspro.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Address: 123 Business Street, Tech City, TC 12345</p>
                </div>
              </section>

              <div className="border-t border-gray-700/50 pt-6 mt-8">
                <p className="text-sm text-gray-400">
                  Last updated: January 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 