'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

export default function Header({ topOffset = 0, isFixed = true }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemCount, setCartItemCount] = useState(3);
  const [scrolled, setScrolled] = useState(false);

  const { user, signOut } = useAuth();

  const searchRef = useRef(null);
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
        { name: 'Topwear', path: '/men-catalog?type=topwear' },
        { name: 'Bottomwear', path: '/men-catalog?type=bottomwear' },
        { name: 'Innerwear', path: '/men-catalog?type=innerwear' }
      ],
      featuredImage: '/assets/images/no_image.png',
      featuredAlt: 'Men\'s athletic wear collection'
    },
    women: {
      label: 'Women',
      path: '/women-catalog',
      subcategories: [
        { name: 'Topwear', path: '/women-catalog?type=topwear' },
        { name: 'Bottomwear', path: '/women-catalog?type=bottomwear' },
        { name: 'Innerwear', path: '/women-catalog?type=innerwear' }
      ],
      featuredImage: '/assets/images/no_image.png',
      featuredAlt: 'Women\'s athletic wear collection'
    },
    compression: {
      label: 'Compression Series',
      path: '/compression-wear-catalog',
      subcategories: [
        { name: 'Topwear', path: '/compression-wear-catalog?type=topwear' },
        { name: 'Bottomwear', path: '/compression-wear-catalog?type=bottomwear' },
        { name: 'Full Body', path: '/compression-wear-catalog?type=fullbody' }
      ],
      featuredImage: '/assets/images/no_image.png',
      featuredAlt: 'Compression wear collection'
    },
    accessories: {
      label: 'Accessories',
      path: '/accessories-catalog',
      subcategories: [
        { name: 'Gym Bags', path: '/accessories-catalog?type=bags' },
        { name: 'Equipment', path: '/accessories-catalog?type=equipment' },
        { name: 'Supplements', path: '/accessories-catalog?type=supplements' }
      ],
      featuredImage: '/assets/images/no_image.png',
      featuredAlt: 'Fitness accessories collection'
    }
  };

  const cartItems = [
    { id: 1, name: 'Performance Compression Tee', price: 89.99, quantity: 1, image: '/assets/images/product-1.jpg' },
    { id: 2, name: 'Elite Training Shorts', price: 69.99, quantity: 2, image: '/assets/images/product-2.jpg' }
  ];

  const recentSearches = ['compression shirts', 'running shorts', 'training gear'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
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
      if (compressionDropdownRef?.current && !compressionDropdownRef?.current?.contains(event?.target)) {
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
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      window.location.href = `/men-catalog?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const calculateCartTotal = () => {
    return cartItems?.reduce((total, item) => total + item?.price * item?.quantity, 0)?.toFixed(2);
  };

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
          '--header-height': scrolled ? '70px' : '100px'
        }}
      >
        <div className={`flex items-center justify-between transition-all duration-300 px-4 md:px-8 lg:px-12 ${scrolled ? 'h-[60px] md:h-[70px]' : 'h-[70px] md:h-[100px]'}`}>
          {/* Left Side: Logo & Mobile Toggle */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {!isAdminPage && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-text-secondary hover:text-primary transition-colors duration-250 z-20"
                aria-label="Menu"
              >
                <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
              </button>
            )}

            <Link href="/" className="group flex items-center relative z-20 transition-transform duration-300 hover:scale-105">
              <img
                src="/assets/images/logo-v4.png"
                alt="MUSCFIT Logo"
                className={`transition-all duration-300 w-auto object-contain ${scrolled ? 'h-[50px] md:h-[60px]' : 'h-[60px] md:h-[90px]'}`}
              />
            </Link>
          </div>

          {/* Center Navigation - Desktop */}
          {!isAdminPage && (
            <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-12 flex-1">
              {/* Men Navigation Item */}
              <div className="static" ref={menDropdownRef}>
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
                    className="fixed left-0 right-0 bg-background border-b border-border shadow-sharp-lg animate-scale-in-origin-top z-40 h-[320px]"
                    style={{ top: scrolled ? '80px' : 'calc(120px + 36px)' }}
                  >
                    <div className="max-w-[1400px] mx-auto h-full flex">
                      {/* Subcategories */}
                      <div className="w-1/4 h-full bg-surface border-r border-border p-8">
                        <div className="space-y-6">
                          {navigationCategories?.men?.subcategories?.map((subcat) => (
                            <Link
                              key={subcat?.path}
                              href={subcat?.path}
                              className="group/item flex items-center justify-between text-lg font-heading font-medium text-text-secondary hover:text-primary transition-colors duration-250"
                              onClick={() => setIsMenDropdownOpen(false)}
                            >
                              {subcat?.name}
                              <Icon name="ChevronRightIcon" size={20} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-250" />
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Featured Images */}
                      <div className="w-3/4 h-full flex p-6 gap-6 bg-background">
                        <div className="flex-1 relative group cursor-pointer overflow-hidden rounded-md">
                          <img
                            src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop"
                            alt="Men's Collection 1"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                          <div className="absolute bottom-6 left-6">
                            <h3 className="text-white font-heading text-2xl font-bold uppercase tracking-wider">Performance Gear</h3>
                            <span className="text-white/90 text-sm font-medium mt-2 inline-block border-b border-white pb-0.5">Shop Now</span>
                          </div>
                        </div>
                        <div className="flex-1 relative group cursor-pointer overflow-hidden rounded-md">
                          <img
                            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
                            alt="Men's Collection 2"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                          <div className="absolute bottom-6 left-6">
                            <h3 className="text-white font-heading text-2xl font-bold uppercase tracking-wider">Lifting Essentials</h3>
                            <span className="text-white/90 text-sm font-medium mt-2 inline-block border-b border-white pb-0.5">Shop Now</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Women Navigation Item */}
              <div className="static" ref={womenDropdownRef}>
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
                    className="fixed left-0 right-0 bg-background border-b border-border shadow-sharp-lg animate-scale-in-origin-top z-40 h-[320px]"
                    style={{ top: scrolled ? '80px' : 'calc(120px + 36px)' }}
                  >
                    <div className="max-w-[1400px] mx-auto h-full flex">
                      {/* Subcategories */}
                      <div className="w-1/4 h-full bg-surface border-r border-border p-8">
                        <div className="space-y-6">
                          {navigationCategories?.women?.subcategories?.map((subcat) => (
                            <Link
                              key={subcat?.path}
                              href={subcat?.path}
                              className="group/item flex items-center justify-between text-lg font-heading font-medium text-text-secondary hover:text-primary transition-colors duration-250"
                              onClick={() => setIsWomenDropdownOpen(false)}
                            >
                              {subcat?.name}
                              <Icon name="ChevronRightIcon" size={20} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-250" />
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Featured Images */}
                      <div className="w-3/4 h-full flex p-6 gap-6 bg-background">
                        <div className="flex-1 relative group cursor-pointer overflow-hidden rounded-md">
                          <img
                            src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000&auto=format&fit=crop"
                            alt="Women's Collection 1"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                          <div className="absolute bottom-6 left-6">
                            <h3 className="text-white font-heading text-2xl font-bold uppercase tracking-wider">New Arrivals</h3>
                            <span className="text-white/90 text-sm font-medium mt-2 inline-block border-b border-white pb-0.5">Shop Now</span>
                          </div>
                        </div>
                        <div className="flex-1 relative group cursor-pointer overflow-hidden rounded-md">
                          <img
                            src="https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=1000&auto=format&fit=crop"
                            alt="Women's Collection 2"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                          <div className="absolute bottom-6 left-6">
                            <h3 className="text-white font-heading text-2xl font-bold uppercase tracking-wider">Best Sellers</h3>
                            <span className="text-white/90 text-sm font-medium mt-2 inline-block border-b border-white pb-0.5">Shop Now</span>
                          </div>
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
                  className="font-heading text-lg font-bold text-text-secondary hover:text-primary transition-colors duration-250 relative group flex items-center gap-1 py-4"
                >
                  {navigationCategories?.compression?.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-250"></span>
                </button>

                {isCompressionDropdownOpen && (
                  <div
                    onMouseLeave={() => setIsCompressionDropdownOpen(false)}
                    className="fixed left-0 right-0 bg-background border-b border-border shadow-sharp-lg animate-scale-in-origin-top z-40 h-[320px]"
                    style={{ top: scrolled ? '80px' : 'calc(120px + 36px)' }}
                  >
                    <div className="max-w-[1400px] mx-auto h-full flex">
                      {/* Subcategories */}
                      <div className="w-1/4 h-full bg-surface border-r border-border p-8">
                        <div className="space-y-6">
                          {navigationCategories?.compression?.subcategories?.map((subcat) => (
                            <Link
                              key={subcat?.path}
                              href={subcat?.path}
                              className="group/item flex items-center justify-between text-lg font-heading font-medium text-text-secondary hover:text-primary transition-colors duration-250"
                              onClick={() => setIsCompressionDropdownOpen(false)}
                            >
                              {subcat?.name}
                              <Icon name="ChevronRightIcon" size={20} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-250" />
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Featured Images */}
                      <div className="w-3/4 h-full flex p-6 gap-6 bg-background">
                        <div className="flex-1 relative group cursor-pointer overflow-hidden rounded-md">
                          <img
                            src="https://images.unsplash.com/photo-1517438476312-10d79c67750d?q=80&w=1000&auto=format&fit=crop"
                            alt="Compression Collection 1"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                          <div className="absolute bottom-6 left-6">
                            <h3 className="text-white font-heading text-2xl font-bold uppercase tracking-wider">Advanced Recovery</h3>
                            <span className="text-white/90 text-sm font-medium mt-2 inline-block border-b border-white pb-0.5">Shop Now</span>
                          </div>
                        </div>
                        <div className="flex-1 relative group cursor-pointer overflow-hidden rounded-md">
                          <img
                            src="https://images.unsplash.com/photo-1517438322351-e0739345b5e1?q=80&w=1000&auto=format&fit=crop"
                            alt="Compression Collection 2"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                          <div className="absolute bottom-6 left-6">
                            <h3 className="text-white font-heading text-2xl font-bold uppercase tracking-wider">Elite Series</h3>
                            <span className="text-white/90 text-sm font-medium mt-2 inline-block border-b border-white pb-0.5">Shop Now</span>
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
                  className="font-heading text-lg font-bold text-text-secondary hover:text-primary transition-colors duration-250 relative group flex items-center gap-1 py-4"
                >
                  {navigationCategories?.accessories?.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-250"></span>
                </button>

                {isAccessoriesDropdownOpen && (
                  <div
                    onMouseLeave={() => setIsAccessoriesDropdownOpen(false)}
                    className="fixed left-0 right-0 bg-background border-b border-border shadow-sharp-lg animate-scale-in-origin-top z-40 h-[320px]"
                    style={{ top: scrolled ? '80px' : 'calc(120px + 36px)' }}
                  >
                    <div className="max-w-[1400px] mx-auto h-full flex">
                      {/* Subcategories */}
                      <div className="w-1/4 h-full bg-surface border-r border-border p-8">
                        <div className="space-y-6">
                          {navigationCategories?.accessories?.subcategories?.map((subcat) => (
                            <Link
                              key={subcat?.path}
                              href={subcat?.path}
                              className="group/item flex items-center justify-between text-lg font-heading font-medium text-text-secondary hover:text-primary transition-colors duration-250"
                              onClick={() => setIsAccessoriesDropdownOpen(false)}
                            >
                              {subcat?.name}
                              <Icon name="ChevronRightIcon" size={20} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-250" />
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Featured Images */}
                      <div className="w-3/4 h-full flex p-6 gap-6 bg-background">
                        <div className="flex-1 relative group cursor-pointer overflow-hidden rounded-md">
                          <img
                            src="https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=1000&auto=format&fit=crop"
                            alt="Accessories Collection 1"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                          <div className="absolute bottom-6 left-6">
                            <h3 className="text-white font-heading text-2xl font-bold uppercase tracking-wider">New Essentials</h3>
                            <span className="text-white/90 text-sm font-medium mt-2 inline-block border-b border-white pb-0.5">Shop Now</span>
                          </div>
                        </div>
                        <div className="flex-1 relative group cursor-pointer overflow-hidden rounded-md">
                          <img
                            src="https://images.unsplash.com/photo-1517531757411-b1a036c17242?q=80&w=1000&auto=format&fit=crop"
                            alt="Accessories Collection 2"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                          <div className="absolute bottom-6 left-6">
                            <h3 className="text-white font-heading text-2xl font-bold uppercase tracking-wider">Lifting Gear</h3>
                            <span className="text-white/90 text-sm font-medium mt-2 inline-block border-b border-white pb-0.5">Shop Now</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          )}

          {/* Right Action Icons */}
          <div className="flex items-center justify-end gap-3 md:gap-6 w-1/4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-text-secondary hover:text-primary transition-colors duration-250 hover:scale-110 active:scale-95"
                aria-label="Search"
              >
                <Icon name="MagnifyingGlassIcon" size={24} />
              </button>

              {isSearchOpen && (
                <div className="fixed md:absolute left-4 right-4 md:left-auto md:right-0 top-[70px] md:top-full mt-2 w-auto md:w-[400px] bg-popover border border-border rounded-md shadow-sharp-lg animate-scale-in z-[100]">
                  <form onSubmit={handleSearchSubmit} className="p-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e?.target?.value)}
                        placeholder="Search products..."
                        className="w-full h-12 px-4 pr-10 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-text-secondary hover:text-primary transition-colors duration-250"
                      >
                        <Icon name="MagnifyingGlassIcon" size={20} />
                      </button>
                    </div>
                  </form>

                  {recentSearches?.length > 0 && (
                    <div className="px-4 pb-4 border-t border-border">
                      <p className="text-xs font-caption text-text-secondary uppercase tracking-wider mt-3 mb-2">Recent Searches</p>
                      <div className="space-y-1">
                        {recentSearches?.map((search, index) => (
                          <Link
                            key={index}
                            href={`/product-catalog?search=${encodeURIComponent(search)}`}
                            className="block px-3 py-2 text-sm text-text-primary hover:bg-muted rounded-sm transition-colors duration-250"
                          >
                            {search}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <div className="relative" ref={cartRef}>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 text-text-secondary hover:text-primary transition-colors duration-250 hover:scale-110 active:scale-95"
                aria-label="Shopping Cart"
              >
                <Icon name="ShoppingCartIcon" size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center font-data">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {isCartOpen && (
                <div className="absolute right-0 top-full mt-2 w-[360px] bg-popover border border-border rounded-md shadow-sharp-lg animate-scale-in z-[100]">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-heading text-lg font-semibold text-foreground">Shopping Cart</h3>
                  </div>

                  <div className="max-h-[400px] overflow-y-auto">
                    {cartItems?.map((item) => (
                      <div key={item?.id} className="flex gap-3 p-4 border-b border-border hover:bg-muted/50 transition-colors duration-250">
                        <div className="w-16 h-16 bg-surface rounded-sm overflow-hidden flex-shrink-0">
                          <div className="w-full h-full bg-muted"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-foreground truncate">{item?.name}</h4>
                          <p className="text-xs text-text-secondary mt-1">Qty: {item?.quantity}</p>
                          <p className="text-sm font-data font-bold text-primary mt-1">₹{item?.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-border bg-surface">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-heading text-sm font-semibold text-foreground">Total</span>
                      <span className="font-data text-lg font-bold text-primary">₹{calculateCartTotal()}</span>
                    </div>
                    <Link
                      href="/shopping-cart"
                      onClick={() => setIsCartOpen(false)}
                      className="block w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold rounded-md flex items-center justify-center transition-all duration-250 hover:scale-[0.98] active:scale-95"
                    >
                      View Cart & Checkout
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </header >
      {/* Mobile Menu Sheet */}
      {
        isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/85 z-70 animate-fade-in md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            <div
              ref={mobileMenuRef}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-background border-l border-border z-70 animate-slide-in-right md:hidden overflow-y-auto"
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
                    <p className="text-xs font-caption text-text-secondary uppercase tracking-wider mb-2 px-4">Categories</p>
                    <nav className="space-y-3">
                      {Object.entries(navigationCategories)?.map(([key, category]) => (
                        <div key={category?.path} className="border-b border-border/50 last:border-0">
                          <button
                            onClick={() => setActiveMobileCategory(activeMobileCategory === key ? null : key)}
                            className="w-full flex items-center justify-between px-4 py-4 text-foreground hover:bg-muted rounded-sm transition-colors duration-250 font-heading font-extrabold text-lg uppercase tracking-tight"
                          >
                            {category?.label}
                            <Icon
                              name="ChevronDownIcon"
                              size={20}
                              className={`transition-transform duration-300 ${activeMobileCategory === key ? 'rotate-180' : ''}`}
                            />
                          </button>

                          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeMobileCategory === key ? 'max-h-[500px] pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
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
        )
      }
      {/* Recaptcha Container (invisible) */}
      <div id="recaptcha-container"></div>
    </>
  );
}
