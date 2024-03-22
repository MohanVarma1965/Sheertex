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
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 p-4 items-end">
        <div className="col-span-1 md:col-span-7">
          <SearchComponent />
        </div>
        <div className="hidden md:flex md:justify-around col-span-1 md:col-span-3 bg-gray-200">
          <FilterComponent />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {sortedProducts.map((product) =>
          product.variants.nodes.map((variant: any) => (
            <div key={variant.id} className="max-w-sm w-full rounded overflow-hidden shadow-lg">
              <img className="w-full" src={variant.image.url} alt={variant.image.altText || product.title} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.title}</div>
                {variant.availableForSale ? (
                  <p className="text-green-500">Available for sale</p>
                ) : (
                  <p className="text-red-500">Not available for sale</p>
                )}
                <p className="text-gray-700 text-base">
                  {variant.selectedOptions.map((option: any) => (
                    <span
                      key={option.name}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {option.name}: {option.value}
                    </span>
                  ))}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  ${variant.price.amount} {variant.price.currencyCode}
                </span>
                {variant.compareAtPrice && (
                  <span className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-red-700 mr-2 mb-2 line-through">
                    ${variant.compareAtPrice.amount}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
export default ProductsContainer;
