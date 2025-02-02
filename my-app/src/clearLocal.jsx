import React from 'react';

const ClearLocalButton = () => {
    const clearLocalData = () => {
        localStorage.clear();
        alert('All local data has been cleared.');
        console.log("storage cleared");
    };

    return (
        <button onClick={clearLocalData}>
            Clear Local Data
        </button>
    );
    console.log("storage cleared");
};

export default ClearLocalButton;