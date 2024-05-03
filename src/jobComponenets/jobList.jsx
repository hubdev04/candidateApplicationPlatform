import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs, setFilteredJobs } from '../features/jobSlice.js';
import JobCard from './jobCard.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const JobsList = ({ filters }) => {
    const { visibleJobs, isLoading, hasMore } = useSelector(state => state.jobs);
    const dispatch = useDispatch();
    const scrollRef = useRef(null); // Ref to track the scroll container

    useEffect(() => {
      // Fetch initial data with location filter
      dispatch(fetchJobs({ offset: 0, location:filters.location}));
    }, [dispatch, filters.location]);

    useEffect(() => {
      // Apply filter whenever it changes
      dispatch(setFilteredJobs(filters.location));
    }, [filters.location, dispatch]);

    const fetchMoreJobs = () => {
      // Fetch more jobs according to current filter and pagination
      if (hasMore && !isLoading) {
        dispatch(fetchJobs({ offset: visibleJobs.length, location:filters.location}));
      }
    };

    return (
      <div ref={scrollRef}>  {/* Attach ref to the div */}
        {isLoading && visibleJobs.length === 0 ? <h4>Loading...</h4> : (
          <InfiniteScroll
            dataLength={visibleJobs.length} // This should be the length of the data
            next={fetchMoreJobs}
            hasMore={hasMore}
            loader={<h4>Loading more...</h4>}
            scrollableTarget={scrollRef} // Set the scrollable target to ref
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>You have seen it all</b>
              </p>
            }
          >
            <Container sx={{ mt: 3, mb: 3, flexDirection: 'row' }}>
              <Grid container spacing={3}>
                {visibleJobs.map((job, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <JobCard job={job} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </InfiniteScroll>
        )}
      </div>
    );
};

export default JobsList;
