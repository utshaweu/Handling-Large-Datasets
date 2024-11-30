import React, { useEffect, useState, useRef } from "react";
import { List, AutoSizer } from "react-virtualized";
import "./VirtualizedListWithAPI.css";

const VirtualizedListWithAPI = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null); // Reference to the List component

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/photos"
        );
        const data = await response.json();
        setPhotos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle title edit
  const handleTitleChange = (index, newTitle) => {
    setPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos[index].title = newTitle;
      return updatedPhotos;
    });
  };

  // Scroll to the first row
  const scrollUp = () => {
    listRef.current.scrollToRow(0); // Scroll to the first row
  };

  // Scroll to the last row
  const scrollDown = () => {
    listRef.current.scrollToRow(photos.length - 1); // Scroll to the last row
  };

  // Row renderer function
  const rowRenderer = ({ index, key, style }) => {
    const photo = photos[index];

    return (
      <div key={key} style={style} className="row">
        <div className="sl">{index + 1}</div>
        <img src={photo.thumbnailUrl} alt={photo.title} className="thumbnail" />
        <input
          type="text"
          className="editable-title"
          value={photo.title}
          onChange={(e) => handleTitleChange(index, e.target.value)}
        />
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="list-container">
      {/* Scroll Buttons */}
      <div className="scroll-buttons">
        <button onClick={scrollUp} className="arrow-button">
          ↑ Scroll to Top
        </button>
        <button onClick={scrollDown} className="arrow-button">
          ↓ Scroll to Bottom
        </button>
      </div>
      {/* Fixed Header */}
      <div className="header">
        <div className="header-sl">SL</div>
        <div className="header-thumbnail">Thumbnail</div>
        <div className="header-title">Title</div>
      </div>

      {/* Responsive Virtualized List */}
      <AutoSizer>
        {({ width, height }) => (
          <List
            ref={listRef} // Attach the list to the ref
            width={width} // Use the calculated width from AutoSizer
            height={height - 140} // Deduct space for header and buttons
            rowHeight={100} // Fixed height for each row
            rowCount={photos.length} // Total number of rows
            rowRenderer={rowRenderer} // Function to render each row
            overscanRowCount={10} // Extra rows to render for smooth scrolling
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default VirtualizedListWithAPI;
