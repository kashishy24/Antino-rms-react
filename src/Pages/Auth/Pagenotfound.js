import React from 'react'
import { Grid, Box, Typography } from "@mui/material";
import background from '../../Assets/Images/background/1.jpg'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Pagenotfound() {

    const navigate = useNavigate()

    useEffect(() => {
        navigate('/dashboard')

    }, [])

    return (
        <>
            <Grid container sx={{ overflow: 'hidden' }} display="flex" justifyContent={"center"}>
                <Grid item md={8} xs={12}
                    className='logininputcontainer'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Box>
                        <Typography variant="h3" component="h2">
                            Page Not Found !!!!!
                        </Typography>;
                    </Box>
                </Grid>
                <Grid item md={8}  >
                    <img src={background} className='sidebackground' alt="sidebackground" />
                </Grid>
            </Grid>
        </>
    )
}
