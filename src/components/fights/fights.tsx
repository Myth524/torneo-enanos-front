import React, { useState, useEffect } from "react";


const Fights = () => {
    const [fightsData, setFightsData] = useState<FightData[]>([]);
    const [selectedFight, setSelectedFight] = useState<FightData | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    const fetchFightsData = async () => {
        try {
            const response = await fetch("http://localhost:80/Peleas");
            const jsonData = await response.json();
            setFightsData(jsonData);
            setLoading(false);
        }catch (error) {
            console.error("Error fetching data:", error);
            setError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFightsData();
    }, []);

    const handleShowAddForm = () => {
        setShowAddForm(true);
    };

    const fights = fightsData.map((fight) => (
        <div key={fight._id}>
            
        </div>
    ))
}