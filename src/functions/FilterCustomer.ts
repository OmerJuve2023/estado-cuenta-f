import React, { useState } from "react";

export const useUI = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    return { searchTerm, handleSearch, showModal, handleModalToggle };
};
