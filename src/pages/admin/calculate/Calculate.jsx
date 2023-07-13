import React, { useState } from "react";

const Calculate = () => {
  const data = [
    {
      criteria: "C1",
      name: "Ketersediaan ATM",
      subcriteria: [
        {
          name: "Tidak ada Mesin ATM",
          value: 1,
        },
        {
          name: "1 Mesin ATM",
          value: 2,
        },
        {
          name: "> 1 Mesin ATM",
          value: 3,
        },
      ],
    },
    {
      criteria: "C2",
      name: "Jarak Per ATM",
      subcriteria: [
        {
          name: "< 500m",
          value: 1,
        },
        {
          name: "500m - 2km",
          value: 2,
        },
        {
          name: "> 2km",
          value: 3,
        },
      ],
    },
    {
      criteria: "C3",
      name: "Harga Sewa pertahun",
      subcriteria: [
        {
          name: "< 10juta",
          value: 1,
        },
        {
          name: "10juta - 20 juta",
          value: 2,
        },
        {
          name: "> 20 juta",
          value: 3,
        },
      ],
    },
    {
      criteria: "C4",
      name: "Permintaan Nasabah",
      subcriteria: [
        {
          name: "< 50 orang",
          value: 1,
        },
        {
          name: "50 - 100 orang",
          value: 2,
        },
        {
          name: ">100 orang",
          value: 3,
        },
      ],
    },
  ];

  console.log(data);

  return <></>;
};

export default Calculate;
