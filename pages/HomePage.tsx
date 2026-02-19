
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Upload, ArrowRight, CheckCircle } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const HomePage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      {/* AdSense Header */}
      <div className="max-w-7xl mx-auto px-4 mt-4">
        <AdPlaceholder type="header" />
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Convert Images to PDF <span className="text-blue-600">Instantly</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Professional-grade tool to transform JPG, PNG, and more into high-quality PDFs. 
            100% free, private, and secure—processing happens entirely in your browser.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/tool"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Start Converting Now
            </Link>
            <Link
              to="/about"
              className="bg-white text-gray-700 border border-gray-300 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Img2PDF?</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <Zap className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Zero wait time. Since your files aren't uploaded to a server, the conversion happens as fast as your computer can process it.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <Shield className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-3">Privacy First</h3>
              <p className="text-gray-600">Your documents are sensitive. We never see your files. All processing is done locally via JavaScript in your browser sandbox.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <CheckCircle className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-3">High Quality</h3>
              <p className="text-gray-600">Our algorithm ensures images are placed at full resolution within the PDF, maintaining the clarity of your documents and photos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Mid-Page */}
      <div className="max-w-7xl mx-auto px-4 my-12">
        <AdPlaceholder type="content" />
      </div>

      {/* Blog Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">From Our Blog</h2>
              <p className="text-gray-600">Guides and tips for managing your digital documents.</p>
            </div>
            <Link to="/blog" className="text-blue-600 font-semibold flex items-center gap-1 hover:underline">
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <img src={`https://picsum.photos/seed/${post.id}/600/400`} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="text-xs font-semibold text-blue-600 uppercase mb-2">{post.date}</div>
                  <h3 className="text-xl font-bold mb-3 hover:text-blue-600 transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="text-blue-600 text-sm font-bold flex items-center gap-1">
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AdSense Footer Area */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <AdPlaceholder type="footer" />
      </div>
    </div>
  );
};
