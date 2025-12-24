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
      title: "Unleash Your Inner Strength",
      subtitle: "Premium athletic wear engineered for champions. Experience unmatched comfort, durability, and style that moves with you.",
      ctaPrimary: {
        text: "Shop Collection",
        href: "/men-catalog"
      },
      ctaSecondary: {
        text: "Explore New Arrivals",
        href: "/women-catalog"
      },
      backgroundImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e7b2cbd2-1764832705851.png",
      backgroundAlt: "Athletic man performing intense workout in modern gym with weights"
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
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_10b163d59-1765598781878.png",
      imageAlt: "Muscular man in black compression shirt performing bicep curl with dumbbell",
      href: "/men-catalog"
    },
    {
      id: 2,
      name: "Shop Women",
      description: "Empowering activewear for unstoppable athletes",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1994e8396-1764671660275.png",
      imageAlt: "Athletic woman in pink sports bra doing plank exercise on yoga mat",
      href: "/women-catalog"
    },
    {
      id: 3,
      name: "Compression Wear",
      description: "Advanced compression technology for peak performance",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1253f3d4f-1765215462666.png",
      imageAlt: "Close-up of athlete wearing black compression sleeve on arm during workout",
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
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c8897b48-1764674830485.png",
        imageAlt: "Black compression t-shirt with red accents on athletic male model",
        tag: "BESTSELLER",
        rating: 5,
        reviews: 342
      },
      {
        id: 2,
        name: "Pro Training Joggers",
        price: 2299,
        originalPrice: 2999,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_19ab70b1e-1764674676456.png",
        imageAlt: "Gray athletic joggers with tapered fit on male model in gym setting",
        tag: "HOT",
        rating: 5,
        reviews: 289
      },
      {
        id: 3,
        name: "Women\'s Power Flex Leggings",
        price: 1699,
        originalPrice: 2199,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1015581cc-1764657200544.png",
        imageAlt: "Black high-waisted leggings on female athlete doing stretching pose",
        tag: "TRENDING",
        rating: 5,
        reviews: 456
      },
      {
        id: 4,
        name: "Muscle Fit Tank Top",
        price: 1299,
        image: "https://images.unsplash.com/photo-1606889464198-fcb18894cf50",
        imageAlt: "White sleeveless tank top on muscular male model showing arm definition",
        tag: "NEW",
        rating: 4,
        reviews: 178
      },
      {
        id: 5,
        name: "Women\'s Sports Bra Elite",
        price: 1499,
        originalPrice: 1899,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_10021dce6-1764779494722.png",
        imageAlt: "Red high-support sports bra on female athlete in workout position",
        tag: "SALE",
        rating: 5,
        reviews: 523
      },
      {
        id: 6,
        name: "Performance Training Shorts",
        price: 1599,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_141043265-1765255836176.png",
        imageAlt: "Black athletic shorts with side pockets on male model in running stance",
        tag: "BESTSELLER",
        rating: 5,
        reviews: 401
      },
      {
        id: 7,
        name: "Compression Arm Sleeves",
        price: 899,
        originalPrice: 1199,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1253f3d4f-1765215462666.png",
        imageAlt: "Black compression sleeve on athletic arm during weight training",
        tag: "HOT",
        rating: 4,
        reviews: 267
      },
      {
        id: 8,
        name: "Premium Gym Hoodie",
        price: 2799,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_19712f0ac-1765215691230.png",
        imageAlt: "Gray athletic hoodie with zipper on male model in casual gym pose",
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
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd5fc460-1764692437812.png",
        imageAlt: "Black compression running tights on male athlete in running position",
        tag: "NEW",
        rating: 5,
        reviews: 89
      },
      {
        id: 10,
        name: "Women\'s Crop Training Top",
        price: 1399,
        image: "https://images.unsplash.com/photo-1684298126489-47bf948c3fb8",
        imageAlt: "White cropped athletic top on female model showing midriff during workout",
        tag: "NEW",
        rating: 4,
        reviews: 67
      },
      {
        id: 11,
        name: "Flex Fit Training Gloves",
        price: 799,
        image: "https://images.unsplash.com/photo-1683147778349-e09dd723f886",
        imageAlt: "Black fingerless workout gloves on hands gripping barbell",
        tag: "NEW",
        rating: 5,
        reviews: 134
      },
      {
        id: 12,
        name: "Performance Crew Socks",
        price: 499,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fcc5f462-1764674831278.png",
        imageAlt: "White athletic crew socks with red stripes on feet during exercise",
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
      "MUSCFIT was born from a simple belief: athletes deserve gear that matches their dedication. Founded in 2020 by fitness enthusiasts who understood the gap between ordinary activewear and true performance gear, we set out to create something different.",
      "Every piece in our collection is engineered with precision, tested by professional athletes, and crafted from premium materials that deliver unmatched comfort and durability. We don't just make clothes – we create tools that help you push your limits.",
      "From compression technology that enhances blood flow to moisture-wicking fabrics that keep you dry during intense sessions, every detail is designed with your performance in mind. Join thousands of athletes who have made MUSCFIT their training partner of choice."],

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
        src: "https://images.unsplash.com/photo-1674748596342-8fd299450a71",
        alt: "Athlete performing deadlift with heavy barbell in gym",
        link: "https://instagram.com/p/example1"
      },
      {
        id: 2,
        src: "https://img.rocket.new/generatedImages/rocket_gen_img_1994e8396-1764671660275.png",
        alt: "Female athlete doing plank exercise on yoga mat outdoors",
        link: "https://instagram.com/p/example2"
      },
      {
        id: 3,
        src: "https://img.rocket.new/generatedImages/rocket_gen_img_10b163d59-1765598781878.png",
        alt: "Muscular man doing bicep curls with dumbbells in gym",
        link: "https://instagram.com/p/example3"
      },
      {
        id: 4,
        src: "https://img.rocket.new/generatedImages/rocket_gen_img_165add0ba-1764814294696.png",
        alt: "Woman in black leggings doing stretching pose on exercise mat",
        link: "https://instagram.com/p/example4"
      },
      {
        id: 5,
        src: "https://images.unsplash.com/photo-1645458358583-a4ca50ea3aa8",
        alt: "Athletic man in white tank top showing muscular arms",
        link: "https://instagram.com/p/example5"
      },
      {
        id: 6,
        src: "https://images.unsplash.com/photo-1574680088814-c9e8a10d8a4d",
        alt: "Determined athlete lifting barbell in dramatic gym lighting",
        link: "https://instagram.com/p/example6"
      },
      {
        id: 7,
        src: "https://img.rocket.new/generatedImages/rocket_gen_img_1253f3d4f-1765215462666.png",
        alt: "Close-up of compression sleeve on athletic arm during workout",
        link: "https://instagram.com/p/example7"
      },
      {
        id: 8,
        src: "https://img.rocket.new/generatedImages/rocket_gen_img_1fcbed1e8-1765542852158.png",
        alt: "Male model wearing black compression shirt in gym setting",
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