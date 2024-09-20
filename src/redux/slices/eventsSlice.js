import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEvents } from "../../services/api";

export const loadEvents = createAsyncThunk("events/loadEvents", async () => {
  const data = await fetchEvents();
  return data.data;
});

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(loadEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default eventsSlice.reducer;
