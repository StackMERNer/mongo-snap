import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promises as fs } from "fs";
import { promisify } from "util";
import path from "path";

const execPromise = promisify(exec);
const localDbPath = path.join(process.cwd(), "localDb", "currentBackup.json");

export async function POST(request: Request) {
  try {
    const {
      host,
      port,
      db,
      username,
      password,
      authDb,
      outputFolder,
      authMechanism,
    } = await request.json();

    // Concatenate the database name with the output folder
    const dbFolderPath = path.join(outputFolder, db);

    // Save the folder path to a file
    await fs.mkdir(path.dirname(localDbPath), { recursive: true });
    await fs.writeFile(localDbPath, JSON.stringify({ dbFolderPath }, null, 2));

    // Command for backup
    const command = `mongodump --host ${host} --port ${port} --db ${db} --out ${dbFolderPath} --username ${username} --password "${password}" --authenticationDatabase ${authDb} --authenticationMechanism ${authMechanism}`;

    await execPromise(command);

    return NextResponse.json({ message: "Backup successful!" });
  } catch (error) {
    console.error("Backup failed:", error);
    return NextResponse.json({ message: "Backup failed!" }, { status: 500 });
  }
}
