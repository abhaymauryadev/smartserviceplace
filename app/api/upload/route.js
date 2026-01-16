import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
    try {
        const data = await req.formData();
        const file = data.get("file");

        if (!file) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const filename = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "public/uploads");
        await mkdir(uploadDir, { recursive: true });

        // Save file
        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        // Return the URL
        const imageUrl = `/uploads/${filename}`;

        return NextResponse.json({ url: imageUrl }, { status: 201 });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ message: "Upload failed" }, { status: 500 });
    }
}
