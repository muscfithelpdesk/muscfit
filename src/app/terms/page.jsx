import Header from '@/components/common/Header';
import Footer from '@/app/homepage/components/Footer';

export const metadata = {
    title: 'Terms of Use | MUSCFIT',
    description: 'Read the Terms of Use for MUSCFIT regarding your access and use of our fitness apparel and services.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow pt-[100px] md:pt-[150px] pb-16">
                <div className="max-w-4xl mx-auto px-4 md:px-8">
                    <h1 className="text-3xl md:text-5xl font-heading font-black mb-8 italic uppercase text-center">
                        Terms of Use
                    </h1>

                    <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                        <p className="font-bold">Last Updated: January 14, 2026</p>

                        <p>
                            Welcome to MUSCFIT. By accessing or using our website, mobile application, and services, you agree to be bound by these Terms of Use ("Terms"). Please read them carefully.
                        </p>

                        <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using our Services, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any of these Terms, you are prohibited from using or accessing this site.
                        </p>

                        <h2 className="text-2xl font-bold text-black mt-8 mb-4">2. Use License</h2>
                        <p>
                            Permission is granted to temporarily download one copy of the materials (information or software) on MUSCFIT's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                        </p>

                        <h2 className="text-2xl font-bold text-black mt-8 mb-4">3. User Accounts</h2>
                        <p>
                            To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                        </p>

                        <h2 className="text-2xl font-bold text-black mt-8 mb-4">4. Product Information</h2>
                        <p>
                            We attempt to be as accurate as possible. However, we do not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free.
                        </p>

                        <h2 className="text-2xl font-bold text-black mt-8 mb-4">5. Modifications</h2>
                        <p>
                            MUSCFIT reserves the right to revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                        </p>

                        <h2 className="text-2xl font-bold text-black mt-8 mb-4">6. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at support@muscfit.com.
                        </p>
                    </div>
                </div>
            </main>
            <Footer
                columns={[
                    {
                        title: 'Shop',
                        links: [
                            { text: 'Men', href: '/men-catalog' },
                            { text: 'Women', href: '/women-catalog' },
                            { text: 'Accessories', href: '/search?q=accessories' },
                            { text: 'New Arrivals', href: '/#new-arrivals' },
                        ],
                    },
                    {
                        title: 'Support',
                        links: [
                            { text: 'Help Center', href: '#' },
                            { text: 'Returns & Exchanges', href: '#' },
                            { text: 'Shipping Info', href: '#' },
                            { text: 'Track Order', href: '#' },
                        ],
                    },
                    {
                        title: 'Company',
                        links: [
                            { text: 'About Us', href: '#' },
                            { text: 'Careers', href: '#' },
                            { text: 'Privacy Policy', href: '/privacy' },
                            { text: 'Terms of Service', href: '/terms' },
                        ],
                    },
                ]}
                socialLinks={[
                    { platform: 'Instagram', url: '#' },
                    { platform: 'Twitter', url: '#' },
                    { platform: 'Facebook', url: '#' },
                    { platform: 'YouTube', url: '#' },
                ]}
                paymentMethods={[]}
            />
        </div>
    );
}
