import Header from '@/components/common/Header';
import Footer from '@/app/homepage/components/Footer';

export const metadata = {
    title: 'Privacy Policy | MUSCFIT',
    description: 'Read the Privacy Policy for MUSCFIT to understand how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow pt-[100px] md:pt-[150px] pb-16">
                <div className="max-w-4xl mx-auto px-4 md:px-8">
                    <h1 className="text-3xl md:text-5xl font-heading font-black mb-8 italic uppercase text-center">
                        Privacy Policy
                    </h1>

                    <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                        <p className="font-bold">Last Updated: January 14, 2026</p>

                        <p>
                            At MUSCFIT, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                        </p>

                        <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. Information We Collect</h2>
                        <p>
                            We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or participate in activities on the website.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Name and contact data</li>
                            <li>Credentials (passwords, hints)</li>
                            <li>Payment data (processed securely by third-party processors)</li>
                            <li>Order history and preferences</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-black mt-8 mb-4">2. How We Use Your Information</h2>
                        <p>
                            We use personal information collected via our website for a variety of business purposes described below:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>To facilitate account creation and logon process</li>
                            <li>To send you product and service information</li>
                            <li>To fulfill and manage your orders</li>
                            <li>To improve your user experience</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-black mt-8 mb-4">3. Sharing Your Information</h2>
                        <p>
                            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We do not sell your personal information to third parties.
                        </p>

                        <h2 className="text-2xl font-bold text-black mt-8 mb-4">4. Security of Your Information</h2>
                        <p>
                            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                        </p>

                        <h2 className="text-2xl font-bold text-black mt-8 mb-4">5. Contact Us</h2>
                        <p>
                            If you have questions or comments about this policy, you may email us at privacy@muscfit.com.
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
