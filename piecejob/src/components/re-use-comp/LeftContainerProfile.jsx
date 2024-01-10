import React from 'react'
import { useSnackbar } from 'notistack';
import defaultIMG from  '../../assets/1.jpeg'
import { FaBriefcase, FaCalendar, FaTools } from 'react-icons/fa';
import defaultUser from '../../assets/user.png';
import defaultPic from '../../assets/1.jpeg';
import { useSelector } from 'react-redux';
import { selectedUser } from "../redux/selectors"
import { useNavigate } from 'react-router-dom';

function LeftContainerProfile() {

    const navigate = useNavigate();
    const currentUser = useSelector(selectedUser);
    const { enqueueSnackbar } = useSnackbar();

    const handleApplyClick = () => {
        if (currentUser) {
            navigate("/profile")
        } else {
            enqueueSnackbar('Login First To Edit Profile', { variant: 'error' });
        }
    };

  return (
    <>
      <div className='w-auto  overflow-auto overflow-y-scroll'>
        <nav className='w-full bg-transparent'>
            <div className='flex justify-cente h-20 bg-transparent'>
                <div className='w-full p-8 bg-white bg-transparent'>
                    <nav className='w-full flex justify-between items-center mb-3'>
                        <div className='relative'>
                        </div>
                    </nav>
                </div>
            </div>
        </nav>

      <div className='overflow-y-scroll h-screen'>
            <div className='w-full h-auto ml-2 border mb-2 p-5 flex flex-col items-center justify-center rounded border-gray-300 bg-white overflow-auto overflow-y-scroll' >
                <div className='h-auto'>
                   {currentUser ?(
                    <img src={defaultUser} className='rounded-full w-20 h-20 ' />
                   ):(
                    <img src={defaultUser } className = 'rounded-full w-20 h-20 '/>
                   )}
                </div>
                {currentUser && (
                <div className='h-auto mt-2 mb-5'>
                  <p>{currentUser?.position}</p>
                </div>
                )}
               <button className='bg-blue-500 h-10 w-40 rounded-md text-white' onClick={handleApplyClick}>Edit Profile</button>       
           </div>

                <div className='w-full bg-white-500 h-auto ml-2 border p-5 rounded border-gray-300 bg-white'>

                  <div className='flex items-center mb-2'>
                      <p className='bg-transparent mr-auto text-sm py-1 px-2 rounded'>
                          Top Skils
                      </p>
                      <div className='flex items-center ml-auto'>
                          <FaTools className='mr-1' />
                      </div>
                  </div>

                  <div className='flex justify-center mb-2 mt-2'>
                      <div className='border-b-2 border-gray-300' style={{ width: '99%' }}></div>
                  </div>

                  <div className='flex items-center mb-2'>
                      <p className='bg-blue-500 mr-auto text-sm py-1 px-2  rounded text-white'>
                         <ul>
                                  <li>{currentUser?.position}</li>
                         </ul> 
                      </p>
                      <div className='flex items-center ml-auto'>
                          <p className='text-gray-600 text-sm py-1 px-2 rounded'>
                                1-2 years
                          </p>
                          </div>
                     </div>
                </div>
        
        
              <div className='w-full bg-white-500 h-auto ml-2 border p-5 mt-3 rounded border-gray-300 bg-white'>
                  <div className='flex items-center mb-2'>
                      <p className='bg-transparent mr-auto text-sm py-1 px-2 rounded'>
                        Work Experience
                      </p>
                      <div className='flex items-center ml-auto'>
                          <FaBriefcase className='mr-1' />
                      </div>
                  </div>
              <p className='flex item-center justify-center'></p>
                  <div className='flex justify-center mb-2 mt-2'>
                      <div className='border-b-2 border-gray-300' style={{ width: '99%' }}></div>
                  </div>
                  <div className='flex items-center'>                 
                      <p className='mr-auto text-sm py-1 px-2 text-gray-800 rounded text-sm'>                       
                        {currentUser?.position}                        
                      </p>
                      <div className='flex items-center ml-auto'>
                          <p className='text-gray-600 text-sm py-1 px-2 rounded'>
                              2 years
                          </p>
                      </div>
                  </div>
                  <p className='mr-auto text-xs py-1 px-2 text-gray-500 rounded text-'>
                    {currentUser?.about}
                  </p>
              </div>
             </div>
       </div>
    </>
  )
}

export default LeftContainerProfile