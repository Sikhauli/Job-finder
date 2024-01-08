
import MuiModal from "@mui/material/Modal";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
    API,
    USER_ENDPOINTS,
    getAxiosError,
    API_BASE_URL,
} from "../../helpers/constants"
import axios from 'axios';
import { hideLoading, showLoading } from "../redux/loadingslice";
import { useDispatch, useSelector } from "react-redux";

const TransitionsAboutModal = ({
    aboutModal,
    setAboutModal,
    currentUser,

}) => {
    const [values, setValues] = useState();
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

    console.log("Values :", values)

    const submit = (e) => {
        e.preventDefault();
        dispatch(showLoading());
        if (values) {
            const sendData = {
                ...values,
                editor: currentUser._id,
            };
            API.patch(`${USER_ENDPOINTS.update}${currentUser._id}`, sendData, {
                headers: {
                    "Content-Type": 'application/json',
                },
            })
                .then(() => {
                    enqueueSnackbar(`User's about updated successfully.`, {
                        variant: "success",
                    });
                    setValues(null);
                    setAboutModal(false);
                })
                .catch((error) => {
                    enqueueSnackbar(getAxiosError(error), { variant: "error" });
                })
            .finally(() => {
                dispatch(hideLoading());
            });
        }
    };

    return (
        <MuiModal open={aboutModal} onClose={() => setAboutModal(false)}>
            <div className={`m-auto mt-12 w-1/2 rounded-2xl p-8 bg-gray-100`} >
                <form  className={``}>
                    <p className="text-2xl text-bold mb-8">About Yourself</p>
                    <TextField
                        label="Describe Yourself"
                        name="about"
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
                            onClick={() => setAboutModal(false)}
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

export default TransitionsAboutModal;
