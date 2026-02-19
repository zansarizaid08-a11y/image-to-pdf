
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { ArrowLeft, User, Calendar } from 'lucide-react';

export const BlogList: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Expert guides on document conversion, scanning, and digital workspace organization.</p>
      </div>

      <div className="space-y-12">
        {BLOG_POSTS.map((post) => (
          <article key={post.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow group">
            <div className="md:w-1/3">
              <img src={`https://picsum.photos/seed/${post.id}/800/600`} alt={post.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8 md:w-2/3 flex flex-col">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-gray-600 mb-6 flex-grow">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="text-blue-600 font-bold hover:underline self-start">Read Full Article →</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) return <div className="text-center py-20">Post not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>
      
      <article className="prose prose-blue lg:prose-xl mx-auto">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">{post.title}</h1>
        
        <img src={`https://picsum.photos/seed/${post.id}/1200/600`} alt={post.title} className="w-full rounded-2xl mb-10 shadow-md" />

        <AdPlaceholder type="content" className="my-10" />

        <div className="text-gray-700 text-lg leading-relaxed space-y-6">
          <p>{post.content}</p>
          <p>This is just the beginning of your journey with digital documents. By utilizing tools like ours, you're not just converting files; you're creating a more professional persona for your digital interactions.</p>
          <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Why Use Img2PDF?</h2>
          <p>Our platform is built on modern web technologies like React and jsPDF, ensuring that your data security is never compromised. In an era where online privacy is constantly under threat, having a tool that works offline (client-side) is a game-changer.</p>
        </div>

        <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-bold mb-4">Ready to try it yourself?</h3>
          <p className="text-gray-600 mb-6">Convert your images to PDF now in just a few clicks.</p>
          <Link to="/tool" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700">Go to Converter Tool</Link>
        </div>
      </article>

      <AdPlaceholder type="footer" className="mt-12" />
    </div>
  );
};
