import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchParticipants } from "../../services/api";

export const loadParticipants = createAsyncThunk(
  "participants/loadParticipants",
  async (eventId) => {
    const data = await fetchParticipants(eventId);
    return data.data;
  }
);

const participantsSlice = createSlice({
  name: "participants",
  initialState: {
    participants: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadParticipants.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadParticipants.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = action.payload;
      })
      .addCase(loadParticipants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default participantsSlice.reducer;
