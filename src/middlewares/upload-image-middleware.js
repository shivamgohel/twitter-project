import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/aws-s3-config.js";

const bucketName = process.env.AWS_S3_BUCKET_NAME;

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    acl: "public-read", // files can be accessed publicly via URL
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const uniqueSuffix = Date.now().toString();
      cb(null, `uploads/${uniqueSuffix}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

export default upload;
