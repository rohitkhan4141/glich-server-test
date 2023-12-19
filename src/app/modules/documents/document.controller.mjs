import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError.mjs";
import User from "../user/user.model.mjs";
import { DocumentService } from "./document.service.mjs";

const createDocument = async (req, res) => {
  try {
    const result = await DocumentService.createDocument(req.body);
    res.json({
        status:httpStatus.OK,
        message: "document created successfully",
        result
    });
  } catch (error) {
    res.json({
        status: httpStatus.BAD_REQUEST,
        message: "Document can not be created",
        error
      });
  }
};

const getDocumentsById = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const result = await DocumentService.getDocumentsById(ownerId);
    res.json({
        status:httpStatus.OK,
        message: "document getting successfully",
        result
    });
  } catch (error) {
    res.json({
        status: httpStatus.BAD_REQUEST,
        message: "document not found",
        error
      });
  }
};
const getDocumentsBySharedId = async (req, res) => {
  try {
    const ownerId = req.params.sharedId;
    const result = await DocumentService.getDocumentsBySharedId(ownerId);
    res.json({
        status:httpStatus.OK,
        message: "document getting successfully",
        result
    });
  } catch (error) {
    res.json({
        status: httpStatus.BAD_REQUEST,
        message: "document not found",
        error
      });
  }
};

const getDocumentsByDocumentId = async (req, res) => {
  try {
    const ownerId = req.params.documentId;
    const result = await DocumentService.getDocumentsByDocumentId(ownerId);
    res.json({
        status:httpStatus.OK,
        message: "document getting successfully",
        result
    });
  } catch (error) {
    res.json({
        status: httpStatus.BAD_REQUEST,
        message: "document not found",
        error
      });
  }
};

const updatedDocument = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.params.documentId;
    const payload = {
        title,
        content,
        userId
    }
    const result = await DocumentService.updatedDocument(payload)
    res.json({
        status:httpStatus.OK,
        message: "update document successfully",
        result
    });

  } catch (error) {
    res.json({
        status: httpStatus.BAD_REQUEST,
        message: "Document can not be updated",
        error
      });
  }
};

const deletedDocument = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const result = await DocumentService.deletedDocument(documentId)
    res.json({
        status:httpStatus.OK,
        message: "delete document successfully",
        result
    });
  } catch (error) {
    res.json({
        status: httpStatus.BAD_REQUEST,
        message: "documnet cant delete",
        error
      });
  }
};

const shareDocument = async (req, res) => {
    try {
        const documentId = req.params.documentId;
        
        const { userEmail } = req.body;
        
        const userExists = await User.findOne({ email: userEmail });

        if (!userExists) {
            throw ApiError(httpStatus.BAD_REQUEST, "User Not Found");
        }
    
        const payload = {
          userIds: [userExists.id],
          documentId
        };
    
      const result = await DocumentService.shareDocument(payload)
    res.json({
        status:httpStatus.OK,
        message: "Document shared successfully",
        result
    });
    } catch (error) {
        res.json({
            status: httpStatus.BAD_REQUEST,
            message: "Document shared not happend",
            error
          });
    }
  };
  
export const DocumentsController = {
  createDocument,
  getDocumentsById,
  updatedDocument,
  deletedDocument,
  shareDocument,
  getDocumentsByDocumentId,
  getDocumentsBySharedId
};
