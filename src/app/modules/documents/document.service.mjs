import httpStatus from "http-status";
import mongoose from "mongoose";
import ApiError from "../../../errors/ApiError.mjs";
import Document from "./Document.model.mjs";
import Sharing from "./ShareDocument.model.mjs";
const createDocument = async (payload) => {
  try {
    const { title, content, ownerId } = payload;
    const result = await Document.create({ title, content, ownerId });
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getDocumentsById = async (id) => {
  try {
    const ownerId = new mongoose.Types.ObjectId(id);
    const result = await Document.find({ ownerId: ownerId });
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};
const getDocumentsBySharedId = async (id) => {
  try {
    const sharingDocs = await Sharing.find({
      "sharedWith": { $in: [id] }
    });

    const documentIds = sharingDocs.map(doc => doc.documentId);

    const actualDocuments = await Document.find({
      "_id": { $in: documentIds }
    });

    console.log(actualDocuments);
    return actualDocuments;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getDocumentsByDocumentId = async (id) => {
  try {
    const ownerId = new mongoose.Types.ObjectId(id);
    const result = await Document.find({ _id : ownerId });
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const updatedDocument = async (payload) => {
  try {
    const { title, content, userId } = payload;
    const documentId = userId;
    const result = await Document.findByIdAndUpdate(
      documentId,
      { title, content },
      { new: true }
    );

    if (!updatedDocument) {
      throw new ApiError(httpStatus.BAD_REQUEST, "something went wrong");
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const deletedDocument = async (id) => {
  console.log(id);
  try {
    const documentId = id;
    const result = await Document.findByIdAndDelete(documentId);
    if (!deletedDocument) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Document not found");
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Document not found");
  }
};

const shareDocument = async (payload) => {
  try {
    const { userIds, documentId } = payload;
    const document = await Document.findById(documentId);
    if (!document) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Document not found");
    }
    let sharing = await Sharing.findOne({ documentId: document._id });

    if (!sharing) {
      sharing = new Sharing({
        documentId: document._id,
        sharedWith: userIds,
      });
    } else {
      userIds.forEach((userId) => {
        if (!sharing.sharedWith.includes(userId)) {
          sharing.sharedWith.push(userId);
        }
      });
    }
    const result = await sharing.save();
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const DocumentService = {
  createDocument,
  getDocumentsById,
  updatedDocument,
  deletedDocument,
  shareDocument,
  getDocumentsByDocumentId,
  getDocumentsBySharedId
};
