import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  student: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId;
  dateAwarded: Date;
  downloadUrl: string;
}

const CertificateSchema: Schema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },

  dateAwarded: {
    type: Date,
    default: Date.now,
  },
  //the URL where the certificate can be downloaded.
  downloadUrl: {
    type: String,
    required: true,
  },
});

const Certificate = mongoose.model<ICertificate>('Certificate', CertificateSchema);
export default Certificate;