import MainLayout from '../components/MainLayout';

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
        <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
            
            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
                <p className="leading-relaxed mb-4">
                  We collect information you provide directly to us, such as when you create an account, subscribe to our service, or contact us for support.
                </p>
                <p className="leading-relaxed">
                  This may include:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Name, email address, and company information</li>
                  <li>Payment and billing information</li>
                  <li>Usage data and analytics information</li>
                  <li>Communication preferences and support requests</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                <p className="leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Develop new products and services</li>
                  <li>Protect against fraud and abuse</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
                <p className="leading-relaxed mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Data Retention</h2>
                <p className="leading-relaxed">
                  We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. When you delete your account, we will delete or anonymize your personal information within 30 days.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
                <p className="leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Update or correct your personal information</li>
                  <li>Delete your personal information</li>
                  <li>Object to or restrict processing of your personal information</li>
                  <li>Data portability (receive your data in a structured format)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies and Tracking</h2>
                <p className="leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze how our services are used</li>
                  <li>Improve our services and user experience</li>
                  <li>Provide personalized content and advertisements</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Third-Party Services</h2>
                <p className="leading-relaxed">
                  Our services may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">9. International Transfers</h2>
                <p className="leading-relaxed">
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your personal information in accordance with this policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">10. Children&apos;s Privacy</h2>
                <p className="leading-relaxed">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">11. Changes to This Policy</h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the &quot;Last Updated&quot; date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">12. Contact Us</h2>
                <p className="leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                </p>
                <div className="text-blue-400">
                  <p>Email: privacy@analyticspro.com</p>
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