import multer from "multer";

const storage = multer.memoryStorage();

// This middleware will handle file uploads for a single file with the field name "file"
const singleUpload = multer({ storage }).single("file");

export default singleUpload;
