import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';


const BossDetail = () => {
    const location = useLocation();
    let params = useParams();
    const [boss, setBoss] = useState(null);
    const [loading, setLoading] = useState(true);
    const input = location.state || {};

    useEffect(() => {
        const fetchBoss = async () => {
        setLoading(true)
        const options = {method: 'GET', url: `https://localhost:7289/Boss/${input.id}`};


        try {
            const { data } = await axios.request(options);
            console.log(data);
            setBoss(data.data);
        } catch (error) {
            console.error('Failed to fetch boss:', error);
            setBoss(null);
        } finally {
            setLoading(false);
        }
        };

        fetchBoss();
    }, [params]);

    return (
        <div>
        {loading ? (
            <p>Loading...</p>
        ) : boss ? (
            <div>
            <h2>{boss.name}</h2>
            </div>
        ) : (
            <p>Boss not found.</p>
        )}
        </div>
    );
};

export default BossDetail;