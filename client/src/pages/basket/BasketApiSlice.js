import apiSlice from "../../app/apiSlice";

const BasketApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({

    getBasket: build.query({
      query: () => ({
        url: "/api/basket",
      }),
      providesTags: ['Basket'],
    }),


    createItemBasket: build.mutation({
      query: (product) => ({
        url: "/api/basket/add-item",
        method: "POST",
        body: product
      }),
      invalidatesTags: ['Basket'],
    }),



    deleteFromBasket: build.mutation({
      query: (id) => ({
        url: "/api/basket/delete-item",
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ['Basket'],
    }),

updateItemBasketQuantity: build.mutation({
  query: (item) => ({
    url: "/api/basket/update-item-quantity",
    method: "PUT",
    body: item,
  }),
  invalidatesTags: ['Basket'],
}),

  }),
});

export const { useGetBasketQuery, useCreateItemBasketMutation, useDeleteFromBasketMutation, useUpdateItemBasketQuantityMutation } = BasketApiSlice;