import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Asynchronous thunk for fetching jobs
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async ({ offset, location }, { getState }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      "limit": 10,
      "offset": offset,
      "location": location,
      
     
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body
    };

    const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
    const data = await response.json();
    return data.jdList;
  }
);

const initialState = {
  allJobs: [],
  visibleJobs: [],
  isLoading: false,
  hasMore: true,
  currentFilter: '',
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setFilteredJobs: (state, action) => {
      const filterItems=action.payload;
      const filterText = action.payload.toLowerCase();
      state.currentFilter = filterText;
      state.visibleJobs = state.allJobs.filter(job => 
        (job.location ?? "").toLowerCase().includes(filterText)
       
      );
      
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.allJobs = [...state.allJobs, ...action.payload];
        state.visibleJobs = state.allJobs.filter(job =>
          (job.location ?? "").toLowerCase().includes(state.currentFilter.toLowerCase())
          
        );
        state.hasMore = action.payload.length > 0;
        state.isLoading = false;
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setFilteredJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
