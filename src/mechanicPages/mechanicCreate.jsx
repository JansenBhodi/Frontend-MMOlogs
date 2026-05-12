import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../assets/axios'

const MechanicCreate = ( {bossId} ) => {
    const [name, setName] = useState('');
    const [description, setDesc] = useState('');
    const navigate = useNavigate();

    const postMechanic = async (e) => {
            e.preventDefault();
            const mechanic = {name, description, bossId};

           try {
            const { data, status } = await api.post('/Mechanics', mechanic, {
            headers: { 'Content-Type': 'application/json' }
            });
            console.log(data);

            if (status === 201) 
            {
                //close this modal somehow
            }
            else
            {

            }
           } catch(error) {
            console.error(error);
           }
        };

    return (
        <div className="flex min-h-[50vh] items-center justify-center">
            <div className="flex w-full flex-col items-center gap-6 px-8">
                <h3>New Mechanic.</h3>
                <form onSubmit={postMechanic}>
                    <label>Name:</label>
                    <input
                        type="text"
                        required
                        value={name}
                        placeholder="mechanic name..."
                        onChange={(e) => setName(e.target.value)}>
                    </input>
                    <label>Description:</label>
                    <input
                        type="text"
                        required
                        value={description}
                        placeholder="mechanic description..."
                        onChange={(e) => setDesc(e.target.value, 10)}>
                    </input>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default MechanicCreate;