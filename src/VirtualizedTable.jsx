import React, { useRef, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import PropTypes from "prop-types";

// Row component for react-window
const Row = ({ index, style, data }) => {
  const { items, columns, renderCell, columnWidths } = data;
  const item = items[index];

  return (
    <div style={style} className="table-row">
      {columns.map((column, colIndex) => (
        <span
          key={column?.accessor}
          className="table-cell"
          style={{ width: columnWidths[colIndex], textAlign: column?.textAlign || "initial", }}
        >
          {renderCell
            ? renderCell(item, column, index)
            : item[column?.accessor]}
        </span>
      ))}
    </div>
  );
};

// Main VirtualizedTable component
const VirtualizedTable = ({
  columns,
  data,
  rowHeight = 35,
  height = 400,
  width = "100%",
  renderCell,
}) => {
  const listRef = useRef();
  const headerRef = useRef([]);
  const [columnWidths, setColumnWidths] = useState([]);

  // Measure header cell widths
  useEffect(() => {
    const widths = columns.map((column, index) => {
      if (column?.width) {
        return column.width; // Use provided width
      }
      // Calculate dynamic width if not provided
      const headerCell = headerRef.current[index];
      return headerCell?.offsetWidth || 0;
    });
    setColumnWidths(widths);
  }, [columns]);

  const scrollToTop = () => {
    listRef.current.scrollToItem(0, "smooth");
  };

  const scrollToBottom = () => {
    listRef.current.scrollToItem(data.length - 1, "smooth");
  };

  return (
    <div className="table-container">
      {/* Navigation arrows */}
      <div className="table-navigation">
        <button onClick={scrollToTop} className="arrow-button">
          ▲
        </button>
        <button onClick={scrollToBottom} className="arrow-button">
          ▼
        </button>
      </div>

      {/* Fixed table header */}
      <div className="table-header">
        {columns.map((column, index) => (
          <span
            key={column?.accessor}
            ref={(el) => (headerRef.current[index] = el)}
            className="table-cell"
            style={{ width: column?.width, textAlign: column?.textAlign || "initial", }} 
          >
            {column?.label}
          </span>
        ))}
      </div>

      {/* Scrollable, virtualized table body */}
      <List
        ref={listRef}
        height={height}
        itemCount={data?.length}
        itemSize={rowHeight}
        width={width}
        itemData={{ items: data, columns, renderCell, columnWidths }}
      >
        {Row}
      </List>
    </div>
  );
};

VirtualizedTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Optional width
      textAlign: PropTypes.oneOf(["left", "center", "right"]), // Optional alignment
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowHeight: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  renderCell: PropTypes.func,
};

export default VirtualizedTable;
