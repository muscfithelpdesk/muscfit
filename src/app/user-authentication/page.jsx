import { Suspense } from 'react';
import Header from '@/components/common/Header';
import AuthInteractive from './components/AuthInteractive';

export const metadata = {
  title: 'Sign In | MUSCFIT - Premium Fitness Apparel',
  description: 'Sign in to your MUSCFIT account to access personalized shopping features, track orders, and manage your fitness apparel wishlist.',
};

function AuthContent() {
  return <AuthInteractive initialMode="login" />;
}

export default function UserAuthenticationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-[60px]">
        <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          }>
            <AuthContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}