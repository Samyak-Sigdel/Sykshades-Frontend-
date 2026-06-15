import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { Breadcrum } from '../Components/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay';
import { DescriptionBox } from '../Components/DescriptionBox';
import { RelatedProduct } from '../Components/RelatedProduct';

export const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();

    // Still fetching from API
    if (all_product.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
                    <p className="text-sm text-gray-400 uppercase tracking-widest">Loading</p>
                </div>
            </div>
        );
    }

    const product = all_product.find((e) => e.id === Number(productId));

    // Products loaded but this ID doesn't exist
    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl font-light text-gray-900 mb-2">Product not found</p>
                    <p className="text-sm text-gray-400">The product you're looking for doesn't exist or was removed.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Breadcrum product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox />
            <RelatedProduct category={product.category} currentId={product.id} />
        </div>
    );
};