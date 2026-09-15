import mongoose, { Schema, Document } from 'mongoose';
import { TransactionCategory, TransactionStatus, TransactionType } from '../types';

export interface ITransactionDocument extends Document {
  id: string;
  date: string;
  amount: number;
  category: TransactionCategory;
  status: TransactionStatus;
  user_id: string;
  user_profile: string;
  transaction_type: TransactionType;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema: Schema<ITransactionDocument> = new Schema(
  {
    date: {
      type: String,
      required: [true, 'Date is required'],
      index: true
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount must be non-negative'],
      index: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Sales', 'Services', 'Software', 'Marketing', 'Operations', 'Travel', 'Office', 'Other'],
      index: true
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['Paid', 'Pending', 'Failed'],
      default: 'Paid',
      index: true
    },
    user_id: {
      type: String,
      required: [true, 'User ID is required'],
      index: true
    },
    user_profile: {
      type: String,
      required: [true, 'User profile is required'],
      trim: true,
      index: true
    },
    transaction_type: {
      type: String,
      required: [true, 'Transaction type is required'],
      enum: ['Revenue', 'Expense'],
      index: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Compound indexes for high-frequency queries and sorting
TransactionSchema.index({ date: -1, createdAt: -1 });
TransactionSchema.index({ category: 1, transaction_type: 1 });
TransactionSchema.index({ status: 1, date: -1 });
TransactionSchema.index({ description: 'text', user_profile: 'text' });

export const Transaction = mongoose.model<ITransactionDocument>('Transaction', TransactionSchema);
