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

  // Content Map for Specific Pages
  const contentMap = {
    'about-us': (
      <>
        <p className="text-xl font-medium text-black mb-6">
          MUSCFIT isn't just a brand; it's a movement born from the belief that greatness is built, not given.
        </p>
        <p>
          Founded in 2024, our mission is to engineer high-performance athletic wear that empowers athletes to push beyond their limits. We combine cutting-edge fabric technology with ergonomic design to create gear that moves with you, breathes with you, and endures the toughest workouts.
        </p>
        <div className="grid md:grid-cols-2 gap-8 my-10">
          <div className="bg-zinc-50 p-6 border border-zinc-100">
            <h3 className="font-bold text-lg mb-2 uppercase">Our Promise</h3>
            <p className="text-sm">To provide uncompromising quality and performance in every stitch. If it doesn't help you perform better, we don't make it.</p>
          </div>
          <div className="bg-zinc-50 p-6 border border-zinc-100">
            <h3 className="font-bold text-lg mb-2 uppercase">Our Vision</h3>
            <p className="text-sm">To be the global standard for performance wear, inspiring a community of disciplined, relentless achievers.</p>
          </div>
        </div>
        <p>We are a team of athletes, designers, and engineers obsessed with perfection. Welcome to the future of fitness apparel.</p>
      </>
    ),
    'contact-us': (
      <>
        <p className="text-lg mb-8">We're here to help. Reach out to us for any questions about your order, our products, or just to say hi.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="border border-black p-6 text-center">
            <h3 className="font-bold uppercase text-sm tracking-wide mb-2">Email Us</h3>
            <p className="text-zinc-600 mb-2">For general inquiries</p>
            <a href="mailto:muscfithelpdesk@gmail.com" className="font-bold underline">muscfithelpdesk@gmail.com</a>
          </div>
          <div className="border border-black p-6 text-center">
            <h3 className="font-bold uppercase text-sm tracking-wide mb-2">Call Us</h3>
            <p className="text-zinc-600 mb-2">Mon-Fri, 9am - 6pm</p>
            <a href="tel:+919911386842" className="font-bold underline">+91 99113 86842</a>
          </div>
          <div className="border border-black p-6 text-center">
            <h3 className="font-bold uppercase text-sm tracking-wide mb-2">Live Chat</h3>
            <p className="text-zinc-600 mb-2">Instant support</p>
            <button className="font-bold underline">Start Chat</button>
          </div>
        </div>
      </>
    ),
    'careers': (
      <>
        <p className="text-xl mb-6">Join the team that's redefining athletic performance.</p>
        <p className="mb-8">We are always looking for passionate, driven individuals to join our growing family. Whether you're a designer, developer, or marketing wizard, if you're obsessed with excellence, we want you.</p>
        <div className="bg-zinc-50 p-8 text-center border border-zinc-200">
          <h3 className="font-bold text-xl mb-4">Current Openings</h3>
          <p className="text-zinc-600 mb-6">We currently don't have active listings visible here, but we are always hiring talent.</p>
          <a href="mailto:careers@muscfit.com" className="inline-block bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors">
            Send your Resume
          </a>
        </div>
      </>
    ),
    'shipping-info': (
      <>
        <h3 className="font-bold text-lg uppercase mb-4">Domestic Shipping (India)</h3>
        <p className="mb-4">We offer free express shipping on all orders above ₹2,999. For orders below this amount, a standard shipping fee of ₹99 applies.</p>
        <ul className="list-disc pl-5 space-y-2 mb-8 text-zinc-700">
          <li><strong>Metro Cities:</strong> 2-3 Business Days</li>
          <li><strong>Rest of India:</strong> 4-7 Business Days</li>
        </ul>
        <h3 className="font-bold text-lg uppercase mb-4">International Shipping</h3>
        <p>We currently ship to select international locations. Shipping rates are calculated at checkout based on your region and order weight.</p>
      </>
    ),
    'returns-exchanges': (
      <>
        <p className="mb-6">We want you to love your gear. If something isn't right, we offer hassle-free returns and exchanges within 30 days of delivery.</p>
        <div className="border-l-4 border-black pl-6 my-8">
          <h4 className="font-bold uppercase text-sm mb-2">Return Policy</h4>
          <p className="text-sm text-zinc-600">Items must be unworn, unwashed, and with original tags attached. Underwear and socks are final sale for hygiene reasons.</p>
        </div>
        <button className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors">
          Initiate Return
        </button>
      </>
    ),
    'faqs': (
      <div className="space-y-6">
        {[
          { q: "How do I track my order?", a: "Once your order ships, you'll receive a tracking link via email and SMS." },
          { q: "What size should I get?", a: "Check our comprehensive Size Guide linked in the footer. If you're between sizes, we recommend sizing up for comfort or down for a compression fit." },
          { q: "Do you offer cash on delivery?", a: "Yes, COD is available for most pin codes across India." }
        ].map((faq, i) => (
          <div key={i} className="border-b border-zinc-200 pb-6">
            <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
            <p className="text-zinc-600">{faq.a}</p>
          </div>
        ))}
      </div>
    ),
    'size-guide': (
      <>
        <p className="mb-8">Find your perfect fit. Our gear is designed for an athletic, tapered fit.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-zinc-100 border-b border-zinc-200">
                <th className="p-4 font-bold uppercase">Size</th>
                <th className="p-4 font-bold uppercase">Chest (in)</th>
                <th className="p-4 font-bold uppercase">Waist (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <tr><td className="p-4 font-bold">S</td><td className="p-4">36-38</td><td className="p-4">28-30</td></tr>
              <tr><td className="p-4 font-bold">M</td><td className="p-4">38-40</td><td className="p-4">30-32</td></tr>
              <tr><td className="p-4 font-bold">L</td><td className="p-4">40-42</td><td className="p-4">32-34</td></tr>
              <tr><td className="p-4 font-bold">XL</td><td className="p-4">42-44</td><td className="p-4">34-36</td></tr>
            </tbody>
          </table>
        </div>
      </>
    )
  };

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
          {contentMap[slug] || (
            <>
              <p className="text-xl font-medium text-black">
                {title}
              </p>
              <p>
                This page is currently being updated. Please check back soon or contact our support team for assistance.
              </p>
            </>
          )}
        </div>
      </main>

      <Footer {...footerData} />
    </div>
  );
}
