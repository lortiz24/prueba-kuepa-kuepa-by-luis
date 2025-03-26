import mongoose_delete from "mongoose-delete" 
import mongoose from 'mongoose' 


const { Schema } = mongoose 

export interface IProgram {
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
  deleted?: boolean;
  deletedAt?: Date | null;
}


const ProgramSchema = new Schema({
  name:{
    type: Schema.Types.String,
  },
  description:{
    type: Schema.Types.String,
  }
}, {
  collection: 'programs', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

ProgramSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: 'all',
  indexFields: 'all' 
}) 


export const ProgramModel = mongoose.model<IProgram>('Program', ProgramSchema);