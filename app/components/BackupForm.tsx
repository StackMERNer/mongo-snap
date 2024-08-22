'use client';

import React, { useState } from 'react';
import axios from 'axios';


const BackupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    host: '',
    port: 27017,
    db: '',
    username: '',
    password: '',
    authDb: 'admin',
    outputFolder: '',
    authMechanism: 'SCRAM-SHA-256'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/backup', formData);
      alert(response.data.message);
    } catch (error) {
      alert('Backup failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        name="host"
        placeholder="Host"
        onChange={handleChange}
        className="input input-bordered input-info w-full max-w-xs"
        required
      />
      <input
        type="number"
        name="port"
        placeholder="Port"
        onChange={handleChange}
        defaultValue={27017}
        className="input input-bordered input-info w-full max-w-xs"
        required
      />
      <input
        type="text"
        name="db"
        placeholder="Database Name"
        onChange={handleChange}
        className="input input-bordered input-info w-full max-w-xs"
        required
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="input input-bordered input-info w-full max-w-xs"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="input input-bordered input-info w-full max-w-xs"
        required
      />
      <input
        type="text"
        name="authDb"
        placeholder="Authentication Database"
        onChange={handleChange}
        defaultValue="admin"
        className="input input-bordered input-info w-full max-w-xs"
      />
      <input
        type="text"
        name="outputFolder"
        placeholder="Output Folder"
        onChange={handleChange}
        className="input input-bordered input-info w-full max-w-xs"
        required
      />
      <select
        name="authMechanism"
        onChange={handleChange}
        defaultValue="SCRAM-SHA-256"
        className="select select-primary w-full max-w-xs"
      >
        <option value="SCRAM-SHA-256">SCRAM-SHA-256</option>
        <option value="SCRAM-SHA-1">SCRAM-SHA-1</option>
      </select>
      
      <button type="submit" className="w-full">Backup</button>
    </form>
  );
};

export default BackupForm;
