import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const localDbPath = path.join(process.cwd(), "localDb", "currentBackup.json");

export async function GET() {
  try {
    // Read the current backup folder path from the file
    const data = await fs.readFile(localDbPath, "utf-8");
    const { dbFolderPath } = JSON.parse(data);
    // Check if the directory exists
    try {
      await fs.access(dbFolderPath);
    } catch (error) {
      // Directory does not exist
      return NextResponse.json({ size: 0 });
    }
    // Calculate the directory size
    const dirSize = await getDirectorySize(dbFolderPath);

    return NextResponse.json({ size: dirSize });
  } catch (error) {
    console.error("Error retrieving directory size:", error);
    return NextResponse.json(
      { message: "Failed to retrieve directory size" },
      { status: 500 }
    );
    // return NextResponse.json({ size: 0 });
  }
}

// Helper function to calculate directory size
async function getDirectorySize(directory: string): Promise<number> {
  let totalSize = 0;

  async function calculateDirSize(dirPath: string) {
    const files = await fs.readdir(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) {
        await calculateDirSize(filePath);
      } else {
        totalSize += stats.size;
      }
    }
  }

  await calculateDirSize(directory);
  return totalSize;
}
