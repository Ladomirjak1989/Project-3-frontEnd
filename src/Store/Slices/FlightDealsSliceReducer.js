import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deals: [
    {
      id: 1,
      image: 'https://i.pinimg.com/736x/7e/2c/72/7e2c72209e6a2988394ae42c0910e01a.jpg',
      destination: 'Fly to the Santorini, Greece from €149pp',
      description: 'Experience the breathtaking views and stunning sunsets in Santorini, Greece. Enjoy the local cuisine, historical sites, and beautiful beaches.',
      buttonText: 'Browse Santorini deals',
    },
    {
      id: 2,
      image: 'https://cms-asset.ayana.com/OG_Image_ARSB_66cefac2a6.jpg',
      destination: 'Fly to Bali, Indonesia from €199pp',
      description: 'Relax on the beautiful beaches of Bali, explore its rich culture and heritage, and enjoy a luxurious stay.',
      buttonText: 'Browse Bali deals',
    },
    {
      id: 3,
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/56673469.jpg?k=71a922ccf869899bd84e5f8f66b31315cb925c64d6a83f9c80b45c3de81a5f16&o=&hp=1',
      destination: 'Fly to Phuket, Thailand from €299pp',
      description: 'Discover the vibrant culture, stunning beaches, and exciting nightlife of Phuket with a stay at a luxurious resort.',
      buttonText: 'Browse Thailand deals',
    },
  ],
};

const flightDealsSlice = createSlice({
  name: 'flightDeals',
  initialState,
  reducers: {},
});

export const selectFlightDeals = (state) => state.flightDeals.deals;

export default flightDealsSlice.reducer;
