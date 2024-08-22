// app/api/saveConnections/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "localDb", "connections.json");

export async function POST(request: Request) {
  try {
    const connectionData = await request.json();
    console.log("connectionData", connectionData);
    // Ensure directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // Read existing connections
    let connections = [];
    try {
      const data = await fs.readFile(filePath, "utf-8");
      connections = JSON.parse(data);
    } catch (error) {
      // File doesn't exist or can't be read, which is fine
      console.log("File doesn't exist or can't be read, which is fine");
    }

    // Add new connection
    connections.push(connectionData);

    // Write updated connections to file
    await fs.writeFile(filePath, JSON.stringify(connections, null, 2));

    return NextResponse.json({ message: "Connection info saved!" });
  } catch (error) {
    console.error("Failed to save connection info:", error);
    return NextResponse.json(
      { message: "Failed to save connection infoaa!" },
      { status: 500 }
    );
  }
}
