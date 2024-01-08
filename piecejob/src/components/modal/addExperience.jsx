
import MuiModal from "@mui/material/Modal";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import InputLocation from '../component/LocationInput'
import TextField from '@mui/material/TextField';
import {
    API,
    EXPERIENCE_ENDPOINTS,
    USER_ENDPOINTS,
    getAxiosError,
    API_BASE_URL,
} from "../../helpers/constants"
import axios from 'axios';
import { hideLoading, showLoading } from "../redux/loadingslice";
import { useDispatch, useSelector } from "react-redux";

const TransitionsExperienceModal = ({
    showModal,
    setShowModal,
    currentUser,

}) => {
    const [values, setValues] = useState();
    const { enqueueSnackbar } = useSnackbar();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [data, setData] = useState([])
    const dispatch = useDispatch();

 
    const onChange = (e) => {
        e.preventDefault();
        setValues((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleLocationChange = (location) => {
        setSelectedLocation(location.description);
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(showLoading());
        if (values || selectedLocation) {
            const sendData = {
                ...values,
                ...(selectedLocation !== null && { location: selectedLocation }),
                editor: currentUser._id,
            };
            API.post(`${EXPERIENCE_ENDPOINTS.add}`, sendData, {
                headers: {
                    "Content-Type": 'application/json',
                },
            })
                .then(() => {
                    enqueueSnackbar(`Experience added successfully.`, {
                        variant: "success",
                    });
                    setValues(null);
                    setShowModal(false);
                })
                .catch((error) => {
                    enqueueSnackbar(getAxiosError(error), { variant: "error" });
                })
            .finally(() => {
                dispatch(hideLoading());
            });
        }
    };

    const FIELDS = [
        {
            name: "position",
            required: true,
            placeholder: "Position",
            onChange,
        },
        {
            name: "company",
            required: true,
            placeholder: "Company",
            onChange,
        },
        {
            name: "startDate",
            required: true,
            placeholder: "Start Date",
            onChange,
        },
        {
            name: "endDate",
            required: false,
            placeholder: "End Date",
            onChange,
        },
       
    ];

console.log()

    return (
        <MuiModal open={showModal} onClose={() => setShowModal(false)}>
            <div className={`m-auto mt-12 w-1/2 rounded-2xl p-8 bg-gray-100`} >
                <form className={``}>
                    <p className="text-2xl text-bold mb-8">Add Experience</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                        {FIELDS.map((data, i) => (
                            <div className="mb-2" key={i}>
                                <TextField
                                    variant="outlined"
                                    name={data?.name}
                                    label={data?.placeholder}
                                    required={data?.required || false}
                                    className={`h-12 w-full rounded-md border border-skin-base px-4 placeholder-color-gray outline-none duration-300 ease-in hover:border-skin-inverted focus:border-skin-inverted`}
                                    onChange={data?.onChange}
                                />
                            </div>
                        ))}
                      
                    </div>
                    <div className="mt-2"></div>
                    <InputLocation onLocationChange={handleLocationChange} />
                    <div className="mt-2"></div>
                    
                    <TextField
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        onChange={onChange}
                        fullWidth
                        variant="outlined"
                    />
                    <div className={`mt-8 flex items-center justify-end gap-2`}>
                        <Button
                            variant="outlined"
                            className={`h-10 w-24 rounded-xl text-sm duration-300 ease-in-out hover:drop-shadow-2xl `}
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={submit}
                            className={`h-10 w-24 rounded-xl text-sm  duration-300 ease-in-out hover:drop-shadow-2xl`}
                        >
                           Submit
                        </Button>
                    </div>
                </form>
            </div>
        </MuiModal>
    );
};

export default TransitionsExperienceModal;
