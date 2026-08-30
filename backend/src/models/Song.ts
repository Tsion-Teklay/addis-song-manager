import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ISong extends Document {
  title: string;
  artist: string;
  album: string;
  genre: string;
  year?: number;
  createdAt: Date;
  updatedAt: Date;
}

const songSchema = new Schema<ISong>(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    artist: { type: String, required: [true, 'Artist is required'], trim: true },
    album: { type: String, required: [true, 'Album is required'], trim: true },
    genre: { type: String, required: [true, 'Genre is required'], trim: true },
    year: { type: Number, min: 1900, max: 2100 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

songSchema.index({ title: 'text', artist: 'text', album: 'text' });
songSchema.index({ genre: 1 });

export const Song: Model<ISong> = mongoose.model<ISong>('Song', songSchema);