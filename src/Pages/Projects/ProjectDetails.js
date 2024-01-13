import { Autocomplete, Button, TextField, Typography } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProject } from '../../apis/ProjectApi';
import { getDevelopers } from '../../Redux/Slices/Lists/ListsSlice';

const ProjectDetails = () => {
   const params = useParams();
   const [project, setProject] = useState();

   const theme = useTheme();

   const useStyles = makeStyles({
      techStack: {
         color: 'white !important',
         backgroundColor: '#64748B !important',
         borderRadius: '26px !important',
         fontSize: '12px !important',
         padding: '4px 12px !important',
      },
      demourl: {},
   });

   const classes = useStyles();

   useEffect(() => {
      try {
         getProject(params.id).then(data => setProject(data));
      } catch (error) {
         console.log(error?.response?.data?.message);
      }
   }, [params.id]);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getDevelopers());
   }, []);

   const { developers } = useSelector(store => store?.developer);

     console.log("developer project >>>>>>",developers);

   //   const ass

   return (
      <>
         <Box mt={3} spacing={1}>
            <Typography variant='h4'>{project?.projectName}</Typography>
            <Typography variant='body2'>Client - {project?.clientName}</Typography>
            <Typography variant='body2'>Status - {project?.status}</Typography>

            <Typography>Project Type - {project?.typeOfProject}</Typography>
            <Typography className={classes.demourls}>Demo Urls - {project?.demoUrls}</Typography>
            <Typography>Project Type - {project?.typeOfProject}</Typography>
            <Typography>Start date - {project?.startDate}</Typography>
            <Typography>Estimated End date - {project?.estimatedEndDate}</Typography>
            <Typography>Client contact - {project?.clientPointOfContact}</Typography>
            {project?.developers.map(item => {
               return (
                  <Button className={classes.techStack} varaint=''>
                     {item.name}
                  </Button>
               );
            })}

            <Box
               my={2}
               sx={{
                  display: 'flex',
               }}>
               <Autocomplete
                  options={developers}
                  multiple
                  getOptionLabel={option =>
                     option?.isDeleted ? '' : `${option?.fullName}`
                  }
                  onChange={(event, value) => console.log(value)}
                  renderInput={params => (
                     <TextField
                        {...params}
                        required
                        sx={{
                           minWidth: '200px  !important',
                        }}
                        value={developers?.fullName}
                        name='developers'
                        label='Developers'
                     />
                  )}
               />
            </Box>

            <Autocomplete
               options={developers}
               multiple
               getOptionLabel={option =>
                  option?.isDeleted ? '' : `${option?.fullName}`
               }
               onChange={(event, value) => console.log(event)}
               renderInput={params => (
                  <TextField
                     {...params}
                     required
                     value={developers?.fullName}
                     name='developers'
                     label='Project Managers'
                  />
               )}
            />
         </Box>
      </>
   );
};

export default ProjectDetails;
