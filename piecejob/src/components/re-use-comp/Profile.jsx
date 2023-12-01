import React, {useState, useEffect} from 'react'
import defaultUser from '../../assets/user.png';
import edu from '../../assets/education.png';
import deg from '../../assets/deg3.jpg';
import TransitionsExperienceModal from "../modal/addExperience" 
// import TransitionsEducationModal from "../modal/addEducation" 
import TransitionsEducationModal from '../modal/addEducation'
import { SlGraduation } from "react-icons/sl";
import { BsPersonWorkspace } from "react-icons/bs";


import { useSelector } from 'react-redux';
import { selectedUser } from "../redux/selectors"
import { useNavigate } from 'react-router-dom';
import { MdMailOutline } from "react-icons/md"; 
import { GoDownload } from "react-icons/go";
import { MdOutlineAddBox } from "react-icons/md";

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
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';

//Modal imports
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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
    const currentUser = useSelector(selectedUser);
    const [expandedExperience, setExpandedExperience] = useState(true);
    const [expandedCertification, setExpandedCertification] = useState(false);
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);

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
    };

    const handleExpandClickExperience = () => {
        setExpandedExperience(!expandedExperience);
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

    const items = [
        { 
            name: 'AGE',
            content: '29' 
        },
        {
            name: 'YEARS OF EXPERIENCE',
            content: '5'
        },
        {
            name: 'PHONE',
            content: '+27 713459503'
        },
        {
            name: 'LOCATION',
            content: 'centurion, rua vista'
        },
        {
            name: 'EMAIL',
            content: 'sikhauli@gmail.com'
        },
        {
            name: 'CTC',
            content: '17 000'
        },

    ];

  return (

      <div className='min-h-screen h-fit w-full grid grid-cols-3 p-5 bg-gradient-to-r from-gray-100 to-sky-00'>
          <Card className='col-span-1 p-2 mr-8 h-screen'>
              <div className='mb-1' >
                   <div className='w-full h-auto flex flex-col items-center justify-center rounded' style={{ backgroundColor: 'transparent', border: 'none' }}>
                      <div className='h-auto'>
                         <img src={defaultUser} className='rounded-full w-20 h-20 ' />
                      </div>
                      <div className='h-auto mt-2 mb-5 text-center text-gray-500'>
                          <p className='text-sm'> {currentUser?.username}</p>
                          <p className='text-xs'>Software Developer</p>
                      </div>
                   </div>
              </div>
              <div className='mb-1 ' style={{ backgroundColor: 'transparent' }}>
                  <CardContent>
                      <Typography variant="body2" color="text.secondary" className="text-center">
                          Lizards are a widespread group of squamate reptiles, with over 6,000
                          species, ranging across all continents except Antarctica
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

          <div className='col-span-2' style={{ backgroundColor: 'transparent' }}>
            <div className="border border-gray-300 bg-white mb-4 p-4">
                  <Typography gutterBottom variant="h5" component="div">
                      Basic Information
                  </Typography>
                  <Divider component="div" role="presentation"/> 

              <Box sx={{ flexGrow: 1 }} >
                  <Grid container spacing={1}>
                      <Grid container item spacing={1}>
                          <FormRow />
                      </Grid>
                  </Grid>
                  <div className='mt-6 space-x-6'>
                  <Button
                      startIcon={<GoDownload size={18} color="white" />}
                      variant="contained"
                      color="primary"
                      onClick={handleAddTag}
                      className='mt-2  hover:bg-white hover:text-blue-500'
                  >
                      Download CV
                  </Button>
                
                  <Button
                      startIcon={<MdMailOutline size={18} />}
                      color="primary"
                      variant="outlined"
                      onClick={handleAddTag}
                       className='hover:text-gray-500'
                  >
                      SEND EMAIL
                  </Button>
                 </div>
              </Box>
            </div>
    
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
                        < List
                            sx={{ width: '100%', bgcolor: 'background.paper' }} >
                            <ListItem>
                                <ListItemAvatar >
                                    <Avatar style={{ width: '80px', height: '80px', marginRight: '10px' }}>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="AKiltech co"
                                    secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="h9"
                                            color="textPrimary"
                                            style={{ fontSize: '0.70rem' }}
                                        >
                                            Junior software engineer
                                        </Typography>
                                        <br />
                                        <Typography
                                            component="span"
                                            variant="h9"
                                            color="textSecondary"
                                            style={{ fontSize: '0.70rem' }}
                                        >
                                            February 2023 - June 2023 | Remote
                                        </Typography>
                                    </>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <div className='mt-8'>
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
                        </List>
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
                          <Card sx={{ maxWidth: 395 }}>
                              <CardHeader
                                  avatar={<Avatar alt="Your Image" src={deg} />}
                                  action={
                                      <IconButton aria-label="settings">
                                          <MoreVertIcon />
                                      </IconButton>
                                  }
                                  title="University of venda"
                                  subheader="Computer science and information science"
                              />
                              <CardMedia
                                  component="img"
                                  height="194"
                                  image={deg}
                                  alt="Paella dish"
                              />
                              <CardContent>
                                  <Typography variant="body2" color="text.secondary">
                                      This impressive paella is a perfect party dish and a fun meal to cook
                                      together with your guests. Add 1 cup of frozen peas along with the mussels,
                                      if you like.
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <p className='text-xs mr-2 font-bold'>05 February 2015</p>
                                  <span className='text-xs font-bold'>-</span>
                                  <p className='text-xs ml-2 font-bold'>05 November 2019</p>
                              </CardActions>                               
                          </Card>
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
    
</div>


  )
}

export default Profile