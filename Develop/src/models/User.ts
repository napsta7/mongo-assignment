import { Schema, model, type Document } from "mongoose";

interface IUser extends Document {
  //Interface to be used by the User schema.
  username: string;
  email: string;
  thoughts: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, //Trim spaces
  },
  email: {
    type: String,
    required: true,
    unique: true, //Make sure it's a unique email
    match: [/.+@.+\..+/, "Please fill a valid email address"], //validating the email address
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought", //Thoughts array referencing "Thought"
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", //Friends array referencing "User"
    },
  ],
});

userSchema.virtual("friendCount").get(function (this: IUser) {
  //Virtual that retrieves the length of the user's `friends` array field on query.
  return this.friends.length;
});

const User = model("User", userSchema); //Creating the User model.

export default User;
