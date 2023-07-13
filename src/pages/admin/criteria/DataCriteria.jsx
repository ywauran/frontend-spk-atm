import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  AiOutlinePlusCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { app } from "../../../config";
import AddCriteria from "./AddCriteria";
import DeleteCriteria from "./DeleteCriteria";
import EditCriteria from "./EditCriteria";

const db = getDatabase(app);
const DataCriteria = () => {
  const [dataCriteria, setDataCriteria] = useState([]);
  const [selectedCriteria, setSelectedCriteria] = useState({});
  const [openAddCriteria, setOpenCriteria] = useState(false);
  const [openDeleteCriteria, setOpenDeleteCriteria] = useState(false);
  const [openEditCriteria, setOpenEditCriteria] = useState(false);

  const fetchData = () => {
    const criteriaRef = ref(db, "criteria");
    onValue(criteriaRef, (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const value = childSnapshot.val();

        data.push({
          key,
          value,
        });
      });
      setDataCriteria(data);
    });
  };

  const fetchSelectedDelete = (selectedCriteria) => {
    setSelectedCriteria(selectedCriteria);
    setOpenDeleteCriteria(true);
  };

  const fetchSelectedEdit = (selectedSubdistrict) => {
    setSelectedCriteria(selectedSubdistrict);
    setOpenEditCriteria(true);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="flex items-center justify-end">
        <button className="btn" onClick={() => setOpenCriteria(true)}>
          <AiOutlinePlusCircle className="icon" />
        </button>
      </div>
      {dataCriteria.length === 0 ? (
        <>
          <p className="text-center">Tidak ada data</p>
        </>
      ) : (
        <>
          <div className="mt-4 overflow-x-auto shadow-md">
            <table className="table ">
              {/* head */}
              <thead>
                <tr className="text-center">
                  <th></th>
                  <th>Kode</th>
                  <th>Kriteria</th>
                  <th>Atribut</th>
                  <th>Bobot</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataCriteria.map((item, index) => (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>C{index + 1}</td>
                    <td className="text-center">{item.value.criteria}</td>
                    <td className="text-center">{item.value.attribute}</td>
                    <td className="text-center">{item.value.weight}</td>
                    <td className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => fetchSelectedDelete(item)}
                        className="p-2 text-white bg-red-600 rounded-md"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                      <button
                        onClick={() => fetchSelectedEdit(item)}
                        className="p-2 text-white bg-green-600 rounded-md"
                      >
                        <AiOutlineEdit size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {openAddCriteria && <AddCriteria setOpenAddCriteria={setOpenCriteria} />}
      {openDeleteCriteria && (
        <DeleteCriteria
          selectedCriteria={selectedCriteria}
          setOpenDeleteCriteria={setOpenDeleteCriteria}
        />
      )}
      {openEditCriteria && (
        <EditCriteria
          selectedCriteria={selectedCriteria}
          setOpenEditCriteria={setOpenEditCriteria}
        />
      )}
    </>
  );
};

export default DataCriteria;
