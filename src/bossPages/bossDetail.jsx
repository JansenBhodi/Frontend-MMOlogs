import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CustomModal from '../components/customModal';
import axios from 'axios';
import MechanicCreate from '../mechanicPages/mechanicCreate';
import api from '../assets/axios'


const BossDetail = () => {
    const location = useLocation();
    let params = useParams();
    const [boss, setBoss] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const input = location.state || {};

    useEffect(() => {
        const fetchBoss = async () => {
        setLoading(true)


        try {
            const { data } = await api.get(`/Boss/${input.id}`);
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
            <div className="boss-detail-container">

                <div className="boss-left">
                    <h1>{boss.name}</h1>
                    <h2>Fight Level: {boss.level}</h2>
                    <h2>Boss Healthpool: {boss.maxLife.toLocaleString()}</h2>
                    <p>{boss.description}</p>
                </div>
                <div className="boss-right">
                    <CustomModal isOpen={modalOpen} title={'Add Mechanic'} onClose={() => setModalOpen(false)}>
                        <MechanicCreate bossId={boss.id} />
                    </CustomModal>
                    <h2>Mechanics</h2>
                    <button onClick={() => {setModalOpen(true)}}>Add Mechanic</button>

                    {boss.mechanics && boss.mechanics.length > 0 ? (
                            boss.mechanics.map(mech => (
                            <div key={mech.id} className="mechanic-item">
                                <div className="mechanic-name">{mech.name}</div>
                                <div>{mech.description}</div>
                            </div>
                        ))
                    ) : (
                    <p>No mechanics found.</p>
                    )}
                </div>

            </div>
        ) : (
            <p>Boss not found.</p>
        )}
        </div>
    );
};

export default BossDetail;