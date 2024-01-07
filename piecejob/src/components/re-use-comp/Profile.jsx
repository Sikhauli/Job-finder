import React, {useState, useEffect} from 'react'
import defaultUser from '../../assets/user.png';
import edu from '../../assets/education.png';
import deg from '../../assets/education.rep.png';
import TransitionsExperienceModal from "../modal/addExperience" 
import TransitionsGeneralModal from "../modal/genaralModal" 
import TransitionsEducationModal from '../modal/addEducation'
import TransitionsAboutModal from '../modal/addAbout'
import TransitionsJobModal from '../modal/addJob'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { LuUpload } from "react-icons/lu";
import {
    API,
    EXPERIENCE_ENDPOINTS,
    EDUCATION_ENDPOINTS,
    getAxiosError,
    API_BASE_URL,
} from "../../helpers/constants"
import axios from 'axios';
import { hideLoading, showLoading } from "../redux/loadingslice";
import { useDispatch, useSelector } from "react-redux";
import { IoBriefcaseOutline } from "react-icons/io5";

import { SlGraduation } from "react-icons/sl";
import { BsPersonWorkspace } from "react-icons/bs";
import { TiEdit } from "react-icons/ti";

import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';
import { MdMailOutline } from "react-icons/md"; 
import { TiDeleteOutline } from "react-icons/ti";

// MUI imports
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function Profile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [expandedExperience, setExpandedExperience] = useState(false);
    const [expandedGeneral, setExpandedGeneral] = useState(true);
    const [expandedCertification, setExpandedCertification] = useState(false);
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [jobModal, setJobModal] = useState(false);
    const [generalModal, setGeneralModal] = useState(false);
    const [aboutModal, setAboutModal] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [experienceData, setExperienceData] = useState([])
    const [expNum, setExpNum] = useState(0)
    const [educationData, setEducationData] = useState([])
    const [eduNum, setEdunum] = useState(0)

    const handleAddTag = () => {
        if (newTag.trim() !== '' && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag('');
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    const handleExpandClickCertification = () => {
        setExpandedCertification(!expandedCertification);
        setExpandedExperience(false);
        setExpandedGeneral(false)
    };

    const handleExpandClickExperience = () => {
        setExpandedExperience(!expandedExperience);
        setExpandedCertification(false);
        setExpandedGeneral(false)
    };
 
    useEffect(() => {
        if (!expandedExperience && !expandedCertification) {
            setExpandedGeneral(true);
        } else {
            setExpandedGeneral(false);
        }
    }, [expandedExperience, expandedCertification]);

    useEffect(() => {
        dispatch(showLoading());
        if (currentUser) {
            const experienceApi = axios.get(`${API_BASE_URL}${EXPERIENCE_ENDPOINTS.get}${currentUser._id}`);
            const educationApi = axios.get(`${API_BASE_URL}${EDUCATION_ENDPOINTS.get}${currentUser._id}`);
           
            Promise.all([experienceApi, educationApi])
                .then((responses) => {

                    const experienceData = responses[0]?.data;
                    const educationData = responses[1]?.data;

                    setExperienceData(experienceData);
                    setEducationData(educationData)
                    setExpNum(experienceData.length)
                    setEdunum(educationData.length)
                })
                .catch((errors) => {
                        enqueueSnackbar(getAxiosError(errors), { variant: "error" });
                })
                .finally(() => {
                    dispatch(hideLoading());
                });
        }
    }, [currentUser, enqueueSnackbar, expNum, eduNum]);

    const deleteExperience = (id) => {
        confirmAlert({
            title: "Delete Experience",
            message: "Are you sure you want to do this?",
            buttons: [
                {
                    label: "Confirm",
                    onClick: () => {
                        dispatch(showLoading());
                        axios.delete(`${API_BASE_URL}${EXPERIENCE_ENDPOINTS.delete}${id}`)
                            .then(() => {
                                enqueueSnackbar("Experience Successfully deleted!", {
                                    variant: "success",
                                });
                            })
                            .catch((error) => {
                                enqueueSnackbar(getAxiosError(error), { variant: "error" });
                            })
                            .finally(() => {
                                dispatch(hideLoading());
                            });
                    },
                },
                {
                    label: "Cancel",
                    onClick: () => { },
                },
            ],
        });
    };


    const deleteEducation = (id) => {
        confirmAlert({
            title: "Delete Education",
            message: "Are you sure you want to do this?",
            buttons: [
                {
                    label: "Confirm",
                    onClick: () => {
                        dispatch(showLoading());
                        axios.delete(`${API_BASE_URL}${EDUCATION_ENDPOINTS.delete}${id}`)
                            .then(() => {
                                enqueueSnackbar("Education Successfully deleted!", {
                                    variant: "success",
                                });
                            })
                            .catch((error) => {
                                enqueueSnackbar(getAxiosError(error), { variant: "error" });
                            })
                        .finally(() => {
                            dispatch(hideLoading());
                        });
                    },
                },
                {
                    label: "Cancel",
                    onClick: () => { },
                },
            ],
        });
    };


    const FormRow = () => (
        <>
            {items.map((item) => (
                <Grid key={item.name} item xs={4} >
                    <Box className="p-2">
                        <div className="">
                            <h5 className="text-xs font-semibold mb-2">{item.name}</h5>
                            <p className="text-xs">{item.content}</p>
                        </div>
                    </Box>
                </Grid>
            ))}
        </>
    );

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const items = [
        {
            name: "FIRSTNAME",
            content: currentUser?.username 
        },
        {
            name: "LASTNAME",
            content: currentUser?.lastname 
        },
        {
            name: "Position",
            content: currentUser?.position 
        },
        { 
            name: 'AGE',
            content: `${currentUser?.age || ""} Years`
        },
        {
            name: 'YEARS OF EXPERIENCE',
            content: `${currentUser?.experience || ""} Years`
        },
        {
            name: 'PHONE',
            content:  currentUser?.phone 
        },
        {
            name: 'LOCATION',
            content: currentUser?.location  
        },
        {
            name: 'EMAIL',
            content: currentUser?.email 
        },
        {
            name: 'CTC',
            content: "R " + (currentUser?.CTC || "")
        },
    
    ];

  return (

      <div className='h-screen overflow-hidden w-full grid grid-cols-3 p-5 bg-gradient-to-r from-gray-100 to-sky-00'>
          <Card className='col-span-1 p-2 mr-8 h-screen'>
              <div className='' >
                   <div className='w-full h-auto flex flex-col items-center justify-center rounded' style={{ backgroundColor: 'transparent', border: 'none' }}>
                      <div className='h-auto'>
                         <img src={defaultUser} className='rounded-full w-20 h-20 ' />
                      </div>
                      <div className='h-auto mt-2 mb-5 text-center text-gray-500'>
                          <p className='text-sm'>{currentUser?.username} {currentUser?.lastname}</p>
                          <p className='text-xs'>{currentUser?.position}</p>
                      </div>
                   </div>
              </div>
              <div className='mb-1' >
                  <div className='rounded-xl w-fit ml-auto' onClick={() => setAboutModal(true)}>
                      <TiEdit />
                  </div>
                  <CardContent>
                      <Typography color="text.secondary" className="text-center text-sm">
                        <p className="text-xs">
                          {currentUser?.about ?? "Tell us a bit about yourself here "}
                        </p>
                      </Typography>
                  </CardContent>
              </div>

              <Card className='mt-1 p-2 overflow-auto overflow-y-scroll' style={{ backgroundColor: 'transparent', border: 'none' }}>
                  <Typography gutterBottom variant="h6" component="div" >
                      <p className='text-gray-400'>SKILLS</p>
                  </Typography>
              <div className='grid row'>
                  <div>
                      {tags.map((tag, index) => (
                        <Chip
                            key={index}
                            label={tag}
                            onDelete={() => handleDeleteTag(tag)}
                            color="primary"
                            variant="outlined"
                            style={{ margin: '2px' }}
                        />
                      ))}
                  </div>
                      <div className='flex flex-col mt-2'>
                      <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={2}
                        defaultValue="Small"
                        size="small"
                        label="Add Skills Tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className=''
                      />
                        <div className='mb-2'></div>
                      <Button
                          variant="contained"
                          color="primary"
                          onClick={handleAddTag}
                      >
                          Add
                      </Button>
                </div>
              </div>
            </Card>
          </Card>

          <div className='col-span-2 overflow-auto bg-transparent h-screen' >
             <Card sx={{ width: '100%', marginBottom: '10px', padding: '10px' }}>
                <CardActions disableSpacing>
                    <Typography gutterBottom variant="h5" component="div">
                        Basic Information
                    </Typography>
                    <ExpandMore
                        onClick={() => setGeneralModal(true)}
                        aria-label="show more"
                    >
                          <TiEdit />
                    </ExpandMore>
                </CardActions>
                  <Divider component="div" role="presentation" /> 
                  <Collapse in={expandedGeneral} timeout="auto" unmountOnExit>
                    <CardContent>
                          <Box sx={{ flexGrow: 1 }} >
                              <Grid container spacing={1}>
                                  <Grid container item spacing={1}>
                                      <FormRow />
                                  </Grid>
                              </Grid>
                              <div className='mt-6 space-x-6'>
                                  <Button
                                      startIcon={<LuUpload size={18} color="white" />}
                                      variant="contained"
                                      color="primary"
                                      onClick={() => setAboutModal(true)}
                                      className='mt-2  hover:bg-white hover:text-blue-500'
                                  >
                                      <p className='mt-1'> Upload CV</p>
                                  </Button>

                                  <Button
                                      startIcon={<IoBriefcaseOutline size={18} />}
                                      color="primary"
                                      variant="outlined"
                                      onClick={() => setJobModal(true)}
                                      className='hover:text-gray-500'
                                  >
                                      <p className='mt-1'> POST Job</p>
                                  </Button>
                              </div>
                          </Box>
                    </CardContent>
                </Collapse>
            </Card>

            {/* Experience Card */}
            <Card sx={{ width: '100%', marginBottom: '10px', padding: '10px' }}>
                <CardActions disableSpacing>
                    <Typography gutterBottom variant="h5" component="div">
                        Experience
                    </Typography>
                    <ExpandMore
                        expand={expandedExperience}
                        onClick={handleExpandClickExperience}
                        aria-expanded={expandedExperience}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                  <Divider component="div" role="presentation" /> 
                <Collapse in={expandedExperience} timeout="auto" unmountOnExit>
                    <CardContent>
                          <div className="relative w-full h-full grid grid-cols-2 gap-4">                             
                              {experienceData.map((experience) => (
                                  <List key={experience._id} sx={{ width: '100%', bgcolor: 'background.paper', marginRight: '10px' }}>
                                      <ListItem>
                                          <ListItemText
                                              primary={experience.company}
                                              secondary={
                                                  <>
                                                      <Typography
                                                          component="span"
                                                          variant="h9"
                                                          color="textPrimary"
                                                          style={{ fontSize: '0.70rem' }}
                                                      >
                                                          {experience.position}
                                                      </Typography>
                                                      <br />
                                                      <Typography
                                                          component="span"
                                                          variant="h9"
                                                          color="textSecondary"
                                                          style={{ fontSize: '0.70rem' }}
                                                      >
                                                          {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}<br/>
                                                          {experience.location}
                                                      </Typography>
                                                  </>
                                              }
                                          />
                                      </ListItem>
                                      <Divider />
                                      <div className="absolute top-0 right-0 p-2 cursor-pointer hover:bg-gray-200" onClick={() => deleteExperience(experience._id)}>
                                          <TiDeleteOutline color='red' />
                                      </div>
                                  </List>
                              ))}
                          </div>
                          <div className='mt-4'>
                              <Button
                                  startIcon={<BsPersonWorkspace size={18} />}
                                  color="primary"
                                  variant="outlined"
                                  onClick={() => setShowModal(true)}
                                  className='hover:text-gray-500'
                              >
                                  Add experience
                              </Button>
                          </div>
                    </CardContent>
                </Collapse>
            </Card>

              {/* Education Card */}
              <Card sx={{ width: '100%', padding: '10px' }}>
                  <CardActions disableSpacing>
                      <Typography gutterBottom variant="h5" component="div">
                          Education
                      </Typography>
                      <ExpandMore
                          expand={expandedCertification}
                          onClick={handleExpandClickCertification}
                          aria-expanded={expandedCertification}
                          aria-label="show more"
                      >
                          <ExpandMoreIcon />
                      </ExpandMore>
                  </CardActions>
                  <Divider component="div" role="presentation" /> 
                  <Collapse in={expandedCertification} timeout="auto" unmountOnExit>
                      <CardContent>
                          <Grid container spacing={2}>
                              {educationData.map((educationItem) => (
                                  <Grid item key={educationItem._id} xs={12} md={6}>
                                      <Card sx={{ maxWidth: 395 }}>
                                          <CardHeader
                                              avatar={<Avatar alt="Your Image" src={deg} />}
                                              action={
                                                  <IconButton aria-label="settings" onClick={() => deleteEducation(educationItem._id)} >
                                                      <TiDeleteOutline color='red' />
                                                  </IconButton>
                                              }
                                              title={educationItem.institution}
                                              subheader={educationItem.degree}
                                          />
                                          <CardMedia
                                              component="img"
                                              style={{ height: '194px', width: '400px', objectFit: 'cover' }}
                                              image={`http://localhost:1960/${educationItem.image}`}
                                              alt="Paella dish"
                                          />

                                          <CardContent>
                                              <Typography variant="body2" color="text.secondary">
                                                  {educationItem.description}
                                              </Typography>
                                          </CardContent>
                                          <CardActions className="flex items-center justify-between bg-gray-100">
                                              <span className="text-gray-600">
                                                  <p className='text-xs'> {formatDate(educationItem.startDate)} - {educationItem.endDate ? formatDate(educationItem.endDate) : 'Present'} </p>
                                              </span>
                                          </CardActions>

                                      </Card>
                                  </Grid>
                              ))}
                          </Grid>
                          <div className='mt-8'>
                              <Divider />
                              <div className='mt-4'></div>
                              <Button
                                  startIcon={<SlGraduation size={18} />}
                                  color="primary"
                                  variant="outlined"
                                  onClick={() => setDisplayModal(true)}
                                  className='hover:text-gray-500'
                              >
                                  Add Education
                              </Button>
                          </div>
                      </CardContent>
                  </Collapse>
              </Card>
    </div>

    {showModal && (
        <TransitionsExperienceModal
            showModal={showModal}
            setShowModal={setShowModal}
            currentUser={currentUser}
        />
    )}

    {displayModal && (
        <TransitionsEducationModal
            displayModal={displayModal}
            setDisplayModal={setDisplayModal}
            currentUser={currentUser}
        />
    )}

    {generalModal && (
        <TransitionsGeneralModal
            generalModal={generalModal}
            setGeneralModal={setGeneralModal}
            currentUser={currentUser}
        />
    )}

    {aboutModal && (
        <TransitionsAboutModal
            aboutModal={aboutModal}
            setAboutModal={setAboutModal}
            currentUser={currentUser}
        />
    )}
        
    {jobModal && (
        <TransitionsJobModal
            jobModal={jobModal}
            setJobModal={setJobModal}
            currentUser={currentUser}
        />
    )}
          
</div>


  )
}

export default Profile