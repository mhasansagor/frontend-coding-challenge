"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";
import { useRouter,useSearchParams } from "next/navigation";

export const Products: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });
 
  const handleOpenModal = useCallback((product: Product) => {
    router.push("?product-id=" + product.id);
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    router.push(window.location.pathname);
    setSelectedProduct(null);
  }, []);

  useEffect(()=>{
    const productId = searchParams.get("product-id");
    const product = PRODUCTS_DATA.find((item) => item.id.toString() === productId);
    productId?setSelectedProduct(product || null):setSelectedProduct(null);
  },[searchParams])

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
