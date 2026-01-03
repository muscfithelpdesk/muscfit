import HomepageInteractive from './components/HomepageInteractive';

export const metadata = {
  title: 'MUSCFIT - Premium Fitness Apparel | High-Performance Athletic Wear',
  description: 'Discover premium fitness apparel designed for peak performance. Shop high-quality athletic wear including compression gear, training essentials, and lifestyle collections for men and women.'
};

export default function Homepage() {
  const pageData = {
    promoBar: {
      message: "🔥 NEW YEAR SALE: Get 30% OFF on all compression wear | Free shipping on orders above ₹2,999",
      dismissible: true
    },

    hero: {
      title: "PEAK PERFORMANCE",
      subtitle: "BORN TO CONQUER",
      ctaPrimary: {
        text: "SHOP",
        href: "/men-catalog"
      },
      ctaSecondary: {
        text: "",
        href: ""
      },
      // High-quality gym/hoodie aesthetic image
      backgroundImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2600&auto=format&fit=crop",
      mobileHeroImage: "https://images.unsplash.com/photo-1548332441-ae3501183141?q=80&w=1000&auto=format&fit=crop",
      backgroundAlt: "Athlete in hoodie focused in gym environment"
    },

    features: [
      {
        id: 1,
        icon: "TruckIcon",
        title: "Free Express Shipping",
        description: "Fast delivery on orders above ₹2,999 across India"
      },
      {
        id: 2,
        icon: "ArrowPathIcon",
        title: "30-Day Easy Returns",
        description: "Hassle-free returns and exchanges within 30 days"
      },
      {
        id: 3,
        icon: "ShieldCheckIcon",
        title: "Premium Quality",
        description: "Certified fabrics with lifetime durability guarantee"
      },
      {
        id: 4,
        icon: "ChatBubbleLeftRightIcon",
        title: "24/7 Support",
        description: "Expert assistance available round the clock"
      }],


    categories: [
      {
        id: 1,
        name: "Shop Men",
        description: "Performance gear built for strength and endurance",
        image: "/assets/images/products/plain_black_tshirt_flat_lay_2_1767417716871.png",
        imageAlt: "Men's plain black compression shirt",
        href: "/men-catalog"
      },
      {
        id: 2,
        name: "Shop Women",
        description: "Empowering activewear for unstoppable athletes",
        image: "/assets/images/products/plain_black_leggings_flat_lay_1767417679501.png",
        imageAlt: "Women's plain black leggings",
        href: "/women-catalog"
      },
      {
        id: 3,
        name: "Compression Wear",
        description: "Advanced compression technology for peak performance",
        image: "/assets/images/products/plain_gray_hoodie_flat_lay_1767417698358.png",
        imageAlt: "Plain compression gear",
        href: "/compression-wear-catalog"
      }],


    featuredProducts: {
      title: "Bestselling Essentials",
      subtitle: "Discover our most-loved pieces trusted by athletes worldwide",
      products: [
        {
          id: 1,
          name: "Elite Performance Compression Tee",
          price: 1899,
          originalPrice: 2499,
          image: "/assets/images/products/plain_black_tshirt_flat_lay_2_1767417716871.png",
          imageAlt: "Plain black compression t-shirt",
          tag: "BESTSELLER",
          rating: 5,
          reviews: 342
        },
        {
          id: 2,
          name: "Pro Training Joggers",
          price: 2299,
          originalPrice: 2999,
          image: "/assets/images/products/plain_gray_joggers_flat_lay_2_1767417737544.png",
          imageAlt: "Plain gray athletic joggers",
          tag: "HOT",
          rating: 5,
          reviews: 289
        },
        {
          id: 3,
          name: "Women's Power Flex Leggings",
          price: 1699,
          originalPrice: 2199,
          image: "/assets/images/products/plain_black_leggings_flat_lay_1767417679501.png",
          imageAlt: "Plain black leggings",
          tag: "TRENDING",
          rating: 5,
          reviews: 456
        },
        {
          id: 4,
          name: "Muscle Fit Tank Top",
          price: 1299,
          image: "/assets/images/products/plain_white_tshirt_flat_lay_1767417660339.png",
          imageAlt: "Plain white tank top",
          tag: "NEW",
          rating: 4,
          reviews: 178
        },
        {
          id: 5,
          name: "Women's Sports Bra Elite",
          price: 1499,
          originalPrice: 1899,
          image: "/assets/images/products/plain_black_leggings_flat_lay_1767417679501.png",
          imageAlt: "Plain sports bra",
          tag: "SALE",
          rating: 5,
          reviews: 523
        },
        {
          id: 6,
          name: "Performance Training Shorts",
          price: 1599,
          image: "/assets/images/products/plain_gray_joggers_flat_lay_2_1767417737544.png",
          imageAlt: "Plain athletic shorts",
          tag: "BESTSELLER",
          rating: 5,
          reviews: 401
        },
        {
          id: 7,
          name: "Compression Arm Sleeves",
          price: 899,
          originalPrice: 1199,
          image: "/assets/images/products/plain_black_tshirt_flat_lay_2_1767417716871.png",
          imageAlt: "Plain compression sleeve",
          tag: "HOT",
          rating: 4,
          reviews: 267
        },
        {
          id: 8,
          name: "Premium Gym Hoodie",
          price: 2799,
          image: "/assets/images/products/plain_gray_hoodie_flat_lay_1767417698358.png",
          imageAlt: "Plain gray athletic hoodie",
          tag: "NEW",
          rating: 5,
          reviews: 198
        }]

    },

    stats: [
      {
        id: 1,
        icon: "UserGroupIcon",
        value: "50K+",
        label: "Active Athletes"
      },
      {
        id: 2,
        icon: "StarIcon",
        value: "4.9/5",
        label: "Customer Rating"
      },
      {
        id: 3,
        icon: "GlobeAltIcon",
        value: "100+",
        label: "Cities Served"
      },
      {
        id: 4,
        icon: "TrophyIcon",
        value: "25+",
        label: "Awards Won"
      }],


    parallaxBanner: {
      title: "Train Like a Champion",
      subtitle: "Join thousands of athletes who trust MUSCFIT for their training journey. Premium quality meets unbeatable performance.",
      ctaText: "Start Your Journey",
      ctaHref: "/men-catalog",
      backgroundImage: "https://images.unsplash.com/photo-1639511204381-09b09eddcf64",
      backgroundAlt: "Determined athlete lifting heavy barbell in dramatic gym lighting"
    },

    newArrivals: {
      title: "New Arrivals",
      subtitle: "Fresh drops designed to elevate your performance",
      products: [
        {
          id: 9,
          name: "Velocity Running Tights",
          price: 1999,
          image: "/assets/images/products/plain_black_leggings_flat_lay_1767417679501.png",
          imageAlt: "Plain black running tights",
          tag: "NEW",
          rating: 5,
          reviews: 89
        },
        {
          id: 10,
          name: "Women's Crop Training Top",
          price: 1399,
          image: "/assets/images/products/plain_white_tshirt_flat_lay_1767417660339.png",
          imageAlt: "Plain white crop top",
          tag: "NEW",
          rating: 4,
          reviews: 67
        },
        {
          id: 11,
          name: "Flex Fit Training Gloves",
          price: 799,
          image: "/assets/images/products/plain_black_tshirt_flat_lay_2_1767417716871.png",
          imageAlt: "Plain training gloves (placeholder image)",
          tag: "NEW",
          rating: 5,
          reviews: 134
        },
        {
          id: 12,
          name: "Performance Crew Socks",
          price: 499,
          image: "/assets/images/products/plain_white_tshirt_flat_lay_1767417660339.png",
          imageAlt: "Plain white socks (placeholder image)",
          tag: "NEW",
          rating: 4,
          reviews: 201
        }]

    },

    video: {
      title: "Experience MUSCFIT",
      subtitle: "See how our premium athletic wear transforms your training",
      thumbnailImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1ebf7ad66-1764766557650.png",
      thumbnailAlt: "Fitness trainer demonstrating workout technique in professional gym environment",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },

    brandStory: {
      title: "Built for Champions, Worn by Warriors",
      content: [
        "MUSCFIT was born from a simple belief: athletes deserve gear that matches their dedication. We create premium athletic wear engineered with precision and tested by professionals.",
        "Every detail is designed with your performance in mind. Join the community of athletes who choose MUSCFIT."
      ],

      image: "https://img.rocket.new/generatedImages/rocket_gen_img_129733409-1764779896324.png",
      imageAlt: "Diverse group of athletes wearing MUSCFIT apparel celebrating together in gym"
    },

    testimonials: {
      title: "What Athletes Say",
      subtitle: "Real feedback from our community of champions",
      items: [
        {
          id: 1,
          name: "Rajesh Kumar",
          role: "Professional Bodybuilder",
          content: "MUSCFIT compression gear has completely transformed my training. The quality is unmatched, and I can feel the difference in my performance. These aren't just clothes – they're performance enhancers!",
          rating: 5,
          avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16829c3d1-1764649917360.png",
          avatarAlt: "Professional male bodybuilder with short black hair in navy tank top"
        },
        {
          id: 2,
          name: "Priya Sharma",
          role: "Yoga Instructor & Fitness Coach",
          content: "As someone who trains clients daily, I need gear that can keep up. MUSCFIT leggings offer perfect flexibility and support. The fabric quality is exceptional, and they look amazing too!",
          rating: 5,
          avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ae819c95-1763294232847.png",
          avatarAlt: "Female yoga instructor with long brown hair in white athletic wear"
        },
        {
          id: 3,
          name: "Arjun Patel",
          role: "Marathon Runner",
          content: "I've tried countless brands, but MUSCFIT stands out. Their running gear is lightweight, breathable, and durable. After 6 months of intense training, my gear still looks brand new!",
          rating: 5,
          avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_177494afc-1765810586590.png",
          avatarAlt: "Male marathon runner with athletic build in red running shirt"
        }]

    },

    trustBadges: [
      {
        id: 1,
        icon: "ShieldCheckIcon",
        title: "100% Secure",
        description: "SSL encrypted checkout"
      },
      {
        id: 2,
        icon: "CheckBadgeIcon",
        title: "Certified Quality",
        description: "ISO certified fabrics"
      },
      {
        id: 3,
        icon: "TruckIcon",
        title: "Fast Delivery",
        description: "2-4 days shipping"
      },
      {
        id: 4,
        icon: "HeartIcon",
        title: "Made with Love",
        description: "Crafted in India"
      }],


    instagram: {
      title: "Follow Our Journey",
      handle: "muscfit_official",
      images: [
        {
          id: 1,
          src: "/assets/images/products/plain_black_tshirt_flat_lay_2_1767417716871.png",
          alt: "Plain black t-shirt",
          link: "https://instagram.com/p/example1"
        },
        {
          id: 2,
          src: "/assets/images/products/plain_black_leggings_flat_lay_1767417679501.png",
          alt: "Plain black leggings",
          link: "https://instagram.com/p/example2"
        },
        {
          id: 3,
          src: "/assets/images/products/plain_gray_joggers_flat_lay_2_1767417737544.png",
          alt: "Plain gray joggers",
          link: "https://instagram.com/p/example3"
        },
        {
          id: 4,
          src: "/assets/images/products/plain_white_tshirt_flat_lay_1767417660339.png",
          alt: "Plain white t-shirt",
          link: "https://instagram.com/p/example4"
        },
        {
          id: 5,
          src: "/assets/images/products/plain_gray_hoodie_flat_lay_1767417698358.png",
          alt: "Plain gray hoodie",
          link: "https://instagram.com/p/example5"
        },
        {
          id: 6,
          src: "/assets/images/products/plain_black_shorts_flat_lay_1767418127534.png",
          alt: "Plain athletic shorts",
          link: "https://instagram.com/p/example6"
        },
        {
          id: 7,
          src: "/assets/images/products/plain_black_tshirt_flat_lay_2_1767417716871.png",
          alt: "Plain compression wear",
          link: "https://instagram.com/p/example7"
        },
        {
          id: 8,
          src: "/assets/images/products/plain_gray_joggers_flat_lay_2_1767417737544.png",
          alt: "Plain joggers",
          link: "https://instagram.com/p/example8"
        }]

    },

    community: [
      {
        id: 1,
        icon: "UserGroupIcon",
        value: "50K+",
        label: "Instagram Followers"
      },
      {
        id: 2,
        icon: "HeartIcon",
        value: "100K+",
        label: "Monthly Engagements"
      },
      {
        id: 3,
        icon: "ChatBubbleLeftRightIcon",
        value: "5K+",
        label: "Community Members"
      },
      {
        id: 4,
        icon: "SparklesIcon",
        value: "1M+",
        label: "Lives Transformed"
      }],


    newsletter: {
      title: "Join the MUSCFIT Family",
      subtitle: "Get exclusive access to new drops, special offers, and fitness tips delivered to your inbox"
    },

    footer: {
      columns: [
        {
          id: 1,
          title: "Shop",
          links: [
            { id: 1, label: "Men\'s Collection", href: "/men-catalog" },
            { id: 2, label: "Women\'s Collection", href: "/women-catalog" },
            { id: 3, label: "Compression Wear", href: "/compression-wear-catalog" },
            { id: 4, label: "New Arrivals", href: "/men-catalog?filter=new" },
            { id: 5, label: "Best Sellers", href: "/men-catalog?filter=bestseller" }]

        },
        {
          id: 2,
          title: "Support",
          links: [
            { id: 1, label: "Contact Us", href: "/homepage" },
            { id: 2, label: "Size Guide", href: "/homepage" },
            { id: 3, label: "Shipping Info", href: "/homepage" },
            { id: 4, label: "Returns & Exchanges", href: "/homepage" },
            { id: 5, label: "FAQs", href: "/homepage" }]

        },
        {
          id: 3,
          title: "Company",
          links: [
            { id: 1, label: "About Us", href: "/homepage" },
            { id: 2, label: "Careers", href: "/homepage" },
            { id: 3, label: "Sustainability", href: "/homepage" },
            { id: 4, label: "Press", href: "/homepage" },
            { id: 5, label: "Blog", href: "/homepage" }]

        },
        {
          id: 4,
          title: "Legal",
          links: [
            { id: 1, label: "Privacy Policy", href: "/homepage" },
            { id: 2, label: "Terms of Service", href: "/homepage" },
            { id: 3, label: "Cookie Policy", href: "/homepage" },
            { id: 4, label: "Accessibility", href: "/homepage" }]

        }],

      socialLinks: [
        { id: 1, icon: "AtSymbolIcon", href: "https://instagram.com/muscfit", label: "Instagram" },
        { id: 2, icon: "PlayIcon", href: "https://youtube.com/muscfit", label: "YouTube" },
        { id: 3, icon: "ChatBubbleLeftIcon", href: "https://facebook.com/muscfit", label: "Facebook" },
        { id: 4, icon: "HashtagIcon", href: "https://twitter.com/muscfit", label: "Twitter" }],

      paymentMethods: [
        { id: 1, icon: "CreditCardIcon" },
        { id: 2, icon: "BanknotesIcon" },
        { id: 3, icon: "DevicePhoneMobileIcon" },
        { id: 4, icon: "ShieldCheckIcon" }]

    }
  };

  return <HomepageInteractive pageData={pageData} />;
}
