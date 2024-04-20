import { apiSlice } from './apiSlice';
const AUCTIONS_URL = `/api/auctions`;

/*
router.route('/my-auctions')
  .get(protect, getMyAuctions);
*/
export const auctionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuctions: builder.query({
      query: (search = '') => ({
        url: `${AUCTIONS_URL}?search=${search}`,
      }),
    }),
    getMyAuctions: builder.query({
      query: () => `${AUCTIONS_URL}/my-auctions`,
    }),

    getAuctionById: builder.query({
      query: (id) => `${AUCTIONS_URL}/${id}`,
    }),

    createAuction: builder.mutation({
      query: (auction) => ({
        url: AUCTIONS_URL,
        method: 'POST',
        body: auction,
      }),
    }),
  }),
});

export const {
  useGetAuctionsQuery,
  useGetAuctionByIdQuery,
  useGetMyAuctionsQuery,
  useCreateAuctionMutation,
} = auctionApiSlice;
