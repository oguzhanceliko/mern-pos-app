import { Area } from "@ant-design/plots";
import { FC, useEffect, useState } from "react";

type Props = {
  data: any;
};

const BasicArea: FC<Props> = ({ data }) => {
  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  return <Area {...config} />;
};

export default BasicArea;
