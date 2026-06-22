'use client';

import React, { useState } from 'react';
import VehiclesSortAndSearch from './VehiclesSortAndSearch';
import VehiclesMobileFilterDrawer from './VehiclesMobileFilterDrawer';
import { Brand, Category } from '@/lib/db/types';

interface HeaderWrapperProps {
  totalResults: number;
  brands: Brand[];
  categories: Category[];
}

export default function VehiclesPageHeaderWrapper({ totalResults, brands, categories }: HeaderWrapperProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <VehiclesSortAndSearch 
        totalResults={totalResults} 
        onMobileFilterOpen={() => setIsDrawerOpen(true)} 
      />
      
      <VehiclesMobileFilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        brands={brands}
        categories={categories}
      />
    </>
  );
}
