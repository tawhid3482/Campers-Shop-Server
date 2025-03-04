import fs from "fs";
import multer from "multer";
import imgbbUploader from "imgbb-uploader";
import config from "../config";

// Function to upload an image to ImageBB
export const sendImageToImageBB = async (
  path: string
): Promise<{ url: string; delete_url?: string }> => {
  try {
    const response = await imgbbUploader({
      apiKey: config.imagebb_api_key || "", // Your ImageBB API Key
      imagePath: path,
    });

    // Delete file asynchronously after upload
    fs.unlink(path, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted after upload.");
      }
    });

    return { url: response.url, delete_url: response.delete_url };
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
