// JobCard.js
import React from 'react';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import fakedata from '../Utils/fakedata.json'
import Container from '@mui/material/Container'
import BoltIcon from '@mui/icons-material/Bolt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DoneIcon from '@mui/icons-material/Done';
import Box from "@mui/material/Box"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Import an icon for visual effect
import { useState, useRef } from 'react';
import HourglassFullTwoToneIcon from '@mui/icons-material/HourglassFullTwoTone';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
const JobCard = ({ job }) => {

    const postedday = job.maxJdSalary % 30;
    const detail = job.jobDetailsFromCompany;
    const [details, setDetails] = useState(detail)
    const [expandText, setExpandText] = useState(false); // State to toggle text expansion
    const scrollableDivRef = useRef(null);
    const companyNames = fakedata?.companyNames;
    const companyName = companyNames[(job.maxJdSalary) % 23].name
    var estimated_salary = ""
    if(job.minJdSalary && job.maxJdSalary){
        estimated_salary=`${job.minJdSalary}k  - ${job.maxJdSalary}k ${job.salaryCurrencyCode}`
    }
    else if(job.minJdSalary){
        estimated_salary=`${job.minJdSalary}k ${job.salaryCurrencyCode} +`
    }
    else if(job.maxJdSalary){
        estimated_salary=`upto ${job.maxJdSalary}k ${job.salaryCurrencyCode}`
    }
    else{
        estimated_salary="As per industry Standards"
    }
    const toggleText = () => {
        console.log(Event)
        // setDetails(details)
        setExpandText(!expandText);
        setDetails(detail);
        if (scrollableDivRef.current && expandText) {
            scrollableDivRef.current.scrollTop = 0; // Scroll to the top when collapsing
        }

    };

    return (
        <Card sx={{ margin: 3, boxShadow: 1, border: "3px solid #d7dbd8", borderRadius: 5 }}>  {/* Shadow and margin for the card */}
            <CardContent>
                <Box sx={{ border: "3px solid #d7dbd8", borderRadius: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', width: '50%', pl: 1 }} md={{width:'33%'}}>
                    <HourglassFullTwoToneIcon sx={{ fontSize: 13 }}  ></HourglassFullTwoToneIcon>
                    <Typography sx={{ fontSize: 13 }}>Posted {postedday} days ago </Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                    <Typography variant="h5" component="div" sx={{ fontSize: '1rem', color: "#7f8280" }}>
                        {companyName}
                    </Typography>
                    <Typography component="div" sx={{ fontSize: 13, color: "#393b39" }}>
                        {job.jobRole.charAt(0).toUpperCase() + job.jobRole.slice(1).toLowerCase()}  {job.jobRole.toLowerCase() !== "tech lead" ? "Developer" : ""}
                    </Typography>
                    <Typography
                        variant="body1"
                        color="#5e615f"
                        fontWeight={600}
                        sx={{ marginRight: '10px', fontSize:'0.7rem' }}
                    >
                        {job.location.charAt(0).toUpperCase() + job.location.slice(1).toLowerCase()}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: '10px',
                    }}
                >
                    <Typography
                        variant="body1"
                        fontWeight={600}
                        color="#5e615f"
                        sx={{
                            backgroundColor: '#fff',
                            fontSize: '0.8rem',
                        }}
                    >
                        Estimated Salary: {estimated_salary}
                    </Typography>
                    <VerifiedOutlinedIcon sx={{ fontSize: '1rem' }} />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    About Company:
                </Typography>

                <div
                    ref={scrollableDivRef}
                    style={{
                        maxHeight: expandText ? '5.2em' : '5.2em', // Maximum height correlates to about 3 lines of text
                        overflow: expandText ? 'auto' : 'hidden',
                        position: 'relative',
                        display: '-webkit-box',
                        WebkitLineClamp: expandText ? 'none' : '3',
                        WebkitBoxOrient: 'vertical',
                        backgroundColor: expandText ? '#e8e6f0' : 'white', borderRadius: '10px',
                        padding: !expandText?'10px 0px 20px 0px':'10px 10px 20px 10px',
                        fontSize:'0.9rem'

                    }}
                >
                    {details}
                </div>
                <Button onClick={toggleText} sx={{ marginTop: 1 }}>
                    {expandText ? 'Show Less' : 'Show More'}
                    <ExpandMoreIcon style={{ transform: expandText ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </Button>
                <div sx={{
                        
                        marginBottom: 2
                    }}>
                    <Typography variant="body1"
                        fontWeight={600}
                        color="#5e615f"
                        sx={{
                            backgroundColor: '#fff',
                            fontSize: '0.8rem',
                        }}>Minimum Experience</Typography>

                    <Typography variant="body1"
                        
                        color="#fffff"
                        sx={{
                            backgroundColor: '#fff',
                            fontSize: '0.8rem',
                            marginBottom:2
                        }}>{job.minExp ? job.minExp + " years" : "1+years"}</Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <Button variant="contained" color="primary" style={{ backgroundColor: '#13ebc3', width: '90%', borderRadius: '10px' }}>
                        <BoltIcon style={{ fontSize: '2rem' }} />
                        <Typography style={{ color: 'black', fontWeight: 'bold', textTransform: 'none' }}>Easy Apply</Typography>
                    </Button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Button variant="contained" color="primary" style={{ backgroundColor: '#3e13eb', width: '90%', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                                <AccountCircleIcon style={{ fontSize: '2rem' }} />
                                <AccountCircleIcon style={{ fontSize: '2rem' }} />
                            </div>
                            <Typography style={{ fontSize: '0.8rem', color: 'white', textTransform: 'none' }}>Unlock referral asks</Typography>
                        </div>
                    </Button>
                </div>



            </CardContent>
        </Card>
    );
};

export default JobCard;