import Header from '@/components/common/Header';
import UserProfileInteractive from './components/UserProfileInteractive';

export const metadata = {
  title: 'My Profile - MUSCFIT',
  description: 'Manage your MUSCFIT account, view order history, update personal information, and customize your shopping preferences.'
};

export default function UserProfilePage() {
  const mockData = {
    userData: {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '9876543210',
      dateOfBirth: '1995-08-15',
      gender: 'Male'
    },
    orders: [
    {
      id: 'ORD001',
      orderNumber: 'MUSC2025001234',
      date: '15/12/2025',
      status: 'Delivered',
      total: 4299,
      items: [
      {
        id: 'item1',
        name: 'Performance Compression Tee - Black',
        image: "https://images.unsplash.com/photo-1579675109935-a12dd235c97f",
        alt: 'Black compression athletic t-shirt with moisture-wicking fabric laid flat on white surface',
        size: 'L',
        quantity: 1,
        price: 1899
      },
      {
        id: 'item2',
        name: 'Elite Training Shorts - Navy',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_141043265-1765255836176.png",
        alt: 'Navy blue athletic training shorts with side pockets displayed on mannequin',
        size: 'M',
        quantity: 2,
        price: 1200
      }]

    },
    {
      id: 'ORD002',
      orderNumber: 'MUSC2025001189',
      date: '08/12/2025',
      status: 'Shipped',
      total: 5499,
      items: [
      {
        id: 'item3',
        name: 'Premium Gym Hoodie - Charcoal',
        image: "https://images.unsplash.com/photo-1605760641487-e8f2976c71e6",
        alt: 'Charcoal gray athletic hoodie with zippered pockets hanging on wooden hanger',
        size: 'XL',
        quantity: 1,
        price: 2999
      },
      {
        id: 'item4',
        name: 'Compression Joggers - Black',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd85b5c9-1764657282681.png",
        alt: 'Black compression jogger pants with tapered fit displayed on white background',
        size: 'L',
        quantity: 1,
        price: 2500
      }]

    },
    {
      id: 'ORD003',
      orderNumber: 'MUSC2025001067',
      date: '01/12/2025',
      status: 'Processing',
      total: 3799,
      items: [
      {
        id: 'item5',
        name: 'Muscle Fit Tank Top - White',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_103afc570-1765263027593.png",
        alt: 'White muscle fit tank top with athletic cut displayed on male torso',
        size: 'M',
        quantity: 2,
        price: 1899
      }]

    }],

    wishlistItems: [
    {
      id: 'wish1',
      name: 'Pro Compression Leggings - Black',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_16dc13c0a-1765976900735.png",
      alt: 'Black compression leggings with mesh panels worn by athletic woman in gym setting',
      price: 2499,
      originalPrice: 3499,
      discount: 29,
      inStock: true
    },
    {
      id: 'wish2',
      name: 'Performance Training Jacket - Red',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_17ceabbbb-1766174688134.png",
      alt: 'Red athletic training jacket with reflective details on male model outdoors',
      price: 3999,
      originalPrice: null,
      discount: null,
      inStock: true
    },
    {
      id: 'wish3',
      name: 'Elite Gym Bag - Black/Orange',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_18d4a649d-1765131813556.png",
      alt: 'Black gym duffel bag with orange accents and multiple compartments on wooden floor',
      price: 1999,
      originalPrice: 2999,
      discount: 33,
      inStock: false
    },
    {
      id: 'wish4',
      name: 'Muscle Recovery Shorts - Navy',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_13faf0ea4-1765215468696.png",
      alt: 'Navy blue athletic recovery shorts with compression technology on white background',
      price: 1799,
      originalPrice: null,
      discount: null,
      inStock: true
    }],

    addresses: [
    {
      id: 'addr1',
      name: 'Rahul Sharma',
      phone: '9876543210',
      addressLine1: 'Flat 301, Sunrise Apartments',
      addressLine2: 'MG Road, Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560034',
      isDefault: true
    },
    {
      id: 'addr2',
      name: 'Rahul Sharma',
      phone: '9876543210',
      addressLine1: 'Office 12B, Tech Park',
      addressLine2: 'Whitefield Main Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560066',
      isDefault: false
    }],

    settings: {
      notifications: {
        orderUpdates: true,
        promotions: true,
        newArrivals: false,
        newsletter: true
      }
    }
  };

  return (
    <>
      <Header />
      <div className="pt-[60px]">
        <UserProfileInteractive initialData={mockData} />
      </div>
    </>);

}