import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../src/assets/axios'

const PlayerCreate = () => {
    const [name, setName] = useState('');
    const [roleclass, setRole] = useState('');
    const navigate = useNavigate();

    const roleclassMap = {
    0: 'Warrior',
    1: 'Knight',
    2: 'Fighter',
    3: 'Archer',
    4: 'Fire Mage',
    5: 'Scholar',
    6: 'Cleric'
    };

    const postPlayer = async (e) => {
            e.preventDefault();
            const player = {name, roleclass};

           try {
            const { data, status } = await api.post('/Player', player, {
            headers: { 'Content-Type': 'application/json' }
            });
            console.log(data);

            if (status === 201) 
            {
                navigate(`/players/${data.name}`);
            }
            else
            {

            }
           } catch(error) {
            console.error(error);
           }
        };

    return (
        <div className="createPlayer">
            <h3>Player register form.</h3>
            <form onSubmit={postPlayer}>
                <label>Name:</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                </input>
                <label>Role:</label>
                <select
                    required
                    value={roleclass}
                    onChange={(e) => setRole(parseInt(e.target.value, 10))}>
                    <option value="" disabled>
                        Choose a class
                    </option>
                    {Object.entries(roleclassMap).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value}
                        </option>
                    ))}
                </select>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default PlayerCreate;