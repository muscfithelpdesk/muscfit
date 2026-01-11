import Header from '@/components/common/Header';
import UserProfileInteractive from './components/UserProfileInteractive';

export const metadata = {
  title: 'My Profile - MUSCFIT',
  description:
    'Manage your MUSCFIT account, view order history, update personal information, and customize your shopping preferences.',
};

export default function UserProfilePage() {
  const mockData = {
    userData: {
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
    },
    orders: [],

    wishlistItems: [],

    addresses: [],

    settings: {
      notifications: {
        orderUpdates: true,
        promotions: true,
        newArrivals: false,
        newsletter: true,
      },
    },
  };

  return (
    <>
      <Header />
      <div className="pt-[80px]">
        <UserProfileInteractive initialData={mockData} />
      </div>
    </>
  );
}
