import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  AiOutlinePlusCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { app } from "../../../config";
import AddAlternative from "./AddAlternative";
import EditAlternative from "./EditAlternative";
import DeleteAlternative from "./DeleteAlternative";

const db = getDatabase(app);
const DataAlternative = () => {
  const [dataAlternative, setDataAlternative] = useState([]);
  const [selectedAlternative, setSelectedAlternative] = useState({});
  const [openAddAlternative, setOpenAlternative] = useState(false);
  const [openDeleteAlternative, setOpenDeleteAlternative] = useState(false);
  const [openEditAlternative, setOpenEditAlternative] = useState(false);

  const fetchData = () => {
    const criteriaRef = ref(db, "alternative");
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
      setDataAlternative(data);
    });
  };

  const fetchSelectedDelete = (selectedAlternative) => {
    setSelectedAlternative(selectedAlternative);
    setOpenDeleteAlternative(true);
  };

  const fetchSelectedEdit = (selectedAlternative) => {
    setSelectedAlternative(selectedAlternative);
    setOpenEditAlternative(true);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="flex items-center justify-end">
        <button className="btn" onClick={() => setOpenAlternative(true)}>
          <AiOutlinePlusCircle className="icon" />
        </button>
      </div>
      {dataAlternative.length === 0 ? (
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
                  <th>Alternatif</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataAlternative.map((item, index) => (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>A{index + 1}</td>
                    <td className="text-center">{item.value.alternative}</td>
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
      {openAddAlternative && (
        <AddAlternative setOpenAlternative={setOpenAlternative} />
      )}
      {openDeleteAlternative && (
        <DeleteAlternative
          selectedAlternative={selectedAlternative}
          setOpenDeleteAlternative={setOpenDeleteAlternative}
        />
      )}
      {openEditAlternative && (
        <EditAlternative
          selectedAlternative={selectedAlternative}
          setOpenEditAlternative={setOpenEditAlternative}
        />
      )}
    </>
  );
};

export default DataAlternative;
