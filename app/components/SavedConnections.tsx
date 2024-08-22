"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
export interface Connection {
  id?: string;
  name?: string;
  host: string;
  port: number;
  db: string;
  username: string;
  password: string;
  authDb: string;
  outputFolder: string;
  authMechanism: string;
}
const SavedConnections = ({
  onConnectionSelect,
}: {
  onConnectionSelect: (connection: Connection) => void;
}) => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get("/api/connections");
        setConnections(response.data);
      } catch (error) {
        console.error("Failed to fetch connections:", error);
      }
    };
    fetchConnections();
  }, []);

  const handleRename = async (id: string) => {
    try {
      await axios.post("/api/renameConnection", { id, newName });
      setConnections((prev) =>
        prev.map((conn) => (conn.id === id ? { ...conn, db: newName } : conn))
      );
      setNewName("");
      setEditId(null);
    } catch (error) {
      alert("Failed to rename connection!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.post("/api/deleteConnection", { id });
      setConnections((prev) => prev.filter((conn) => conn.id !== id));
    } catch (error) {
      alert("Failed to delete connection!");
    }
  };

  return (
    <div className="p-1">
      <h2 className="text-xl mb-4">Saved Connections</h2>
      <div className="flex flex-col gap-2 pl-5">
        {connections.map((conn) => (
          <div key={conn.id} className="card bg-base-100 border">
            <div className="card-body  p-2">
              {editId === conn.id ? (
                <>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="input input-bordered w-full max-w-xs mr-2"
                    placeholder="New Database Name"
                  />
                  <button
                    onClick={() => handleRename(conn.id!)}
                    className="btn btn-primary mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <div className="flex justify-between items-center">
                  <div className="flex-grow cursor-pointer">
                    <h2
                      onDoubleClick={() => {
                        setEditId(conn.id!);
                        setNewName(conn.db);
                      }}
                      className="text-xl font-bold"
                    >
                      {" "}
                      {conn.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => handleDelete(conn.id!)}
                    className="btn btn-danger"
                  >
                    X
                  </button>
                  <button className="btn btn-primary ml-2" onClick={() => onConnectionSelect(conn)}>use</button>
                </div>
              )}
              <div>
                <div>
                  host : <span>{conn.host}</span>
                </div>
                <div>
                  port : <span>{conn.port}</span>
                </div>
                <div>
                  db : <span>{conn.db}</span>
                </div>
                <div>
                  outputFolder : <span>{conn.outputFolder}</span>
                </div>
                <div>
                  authMechanism : <span>{conn.authMechanism}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedConnections;
