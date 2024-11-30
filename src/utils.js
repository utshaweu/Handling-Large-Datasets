import axios from "axios";

async function fetchProducts({ setPhotos }) {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/photos"
    );
    const products = response?.data;
    setPhotos(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

const columns = [
  { label: "SL", accessor: "sl", width: "80px", textAlign: "center"  },
  { label: "Photo Title", accessor: "title", width: "450px"   },
  { label: "Thumbnail", accessor: "thumbnailUrl", width: "150px" },
  { label: "Image", accessor: "url", width: "300px"  },
  { label: "Actions", accessor: "actions", width: "150px", textAlign: "center" },
];

// Function to handle inline editing of customerName
const handleEditChange = (index, value, photos, setPhotos) => {
  const updatedData = [...photos];
  updatedData[index].title = value;
  setPhotos(updatedData);
};

// Custom render function for each cell, including an editable input for customerName and action buttons
const renderCell = (item, column, index, photos, setPhotos) => {
  if (column?.accessor === "sl") {
    return index + 1;
  }
  if (column?.accessor === "title") {
    return (
      <input
        type="text"
        value={item?.title}
        onChange={(e) =>
          handleEditChange(index, e.target.value, photos, setPhotos)
        }
      />
    );
  }

  if (column?.accessor === "thumbnailUrl") {
    return <img src={item?.thumbnailUrl} alt={item?.title} />;
  }

  if (column?.accessor === "url" ) {
    return <img src={item?.url} alt={item?.title} />;
  }

  if (column?.accessor === "actions") {
    return (
      <div className="action-buttons">
        <button onClick={() => alert(`Viewing ${item?.title}`)}>View</button>
        <button onClick={() => alert(`Editing ${item?.title}`)}>Edit</button>
      </div>
    );
  }

  return item[column?.accessor];
};

export { fetchProducts, columns, renderCell };
