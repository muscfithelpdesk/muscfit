'use client';

import Header from '@/components/common/Header';
import Footer from '@/app/homepage/components/Footer';

export default function InfoPage({ params }) {
  const { slug } = params;
  const title = slug
    ? slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Information';

  // Shared Footer Data
  const footerData = {
    columns: [
      {
        id: 1,
        title: 'Shop',
        links: [
          { id: 1, label: "Men's Collection", href: '/men-catalog' },
          { id: 2, label: "Women's Collection", href: '/women-catalog' },
          { id: 3, label: 'Compression Wear', href: '/compression-wear-catalog' },
          { id: 4, label: 'New Arrivals', href: '/men-catalog?filter=new' },
          { id: 5, label: 'Best Sellers', href: '/men-catalog?filter=bestseller' },
        ],
      },
      {
        id: 2,
        title: 'Support',
        links: [
          { id: 1, label: 'Contact Us', href: '/info/contact-us' },
          { id: 2, label: 'Size Guide', href: '/info/size-guide' },
          { id: 3, label: 'Shipping Info', href: '/info/shipping-info' },
          { id: 4, label: 'Returns & Exchanges', href: '/info/returns-exchanges' },
          { id: 5, label: 'FAQs', href: '/info/faqs' },
        ],
      },
      {
        id: 3,
        title: 'Company',
        links: [
          { id: 1, label: 'About Us', href: '/info/about-us' },
          { id: 2, label: 'Careers', href: '/info/careers' },
          { id: 3, label: 'Sustainability', href: '/info/sustainability' },
          { id: 4, label: 'Press', href: '/info/press' },
          { id: 5, label: 'Blog', href: '/info/blog' },
        ],
      },
      {
        id: 4,
        title: 'Legal',
        links: [
          { id: 1, label: 'Privacy Policy', href: '/info/privacy-policy' },
          { id: 2, label: 'Terms of Service', href: '/info/terms-of-service' },
          { id: 3, label: 'Cookie Policy', href: '/info/cookie-policy' },
          { id: 4, label: 'Accessibility', href: '/info/accessibility' },
        ],
      },
    ],
    socialLinks: [
      { id: 1, icon: 'AtSymbolIcon', href: 'https://instagram.com/muscfit', label: 'Instagram' },
      { id: 2, icon: 'PlayIcon', href: 'https://youtube.com/muscfit', label: 'YouTube' },
      {
        id: 3,
        icon: 'ChatBubbleLeftIcon',
        href: 'https://facebook.com/muscfit',
        label: 'Facebook',
      },
      { id: 4, icon: 'HashtagIcon', href: 'https://twitter.com/muscfit', label: 'Twitter' },
    ],
    paymentMethods: [
      { id: 1, icon: 'CreditCardIcon' },
      { id: 2, icon: 'BanknotesIcon' },
      { id: 3, icon: 'DevicePhoneMobileIcon' },
      { id: 4, icon: 'ShieldCheckIcon' },
    ],
  };

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans text-black">
      <Header isFixed={true} topOffset={0} />

      <main className="flex-grow pt-32 md:pt-40 px-4 md:px-8 max-w-[1000px] mx-auto w-full mb-20 animate-fade-in-up">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8 font-medium uppercase tracking-wide">
          <span>Home</span>
          <span>/</span>
          <span className="text-black">{title}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-black uppercase mb-8 tracking-tight">{title}</h1>

        {/* Decorative Divider */}
        <div className="w-24 h-1 bg-black mb-12"></div>

        {/* Content Content */}
        <div className="prose prose-lg max-w-none text-zinc-700 space-y-6 leading-relaxed">
          <p className="text-xl font-medium text-black">
            Welcome to the official <strong>{title}</strong> page for MUSCFIT.
          </p>
          <p>
            At MUSCFIT, we are dedicated to providing you with the best experience possible. Whether
            you are looking for information about our products, need assistance with your order, or
            want to learn more about our brand values, you are in the right place.
          </p>

          <div className="bg-zinc-50 p-8 border border-zinc-100 my-8 rounded-sm">
            <h3 className="text-2xl font-bold text-black mb-4 uppercase tracking-wide">
              Information Overview
            </h3>
            <p className="mb-0">
              This section is currently being updated with the latest details regarding{' '}
              <strong>{title}</strong>. Our team is working hard to ensure you have the most
              accurate and helpful information. In the meantime, if you have urgent inquiries,
              please contact our support team.
            </p>
          </div>

          <p>
            We appreciate your patience and support as we continue to build the ultimate fitness
            community. Keep pushing your limits and stay tuned for updates.
          </p>

          <p className="font-bold text-black mt-8">— The MUSCFIT Team</p>
        </div>
      </main>

      <Footer {...footerData} />
    </div>
  );
}
