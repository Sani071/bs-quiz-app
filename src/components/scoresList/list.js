import React from "react";
import moment from "moment";

export default function List({ record, isHidden }) {
  return (
    <div>
      <li key={record.id} className="prev-score">
        <span className={isHidden ? "d-none" : "text-info"}>
          {record.name} -
        </span>{" "}
        <span className="text-success">{record.score}</span> at{" "}
        {moment(record.time).format("DD/MM/YYYY, h:mm a")}
      </li>
    </div>
  );
}
