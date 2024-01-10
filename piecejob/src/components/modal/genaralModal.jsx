import { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import { useSnackbar } from "notistack";
import Button from '@mui/material/Button';
import InputLocation from '../component/LocationInput'
import TextField from '@mui/material/TextField';
import{
    API,
    USER_ENDPOINTS,
    getAxiosError,
    API_BASE_URL,
} from "../../helpers/constants"
import axios from 'axios';
import { hideLoading, showLoading } from "../redux/loadingslice";
import { useDispatch, useSelector } from "react-redux";

const TransitionsGeneralModal = ({
    generalModal,
    setGeneralModal,
    currentUser,

}) => {
    const [values, setValues] = useState();
    const [image, setImage] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
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

    console.log("values :", values)
    console.log("currentUser :", currentUser)

    const submit = (e) => {
        e.preventDefault();
        dispatch(showLoading());
        if (values || selectedLocation) {
            const sendData = {
                ...values,
                image,
                ...(selectedLocation !== null && { location: selectedLocation }),
                editor: currentUser._id,
            };
            API.patch(`${USER_ENDPOINTS.update}${currentUser._id}`, sendData, {
                    headers: {
                        "Content-Type": 'application/json',
                    },
                })
                    .then(() => {
                        enqueueSnackbar(`User updated successfully.`, {
                            variant: "success",
                        });
                        setValues(null);
                        setGeneralModal(false);
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
            name: "username",
            required: false,
            placeholder: "Firstname",
            onChange,
        },
        {
            name: "lastname",
            required: false,
            placeholder: "Lastname",
            onChange,
        },
        {
            name: "email",
            required: false,
            placeholder: "Email",
            onChange,
        },
        {
            name: "age",
            required: false,
            placeholder: "Age",
            onChange,
        },
        {
            name: "phone",
            required: false,
            placeholder: "Phone",
            onChange,
        },
        {
            name: "experience",
            required: false,
            placeholder: "Experience",
            onChange,
        },
        {
            name: "CTC",
            required: false,
            placeholder: "CTC",
            onChange,
        },
        {
            name: "Position",
            required: false,
            placeholder: "Position",
            onChange,
        },
    ];
    
    return (
        <MuiModal open={generalModal} onClose={() => setGeneralModal(false)}>
            <div className={`m-auto mt-12 w-1/2 rounded-2xl p-8 bg-gray-100`} >
                <form className={``}>
                    <p className="text-2xl text-bold mb-8">Edit General Information</p>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
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
                    <div className='mt-2'></div>
                    <InputLocation onLocationChange={handleLocationChange} />
                    <div className={`mt-8 flex items-center justify-end gap-2`}>
                        <Button
                            variant="outlined"
                            className={`h-10 w-24 rounded-xl text-sm duration-300 ease-in-out hover:drop-shadow-2xl `}
                            onClick={() => setGeneralModal(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="outlined"
                            className={`h-10 w-24 rounded-xl text-sm  duration-300 ease-in-out hover:drop-shadow-2xl`}
                            onClick={submit}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </MuiModal>
    );
};

export default TransitionsGeneralModal;
