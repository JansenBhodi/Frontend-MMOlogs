import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../src/assets/axios'


const PlayerDetail = () => {
  let params = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  const roleclassMap = {
    0: 'Warrior',
    1: 'Knight',
    2: 'Fighter',
    3: 'Archer',
    4: 'Fire Mage',
    5: 'Scholar',
    6: 'Cleric'
  };

  useEffect(() => {
    const fetchPlayer = async () => {
      setLoading(true)

      try {
        const { data } = await api.get(`/Player/${encodeURIComponent(params.name)}`);
        console.log(data);
        setPlayer(data.data);
      } catch (error) {
        console.error('Failed to fetch player:', error);
        setPlayer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [params]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : player ? (
        <div>
          <h2>{player.name}</h2>
          <p>Class: {roleclassMap[player.roleclass]}</p>
        </div>
      ) : (
        <p>Player not found.</p>
      )}
    </div>
  );
};

export default PlayerDetail;