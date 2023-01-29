import React, { useRef } from "react";

const Confirm = ({ handleConfirm, text }) => {
  const confirmContainer = useRef();

  const handleNo = () => {};

  return (
    <div
      ref={confirmContainer}
      className="fixed top-0 left-0 h-screen w-full bg-gray-700 bg-opacity-80 flex justify-center items-center p-4 z-50"
      onClick={handleNo}
    >
      <div className="w-96 h-96 bg-white rounded-lg">
        <p className="text-gray-900 font-bold">{text}¿Estás seguro?</p>
        <div>
          <button
            onClick={handleConfirm}
            className="ml-2 p-2 border rounded border-gray-800 text-gray-800"
          >
            Yes
          </button>
          <button className="ml-2" onClick={handleNo}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
