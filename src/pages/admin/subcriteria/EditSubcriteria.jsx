import React, { useEffect, useState } from "react";
import { get, set, ref, getDatabase } from "firebase/database";
import { app } from "../../../config";

const db = getDatabase(app);
const EditSubcriteria = ({
  dataCriteria,
  selectedSubcriteria,
  setOpenEditSubcriteria,
}) => {
  const [criteria, setCriteria] = useState(
    selectedSubcriteria?.value?.criteria
  );
  const [weight, setWeight] = useState(selectedSubcriteria?.value?.weight);
  const [subcriteria, setSubcriteria] = useState(
    selectedSubcriteria?.value?.subcriteria
  );

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      await set(ref(db, `/subcriteria/${selectedSubcriteria?.key}`), {
        criteria: criteria,
        weight: weight,
        subcriteria: subcriteria,
        uuid: selectedSubcriteria?.key,
      });
      close();
    } catch (error) {
      console.error("Error updating subcriteria:", error);
    }
  };

  const close = () => {
    setOpenEditSubcriteria(false);
  };

  useEffect(() => {
    console.log(selectedSubcriteria);
  }, []);
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen">
        <div
          id="popup-modal"
          tabIndex="-1"
          className="flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0"
        >
          <div className="relative bg-white rounded-lg shadow ">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={close}
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
              <form onSubmit={handleEdit}>
                <div>
                  <label htmlFor="criteria" className="label">
                    Kriteria
                  </label>
                  <select
                    name="criteria"
                    id="criteria"
                    value={criteria}
                    onChange={(e) => setCriteria(e.target.value)}
                    className="w-full max-w-xs input input-md input-bordered"
                  >
                    {dataCriteria?.map((item) => (
                      <option value={item?.value.criteria}>
                        {item?.value.criteria}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="subcriteria" className="label">
                    Subkriteria
                  </label>
                  <input
                    type="text"
                    name="subcriteria"
                    id="subcriteria"
                    value={subcriteria}
                    className="w-full max-w-xs input input-md input-bordered"
                    onChange={(e) => setSubcriteria(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="weight" className="label">
                    Bobot
                  </label>
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    value={weight}
                    className="w-full max-w-xs input input-md input-bordered"
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
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

export default EditSubcriteria;
