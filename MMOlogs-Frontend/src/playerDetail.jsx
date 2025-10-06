import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PlayerDetail = () => {
  const { name } = useParams();
  const [player, setPlayer] = useState(null);

  

  return (
    <div>
      <h2>test page</h2>
      
    </div>
  );
};

export default PlayerDetail;