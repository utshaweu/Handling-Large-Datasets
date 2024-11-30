import React, { useEffect, useState } from "react";
import { columns, fetchProducts, renderCell } from "./utils";
import VirtualizedTable from "./VirtualizedTable";
import VirtualizedListWithAPI from "./VirtualizedListWithAPI";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchProducts({ setPhotos });
  }, []);

  console.log(photos);
  return (
    <div className="App">
      <h1>React Window use in Photo List</h1>
      <VirtualizedTable
        columns={columns}
        data={photos}
        rowHeight={50}
        height={600}
        width="100%"
        renderCell={(item, column, index) =>
          renderCell(item, column, index, photos, setPhotos)
        }
      />
      <h1>React Virtualized use in Photo List</h1>
      <VirtualizedListWithAPI />
    </div>
  );
}

export default App;
