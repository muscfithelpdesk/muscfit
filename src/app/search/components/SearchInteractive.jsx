'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { productService } from '@/lib/services/productService';
import ProductCard from '../../women-catalog/components/ProductCard'; // Reusing existing card
import Icon from '@/components/ui/AppIcon';

export default function SearchInteractive() {
    const searchParams = useSearchParams();
    const query = searchParams.get('search') || searchParams.get('q') || '';

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                // Fetch with global search param, no gender restriction
                const results = await productService.getAll({ search: query });
                setProducts(results);
            } catch (error) {
                console.error("Search failed:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchResults();
        } else {
            setProducts([]);
            setLoading(false);
        }
    }, [query]);

    return (
        <div className="pt-[160px] pb-20 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-heading font-black uppercase italic">
                    Search Results
                </h1>
                <p className="text-text-secondary mt-2">
                    {query ? `Showing results for "${query}"` : 'Enter a term to search'}
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-surface/30 rounded-xl">
                    <Icon name="MagnifyingGlassIcon" size={48} className="mx-auto text-text-secondary mb-4 opacity-50" />
                    <h3 className="text-xl font-bold text-foreground">No matches found</h3>
                    <p className="text-text-secondary mt-2">Try checking your spelling or using different keywords.</p>
                </div>
            )}
        </div>
    );
}
