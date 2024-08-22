import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

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

    const command = `mongodump --host ${host} --port ${port} --db ${db} --out ${outputFolder} --username ${username} --password "${password}" --authenticationDatabase ${authDb} --authenticationMechanism ${authMechanism}`;

    // console.log("command", command,outputFolder);

    await execPromise(command);

    return NextResponse.json({ message: "Backup successful!" });
  } catch (error) {
    console.error("Backup failed:", error);
    return NextResponse.json({ message: "Backup failed!" }, { status: 500 });
  }
}
