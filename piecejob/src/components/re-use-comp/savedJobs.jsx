import { useState, useEffect, useCallback } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { hideLoading, showLoading } from "../redux/loadingslice";
import {
  API,
  SAVED_ENDPOINTS ,
  getAxiosError,
  API_BASE_URL,
} from "../../helpers/constants"
import axios from 'axios';
import logo from '../../assets/logo.jpeg';
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useSnackbar } from "notistack";

const SavedJobs = () => {
  const [keyword, setKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numVehicles, setNumVehicles] = useState(0);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        dispatch(showLoading());
        const response = await API.get(`${SAVED_ENDPOINTS.get}`, {
          params: {
            userId: currentUser?._id,
          },
        });
        const formattedData = response.data.map(item => ({ ...item.jobId, id: item._id }));
        setData(formattedData);
        setFilteredData(formattedData);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
      finally {
        dispatch(hideLoading());
      }
    };
    fetchSavedJobs();
  }, []);

  // for searching
  useEffect(() => {
    if (keyword?.length && keyword?.length > 2) {
      const filteredResults = data.filter(
        (item) =>
          item.title.toLowerCase().includes(keyword.toLowerCase()) ||
          item.description.toLowerCase().includes(keyword.toLowerCase()) ||
          item.location.toLowerCase().includes(keyword.toLowerCase()) ||
          item.company.toLowerCase().includes(keyword.toLowerCase()) ||
          item.period.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredData(filteredResults);
    } else {
      setFilteredData(data);
    }
  }, [keyword, data]);

  const onChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const deleteVehicle = (jobId) => {
    confirmAlert({
      title: "Delete Job",
      message: "Are you sure you want to do this?",
      buttons: [
        {
          label: "Confirm",
          onClick: () => {
            dispatch(showLoading());
            setLoading(true);
            API.delete(`${SAVED_ENDPOINTS.delete}/${currentUser._id}/${jobId}`)
              .then(() => {
                enqueueSnackbar("Successfully deleted!", {
                  variant: "success",
                });
              })
              .catch((error) => {
                enqueueSnackbar(getAxiosError(error), { variant: "error" });
              })
              .finally(() => {
                dispatch(hideLoading());
                setLoading(false);
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

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "description",
      headerName: "Description",
      sortable: false,
      flex: 1,
      minWidth: 180,
    },
    {
      field: "location",
      headerName: "Location",
      sortable: false,
      flex: 1,
      minWidth: 180,
    },
    {
      field: "salary",
      headerName: "Salary",
      flex: 1,
      minWidth: 120,
      description: "Salary for the job",
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
      minWidth: 120,
      description: "Company offering the job",
    },
    {
      field: "period",
      headerName: "Period",
      flex: 1,
      minWidth: 120,
      description: "Job period (e.g., Full-time, Contract)",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      description: "Job status (e.g., Hiring)",
    },

    currentUser && {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<MdDelete className={`text-lg text-red`} />}
          label="Delete"
          onClick={() => deleteVehicle(params?.id)}
        />,
      ],
    },
  ];


  return (
    <div className={``}>
      <div className="flex items-center mt-6 ml-6 space-x-2">
        <img
          src={logo}
          alt="Logo"
          className="h-10 w-10"
        />
        <div className="text-blue-500 text-2xl font-semibold">Saved Jobs</div>
      </div>
      {/* ============= searchbox and add button */}
      <div className={`mt-8  ml-7 border-b w-1/3 flex items-center justify-between`}>
        <input
          onChange={onChange}
          className={`h-12 w-96 rounded-full bg-skin-fill-base px-6 outline-none focus:border-skin-inverted
            "bg-custom-gradient-light text-white",
            " placeholder-color-gray"
          )}`}
          placeholder="Search by keyword..."
          type="search"
        />

        {/* {currentUser && (
          <button
            className={`h-11 w-32 rounded-xl bg-skin-fill-inverted text-white duration-300 ease-in-out hover:drop-shadow-2xl`}
            onClick={() => setShowModal(true)}
          >
            Add Vehicle
          </button>
        )}
       */}


      </div>

      <div
        className={`mt-12 overflow-hidden rounded-3xl px-8 py-4 shadow-lg 
          "bg-custom-gradient-light text-white",
          "bg-skin-fill"
        )}`}
      >
        <DataGrid
          autoHeight
          rows={filteredData}
          rowCount={numVehicles}
          getRowId={(row) => row?._id}
          columns={columns}
          loading={loading}
          paginationMode="server"
          // onPaginationModelChange={handlePage}
          rowHeight={60}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          className={`capitalize`}
        // processRowUpdate={editVehicle}
        />

      </div>
    </div>
  );
};

export default SavedJobs;
