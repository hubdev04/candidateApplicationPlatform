// JobsList.js
import React, { useState,useEffect } from 'react';
import JobCard from './jobCard.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';

const JobsList = ({ filters }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const allJobs = [
      {"companyname": "hello", "location": "hyd"},
      {"companyname": "new", "location": "hyd"},
      {"companyname": "west", "location": "hyd"}
    ];
    // Fetch jobs data from the API
  const fetchJobs = () => {
    setIsLoading(true); 
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      "limit": 10,
      "offset": offset
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body
    };
    fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
    .then((response) => response.json())
    .then((data) => {
        const array=data?.jdList;
            console.log(data)
           setJobs([...jobs, ...array]);
           setOffset(offset + 10);
           setHasMore(array.length > 0);
          setIsLoading(false); 
    })
    .catch(error => {
        console.error('Error:', error);
        setIsLoading(false); // Set loading false even if there is an error
      });

  };

  useEffect(() => {
    fetchJobs(); // Initial fetch
  }, []);

    // Filter jobs based on the filters.state
    const jobsdJobs = allJobs.filter(job => 
      job.companyname.toLowerCase().includes(filters.companyname.toLowerCase())
    );
  return (
    <div>
    {isLoading ? (
      <h4>Loading...</h4>
    ) : (
      <InfiniteScroll
        dataLength={jobs.length}
        next={fetchJobs}
        hasMore={hasMore}
        loader={<h4>Loading more...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>You have seen it all</b>
          </p>
        }
      >
        <Container  sx={{ mt: 3, mb:3,flexDirection:'row' }}>

        <Grid container spacing={3}> {/* Creates a grid container with space between items */}
                {jobs.map((job, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}> {/* Each item takes up 4 columns on medium screens and up, 6 on small, full width on extra small */}
                        <JobCard job={job} />
                    </Grid>
                ))}
            </Grid>
        </Container>

      </InfiniteScroll>
    )}
  </div>
  );

}
export default JobsList;
