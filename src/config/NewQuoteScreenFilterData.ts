

export interface FilterData {
    id: string;
    categoryItem: string;
    totalItem: number;
    categoryName: string;
    subCategoryName: string;
    measurementUnit: string;
    pricePerUnit: number;
    totalPrice: number;
}

export const DATA: FilterData[] = [
  {
    id: '1',
    categoryItem: 'PVC Pipes',
    totalItem: 0,
    categoryName: 'Materials',
    subCategoryName: 'Heavy Materials',
    measurementUnit: 'ft',
    pricePerUnit: 4.0,
    totalPrice: 80.0,
  },
  {
    id: '2',
    categoryItem: 'Steel',
    totalItem: 0,
    categoryName: 'Materials',
    subCategoryName: 'Heavy Materials',
    measurementUnit: 'ft',
    pricePerUnit: 4.0,
    totalPrice: 80.0,
  },
  {
    id: '3',
    categoryItem: 'Bricks',
    totalItem: 0,
    categoryName: 'Materials',
    subCategoryName: 'Heavy Materials',
    measurementUnit: 'ft',
    pricePerUnit: 4.0,
    totalPrice: 80.0,
  },
];