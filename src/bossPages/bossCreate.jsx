import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BossCreate = () => {
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [maxLife, setHealth] = useState('');
    const [description, setDesc] = useState('');
    const navigate = useNavigate();

    const postBoss = async (e) => {
            e.preventDefault();
            const boss = {name, description, maxLife, level};
            console.log(JSON.stringify(boss));
            const options = {
            method:'POST',
            url: 'https://localhost:7289/Boss',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(boss)
           };

           try {
            const { data, status } = await axios.request(options);
            console.log(data);
            console.log(status);
            if (status === 201) 
            {
                navigate(`/bosses/detail`, { state: { id: data.id }});
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
                <h1>New Boss</h1>
                <form onSubmit={postBoss}>
                    <label>Name:</label> <br/>
                    <input
                        data-cy="name-input"
                        type="text"
                        required
                        value={name}
                        placeholder="boss name..."
                        onChange={(e) => setName(e.target.value)}>
                    </input> <br/>
                    <label>Fight Level:</label> <br/>
                    <input
                        data-cy="level-input"
                        type="text"
                        required
                        value={level}
                        placeholder="Required level for fight..."
                        onChange={(e) => setLevel(e.target.value, 10)}>
                    </input> <br/>
                    <label>Boss Health:</label> <br/>
                    <input
                        data-cy="health-input"
                        type="text"
                        required
                        value={maxLife}
                        placeholder="Boss maximum health..."
                        onChange={(e) => setHealth(e.target.value, 10)}>
                    </input> <br/>
                    <label>Description:</label> <br/>
                    <input
                        data-cy="desc-input"
                        type="text"
                        required
                        value={description}
                        placeholder="mechanic description..."
                        onChange={(e) => setDesc(e.target.value, 10)}>
                    </input> <br/>
                    

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default BossCreate;