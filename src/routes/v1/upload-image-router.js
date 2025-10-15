import express from "express";
import upload from "../../middlewares/upload-image-middleware.js";
import { authenticateJwt } from "../../middlewares/jwt-middleware.js";

const router = express.Router();

/**
 * @route   POST /api/v1/upload/image
 * @desc    Upload an image to S3
 * @access  Protected

 * Upload an image file to AWS S3
 * POST /api/v1/upload/image
 *
 * Headers:
 *  - Authorization: Bearer <token>   // JWT token required
 *
 * Form Data:
 *  - image: file                     // Image file to upload
 *
 * Response:
 *  {
 *    success: boolean,
 *    data: {
 *      location: string              // Public URL of uploaded image
 *    }
 *  }
 */
router.post(
  "/image",
  authenticateJwt,
  upload.single("image"), // expects form-data with key 'image'
  (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // The file location (public URL) is in req.file.location (multer-s3 adds this)
    return res.status(200).json({
      success: true,
      data: {
        url: req.file.location,
        key: req.file.key,
        originalName: req.file.originalname,
      },
    });
  }
);

export default router;
