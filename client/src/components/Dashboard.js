import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/stats/user-stats', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setStats(response.data.stats);
    } catch (error) {
      setError('Erro ao buscar as estatísticas.');
    }
  };

  return (
    <div>
      <h2>Dashboard de Estatísticas</h2>
      {error && <p>{error}</p>}
      <ul>
        {stats.map((stat) => (
          <li key={stat._id}>
            <strong>{stat._id}:</strong> {stat.count} ocorrências
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
