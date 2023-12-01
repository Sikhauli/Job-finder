import { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import { useSnackbar } from "notistack";
import Button from '@mui/material/Button';
import InputLocation from '../component/LocationInput'
import TextField from '@mui/material/TextField';

const TransitionsEducationModal = ({
    displayModal,
    setDisplayModal,
    currentUser,

}) => {
    const [values, setValues] = useState();
    const [images, setImages] = useState([]);
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
        if (values) {
            const sendData = {
                ...values,
                images,
                editor: currentUser,
            };

            //     API.post(`${VEHICLE_ENDPOINTS.add}`, sendData, {
            //         headers: {
            //             "Content-Type": "multipart/form-data",
            //         },
            //     })
            //         .then(() => {
            //             enqueueSnackbar(`Vehicle added successfully.`, {
            //                 variant: "success",
            //             });
            //             setValues(null);
            //             setShowModal(false);
            //         })
            //         .catch((error) => {
            //             enqueueSnackbar(getAxiosError(error), { variant: "error" });
            //         })
            //         .finally(() => {
            //             dispatch(hideLoading());
            //         });
        }
    };
console.log("Values :", values)
console.log("currentUser :", currentUser)

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
                <form onSubmit={submit} className={``}>
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
                                />
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
