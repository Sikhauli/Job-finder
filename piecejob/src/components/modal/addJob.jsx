
import MuiModal from "@mui/material/Modal";
import { useSnackbar } from "notistack";
import { useEffect, useState, Fragment } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLocation from '../component/LocationInput'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { hideLoading, showLoading } from "../redux/loadingslice";
import { useDispatch, useSelector } from "react-redux";

import {
    API,
    USER_ENDPOINTS,
    getAxiosError,
    API_BASE_URL,
    JOB_ENDPOINTS
} from "../../helpers/constants"
import axios from 'axios';


const TransitionsJobModal = ({
    jobModal,
    setJobModal,
    currentUser,

}) => {
    const [values, setValues] = useState();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const onChange = (e) => {
        e.preventDefault();
        setValues((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(showLoading());
        if (values && currentUser) {
            const sendData = {
                ...values,
                ...(selectedLocation !== null && { location: selectedLocation }),
                editor: currentUser._id,
            };
            axios.post(`${API_BASE_URL}${JOB_ENDPOINTS.add}`, sendData, {
                headers: {
                    "Content-Type": 'application/json',
                },
            })
                .then(() => {
                    enqueueSnackbar(`Job posted successfully.`, {
                        variant: "success",
                    });
                    setValues(null);
                    setJobModal(false);
                })
                .catch((error) => {
                    enqueueSnackbar(getAxiosError(error), { variant: "error" });
                })
            .finally(() => {
                dispatch(hideLoading());
            });
        }
    };

    const handleLocationChange = (location) => {
        setSelectedLocation(location.description);
    };

    const FIELDS = [
        {
            name: "title",
            required: true,
            placeholder: "Job Title",
            onChange,
        },
        {
            name: "salary",
            required: true,
            placeholder: "Job Salary",
            onChange,
        },
        {
            name: "company",
            required: true,
            placeholder: "Company",
            onChange,
        },
        {
            name: "period",
            required: true,
            placeholder: "Job Period",
            options: ["Full-time", "Part-time", "Contract", "Temporary"],
            onChange,
        },
        
    ];

console.log("values :", values)
    console.log("setSelectedLocation :", selectedLocation)

    return (
        <MuiModal open={jobModal} onClose={() => setJobModal(false)}>
            <div className={`m-auto mt-12 w-1/2 rounded-2xl p-8 bg-gray-100`}>
                <form className={``}>
                    <p className="text-2xl text-bold mb-8">Add Job</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                        {FIELDS.map((data, i) => (
                            <div className="mb-2" key={i}>
                                {data.name === 'period' ? (
                                    <div>
                                        <Select
                                            variant="outlined"
                                            name={data.name}
                                            label={data.placeholder}
                                            value={data.value}
                                            onChange={data.onChange}
                                            className={`h-14 w-full rounded-md border border-skin-base px-4 placeholder-black outline-none duration-300 ease-in hover:border-skin-inverted focus:border-skin-inverted`}
                                            aria-labelledby={`label-${data.name}`}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>
                                                Select {data.placeholder}
                                            </MenuItem>
                                            {data.options.map((option, index) => (
                                                <MenuItem key={index} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                ) : (
                                    <Fragment>
                                        <TextField
                                            variant="outlined"
                                            name={data?.name}
                                            label={data?.placeholder}
                                            required={data?.required || false}
                                            className={`h-12 w-full rounded-md border border-skin-base px-4 placeholder-color-gray outline-none duration-300 ease-in hover:border-skin-inverted focus:border-skin-inverted`}
                                            onChange={data?.onChange}
                                            aria-labelledby={`label-${data?.name}`}
                                        />
                                        <p id={`label-${data?.name}`} className="sr-only">
                                            {data?.placeholder}
                                        </p>
                                    </Fragment>
                                )}
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
                            onClick={() => setJobModal(false)}
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

export default TransitionsJobModal;
