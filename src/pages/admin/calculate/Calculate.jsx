import React, { useState, useEffect } from "react";
import { app } from "../../../config";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  calculateNormalizedMatrix,
  calculateFinalScores,
  generateRanking,
} from "../../../utils/algorithm";

const db = getDatabase(app);

const Calculate = () => {
  const [dataAlternative, setDataAlternative] = useState([]);
  const [showing, setShowing] = useState(false);
  const [dataCriteria, setDataCriteria] = useState([]);

  // Fungsi untuk mengambil data dari Firebase Realtime Database
  const fetchData = (refPath, setDataFunction) => {
    const dataRef = ref(db, refPath);
    onValue(dataRef, (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const value = childSnapshot.val();

        data.push({
          key,
          value,
        });
      });
      setDataFunction(data);
    });
  };

  // Mengambil data alternatif dan kriteria saat komponen dimount
  useEffect(() => {
    fetchData("alternative", setDataAlternative);
    fetchData("criteria", setDataCriteria);
    console.log(decisionNormalizedMatrix);
  }, []);

  // Menyiapkan bobot untuk kriteria
  const weights = dataCriteria.map((item) => {
    const { attribute, weight } = item.value;
    const benefit = attribute === "Benefit";
    return {
      value: parseFloat(weight) / 100,
      benefit: benefit,
    };
  });

  // Matrix keputusan dari data alternatif yang diambil dari database
  const decisionMatrix = dataAlternative.map((item) => {
    const { alternative, selectedValues } = item.value;
    const values = Object.values(selectedValues).map(Number);
    return {
      name: alternative,
      value: values,
    };
  });

  // Menghitung matrix ternormalisasi
  const decisionNormalizedMatrix = calculateNormalizedMatrix(
    weights,
    decisionMatrix
  );

  // Menghitung nilai akhir (final scores)
  const finalScores = calculateFinalScores(decisionNormalizedMatrix, weights);

  // Menghasilkan perangkingan
  const ranking = generateRanking(finalScores, decisionMatrix);

  // Menghandle saat tombol "Hitung" ditekan
  const handleCalculate = () => {
    if (dataAlternative.length === 0) {
      console.log("Data tidak tersedia. Mengambil data...");
      fetchData("alternative", setDataAlternative);
      return;
    }
    setShowing(true);
  };

  return (
    <>
      <div className="grid gap-4">
        <div className="p-4 rounded-sm shadow-md">
          <h2 className="text-xl">Matriks Keputusan</h2>
          {dataAlternative.length === 0 ? (
            <p className="text-center">Data Kosong</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="py-2">Alternatif</th>
                  <th className="py-2">Harga Sewa pertahun</th>
                  <th className="py-2">Jarak Per ATM</th>
                  <th className="py-2">Ketersediaan ATM</th>
                  <th className="py-2">Permintaan Nasabah</th>
                </tr>
              </thead>
              <tbody>
                {dataAlternative.map((item) => (
                  <tr key={item.key}>
                    <td className="py-2 text-center">
                      {item?.value?.alternative || "-"}
                    </td>
                    <td className="py-2 text-center">
                      {item?.value?.selectedValues &&
                      item?.value?.selectedValues["Harga Sewa pertahun"]
                        ? item.value.selectedValues["Harga Sewa pertahun"]
                        : "-"}
                    </td>
                    <td className="py-2 text-center">
                      {item?.value?.selectedValues &&
                      item?.value?.selectedValues["Jarak Per ATM"]
                        ? item.value.selectedValues["Jarak Per ATM"]
                        : "-"}
                    </td>
                    <td className="py-2 text-center">
                      {item?.value?.selectedValues &&
                      item?.value?.selectedValues["Ketersediaan ATM"]
                        ? item.value.selectedValues["Ketersediaan ATM"]
                        : "-"}
                    </td>
                    <td className="py-2 text-center">
                      {item?.value?.selectedValues &&
                      item?.value?.selectedValues["Permintaan Nasabah"]
                        ? item.value.selectedValues["Permintaan Nasabah"]
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {dataAlternative.length === 0 ? null : (
          <div className="flex items-center justify-center">
            {showing ? (
              <button
                onClick={() => setShowing(false)}
                className="px-6 py-2 text-white uppercase bg-blue-700 rounded-md"
              >
                Tutup
              </button>
            ) : (
              <button
                onClick={handleCalculate}
                className="px-6 py-2 text-white uppercase bg-blue-700 rounded-md"
              >
                Hitung
              </button>
            )}
          </div>
        )}
        {showing && (
          <>
            <div className="p-4 rounded-sm shadow-md">
              <h2 className="text-xl">Normalisasi Keputusan</h2>
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="py-2">Alternatif</th>
                    <th className="py-2">Harga Sewa pertahun</th>
                    <th className="py-2">Jarak Per ATM</th>
                    <th className="py-2">Ketersediaan ATM</th>
                    <th className="py-2">Permintaan Nasabah</th>
                  </tr>
                </thead>
                <tbody>
                  {decisionNormalizedMatrix.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 text-center">{item.name}</td>
                      <td className="py-2 text-center">{item.values[0]}</td>
                      <td className="py-2 text-center">{item.values[1]}</td>
                      <td className="py-2 text-center">{item.values[2]}</td>
                      <td className="py-2 text-center">{item.values[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-sm shadow-md">
              <h2 className="text-xl">Perangkingan</h2>
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="py-2">Rank</th>
                    <th className="py-2">Alternatif</th>
                    <th className="py-2">Final Score</th>
                  </tr>
                </thead>
                <tbody>
                  {ranking.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 text-center">{item.rank}</td>
                      <td className="py-2 text-center">{item.name}</td>
                      <td className="py-2 text-center">{item.finalScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Calculate;
