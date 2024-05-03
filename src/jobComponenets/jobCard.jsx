// JobCard.js
import React from 'react';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import DoneIcon from '@mui/icons-material/Done';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Import an icon for visual effect
import { useState } from 'react';
const JobCard = ({ job }) => {
 // if(job.minSalary==null)
 const detail=job.jobDetailsFromCompany;
 const [details,setDetails]=useState(detail)
 const [expandText, setExpandText] = useState(false); // State to toggle text expansion

    const toggleText = () => {
        setDetails(details)
        setExpandText(!expandText);
    };
  return (
    <Card sx={{ margin: 3, boxShadow: 3 }}>  {/* Shadow and margin for the card */}
            <CardContent>
                <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
                    {job.jobRole}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 2 }}>
                    {job.location}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    Estimated Salary: {job.minJdSalary || 'N/A'}{job.salaryCurrencyCode} - {job.maxJdSalary || 'N/A'}{job.salaryCurrencyCode}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>About Company:</Typography>
                <div style={{
                    maxHeight: expandText ? 'none' : '4.5em', // Maximum height correlates to about 3 lines of text
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    position: 'relative',
                    display: '-webkit-box',
                    WebkitLineClamp: expandText ? 'none' : '3',
                    WebkitBoxOrient: 'vertical'
                }}>
                    {details}
                </div>
                <Button onClick={toggleText} sx={{ marginTop: 1 }}>
                    {expandText ? 'Show Less' : 'Show More'}
                    <ExpandMoreIcon style={{ transform: expandText ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </Button>
                <Container sx={{ marginBottom: 2 }}>
                  <Typography variant='body1'>Minimum Expericnec</Typography>
                  <Typography variant='body1'>{job.minExp?job.minExp + " years":"1+years"}</Typography>
                </Container>
                <Button variant="contained" color="primary">
                    <DoneIcon></DoneIcon>
                    <Typography>  Ease in Apply</Typography>
                </Button>
            </CardContent>
        </Card>
  );
};

export default JobCard;
