// JobCard.js
import React from 'react';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import fakedata from '../Utils/fakedata.json'
import Container from '@mui/material/Container'
import DoneIcon from '@mui/icons-material/Done';
import Box from "@mui/material/Box"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Import an icon for visual effect
import { useState } from 'react';
import HourglassFullTwoToneIcon from '@mui/icons-material/HourglassFullTwoTone';
const JobCard = ({ job }) => {

    const postedday = job.maxJdSalary % 30;
    const detail = job.jobDetailsFromCompany;
    const [details, setDetails] = useState(detail)
    const [expandText, setExpandText] = useState(false); // State to toggle text expansion
    const companyNames = fakedata?.companyNames;
    const companyName=companyNames[(job.maxJdSalary)%23].name
    const toggleText = () => {
        setDetails(details)
        setExpandText(!expandText);
    };
    return (
        <Card sx={{ margin: 3, boxShadow: 1,border: "3px solid #d7dbd8",borderRadius:5 }}>  {/* Shadow and margin for the card */}
            <CardContent>
                <Box sx={{ border: "3px solid #d7dbd8", borderRadius: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', width: '50%', pl: 1 }}>
                    <HourglassFullTwoToneIcon sx={{ fontSize: 13 }}></HourglassFullTwoToneIcon>
                    <Typography sx={{ fontSize: 13 }}>Posted {postedday} days ago </Typography>
                </Box>
                <Box sx={{ border: "2px solid #f7faf8", mt: 1 }}>
                    <Typography variant="h5" component="div" sx={{ color:"#7f8280"}}>
                       {companyName}
                    </Typography>
                    <Typography  component="div" sx={{ marginBottom: 1,fontSize:13,color:"#393b39" }}>
                        {job.jobRole.charAt(0).toUpperCase() + job.jobRole.slice(1).toLowerCase()}  {job.jobRole.toLowerCase() !== "tech lead" ? "Developer" : ""}
                    </Typography>
                </Box>
                <Box sx={{ border: "2px solid #f7faf8" }} display="flex" flexDirection="row" >
                    <Typography variant="body1" color="#5e615f"  fontWeight={600}>
                        Job Location: 
                    </Typography>
                    <Typography border="1px solid #d7dbd8" marginLeft={1}>{ job.location.charAt(0).toUpperCase() + job.location.slice(1).toLowerCase()}</Typography>
                </Box>

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
                    <Typography variant='body1'>Minimum Experience</Typography>
                    <Typography variant='body1'>{job.minExp ? job.minExp + " years" : "1+years"}</Typography>
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
