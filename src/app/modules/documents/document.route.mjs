import express from "express";
import verifyToken from "../../middlewares/verifyToken.mjs";
import { DocumentsController } from "./document.controller.mjs";

const router = express.Router();

router.post('/create-document', verifyToken, DocumentsController.createDocument);

router.get("/documents/:ownerId", verifyToken, DocumentsController.getDocumentsById);

router.get("/documents/share/:sharedId", verifyToken, DocumentsController.getDocumentsBySharedId);

router.get("/documents/test/:documentId", verifyToken, DocumentsController.getDocumentsByDocumentId);

router.patch("/documents/:documentId", verifyToken, DocumentsController.updatedDocument);

router.delete("/documents/:documentId", verifyToken, DocumentsController.deletedDocument);

router.post("/documents/:documentId/share",verifyToken, DocumentsController.shareDocument);



// router.put("/documents/:documentId/permissions",DocumentsController.getPermission);

export const DocRoutes = router;


// 01712630002
//00009