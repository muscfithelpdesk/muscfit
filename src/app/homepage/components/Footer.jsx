import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function Footer({ columns, socialLinks, paymentMethods }) {
  const currentYear = new Date()?.getFullYear();

  return (
    <footer className="bg-white text-black pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">

        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16">

          {/* Left Side: Navigation Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
            {columns?.slice(0, 3)?.map((column) => (
              <div key={column?.id}>
                <h3 className="font-heading text-base font-bold uppercase tracking-wider mb-6">
                  {column?.title === 'Shop' ? 'Help' : column?.title === 'Support' ? 'My Account' : 'Pages'}
                </h3>
                <ul className="space-y-3">
                  {column?.links?.map((link) => (
                    <li key={link?.id}>
                      <Link
                        href={link?.href}
                        className="text-sm text-zinc-600 hover:text-black hover:underline transition-all duration-200 font-medium"
                      >
                        {link?.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Side: Visual Section (More About) */}
          <div className="w-full lg:w-[400px]">
            <h3 className="font-heading text-base font-bold uppercase tracking-wider mb-6">
              More About Muscfit
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 lg:pb-0 lg:grid lg:grid-cols-3 lg:gap-4 no-scrollbar">
              {/* Card 1: Blog */}
              <div className="flex-shrink-0 w-[120px] lg:w-auto">
                <div className="bg-black aspect-square flex items-center justify-center p-4 mb-2">
                  <span className="text-white font-heading font-black text-xl italic text-center leading-none">MUSCFIT<br /><span className="text-xs font-normal not-italic tracking-widest text-zinc-400">CENTRAL</span></span>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider">Blog</p>
              </div>

              {/* Card 2: Student Discount */}
              <div className="flex-shrink-0 w-[120px] lg:w-auto">
                <div className="bg-black aspect-square flex items-center justify-center p-4 mb-2">
                  <div className="text-center">
                    <span className="text-white font-heading font-black text-xl italic block mb-1">STUDENTS</span>
                    <span className="text-white text-[10px] font-bold border border-white px-1">10% OFF</span>
                  </div>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider">Student Discount</p>
              </div>

              {/* Card 3: Email Sign Up */}
              <div className="flex-shrink-0 w-[120px] lg:w-auto">
                <div className="bg-black aspect-square flex items-center justify-center p-4 mb-2">
                  <Icon name="EnvelopeIcon" className="text-white w-8 h-8" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider">Email Sign Up</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payment & Socials */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8 mb-12">

          {/* Payment Methods (Left) */}
          <div className="flex items-center gap-3">
            {paymentMethods?.map((method) => (
              <div
                key={method?.id}
                className="w-10 h-7 bg-white border border-gray-200 rounded-[2px] flex items-center justify-center"
              >
                <Icon name={method?.icon} size={20} className="text-zinc-800" />
              </div>
            ))}
            <div className="w-10 h-7 bg-black text-white rounded-[2px] flex items-center justify-center text-[10px] font-bold">
              PAY
            </div>
          </div>

          {/* Social Icons (Right) */}
          <div className="flex items-center gap-6">
            {socialLinks?.map((social) => (
              <a
                key={social?.id}
                href={social?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-zinc-600 transition-colors"
                aria-label={social?.label}
              >
                <Icon name={social?.icon} size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-500">
          <p>© {currentYear} | Muscfit Limited | All Rights Reserved. | We Do Gym.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-black">Terms and Conditions</Link>
            <Link href="#" className="hover:text-black">Terms of Use</Link>
            <Link href="#" className="hover:text-black">Privacy Notice</Link>
            <Link href="#" className="hover:text-black">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          label: PropTypes.string.isRequired,
          href: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  paymentMethods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired
    })
  ).isRequired
};
