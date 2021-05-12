import mongoose from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";
import uuid from "node-uuid";

mongoose.plugin((schema) => {
  schema.options.usePushEach = true;
});
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  uuid: { type: String, default: uuid.v1, index: true },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  confirm_password: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.plugin(beautifyUnique);
mongoose.model('user', UserSchema);
