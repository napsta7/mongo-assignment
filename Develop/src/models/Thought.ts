import mongoose, { Schema, model, type Document } from "mongoose";

interface IReaction extends Document {
  //Interface to be used by the schema for reactions.
  reactionId: Schema.Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}
interface IThought extends Document {
  //Interface to be used by the schema for thoughts.
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: (typeof reactionSchema)[];
}

const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      //ID generated by MongoDB
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280, //Character limit
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, //Date.now is when it was createdAt
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280, //Character limit
    },
    createdAt: {
      type: Date,
      default: Date.now, //Date.now is when it was createdAt
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], //Array of reactions belonging to the thought
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema.virtual("reactionCount").get(function (this: IThought) {
  //Virtual that retrieves the length of the thought's `reactions` array field on query.
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema); //Creating the new Thought model.

export default Thought;
