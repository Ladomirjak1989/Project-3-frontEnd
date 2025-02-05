import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchHotelAsync } from './fetchSearchSliceAsync';
import { fetchHotelAsyncApi } from './fetchHotelSliceAsync';


// Завантажуємо збережені вибрані готелі з localStorage
const savedFavoriteHotels = JSON.parse(localStorage.getItem("favoriteHotels")) || [];

const initialState = {
  hotels: {},
  destination: '',
  checkInDate: '',
  checkOutDate: '',
  rooms: [{ adults: 2, children: 0 }],
  favoriteHotel: savedFavoriteHotels,
  cartHotel: [],
  countCart: 0,
  countFavorite: savedFavoriteHotels.length,
};

// **Функція для оновлення localStorage**
const updateLocalStorage = (favoriteHotels) => {
  localStorage.setItem("favoriteHotels", JSON.stringify(favoriteHotels));
};

// List of random images
const randomImageUrls = [
  'https://omore.city/upload/article/o_1fmao881q15et1lvffcd1cdeft01r.jpg',
  'https://trips.com.ua/wp-content/uploads/2022/10/jumeirah-2.jpg',
  'https://trips.com.ua/wp-content/uploads/2022/10/ritz-carlton-2.jpg',
  'https://trips.com.ua/wp-content/uploads/2022/10/jumeirah-2.jpg',
  'https://ozi.pp.ua/wp-content/uploads/2013/12/hotel_5_zvezd.jpg',
  'https://www.hotels-of-ukraine.com/data/Photos/300x300w/15573/1557337/1557337492.JPEG',
  'https://www.hotels-of-ukraine.com/data/Photos/300x300w/16005/1600574/1600574510.JPEG',
  'https://ua.igotoworld.com/frontend/webcontent/images/tours/1022451_800x600_776dff0d-cbcb-4da0-9c5e-e799a94c0e12.jpg',
  'https://ua.igotoworld.com/frontend/webcontent/images/tours/1022452_800x600_Presidentialsuite_guestroom.jpg',
  'https://www.volynnews.com/files/news/2010/01-26/12613-3u.jpg',
  'https://www.momondo.ua/himg/1b/7d/2b/expedia_group-132602-9fb74e-365477.jpg',
  'https://www.momondo.ua/rimg/himg/7b/5e/92/expediav2-328050-8cc592-339303.jpg?width=200&height=200&crop=true',
  'https://content.skyscnr.com/available/1579231536/1579231536_WxH.jpg',
  'https://bq-house-monti-rome.hotelmix.com.ua/data/Photos/OriginalPhoto/15377/1537766/1537766299/Bq-House-Fori-Imperiali-Luxury-Rooms-Exterior.JPEG',
  'https://athena-hotel-cervia.hotelmix.com.ua/data/Photos/OriginalPhoto/7657/765779/765779773/Hotel-Athena-Exterior.JPEG',
  'https://pix10.agoda.net/property/38436668/636248452/5976bd2dc8fa47562a69aa25dca0035e.jpeg?ce=0&s=702x392',
  'https://content.skyscnr.com/available/1459649515/1459649515_WxH.jpg',
  'https://content.skyscnr.com/available/1663931861/1663931861_768x576.jpg',
  'https://pix10.agoda.net/property/26269041/0/df03a628cc88aec0af92f91d91879cb7.jpg?ca=29&ce=0&s=702x392',
  'https://content.r9cdn.net/rimg/himg/02/c8/f7/ostrovok-2288904-d85de2-350909.jpg?width=335&height=268&crop=true',
  'https://content.skyscnr.com/available/1663931861/1663931861_768x576.jpg',
  'https://uamedtours.com.ua/storage/images/1ce28125dc8fffc01bce2ebefd57f009.jpg',
  'https://investory.news/wp-content/uploads/2019/03/hotel21.jpg',
  'https://investory.news/wp-content/uploads/2019/03/hotel7.jpg',
  'https://shangri-la-at-the-shard-hotel-london.hotelmix.com.ua/data/Photos/OriginalPhoto/14328/1432884/1432884352/Shangri-La-The-Shard-London-Hotel-Exterior.JPEG',
  'https://shangri-la-at-the-shard-hotel-london.hotelmix.com.ua/data/Photos/OriginalPhoto/14328/1432883/1432883251/Shangri-La-The-Shard-London-Hotel-Exterior.JPEG',
  'https://static.nv.ua/shared/system/MediaPhoto/images/000/503/868/original/bb6dc8f90b3067704bf2159b08768af5.png?q=85&stamp=20240918112000&f=jpg',
  'https://ysa.kiev.ua/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2024/04/yaponiya-2-1024x682.jpg.webp',
  'https://img.tsn.ua/cached/914/tsn-7a64ecb707dcefdea08defefce4c011b/thumbs/1036x648/c6/54/05cda6aed991478be666667b8f3954c6.jpg',
  'https://24tv.ua/resources/photos/news/640_DIR/202111/1805545_15389863.jpg?202111153032',
];




const hotelSearchSlice = createSlice({
  name: 'hotelSearch',
  initialState,
  reducers: {
    setDestination(state, action) {
      state.destination = action.payload;
    },
    setCheckInDate(state, action) {
      state.checkInDate = action.payload;
    },
    setCheckOutDate(state, action) {
      state.checkOutDate = action.payload;
    },

    setGuests(state, action) {
      const { index, adults, children } = action.payload;
      state.rooms[index] = { adults, children };
    },

    setClearSearch(state) {
      return initialState;
    },

    setFavoriteHotel: (state, action) => {
      const hotelId = action.payload;
      const hotelIndex = state.favoriteHotel.findIndex(hotel => hotel.hotelId === hotelId);

      if (hotelIndex !== -1) {
        // Видаляємо з обраного
        state.favoriteHotel = state.favoriteHotel.filter(hotel => hotel.hotelId !== hotelId);
        state.countFavorite -= 1;
      } else {
        // Додаємо до обраного
        const newFavoriteHotel = state.hotels[hotelId];
        if (newFavoriteHotel) {
          state.favoriteHotel.push(newFavoriteHotel);
          state.countFavorite += 1;
        }
      }

      // Оновлення localStorage
      updateLocalStorage(state.favoriteHotel);
    },


    setCartHotel: (state, action) => {
      const hotelIndex = action.payload;
      if (state.hotels[hotelIndex]) {
        if (state.hotels[hotelIndex].isCart) {
          state.hotels[hotelIndex].isCart = false;
          state.countCart -= 1;
          state.cartHotel = state.cartHotel.filter(item => item.hotelId !== state.hotels[hotelIndex].hotelId);
        } else {
          state.hotels[hotelIndex].isCart = true;
          state.countCart += 1;
          state.cartHotel = [...state.cartHotel, state.hotels[hotelIndex]];
        }
      }
    },

    setSortedHotel: (state, action) => {
      const hotel = action.payload.reduce((acc, cur) => {
        acc[cur.hotelId] = cur
        return acc
      }, {})

      state.hotels = hotel
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchHotelAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSearchHotelAsync.fulfilled, (state, action) => {
        state.loading = false
        const hotels = action.payload.reduce((acc, cur) => {
          acc[cur.dupeId] = cur
          return acc
        }, {})
        state.hotels = hotels
      })
      .addCase(fetchSearchHotelAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })


      .addCase(fetchHotelAsyncApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotelAsyncApi.fulfilled, (state, action) => {
        state.loading = false;
        let counter = 0;
        let countCart = 0;
        const cartStorage = JSON.parse(localStorage.getItem("cart"));
        const storage = JSON.parse(localStorage.getItem("favoriteHotels")) || [];

        const data = action.payload.map(item => {
          const randomImg = randomImageUrls[Math.floor(Math.random() * randomImageUrls.length)];
          const randomPrice = Math.floor(Math.random() * (300 - 50 + 1)) + 50;
          const randomRating = (Math.random() * (5 - 2) + 2).toFixed(1);
          const randomReviews = Math.floor(Math.random() * 1000);

          item.isCart = cartStorage?.includes(item.hotelId) || false;
          item.isFavorite = storage?.some(fav => fav.hotelId === item.hotelId) || false;

          if (item.isCart) countCart += 1;
          if (item.isFavorite) counter += 1;

          return { ...item, randomReviews, rating: +randomRating, randomImg, randomPrice };
        });

        state.hotels = data.reduce((acc, cur) => {
          acc[cur.hotelId] = cur;
          return acc;
        }, {});

        state.favoriteHotel = data.filter(item => item.isFavorite);
        state.cartHotel = data.filter(item => item.isCart);
        state.countFavorite = counter;
        state.countCart = countCart;

        // Оновлення localStorage після отримання даних
        updateLocalStorage(state.favoriteHotel);
      })

      .addCase(fetchHotelAsyncApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }
});

export const {
  setDestination,
  setCheckInDate,
  setCheckOutDate,
  setGuests,
  setClearSearch,
  setSortedHotel,
  setFavoriteHotel,
} = hotelSearchSlice.actions;

export default hotelSearchSlice.reducer;
