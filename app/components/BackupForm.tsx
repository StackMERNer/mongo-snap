"use client";

import React, { useState } from "react";
import axios from "axios";
import SavedConnections, { Connection } from "./SavedConnections";

const BackupForm: React.FC = () => {
  const [formData, setFormData] = useState<Connection>({
    host: "",
    port: 27017,
    db: "",
    username: "",
    password: "",
    authDb: "admin",
    outputFolder: "",
    authMechanism: "SCRAM-SHA-256",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/backup", formData);
      alert(response.data.message);
    } catch (error) {
      alert("Backup failed!");
    }
  };
  const handleSave = async () => {
    try {
      await axios.post("/api/connections", formData);
      alert("Connection info saved!");
    } catch (error) {
      console.log("error", error);
      alert("Failed to save connection info!");
    }
  };
  console.log('formData',formData);
  return (
    <div className="grid sm:grid-cols-[1fr,3fr]">
      <SavedConnections onConnectionSelect={(conn) => setFormData(conn)} />
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-2 p-2">
          <input
            type="text"
            name="host"
            placeholder="Host"
            value={formData.host}
            onChange={handleChange}
            className="input input-bordered input-info w-full"
            required
          />
          <input
            type="number"
            name="port"
            placeholder="Port"
            value={formData.port}
            onChange={handleChange}
         
            className="input input-bordered input-info w-full"
            required
          />
          <input
            type="text"
            name="db"
            value={formData.db}
            placeholder="Database Name"
            onChange={handleChange}
            className="input input-bordered input-info w-full"
            required
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            onChange={handleChange}
            className="input input-bordered input-info w-full"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            className="input input-bordered input-info w-full"
            required
          />
          <input
            type="text"
            name="authDb"
            value={formData.authDb}
            placeholder="Authentication Database"
            onChange={handleChange}
            
            className="input input-bordered input-info w-full"
          />
          <input
            type="text"
            name="outputFolder"
            value={formData.outputFolder}
            placeholder="Output Folder"
            onChange={handleChange}
            className="input input-bordered input-info w-full"
            required
          />
          <select
            name="authMechanism"
            onChange={handleChange}
            value={formData.authMechanism}
            className="select select-primary w-full"
          >
            <option value="SCRAM-SHA-256" >SCRAM-SHA-256</option>
            <option value="SCRAM-SHA-1">SCRAM-SHA-1</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="btn btn-secondary w-full mt-2"
        >
          Save
        </button>
        <button type="submit" className="btn btn-primary w-full">
          Backup
        </button>
      </form>
    </div>
  );
};

export default BackupForm;
