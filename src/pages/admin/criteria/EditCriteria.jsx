import React, { useEffect, useState } from "react";
import { get, set, ref, getDatabase } from "firebase/database";
import { app } from "../../../config";

const db = getDatabase(app);
const EditCriteria = ({ selectedCriteria, setOpenEditCriteria }) => {
  const [criteria, setCriteria] = useState(selectedCriteria.value.criteria);
  const [attribute, setAttribute] = useState(selectedCriteria.value.attribute);
  const [weight, setWeight] = useState(selectedCriteria.value.weight);

  const attributes = ["Cost", "Benefit"];
  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      await set(ref(db, `/criteria/${selectedCriteria.key}`), {
        criteria: criteria,
        attribute: attribute,
        weight: weight,
        uuid: selectedCriteria.key,
      });
      close();
    } catch (error) {
      console.error("Error updating criteria:", error);
    }
  };

  const close = () => {
    setOpenEditCriteria(false);
  };

  useEffect(() => {
    console.log(selectedCriteria);
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
                  <input
                    type="text"
                    name="criteria"
                    id="criteria"
                    value={criteria}
                    className="w-full max-w-xs input input-md input-bordered"
                    onChange={(e) => setCriteria(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="attribute" className="label">
                    Atribut
                  </label>
                  <select
                    name="attribute"
                    id="attribute"
                    value={attribute}
                    onChange={(e) => setAttribute(e.target.value)}
                    className="w-full max-w-xs input input-md input-bordered"
                  >
                    {attributes.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="weight" className="label">
                    Bobot
                  </label>
                  <input
                    type="text"
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

export default EditCriteria;
