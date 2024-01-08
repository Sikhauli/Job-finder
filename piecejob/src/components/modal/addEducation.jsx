import { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import { useSnackbar } from "notistack";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
    API,
    EDUCATION_ENDPOINTS,
    getAxiosError,
    API_BASE_URL,
} from "../../helpers/constants"
import axios from 'axios';
import { hideLoading, showLoading } from "../redux/loadingslice";
import { useDispatch, useSelector } from "react-redux";

const TransitionsEducationModal = ({
    displayModal,
    setDisplayModal,
    currentUser,
}) => {
    const [values, setValues] = useState();
    const [image, setImage] = useState([]);
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

    const getFiles = (e) => {
        e?.preventDefault();
        const file = e.target?.files[0];
        setValues((prev) => {
            return {
                ...prev,
                image: file,
            };
        });
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(showLoading());
        if (values) {
            const sendData = {
                ...values,
                editor: currentUser._id,
            };
            API.post(`${EDUCATION_ENDPOINTS.add}`, sendData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            })
                .then(() => {
                    enqueueSnackbar(`Education added successfully.`, {
                        variant: "success",
                    });
                    setValues(null);
                    setDisplayModal(false);
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
            name: "degree",
            required: true,
            placeholder: "Degree",
            onChange,
        },
        {
            name: "institution",
            required: true,
            placeholder: "Institution",
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

    return (
        <MuiModal open={displayModal} onClose={() => setDisplayModal(false)}>
            <div className={`m-auto mt-12 w-1/2 rounded-2xl p-8 bg-gray-100`} >
                <form className={``}>
                    <p className="text-2xl text-bold mb-8">Add Education</p>
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
                                    aria-labelledby={`label-${data?.name}`}
                                />
                                <p id={`label-${data?.name}`} className="sr-only">{data?.placeholder}</p>
                            </div>
                        ))}

                    </div>
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

                    <div className="my-2 ">
                        <p className="text-primary text-sm">Upload Document</p>
                        <input
                            radius="sm"
                            onChange={getFiles}
                            className="text-xs inline-block"
                            name="image"
                            type="file"
                        />
                    </div>

                    <div className={`mt-8 flex items-center justify-end gap-2`}>
                        <Button
                            variant="outlined"
                            className={`h-10 w-24 rounded-xl text-sm duration-300 ease-in-out hover:drop-shadow-2xl `}
                            onClick={() => setDisplayModal(false)}
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

export default TransitionsEducationModal;
