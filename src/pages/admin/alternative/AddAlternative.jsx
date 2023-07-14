import React, { useState } from "react";
import { app } from "../../../config";
import { uid } from "uid";
import { set, ref, getDatabase } from "firebase/database";
import { data } from "../../../utils/data";
import ToastError from "../../../components/toast/ToastError";
import ToastSuccess from "../../../components/toast/ToastSuccess";

const db = getDatabase(app);

const AddAlternative = ({ setOpenAlternative }) => {
  const [alternative, setAlternative] = useState("");
  const [selectedValues, setSelectedValues] = useState({});
  const [openToastError, setOpenToastError] = useState(false);
  const [openToastSuccess, setOpenToastSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if any required options are not selected
      const hasUnselectedOptions = data.some(
        (item) => !selectedValues[item.name]
      );

      if (alternative.trim() === "" || hasUnselectedOptions) {
        // Handle validation error, e.g., show an error message or prevent form submission
        setOpenToastError(true);
        setTimeout(() => setOpenToastError(false), 2000);
        return;
      }

      const uuid = uid();
      const newData = {
        uuid,
        alternative,
        selectedValues,
      };

      await set(ref(db, `/alternative/${uuid}`), newData);
      close();
      setAlternative("");
      setSelectedValues({});
      setOpenToastSuccess(true);
      setTimeout(() => {
        setOpenToastSuccess(false);
      }, 3000);
    } catch (error) {
      // Handle any error that occurred during form submission
      console.log("Error:", error);
      // Show an error message or perform any other necessary actions
    }
  };

  const close = () => {
    setOpenAlternative(false);
  };

  return (
    <>
      {openToastError && <ToastError message="Lengkapi Field" />}
      {openToastSuccess && <ToastSuccess message="Berhasil menambah data" />}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen">
        <div
          id="popup-modal"
          tabIndex="-1"
          className="flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0"
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={() => close()}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
            <div className="p-6 text-center">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="criteria" className="label">
                    Alternatif
                  </label>
                  <input
                    type="text"
                    name="criteria"
                    id="criteria"
                    value={alternative}
                    className="w-full max-w-xs input input-md input-bordered"
                    onChange={(e) => setAlternative(e.target.value)}
                  />
                </div>
                {data.map((item, index) => (
                  <div key={index}>
                    <label htmlFor="" className="label">
                      {item.name}
                    </label>
                    <select
                      name=""
                      id=""
                      className="w-full max-w-xs input input-md input-bordered"
                      onChange={(e) => {
                        setSelectedValues((prevState) => ({
                          ...prevState,
                          [item.name]: e.target.value,
                        }));
                      }}
                      value={selectedValues[item.name] || ""}
                    >
                      <option value="" disabled>
                        Select {item.name}
                      </option>
                      {item.subcriteria.map((subitem, index) => (
                        <option value={subitem.value} key={index}>
                          {subitem.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full mt-4 btn btn-primary btn-md"
                >
                  Simpan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAlternative;
