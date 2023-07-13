import React from "react";
import { app } from "../../../config";
import { ref, getDatabase, remove } from "firebase/database";

const db = getDatabase(app);

const DeleteAlternative = ({
  selectedAlternative,
  setOpenDeleteAlternative,
}) => {
  const close = () => {
    setOpenDeleteAlternative(false);
  };

  const handleDelete = async () => {
    try {
      await remove(ref(db, `alternative/${selectedAlternative.key}`));
      console.log("Alternatif berhasil dihapus");
      close();
    } catch (error) {
      console.error("Error menghapus Alternatif:", error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen">
        <div
          id="popup-modal"
          tabIndex="-1"
          className="flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0"
        >
          <div className="relative bg-white rounded-lg shadow ">
            <div className="p-6 text-center">
              <h3 class="mb-5 text-lg font-normal text-gray-500 ">
                Anda yakin ingin menghapus data ini?
              </h3>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={(e) => handleDelete()}
                  className="w-20 btn btn-primary"
                >
                  Ya
                </button>
                <button
                  onClick={() => close()}
                  className="w-20 btn btn-warning"
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAlternative;
