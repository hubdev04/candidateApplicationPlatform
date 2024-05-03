import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Asynchronous thunk for fetching jobs
export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async ({ offset,filters }, { getState }) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
            "limit": 10,
            "offset": offset,
            ...filters

        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body
        };
        const apiUrl = process.env.REACT_APP_API_BASE;
        const response = await fetch(apiUrl, requestOptions);
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
        minExp: null,
        minJdSalary: null,
        workType: ''
    }
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setFilteredJobs: (state, action) => {
            const { location, jobRole, minExp, minJdSalary, workType } = action.payload;
            state.filter = { location: location.toLowerCase(), jobRole: jobRole.toLowerCase(), minExp: minExp, minJdSalary: minJdSalary, workType: workType }
            state.visibleJobs = state.allJobs.filter(job => {// matching all the condtions for rendering
                const jobLocationMatches = job.location.toLowerCase().includes(state.filter.location);
                const jobRoleMatches = job.jobRole.toLowerCase().includes(state.filter.jobRole);
                const minExpMatches = state.filter.minExp ? job.minExp >= state.filter.minExp : true;
                const minSalaryMatches = state.filter.minJdSalary ? job.minJdSalary >= state.filter.minJdSalary : true;
                let workTypeMatches = true; // Assume all jobs match initially
                if (state.filter.workType === 'remote') {
                    workTypeMatches = job.location.toLowerCase() === 'remote';
                } else if (state.filter.workType === 'onsite') {
                    workTypeMatches = job.location.toLowerCase() !== 'remote';
                }
                return jobLocationMatches && jobRoleMatches && minExpMatches && minSalaryMatches && workTypeMatches;

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
                state.visibleJobs = state.allJobs.filter(job => {// matching all the condtions for rendering
                    const jobLocationMatches = job.location.toLowerCase().includes(state.filter.location);
                    const jobRoleMatches = job.jobRole.toLowerCase().includes(state.filter.jobRole);
                    const minExpMatches = state.filter.minExp ? job.minExp >= state.filter.minExp : true;
                    const minSalaryMatches = state.filter.minJdSalary ? job.minJdSalary >= state.filter.minJdSalary : true;

                    let workTypeMatches = true; // Assume all jobs match initially
                    if (state.filter.workType === 'remote') {
                        workTypeMatches = job.location.toLowerCase() === 'remote';
                    } else if (state.filter.workType === 'onsite') {
                        workTypeMatches = job.location.toLowerCase() !== 'remote';
                    }
                    return jobLocationMatches && jobRoleMatches && minExpMatches && minSalaryMatches && workTypeMatches;

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
