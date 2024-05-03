import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Asynchronous thunk for fetching jobs
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async ({ offset, location,jobRole,minExp,minJdSalary,workType }, { getState }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      "limit": 10,
      "offset": offset,
      "location": location,
      "jobRole":jobRole,
      "minExp":minExp,
      "minJdSalary":minJdSalary,
      "workType":workType
     
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
  filter: {
    location: '',
    jobRole: '',
    minExp:null,
    minJdSalary:null,
    workType:''
  }
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setFilteredJobs: (state, action) => {
        const { location, jobRole,minExp,minJdSalary,workType } = action.payload;
        state.filter={location:location.toLowerCase(),jobRole :jobRole.toLowerCase(),minExp:minExp,minJdSalary:minJdSalary,workType:workType}
        state.visibleJobs = state.allJobs.filter(job =>{
            const jobLocationMatches = job.location.toLowerCase().includes(state.filter.location);
            const jobRoleMatches = job.jobRole.toLowerCase().includes(state.filter.jobRole);
            const minExpMatches = state.filter.minExp ? job.minExp >= state.filter.minExp : true;
            const minSalaryMatches = state.filter.minJdSalary ? job.minJdSalary >= state.filter.minJdSalary : true;
            const typeofWork=((state.filter.workType==='remote' && job.location==='remote') || state.filter.workType=='on-site')
            return jobLocationMatches && jobRoleMatches && minExpMatches && minSalaryMatches &&typeofWork;

        });
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
            {
                const jobLocationMatches = job.location.toLowerCase().includes(state.filter.location);
                const jobRoleMatches = job.jobRole.toLowerCase().includes(state.filter.jobRole);
                const minExpMatches = state.filter.minExp ? job.minExp >= state.filter.minExp : true;
                const minSalaryMatches = state.filter.minJdSalary ? job.minJdSalary >= state.filter.minJdSalary : true;

                const typeofWork=((state.filter.workType==='remote' && job.location==='remote') || state.filter.workType=='on-site')
            return jobLocationMatches && jobRoleMatches && minExpMatches && minSalaryMatches &&typeofWork;
    
          }
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
