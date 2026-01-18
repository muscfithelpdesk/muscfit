'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useRouter, usePathname } from 'next/navigation';

import Image from 'next/image';
import { productService } from '@/lib/services/productService'; // Import Service

export default function Header({ topOffset = 0, isFixed = true }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // Add suggestions state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isSearchEntering, setIsSearchEntering] = useState(false);

  const { user, signOut } = useAuth();
  const { cartItems, cartCount, cartTotal, removeFromCart, isSidebarOpen, setIsSidebarOpen } = useCart();

  useEffect(() => {
    if (isSidebarOpen) {
      setIsCartOpen(true);
      // Reset after opening so it doesn't get stuck open if user manually closes
      // But actually we might want to just sync them. For now, this is simple.
      setIsSidebarOpen(false);
    }
  }, [isSidebarOpen, setIsSidebarOpen]);

  const searchRef = useRef(null);
  const overlayRef = useRef(null);
  const cartRef = useRef(null);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menDropdownRef = useRef(null);
  const womenDropdownRef = useRef(null);
  const compressionDropdownRef = useRef(null);

  const [isMenDropdownOpen, setIsMenDropdownOpen] = useState(false);
  const [isWomenDropdownOpen, setIsWomenDropdownOpen] = useState(false);
  const [isCompressionDropdownOpen, setIsCompressionDropdownOpen] = useState(false);
  const [isAccessoriesDropdownOpen, setIsAccessoriesDropdownOpen] = useState(false);

  // Mobile accordion states
  const [activeMobileCategory, setActiveMobileCategory] = useState(null);

  // Check if current page is an admin page
  const isAdminPage = pathname?.startsWith('/admin-');

  const navigationCategories = {
    men: {
      label: 'Men',
      path: '/men-catalog',
      subcategories: [
        { name: 'Topwear', path: '/men-catalog?category=Topwear' },
        { name: 'Bottomwear', path: '/men-catalog?category=Bottomwear' },
        { name: 'Innerwear', path: '/men-catalog?category=Innerwear' },
      ],
      featuredImage: '/assets/images/no_image.png',
      featuredAlt: "Men's athletic wear collection",
    },
    women: {
      label: 'Women',
      path: '/women-catalog',
      subcategories: [
        { name: 'Topwear', path: '/women-catalog?category=Topwear' },
        { name: 'Bottomwear', path: '/women-catalog?category=Bottomwear' },
        { name: 'Innerwear', path: '/women-catalog?category=Innerwear' },
      ],
      featuredImage: '/assets/images/no_image.png',
      featuredAlt: "Women's athletic wear collection",
    },
    compression: {
      label: 'Compression Series',
      path: '/compression-wear-catalog',
      subcategories: [
        { name: 'Topwear', path: '/compression-wear-catalog?category=Topwear' },
        { name: 'Bottomwear', path: '/compression-wear-catalog?category=Bottomwear' },
        { name: 'Full Body', path: '/compression-wear-catalog?category=Full Body' },
      ],
      featuredImage: '/assets/images/compression-featured.png',
      featuredAlt: 'Compression wear collection',
    },
    accessories: {
      label: 'Accessories',
      path: '/search?q=accessories',
      subcategories: [
        { name: 'Gym Bags', path: '/#explore-accessories-gym-bags' },
        { name: 'Equipment', path: '/#explore-accessories-equipment' },
        { name: 'Supplements', path: '/#explore-accessories-supplements' },
      ],
      featuredImage: '/assets/images/no_image.png',
      featuredAlt: 'Fitness accessories collection',
    },
  };



  const recentSearches = ['compression shirts', 'running shorts', 'training gear'];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event) => {
      if (
        searchRef?.current &&
        !searchRef?.current?.contains(event?.target) &&
        overlayRef?.current &&
        !overlayRef?.current?.contains(event?.target)
      ) {
        setIsSearchOpen(false);
      }
      if (cartRef?.current && !cartRef?.current?.contains(event?.target)) {
        setIsCartOpen(false);
      }
      if (profileRef?.current && !profileRef?.current?.contains(event?.target)) {
        setIsProfileOpen(false);
      }
      if (mobileMenuRef?.current && !mobileMenuRef?.current?.contains(event?.target)) {
        setIsMobileMenuOpen(false);
      }
      if (menDropdownRef?.current && !menDropdownRef?.current?.contains(event?.target)) {
        setIsMenDropdownOpen(false);
      }
      if (womenDropdownRef?.current && !womenDropdownRef?.current?.contains(event?.target)) {
        setIsWomenDropdownOpen(false);
      }
      if (
        compressionDropdownRef?.current &&
        !compressionDropdownRef?.current?.contains(event?.target)
      ) {
        setIsCompressionDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        setIsSearchOpen(false);
        setIsCartOpen(false);
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
        setIsMenDropdownOpen(false);
        setIsWomenDropdownOpen(false);
        setIsCompressionDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen, isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      router?.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSuggestions([]); // Clear suggestions
    }
  };

  // Autocomplete Handler
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length > 0) {
        const results = await productService.getSuggestions(searchQuery);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);



  const handleLogout = async () => {
    const result = await signOut();
    if (result?.success) {
      router?.push('/user-authentication');
    }
  };

  return (
    <>
      <header
        className={`${isFixed ? 'fixed left-0 right-0 z-50' : 'relative'} transition-all duration-300 bg-background shadow-sharp border-b border-gray-100`}
        style={{
          top: isFixed ? (scrolled ? '0' : `${topOffset}px`) : 'auto',
          '--header-height': scrolled ? '110px' : '160px',
        }}
      >
        <div
          className={`flex items-center justify-between transition-all duration-300 px-4 md:px-8 lg:px-12 ${scrolled ? 'h-[86px] md:h-[96px]' : 'h-[106px] md:h-[136px]'}`}
        >
          {/* Left Group: Logo and Nav */}
          <div className="flex items-center gap-2 md:gap-6 lg:gap-10 h-full flex-shrink-0">
            {!isAdminPage && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-text-secondary hover:text-primary transition-colors duration-250 z-20"
                aria-label="Menu"
              >
                <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
              </button>
            )}

            <Link
              href="/"
              className="z-50 flex items-center flex-shrink-0 relative"
            >
              <div className={`relative transition-all duration-300 ${scrolled ? 'h-[50px] w-[120px] md:w-[180px] md:h-[60px]' : 'h-[60px] w-[140px] md:h-[80px] md:w-[240px]'}`}>
                <Image
                  src="/assets/images/logo-v4.png"
                  alt="MUSCFIT Logo"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 150px, 240px"
                />
              </div>
            </Link>

            {/* Center Navigation - Desktop - Grouped with Logo */}
            {!isAdminPage && (
              <nav className="hidden md:flex items-center gap-5 lg:gap-8 h-full mr-8 lg:mr-16">
                {/* Men Navigation Item */}
                <div className="relative" ref={menDropdownRef}>
                  <button
                    onMouseEnter={() => {
                      setIsMenDropdownOpen(true);
                      setIsWomenDropdownOpen(false);
                      setIsCompressionDropdownOpen(false);
                      setIsAccessoriesDropdownOpen(false);
                    }}
                    className="font-heading text-lg font-bold text-text-secondary hover:text-primary transition-colors duration-250 relative group flex items-center gap-1 py-4"
                  >
                    {navigationCategories?.men?.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-250"></span>
                  </button>

                  {isMenDropdownOpen && (
                    <div
                      onMouseLeave={() => setIsMenDropdownOpen(false)}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-background border border-border shadow-sharp-lg rounded-xl animate-scale-in-origin-top z-40 overflow-hidden"
                    >
                      <div className="flex h-[350px]">
                        {/* Subcategories */}
                        <div className="w-2/5 h-full bg-surface/50 p-6 flex flex-col justify-center">
                          <h3 className="font-heading text-xl font-bold mb-6 text-foreground">
                            Men&apos;s Gear
                          </h3>
                          <div className="space-y-4">
                            {navigationCategories?.men?.subcategories?.map((subcat) => (
                              <Link
                                key={subcat?.path}
                                href={subcat?.path}
                                className="group/item flex items-center justify-between text-base font-medium text-text-secondary hover:text-primary hover:translate-x-1 transition-all duration-250"
                                onClick={() => setIsMenDropdownOpen(false)}
                              >
                                {subcat?.name}
                                <Icon
                                  name="ChevronRightIcon"
                                  size={16}
                                  className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-250"
                                />
                              </Link>
                            ))}
                            <Link
                              href={navigationCategories?.men?.path}
                              className="inline-block mt-4 text-sm font-bold text-primary border-b border-primary pb-0.5 hover:opacity-80"
                            >
                              Shop All Men
                            </Link>
                          </div>
                        </div>

                        {/* Featured Image */}
                        <div className="w-3/5 h-full relative group cursor-pointer">
                          <Image
                            src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop"
                            alt="Men's Featured"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 z-10">
                            <span className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">
                              New Collection
                            </span>
                            <h4 className="text-white font-heading text-2xl font-bold">
                              Unleash Power
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Women Navigation Item */}
                <div className="relative" ref={womenDropdownRef}>
                  <button
                    onMouseEnter={() => {
                      setIsWomenDropdownOpen(true);
                      setIsMenDropdownOpen(false);
                      setIsCompressionDropdownOpen(false);
                      setIsAccessoriesDropdownOpen(false);
                    }}
                    className="font-heading text-lg font-bold text-text-secondary hover:text-primary transition-colors duration-250 relative group flex items-center gap-1 py-4"
                  >
                    {navigationCategories?.women?.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-250"></span>
                  </button>

                  {isWomenDropdownOpen && (
                    <div
                      onMouseLeave={() => setIsWomenDropdownOpen(false)}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[650px] bg-background border border-border shadow-sharp-lg rounded-xl animate-scale-in-origin-top z-40 overflow-hidden"
                    >
                      <div className="flex h-[350px]">
                        {/* Featured Image Left */}
                        <div className="w-1/2 h-full relative group cursor-pointer border-r border-border">
                          <Image
                            src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop"
                            alt="Women's Featured"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 350px"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center z-10">
                            <h4 className="text-white font-heading text-3xl font-bold border-2 border-white px-4 py-2">
                              WOMEN
                            </h4>
                          </div>
                        </div>

                        {/* Subcategories Right */}
                        <div className="w-1/2 h-full bg-background p-8 flex flex-col items-start justify-center">
                          <div className="space-y-5 w-full">
                            {navigationCategories?.women?.subcategories?.map((subcat) => (
                              <Link
                                key={subcat?.path}
                                href={subcat?.path}
                                className="group/item flex items-center gap-3 text-lg font-medium text-text-secondary hover:text-primary transition-all duration-250"
                                onClick={() => setIsWomenDropdownOpen(false)}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover/item:bg-primary transition-colors"></span>
                                {subcat?.name}
                              </Link>
                            ))}
                            <Link
                              href={navigationCategories?.women?.path}
                              className="block mt-6 px-6 py-2 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-colors text-center"
                            >
                              View All
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Compression Series Navigation Item */}
                <div className="relative" ref={compressionDropdownRef}>
                  <button
                    onMouseEnter={() => {
                      setIsCompressionDropdownOpen(true);
                      setIsMenDropdownOpen(false);
                      setIsWomenDropdownOpen(false);
                      setIsAccessoriesDropdownOpen(false);
                    }}
                    className="font-heading text-base lg:text-lg font-bold text-text-secondary hover:text-primary transition-colors duration-250 relative group flex items-center gap-1 py-4 whitespace-nowrap"
                  >
                    {navigationCategories?.compression?.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-250"></span>
                  </button>

                  {isCompressionDropdownOpen && (
                    <div
                      onMouseLeave={() => setIsCompressionDropdownOpen(false)}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-background border border-border shadow-sharp-lg rounded-xl animate-scale-in-origin-top z-40 overflow-hidden"
                    >
                      <div className="flex h-[380px]">
                        <div className="w-1/3 bg-surface/50 p-6 flex flex-col justify-between relative overflow-hidden border-r border-border">
                          <div className="relative z-10">
                            <h3 className="text-foreground font-heading text-2xl font-bold leading-tight">
                              Elite
                              <br />
                              Compression
                            </h3>
                            <p className="text-text-secondary text-xs mt-2 font-medium">
                              Maximize focus. Minimize fatigue.
                            </p>
                          </div>
                          <div className="space-y-2 relative z-10">
                            {navigationCategories?.compression?.subcategories?.map((subcat) => (
                              <Link
                                key={subcat?.path}
                                href={subcat?.path}
                                className="block text-text-secondary hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-md text-sm font-semibold transition-colors"
                                onClick={() => setIsCompressionDropdownOpen(false)}
                              >
                                {subcat?.name}
                              </Link>
                            ))}
                          </div>
                          {/* Abstract BG element */}
                          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[80px]"></div>
                        </div>

                        <div className="w-2/3 relative group bg-black">
                          <Image
                            src="/assets/images/compression-featured.png"
                            alt="Compression Banner"
                            fill
                            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                            sizes="(max-width: 768px) 100vw, 500px"
                          />
                          <div className="absolute bottom-6 right-6 text-right z-10">
                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 inline-block">
                              <span className="text-white font-bold text-sm">Tech-Fit™ Series</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Accessories Navigation Item */}
                <div className="relative">
                  <button
                    onMouseEnter={() => {
                      setIsAccessoriesDropdownOpen(true);
                      setIsMenDropdownOpen(false);
                      setIsWomenDropdownOpen(false);
                      setIsCompressionDropdownOpen(false);
                    }}
                    className="font-heading text-lg font-bold text-text-secondary hover:text-primary transition-colors duration-250 relative group flex items-center gap-1 h-full pt-1"
                  >
                    {navigationCategories?.accessories?.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-250"></span>
                  </button>

                  {isAccessoriesDropdownOpen && (
                    <div
                      onMouseLeave={() => setIsAccessoriesDropdownOpen(false)}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[850px] bg-background border border-border shadow-sharp-lg rounded-xl animate-scale-in-origin-top z-40 overflow-hidden"
                    >
                      <div className="p-8">
                        <div className="grid grid-cols-4 gap-6">
                          {navigationCategories?.accessories?.subcategories?.map((subcat, idx) => (
                            <Link
                              key={subcat?.path}
                              href={subcat?.path}
                              className="group/acc relative h-[280px] rounded-xl overflow-hidden shadow-sm hover:shadow-sharp-lg transition-all duration-300"
                              onClick={() => setIsAccessoriesDropdownOpen(false)}
                            >
                              <Image
                                src={
                                  idx === 0
                                    ? '/assets/images/gym-bag-featured.png'
                                    : idx === 1
                                      ? 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop'
                                      : '/assets/images/supplements-featured.png'
                                }
                                alt={subcat?.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover/acc:scale-110"
                                sizes="(max-width: 768px) 100vw, 200px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5">
                                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-3 group-hover/acc:bg-primary transition-colors duration-300">
                                  <Icon
                                    name={
                                      idx === 0
                                        ? 'ShoppingBagIcon'
                                        : idx === 1
                                          ? 'WrenchIcon'
                                          : 'SparklesIcon'
                                    }
                                    size={18}
                                    className="text-white"
                                  />
                                </div>
                                <span className="font-heading font-black text-white text-lg uppercase tracking-tight">
                                  {subcat?.name}
                                </span>
                                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1 group-hover/acc:text-primary transition-colors">
                                  Explore Collection
                                </span>
                              </div>
                            </Link>
                          ))}
                          {/* Extra Promo Card */}
                          <Link
                            href="/#explore-accessories"
                            className="group/all relative h-[280px] rounded-xl overflow-hidden bg-primary flex flex-col items-center justify-center text-center p-6 hover:brightness-110 transition-all border-2 border-primary"
                            onClick={() => setIsAccessoriesDropdownOpen(false)}
                          >
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                              <div className="absolute top-0 left-0 w-24 h-24 bg-white rounded-full blur-[50px]"></div>
                              <div className="absolute bottom-0 right-0 w-32 h-32 bg-black rounded-full blur-[60px]"></div>
                            </div>
                            <div className="relative z-10 flex flex-col items-center">
                              <div className="w-16 h-16 rounded-full bg-black/20 flex items-center justify-center mb-4 group-hover/all:scale-110 transition-transform">
                                <Icon name="ArrowRightIcon" size={32} className="text-white" />
                              </div>
                              <span className="font-heading font-black text-white text-2xl uppercase leading-tight tracking-tighter">
                                See All
                                <br />
                                Premium
                              </span>
                              <span className="text-white/80 text-xs font-bold uppercase tracking-[0.2em] mt-3 pb-1 border-b-2 border-white/30 group-hover:border-white transition-all">
                                View More
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </nav>
            )}
          </div>

          {/* Right Group: Search and Icons */}
          <div className="flex items-center justify-end h-full gap-2 md:gap-3 overflow-visible flex-1">
            {!isAdminPage && (
              <div className="hidden lg:flex items-center w-full max-w-[280px] xl:max-w-[380px]">
                <div
                  className="relative w-full group cursor-text"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon
                      name="MagnifyingGlassIcon"
                      size={18}
                      className="text-text-secondary group-hover:text-primary transition-colors"
                    />
                  </div>
                  <div className="block w-full h-9 pl-11 pr-4 bg-muted/20 border border-border/50 hover:border-primary/30 hover:bg-muted/40 rounded-full text-[12px] font-semibold transition-all duration-300 flex items-center text-text-secondary select-none">
                    Search...
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-1.5 md:gap-2.5 flex-shrink-0">
              {/* Profile Button */}
              <div
                className="relative group h-full flex items-center"
                ref={profileRef}
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <Link
                  href={user ? '/user-profile' : '#'}
                  onClick={(e) => !user && e.preventDefault()}
                  className="flex flex-col items-center gap-1 group/btn px-3 transition-all duration-300 relative py-1"
                >
                  <div className="relative">
                    <Icon
                      name="UserIcon"
                      size={20}
                      className="text-text-secondary group-hover/btn:text-primary transition-colors"
                    />
                    {isMounted && user && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-background"></span>
                    )}
                  </div>
                  <span className="hidden md:block text-[10px] md:text-[11px] font-bold text-text-secondary group-hover/btn:text-primary uppercase tracking-tighter">
                    {isMounted && user ? 'Account' : 'Profile'}
                  </span>
                  <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"></div>
                </Link>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute top-full right-[-60px] pt-2 z-[100] animate-fade-in-up">
                    <div className="w-[280px] bg-background border border-border shadow-sharp-lg rounded-sm overflow-hidden">
                      <div className="p-5 border-b border-border bg-surface/10">
                        <h4 className="font-heading text-sm font-black text-foreground mb-1">
                          Welcome
                        </h4>
                        <p className="text-[11px] text-text-secondary mb-4 leading-tight">
                          To access account and manage orders
                        </p>
                        {!isMounted ? (
                          // Skeleton for auth state
                          <div className="flex items-center gap-3 p-2 bg-muted/20 rounded-md animate-pulse">
                            <div className="w-9 h-9 rounded-full bg-gray-200"></div>
                            <div className="flex-1 space-y-1">
                              <div className="h-3 bg-gray-200 rounded w-20"></div>
                              <div className="h-2 bg-gray-200 rounded w-32"></div>
                            </div>
                          </div>
                        ) : !user ? (
                          <Link
                            href="/user-authentication"
                            className="inline-block px-5 py-2.5 border border-border text-primary font-bold text-[11px] hover:border-primary hover:bg-primary/5 transition-all uppercase tracking-widest"
                          >
                            Login / Signup
                          </Link>
                        ) : (
                          <div className="flex items-center gap-3 p-2 bg-muted/20 rounded-md">
                            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-black text-sm shadow-sm ring-2 ring-primary/20">
                              {user.email?.[0]?.toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-foreground truncate">
                                {user.email?.split('@')[0]}
                              </p>
                              <p className="text-[9px] text-text-secondary truncate">{user.email}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="py-2">
                        {(user?.user_metadata?.role === 'admin' || user?.app_metadata?.role === 'admin') && (
                          <Link
                            href="/admin-dashboard"
                            className="block px-6 py-2.5 text-sm text-primary hover:text-primary/80 hover:bg-muted font-black border-b border-border/50 uppercase tracking-widest transition-all"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <Link
                          href="/user-profile?tab=orders"
                          className="block px-6 py-2.5 text-sm text-text-secondary hover:text-foreground hover:bg-muted font-bold transition-all"
                        >
                          Orders
                        </Link>
                        <Link
                          href="/user-profile?tab=wishlist"
                          className="block px-6 py-2.5 text-sm text-text-secondary hover:text-foreground hover:bg-muted font-bold transition-all"
                        >
                          Wishlist
                        </Link>
                        <Link
                          href="/gift-card"
                          className="block px-6 py-2.5 text-sm text-text-secondary hover:text-foreground hover:bg-muted font-bold transition-all"
                        >
                          Gift Cards
                        </Link>
                        <Link
                          href="/contact-us"
                          className="block px-6 py-2.5 text-sm text-text-secondary hover:text-foreground hover:bg-muted font-bold transition-all"
                        >
                          Contact Us
                        </Link>
                      </div>

                      <div className="py-2 border-t border-border bg-muted/5">
                        <Link
                          href="/user-profile?tab=coupons"
                          className="block px-6 py-2.5 text-sm text-text-secondary hover:text-foreground hover:bg-muted font-bold transition-all"
                        >
                          Coupons
                        </Link>
                        <Link
                          href="/user-profile?tab=addresses"
                          className="block px-6 py-2.5 text-sm text-text-secondary hover:text-foreground hover:bg-muted font-bold transition-all"
                        >
                          Saved Addresses
                        </Link>
                        {user && (
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-6 py-3 text-xs text-error hover:bg-error/5 font-black uppercase tracking-widest transition-all mt-1"
                          >
                            Logout
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Search Icon - Only visible on mobile now */}
              <div className="relative group flex md:hidden items-center" ref={searchRef}>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="flex flex-col items-center gap-1 group/btn px-3 transition-all duration-300 relative py-1"
                  aria-label="Search"
                >
                  <Icon
                    name="MagnifyingGlassIcon"
                    size={20}
                    className="text-text-secondary group-hover/btn:text-primary transition-colors"
                  />
                  <span className="hidden md:block text-[10px] font-bold text-text-secondary group-hover/btn:text-primary uppercase tracking-tighter">
                    Search
                  </span>
                </button>
              </div>

              {/* Wishlist Button */}
              <Link
                href="/user-profile?tab=wishlist"
                className="flex flex-col items-center gap-1 group px-3 transition-all duration-300 relative py-1"
              >
                <Icon
                  name="HeartIcon"
                  size={20}
                  className="text-text-secondary group-hover:text-primary transition-colors"
                />
                <span className="hidden md:block text-[10px] md:text-[11px] font-bold text-text-secondary group-hover:text-primary uppercase tracking-tighter">
                  Wishlist
                </span>
                <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"></div>
              </Link>

              {/* Cart Button */}
              <div
                className="relative group h-full flex items-center"
                ref={cartRef}
                onMouseEnter={() => setIsCartOpen(true)}
                onMouseLeave={() => setIsCartOpen(false)}
              >
                <Link
                  href="/shopping-cart"
                  className="flex flex-col items-center gap-1 group/btn px-3 transition-all duration-300 relative py-1"
                >
                  <div className="relative">
                    <Icon
                      name="ShoppingBagIcon"
                      size={20}
                      className="text-text-secondary group-hover/btn:text-primary transition-colors"
                    />
                    {isMounted && cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-black flex items-center justify-center rounded-full border border-background">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="hidden md:block text-[10px] md:text-[11px] font-bold text-text-secondary group-hover/btn:text-primary uppercase tracking-tighter">
                    Bag
                  </span>
                  <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"></div>
                </Link>

                {/* Cart Dropdown */}
                {isCartOpen && (
                  <div className="absolute top-full right-[-80px] pt-2 z-[100] animate-fade-in-up">
                    <div className="w-[360px] bg-background border border-border shadow-sharp-lg rounded-sm overflow-hidden">
                      <div className="p-5 border-b border-border bg-surface/10 flex justify-between items-center">
                        <h4 className="font-heading text-sm font-black text-foreground uppercase tracking-tight">
                          Shopping Bag
                        </h4>
                        <span className="text-xs font-bold text-text-secondary">
                          {cartCount} items
                        </span>
                      </div>

                      <div className="max-h-[320px] overflow-y-auto scrollbar-thin">
                        {cartItems?.length > 0 ? (
                          cartItems?.map((item) => (
                            <div
                              key={item?.id}
                              className="flex gap-4 p-5 border-b border-border last:border-b-0 hover:bg-surface/30 transition-colors"
                            >
                              <div className="w-16 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0 border border-border/50 relative">
                                <Image
                                  src={item?.image}
                                  alt={item?.name}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-heading text-sm font-bold text-foreground truncate mb-1">
                                  {item?.name}
                                </h5>
                                <p className="text-xs text-text-secondary mb-2">
                                  Qty: {item?.quantity}
                                </p>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-black text-primary">
                                    ₹{item?.price}
                                  </span>
                                  <button onClick={() => removeFromCart(item.id)} className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors uppercase tracking-wider">
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center">
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                              <Icon name="ShoppingBagIcon" size={24} className="text-text-secondary/50" />
                            </div>
                            <p className="text-sm font-bold text-text-secondary">
                              Your bag is empty
                            </p>
                            <Link
                              href="/men-catalog"
                              className="inline-block mt-3 text-xs font-black text-primary uppercase border-b-2 border-primary pb-0.5 hover:opacity-80"
                              onClick={() => setIsCartOpen(false)}
                            >
                              Start Shopping
                            </Link>
                          </div>
                        )}
                      </div>

                      {cartItems?.length > 0 && (
                        <div className="p-5 bg-surface/10 border-t border-border">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-bold text-text-secondary">Total</span>
                            <span className="font-heading text-lg font-black text-foreground">
                              ₹{cartTotal.toFixed(2)}
                            </span>
                          </div>
                          <Link
                            href="/shopping-cart"
                            className="block w-full py-3 bg-foreground text-background text-xs font-black uppercase tracking-widest text-center hover:bg-primary hover:text-foreground transition-all duration-300 rounded-sm"
                          >
                            Checkout
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Menu Sheet */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/85 z-[9999] animate-fade-in md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-background border-l border-border z-[9999] animate-slide-in-right md:hidden overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="font-heading text-xl font-bold text-foreground">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-text-secondary hover:text-primary transition-colors duration-250"
                >
                  <Icon name="XMarkIcon" size={24} />
                </button>
              </div>

              {/* Navigation Categories in Mobile Menu - Hide on Admin Pages */}
              {!isAdminPage && (
                <div className="mb-4">
                  <p className="text-xs font-caption text-text-secondary uppercase tracking-wider mb-2 px-4">
                    Categories
                  </p>
                  <nav className="space-y-3">
                    {Object.entries(navigationCategories)?.map(([key, category]) => (
                      <div key={category?.path} className="border-b border-border/50 last:border-0">
                        <button
                          onClick={() =>
                            setActiveMobileCategory(activeMobileCategory === key ? null : key)
                          }
                          className="w-full flex items-center justify-between px-4 py-4 text-foreground hover:bg-muted rounded-sm transition-colors duration-250 font-heading font-extrabold text-lg uppercase tracking-tight"
                        >
                          {category?.label}
                          <Icon
                            name="ChevronDownIcon"
                            size={20}
                            className={`transition-transform duration-300 ${activeMobileCategory === key ? 'rotate-180' : ''}`}
                          />
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${activeMobileCategory === key ? 'max-h-[500px] pb-4 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <div className="pl-6 space-y-1">
                            <Link
                              href={category?.path}
                              className="block px-4 py-2 text-sm font-bold text-primary hover:bg-muted rounded-sm transition-colors duration-250"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Shop All {category?.label}
                            </Link>
                            {category?.subcategories?.map((subcat) => (
                              <Link
                                key={subcat?.path}
                                href={subcat?.path}
                                className="block px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-muted rounded-sm transition-colors duration-250"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subcat?.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </nav>
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-border">
                {user ? (
                  <div className="space-y-1">
                    <Link
                      href="/user-profile"
                      className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted rounded-sm transition-colors duration-250"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon name="UserIcon" size={20} />
                      My Profile
                    </Link>
                    <Link
                      href="/user-profile?tab=orders"
                      className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted rounded-sm transition-colors duration-250"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon name="ShoppingBagIcon" size={20} />
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-muted rounded-sm transition-colors duration-250"
                    >
                      <Icon name="ArrowRightOnRectangleIcon" size={20} />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/user-authentication"
                      className="block w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold rounded-md flex items-center justify-center transition-all duration-250"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/user-authentication?mode=register"
                      className="block w-full h-12 bg-surface hover:bg-muted text-foreground font-heading font-medium rounded-md flex items-center justify-center transition-all duration-250"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {/* Mega Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] transition-all duration-300">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSearchOpen(false)}
          />

          {/* Search Container */}
          <div
            ref={overlayRef}
            className="absolute top-0 inset-x-0 bg-background shadow-sharp-lg animate-fade-in border-b border-border"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 relative flex items-center group">
                  <Icon
                    name="MagnifyingGlassIcon"
                    size={28}
                    className="absolute left-4 text-text-secondary group-focus-within:text-primary transition-colors"
                  />
                  <form onSubmit={handleSearchSubmit} className="w-full">
                    <input
                      type="text"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target.value)}
                      className="w-full h-16 md:h-20 pl-16 pr-8 bg-surface border-none text-xl md:text-3xl font-heading font-black text-foreground focus:ring-0 transition-all uppercase tracking-tight"
                    />
                  </form>
                </div>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-surface text-text-secondary hover:text-primary hover:bg-muted transition-all duration-250"
                  aria-label="Close search"
                >
                  <Icon name="XMarkIcon" size={32} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 pt-8 border-t border-border/50">
                {/* Popular Categories */}
                <div>
                  <h3 className="text-xs font-black text-text-secondary uppercase tracking-[0.2em] mb-6 border-l-4 border-primary pl-4">
                    Top Categories
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.values(navigationCategories)?.map((cat) => (
                      <Link
                        key={cat?.path}
                        href={cat?.path}
                        className="group flex items-center justify-between p-4 bg-muted/20 hover:bg-primary/5 rounded-sm transition-all border border-transparent hover:border-primary/10"
                        onClick={() => setIsSearchOpen(false)}
                      >
                        <span className="font-heading font-bold text-base md:text-lg text-foreground group-hover:text-primary">
                          {cat?.label}
                        </span>
                        <Icon
                          name="ArrowRightIcon"
                          size={18}
                          className="text-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all"
                        />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Trending Searches */}
                <div>
                  <h3 className="text-xs font-black text-text-secondary uppercase tracking-[0.2em] mb-6 border-l-4 border-primary pl-4">
                    Trending Now
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      'Men\'s T-Shirts',
                      'Women\'s Leggings',
                      'Winter Arc',
                      'Compression Layers',
                      'Gym Bags',
                      'Equipment',
                      'Protein Supplements'
                    ]?.map((term) => {
                      return (
                        <Link
                          key={term}
                          href={`/search?q=${encodeURIComponent(term)}`}
                          className="px-6 py-3 bg-surface hover:bg-primary text-text-secondary hover:text-white rounded-full text-sm font-bold transition-all border border-border/50 hover:border-primary uppercase tracking-tighter"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          {term}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Autocomplete Suggestions */}
                {suggestions.length > 0 && (
                  <div className="absolute top-[80px] left-0 right-0 bg-background z-50 p-4 shadow-lg border-t border-border">
                    <h3 className="text-xs font-black text-text-secondary uppercase tracking-[0.2em] mb-4 pl-4 border-l-4 border-primary">
                      Suggestions
                    </h3>
                    <ul className="space-y-2">
                      {suggestions.map((s, idx) => (
                        <li key={idx}>
                          <button
                            className="flex items-center gap-3 w-full text-left p-2 hover:bg-muted/30 rounded-lg group transition-colors"
                            onClick={() => {
                              router.push(`/search?q=${encodeURIComponent(s.text)}`);
                              setIsSearchOpen(false);
                              setSuggestions([]);
                            }}
                          >
                            <div className="w-10 h-10 rounded bg-muted overflow-hidden flex-shrink-0">
                              {s.image && <img src={s.image} alt="" className="w-full h-full object-cover" />}
                            </div>
                            <span className="font-heading font-medium group-hover:text-primary transition-colors">
                              {s.text}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Featured Products/Collections Preview */}
                <div className="hidden lg:block">
                  <h3 className="text-xs font-black text-text-secondary uppercase tracking-[0.2em] mb-6 border-l-4 border-primary pl-4">
                    New Arrivals
                  </h3>
                  <div className="space-y-4">
                    <Link
                      href="/men-catalog?type=winter-arc"
                      className="group block relative h-48 rounded-xl overflow-hidden"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop"
                        alt="Winter Arc"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                        <span className="text-white font-heading font-black text-2xl uppercase italic tracking-tighter">
                          Winter Arc '24
                        </span>
                        <span className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1">
                          Shop Now
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div >
            </div >
          </div >
        </div >
      )}

      {/* Recaptcha Container (invisible) */}
      <div id="recaptcha-container"></div>
    </>
  );
}
