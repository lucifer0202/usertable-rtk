// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://api.jsonbin.io/v3/b';
const BIN_ID = '64b3fad6b89b1e2299bfcd46'; // Replace with your actual collection ID
const API_SECRET_KEY = '$2b$10$E8jAP5H9iAXovvcFyyrpiuxRv7NBHEN.TJ9gWaW.nRis2QgW8gYa.'; // Replace with your actual API secret key

// Fetch data from the API
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await axios.get(`${API_URL}/${BIN_ID}/latest`, {
    headers: {
      'X-Master-Key': API_SECRET_KEY,
    },
  });
  return response.data.record.users || [];
});

// Save data to the API
export const saveData = createAsyncThunk('data/saveData', async (data) => {
  const response = await axios.get(`${API_URL}/${BIN_ID}`, {
    headers: {
      'X-Master-Key': API_SECRET_KEY,
    },
  });

  const existingData = response.data?.record || { users: [] };
  const lastId = existingData.users.length > 0 ? existingData.users[existingData.users.length - 1].id : 0;
  const newId = lastId + 1;

  const newData = {
    ...existingData,
    users: [...existingData.users, { id: newId, ...data }],
  };

  const updateResponse = await axios.put(`${API_URL}/${BIN_ID}`, newData, {
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': API_SECRET_KEY,
    },
  });

  return updateResponse.data.record.users;
});

// Delete data from the API
export const deleteData = createAsyncThunk('data/deleteData', async (id) => {
  const response = await axios.get(`${API_URL}/${BIN_ID}`, {
    headers: {
      'X-Master-Key': API_SECRET_KEY,
    },
  });

  const existingData = response.data.record || { users: [] };

  const updatedData = {
    ...existingData,
    users: existingData.users.filter((user) => user.id !== id),
  };

  const updateResponse = await axios.put(`${API_URL}/${BIN_ID}`, updatedData, {
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': API_SECRET_KEY,
    },
  });

  return updateResponse.data.record.users;
});

// Data slice
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveData.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(saveData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
