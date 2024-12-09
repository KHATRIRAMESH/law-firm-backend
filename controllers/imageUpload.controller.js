import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadFile = async (req, res, next) => {
  console.log(`Uploading file`, req.file);
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await uploadOnCloudinary(dataURI);
      
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
};

// export const getFile = async (req, res, next) =>
