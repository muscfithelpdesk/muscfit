'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-250 bg-black shadow-sharp`}
      >
        <div className="flex items-center justify-between h-[60px] px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/homepage" className="flex items-center gap-2 group">
            <img 
              src="/assets/images/logo-clean.jpg" 
              alt="MUSCFIT Logo" 
              className="h-[40px] w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation - Hide on Admin Pages */}
          {!isAdminPage && (
            <nav className="hidden md:flex items-center gap-8">
              {/* Men Navigation Item */}
              <div className="relative" ref={menDropdownRef}>
                <button
                  onMouseEnter={() => {
                    setIsMenDropdownOpen(true);
                    setIsWomenDropdownOpen(false);
                    setIsCompressionDropdownOpen(false);
                  }}
                  className="font-heading text-lg font-bold text-text-secondary hover:text-primary transition-colors duration-250 relative group flex items-center gap-1"
                >
                  {navigationCategories?.men?.label}
                  <Icon name="ChevronDownIcon" size={16} className={`transition-transform duration-250 ${isMenDropdownOpen ? 'rotate-180' : ''}`} />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-250"></span>
                </button>

                {isMenDropdownOpen && (
                  <div
                    onMouseLeave={() => setIsMenDropdownOpen(false)}
                    className="absolute left-0 top-full mt-2 bg-popover border border-border rounded-md shadow-sharp-lg animate-scale-in z-60"
                  >
                    <div className="flex">
                      {/* Subcategories */}
                      <div className="w-[180px] py-2 px-2">
                        <p className="px-3 py-2 text-xs font-caption text-text-secondary uppercase tracking-wider">
                          Categories
                        </p>
                        {navigationCategories?.men?.subcategories?.map((subcat) => (
                          <Link
                            key={subcat?.path}
                            href={subcat?.path}
                            className="block px-3 py-2 text-sm text-text-primary hover:bg-muted hover:text-primary rounded-sm transition-colors duration-250"
                            onClick={() => setIsMenDropdownOpen(false)}
                          >
                            {subcat?.name}
                          </Link>
                        ))}
                      </div>

                      {/* Featured Image */}
                      <div className="w-[200px] p-4 bg-surface border-l border-border">
                        <div className="w-full h-[180px] bg-muted rounded-md overflow-hidden">
                          <img
                            src={navigationCategories?.men?.featuredImage}
                            alt={navigationCategories?.men?.featuredAlt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="mt-3 text-xs text-text-secondary text-center">
                          {navigationCategories?.men?.label} Collection
                        </p>
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
                  }}
                  className="font-heading text-lg font-bold text-text-secondary hover:text-primary transition-colors duration-250 relative group flex items-center gap-1"
                >
                  {navigationCategories?.women?.label}
                  <Icon name="ChevronDownIcon" size={16} className={`transition-transform duration-250 ${isWomenDropdownOpen ? 'rotate-180' : ''}`} />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-250"></span>
                </button>

                {/* Dropdown content omitted for brevity, logic remains same just need to ensure button styling is consistent */}
                {isWomenDropdownOpen && (
                  <div
                    onMouseLeave={() => setIsWomenDropdownOpen(false)}
                    className="absolute left-0 top-full mt-2 bg-popover border border-border rounded-md shadow-sharp-lg animate-scale-in z-60"
                  >
                    <div className="flex">
                      {/* Subcategories */}
                      <div className="w-[180px] py-2 px-2">
                        <p className="px-3 py-2 text-xs font-caption text-text-secondary uppercase tracking-wider">
                          Categories
                        </p>
                        {navigationCategories?.women?.subcategories?.map((subcat) => (
                          <Link
                            key={subcat?.path}
                            href={subcat?.path}
                            className="block px-3 py-2 text-sm text-text-primary hover:bg-muted hover:text-primary rounded-sm transition-colors duration-250"
                            onClick={() => setIsWomenDropdownOpen(false)}
                          >
                            {subcat?.name}
                          </Link>
                        ))}
                      </div>

                      {/* Featured Image */}
                      <div className="w-[200px] p-4 bg-surface border-l border-border">
                        <div className="w-full h-[180px] bg-muted rounded-md overflow-hidden">
                          <img
                            src={navigationCategories?.women?.featuredImage}
                            alt={navigationCategories?.women?.featuredAlt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="mt-3 text-xs text-text-secondary text-center">
                          {navigationCategories?.women?.label} Collection
                        </p>
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
                  }}
                  className="font-heading text-lg font-bold text-text-secondary hover:text-primary transition-colors duration-250 relative group flex items-center gap-1"
                >
                  {navigationCategories?.compression?.label}
                  <Icon name="ChevronDownIcon" size={16} className={`transition-transform duration-250 ${isCompressionDropdownOpen ? 'rotate-180' : ''}`} />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-250"></span>
                </button>

                {isCompressionDropdownOpen && (
                  <div
                    onMouseLeave={() => setIsCompressionDropdownOpen(false)}
                    className="absolute left-0 top-full mt-2 bg-popover border border-border rounded-md shadow-sharp-lg animate-scale-in z-60"
                  >
                    <div className="flex">
                      {/* Subcategories */}
                      <div className="w-[180px] py-2 px-2">
                        <p className="px-3 py-2 text-xs font-caption text-text-secondary uppercase tracking-wider">
                          Categories
                        </p>
                        {navigationCategories?.compression?.subcategories?.map((subcat) => (
                          <Link
                            key={subcat?.path}
                            href={subcat?.path}
                            className="block px-3 py-2 text-sm text-text-primary hover:bg-muted hover:text-primary rounded-sm transition-colors duration-250"
                            onClick={() => setIsCompressionDropdownOpen(false)}
                          >
                            {subcat?.name}
                          </Link>
                        ))}
                      </div>

                      {/* Featured Image */}
                      <div className="w-[200px] p-4 bg-surface border-l border-border">
                        <div className="w-full h-[180px] bg-muted rounded-md overflow-hidden">
                          <img
                            src={navigationCategories?.compression?.featuredImage}
                            alt={navigationCategories?.compression?.featuredAlt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="mt-3 text-xs text-text-secondary text-center">
                          {navigationCategories?.compression?.label} Collection
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          )}

          {/* Action Icons */}
          <div className="flex items-center gap-4">
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
                <div className="absolute right-0 top-full mt-2 w-[320px] md:w-[400px] bg-popover border border-border rounded-md shadow-sharp-lg animate-scale-in z-60">
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
                <div className="absolute right-0 top-full mt-2 w-[360px] bg-popover border border-border rounded-md shadow-sharp-lg animate-scale-in z-60">
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
                          <p className="text-sm font-data font-bold text-primary mt-1">${item?.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-border bg-surface">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-heading text-sm font-semibold text-foreground">Total</span>
                      <span className="font-data text-lg font-bold text-primary">${calculateCartTotal()}</span>
                    </div>
                    <Link
                      href="/shopping-cart"
                      className="block w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold rounded-md flex items-center justify-center transition-all duration-250 hover:scale-[0.98] active:scale-95"
                    >
                      View Cart & Checkout
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile and Logout */}
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">
                  {user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-primary transition-colors duration-250"
              aria-label="Menu"
            >
              <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Sheet */}
      {isMobileMenuOpen && (
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
                    {Object.values(navigationCategories)?.map((category) => (
                      <div key={category?.path} className="space-y-1">
                        <Link
                          href={category?.path}
                          className="flex items-center justify-between px-4 py-3 text-foreground hover:bg-muted rounded-sm transition-colors duration-250 font-heading font-semibold"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {category?.label}
                          <Icon name="ChevronRightIcon" size={16} />
                        </Link>
                        <div className="pl-6 space-y-1">
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
      {/* Recaptcha Container (invisible) */}
      <div id="recaptcha-container"></div>
    </>
  );
}