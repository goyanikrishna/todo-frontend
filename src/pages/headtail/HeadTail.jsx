import React, { useState } from "react";
import { Select, Button, message, Table } from "antd";

const { Option } = Select;

const HeadTailGame = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [columnsData, setColumnsData] = useState([]);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const handleSubmit = () => {
    if (!selectedValue) {
      message.error("Please select a value from the dropdown");
      return;
    }

    setColumnsData((prevColumns) => {
      let newColumns = [...prevColumns];

      if (
        newColumns.length === 0 ||
        newColumns[newColumns.length - 1][0] === selectedValue
      ) {
        if (newColumns.length === 0) {
          newColumns.push([selectedValue]);
        } else {
          newColumns[newColumns.length - 1].push(selectedValue);
        }
      } else {
        newColumns.push([selectedValue]);
      }

      return newColumns;
    });

    setSelectedValue(null);
  };

  const maxRows = Math.max(...columnsData.map((col) => col.length), 0);

  const tableData = Array.from({ length: maxRows }, (_, rowIndex) => {
    let row = { key: rowIndex };
    columnsData.forEach((col, colIndex) => {
      row[`col_${colIndex}`] = col[rowIndex] || "";
    });
    return row;
  });

  const tableColumns = columnsData.map((_, colIndex) => ({
    title: `Column ${colIndex + 1}`,
    dataIndex: `col_${colIndex}`,
    key: `col_${colIndex}`,
    align: "center",
  }));

  return (
    <div className="flex flex-col items-center mt-10 p-4">
      <Select
        placeholder="Select value"
        onChange={handleChange}
        value={selectedValue}
        style={{ width: 200 }}
        allowClear
      >
        <Option value="H">H</Option>
        <Option value="T">T</Option>
      </Select>

      <Button type="primary" onClick={handleSubmit} className="mt-4">
        Submit
      </Button>

      <Table
        dataSource={tableData}
        columns={tableColumns}
        pagination={false}
        bordered
        className="mt-6 w-full max-w-lg"
      />
    </div>
  );
};

export default HeadTailGame;
