import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  AiOutlinePlusCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { app } from "../../../config";
import AddSubcriteria from "./AddSubcriteria";
import DeleteSubcriteria from "./DeleteSubcriteria";
import EditSubcriteria from "./EditSubcriteria";

const db = getDatabase(app);
const DataSubcriteria = () => {
  const [dataSubcriteria, setDataSubcriteria] = useState([]);
  const [selectedSubcriteria, setSelectedSubcriteria] = useState({});
  const [openAddSubcriteria, setOpenAddSubcriteria] = useState(false);
  const [openDeleteSubcriteria, setOpenDeleteSubcriteria] = useState(false);
  const [openEditSubcriteria, setOpenEditSubcriteria] = useState(false);
  const [dataCriteria, setDataCriteria] = useState([]);
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

  const fetchDataSubcriteria = () => {
    const criteriaRef = ref(db, "subcriteria");
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
      setDataSubcriteria(data);
    });
  };

  const fetchSelectedDelete = (selectedSubcriteria) => {
    setSelectedSubcriteria(selectedSubcriteria);
    setOpenDeleteSubcriteria(true);
  };

  const fetchSelectedEdit = (selectedSubcriteria) => {
    setSelectedSubcriteria(selectedSubcriteria);
    setOpenEditSubcriteria(true);
  };
  useEffect(() => {
    fetchData();
    fetchDataSubcriteria();
  }, []);
  return (
    <>
      <div className="flex items-center justify-end">
        <button className="btn" onClick={() => setOpenAddSubcriteria(true)}>
          <AiOutlinePlusCircle className="icon" />
        </button>
      </div>
      {dataSubcriteria.length === 0 ? (
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
                  <th>Kriteria</th>
                  <th>Subkriteria</th>
                  <th>Bobot</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataSubcriteria.map((item, index) => (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td className="text-center">{item.value.criteria}</td>
                    <td className="text-center">{item.value.subcriteria}</td>
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
      {openAddSubcriteria && (
        <AddSubcriteria
          dataCriteria={dataCriteria}
          setOpenSubcriteria={setOpenAddSubcriteria}
        />
      )}
      {openDeleteSubcriteria && (
        <DeleteSubcriteria
          selectedSubcriteria={selectedSubcriteria}
          setOpenDeleteSubcriteria={setOpenDeleteSubcriteria}
        />
      )}
      {openEditSubcriteria && (
        <EditSubcriteria
          dataCriteria={dataCriteria}
          selectedSubcriteria={selectedSubcriteria}
          setOpenEditSubcriteria={setOpenEditSubcriteria}
        />
      )}
    </>
  );
};

export default DataSubcriteria;
