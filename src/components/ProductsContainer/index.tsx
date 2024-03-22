import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProducts } from "../../redux/slices/products/productsSlice";
import FilterComponent from "../Filter";
import SearchComponent from "../Search";
import SortComponent from "../Sort";

const ProductsContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products.products);
  const status = useAppSelector((state) => state.products.status);
  const error = useAppSelector((state) => state.products.error);

  // Get the filters and search query from the state
  const filters = useAppSelector((state) => state.products.filters);
  const sortCriteria = useAppSelector((state) => state.products.sortCriteria);
  const sortOrder = useAppSelector((state) => state.products.sortOrder);

  // Filter the products based on search and other criteria
  const filteredProducts = products.filter((product) =>
    product.variants.nodes.some((variant) => {
      const meetsAvailableForSaleCriteria =
        filters.availableForSale === false || variant.availableForSale === filters.availableForSale;
      const meetsSearchCriteria = product.title.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const meetsSizeCriteria =
        filters.sizes.length === 0 ||
        variant.selectedOptions.some((option) => option.name === "Size" && filters.sizes.includes(option.value));
      // Assuming color is a selectedOption, adjust if your data structure differs
      const meetsColorCriteria =
        filters.colors.length === 0 ||
        variant.selectedOptions.some((option) => option.name === "Color" && filters.colors.includes(option.value));

      return meetsAvailableForSaleCriteria && meetsSearchCriteria && meetsSizeCriteria && meetsColorCriteria;
    })
  );

  // Sort Products
  const sortProducts = (products: any, criteria: any, order: any) => {
    return [...products].sort((a, b) => {
      if (criteria === "name") {
        return order === "ascending" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      } else if (criteria === "price") {
        const priceA = a.variants.nodes[0]?.price.amount;
        const priceB = b.variants.nodes[0]?.price.amount;
        return order === "ascending" ? priceA - priceB : priceB - priceA;
      }
    });
  };

  // Then, use this function to sort products before rendering
  const sortedProducts = sortProducts(filteredProducts, sortCriteria, sortOrder);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex items-center justify-between py-4 md:py-8 md:space-x-6 md:max-w-xl md:mx-auto">
        <div className="flex-1">
          <SearchComponent />
        </div>
        <div className="hidden px-4 bg-gray-200 border border-gray-300 rounded-sm md:flex">
          <FilterComponent />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:lg-grid-cols-3 lg:grid-cols-4 justify-items-center">
        {sortedProducts.map((product) =>
          product.variants.nodes.map((variant: any) => (
            <div key={variant.id} className="w-full max-w-sm overflow-hidden rounded shadow-lg">
              <img className="w-full" src={variant.image.url} alt={variant.image.altText || product.title} />
              <div className="flex flex-col justify-between p-6 space-y-4">
                <div className="text-xl font-semibold">{product.title}</div>
                {!variant.availableForSale && (
                  <p className="px-4 py-1 text-white bg-red-500 rounded-md w-fit whitespace-wrap">Out of stock</p>
                )}
                <p className="text-base text-black">
                  {variant.selectedOptions.map((option: any, index: number) => (
                    <span key={option.name} className={`inline-block text-sm font-medium pr-2`}>
                      <span className="underline">{option.name}</span>: {option.value}
                    </span>
                  ))}
                </p>
                <div>
                  {variant.compareAtPrice && (
                    <span className="inline-block mr-2 font-medium text-red-700 line-through text-md">
                      ${variant.compareAtPrice.amount} {variant.price.currencyCode}
                    </span>
                  )}

                  <span className="inline-block font-medium text-black text-md">${variant.price.amount}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
export default ProductsContainer;
