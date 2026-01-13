import { Suspense } from 'react';
import SearchInteractive from './components/SearchInteractive';
import Header from '@/components/common/Header';

export const metadata = {
    title: 'Search Results - MUSCFIT',
    description: 'Search results for your fitness gear.',
};

export default function SearchPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-background">
                <Suspense fallback={<div className="pt-[160px] text-center">Loading search...</div>}>
                    <SearchInteractive />
                </Suspense>
            </main>
        </>
    );
}
