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
  const [isBackingUp, setIsBackingUp] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  let intervalId: NodeJS.Timeout;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsBackingUp(true);
    setProgressMB(0);
    intervalId = setInterval(checkProgress, 1000);
    try {
      await axios.post("/api/backup", formData);
      clearInterval(intervalId);
      await checkProgress(true);
      setIsBackingUp(false);
    } catch (error) {
      alert("Backup failed!");
      clearInterval(intervalId);
      setIsBackingUp(false);
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

  const [progressMB, setProgressMB] = useState(0);
  const checkProgress = async (isCompleted=false) => {
    try {
      const response = await axios.get("/api/backup-progress");
      console.log('response',response);
      const sizeInMB = response.data.size / (1024 * 1024);
      setProgressMB(sizeInMB);
      if (isCompleted) {
        setTimeout(() => alert("Backup Complete!"),1000);
      }
    } catch (error) {
      console.error("Error checking backup progress:", error);
    }
  };

  return (
    <div className="grid sm:grid-cols-[1fr,3fr]">
      <SavedConnections onConnectionSelect={(conn) => setFormData(conn)} />
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-2 p-2">
          <input
            type="text"
            name="host"
            placeholder="Host : e.g, 198.25.22.111"
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
            <option value="SCRAM-SHA-256">SCRAM-SHA-256</option>
            <option value="SCRAM-SHA-1">SCRAM-SHA-1</option>
          </select>
          <div className="flex gap-2 items-center py-2">
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-secondary w-full "
            >
              Save
            </button>
            {/* <button type="submit" className="btn btn-primary w-full">
              Backup
            </button> */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              // disabled={isBackingUp}
            >
              {isBackingUp
                ? `Backing Up... (${progressMB.toFixed(2)}MB)`
                : !isBackingUp && !!!progressMB
                ? "Backup"
                : `Backed up ${progressMB.toFixed(2)} MB`}
            </button>
            {isBackingUp && (
              <p className="text-info">Progress: {progressMB.toFixed(2)}%</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default BackupForm;
