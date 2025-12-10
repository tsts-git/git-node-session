import apiSlice from "../../app/apiSlice";

const ProductsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({

    getProducts: build.query({
      query: () => ({
        url: "/api/product"
      }),
    }),

    createProduct: build.mutation({
      query: (product) => ({
        url:  "/api/product",
        method: "POST",
        body: product
      }),
    }),

    deleteItem: build.mutation({
        query: (id) => ({
          url:  `/api/product${id}`,
          method: "DELETE",
          body: id,
        }),
      }),

      updateItem: build.mutation({
        query: (id) => ({
          url:  "/api/product",
          method: "PUT",
          body: id,
        }),
      }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation,useDeleteItemMutation,useUpdateItemMutation } = ProductsApiSlice;