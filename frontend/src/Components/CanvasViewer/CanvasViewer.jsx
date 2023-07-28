import React from "react";

const CanvasViewer = ({ img }) => {
  return (
    <div className="border border-dark border-3 h-100 w-100 overflow-hidden">
      <img
        src={img}
        alt="Real-time whiteboard shared by presenter"
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
};

export default CanvasViewer;
