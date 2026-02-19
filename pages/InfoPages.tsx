
import React from 'react';
import { Mail, Phone, Send } from 'lucide-react';

const PageHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="bg-gray-50 border-b border-gray-200 py-16 text-center">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{title}</h1>
      {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
    </div>
  </div>
);

export const AboutPage: React.FC = () => (
  <div>
    <PageHeader title="About Us" subtitle="We build simple tools for complex problems." />
    <div className="max-w-4xl mx-auto px-4 py-16 prose prose-lg">
      <p>Img2PDF started with a simple goal: to create a PDF conversion tool that doesn't track you. Most online converters require you to upload your sensitive documents to a random server. We thought, "Why not do it right in the browser?"</p>
      <p>Today, Img2PDF is used by thousands of professionals to quickly compile receipts, scans, and photos into professional documents. Our team is dedicated to maintaining high performance and strict privacy standards.</p>
      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">Our Mission</h2>
      <p>Our mission is to provide free, high-quality digital utility tools that prioritize user privacy and browser-native performance. We believe the future of the web is decentralized and secure.</p>
    </div>
  </div>
);

export const ContactPage: React.FC = () => (
  <div>
    <PageHeader title="Contact Us" subtitle="Have a question? We're here to help." />
    <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-8">Send us a message</h2>
        <form className="space-y-6" onSubmit={e => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"></textarea>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center gap-2">
            <Send className="w-4 h-4" /> Send Message
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="bg-blue-100 p-3 rounded-xl"><Mail className="w-6 h-6 text-blue-600" /></div>
            <div>
              <h3 className="font-bold text-gray-900">Email Support</h3>
              <p className="text-gray-600">zansarizaid08@gmail.com</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-blue-100 p-3 rounded-xl"><Phone className="w-6 h-6 text-blue-600" /></div>
            <div>
              <h3 className="font-bold text-gray-900">Phone</h3>
              <p className="text-gray-600">9552885753</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const PrivacyPolicy: React.FC = () => (
  <div>
    <PageHeader title="Privacy Policy" subtitle="Last updated: May 20, 2024" />
    <div className="max-w-4xl mx-auto px-4 py-16 prose prose-blue lg:prose-lg">
      <p>Your privacy is our number one priority. This policy explains how we handle your information when you use Img2PDF.</p>
      <h2>File Processing</h2>
      <p>All image-to-PDF conversions are performed locally in your web browser. We do not upload your images or the resulting PDF to any server. Your documents never leave your computer or device during the conversion process.</p>
      <h2>Data Collection</h2>
      <p>We do not store or collect personal information about you or your files. We use basic analytics to understand how many people use our site, but this data is aggregated and anonymized.</p>
      <h2>Cookies</h2>
      <p>We use essential cookies to ensure the site functions correctly and for advertising purposes (via Google AdSense). You can manage your cookie preferences through your browser settings.</p>
    </div>
  </div>
);

export const TermsAndConditions: React.FC = () => (
  <div>
    <PageHeader title="Terms & Conditions" subtitle="Please read these terms carefully." />
    <div className="max-w-4xl mx-auto px-4 py-16 prose prose-blue lg:prose-lg">
      <p>By using Img2PDF, you agree to these terms. If you do not agree, please do not use our service.</p>
      <h2>Use of Service</h2>
      <p>You may use this tool for personal or commercial purposes. You are responsible for ensuring you have the legal right to convert the images you upload.</p>
      <h2>Disclaimer of Warranties</h2>
      <p>This service is provided "as is" without warranty of any kind. We do not guarantee that the tool will be available at all times or that the conversion will meet your specific quality requirements.</p>
      <h2>Limitation of Liability</h2>
      <p>We are not liable for any damages arising from your use of this tool, including loss of data or document formatting issues.</p>
    </div>
  </div>
);

export const Disclaimer: React.FC = () => (
  <div>
    <PageHeader title="Disclaimer" />
    <div className="max-w-4xl mx-auto px-4 py-16 prose prose-blue lg:prose-lg">
      <p>The information provided on this website is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>
      <p>UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.</p>
    </div>
  </div>
);
