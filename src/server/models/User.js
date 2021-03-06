import mongoose from "mongoose";
import "mongoose-type-email";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "name is required",
  },
  avatarUrl: String,
  email: {
    type: mongoose.SchemaTypes.Email,
  },
  facebookId: Number,
  githubId: Number,

  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);
export default model;
