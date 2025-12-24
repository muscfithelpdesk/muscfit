import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function Footer({ columns, socialLinks, paymentMethods }) {
  const currentYear = new Date()?.getFullYear();

  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {columns?.map((column) => (
            <div key={column?.id}>
              <h3 className="font-heading text-base md:text-lg font-semibold text-white mb-4">
                {column?.title}
              </h3>
              <ul className="space-y-2">
                {column?.links?.map((link) => (
                  <li key={link?.id}>
                    <Link
                      href={link?.href}
                      className="text-sm md:text-base text-gray-400 hover:text-primary transition-colors duration-250"
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-black pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.id}
                  href={social?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-250 border border-gray-700"
                  aria-label={social?.label}
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs md:text-sm text-gray-500">Secure Payment:</span>
              {paymentMethods?.map((method) => (
                <div
                  key={method?.id}
                  className="w-10 h-6 bg-white rounded-sm flex items-center justify-center"
                >
                  <Icon name={method?.icon} size={16} className="text-gray-700" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs md:text-sm text-gray-500">
              © {currentYear} MUSCFIT. All rights reserved. | Premium Fitness Apparel
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  columns: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      title: PropTypes?.string?.isRequired,
      links: PropTypes?.arrayOf(
        PropTypes?.shape({
          id: PropTypes?.number?.isRequired,
          label: PropTypes?.string?.isRequired,
          href: PropTypes?.string?.isRequired
        })
      )?.isRequired
    })
  )?.isRequired,
  socialLinks: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      icon: PropTypes?.string?.isRequired,
      href: PropTypes?.string?.isRequired,
      label: PropTypes?.string?.isRequired
    })
  )?.isRequired,
  paymentMethods: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      icon: PropTypes?.string?.isRequired
    })
  )?.isRequired
};