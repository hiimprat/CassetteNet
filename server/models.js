const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongoosePartialTextSearch = require('mongoose-partial-search');
const mongoosePaginate = require('mongoose-paginate-v2');


const userSchema = new Schema({
  username: {
    type: String,
    searchable: true,
  },
  hash: String,
  salt: String,
  email: {type: String, unique: true},
  verified: Boolean,
  token: String, // email verification token
  favoritedMixtapes: Array, // [{ mixtape: mongoose.Types.ObjectId, inRotation: Boolean }]
  followedUsers: Array, // array of other user object ids
  admin: Boolean, // true if user is an admin
  strategy: {
    type: String,
    default: 'local'
  },
  uniqueId: {
    type: Number,
    get: id => id.toString(36).padStart(4, '0').toUpperCase(), // convert to alphanumeric string
    searchable: true,
  },
  profilePicture: { // raw image data for user's profile picture
    type: {
      data: Buffer,
      contentType: String
    },
    select: false
  },
  socketId: String, // client id from socket.io
}, { timestamps: true, toJSON: { getters: true } });


userSchema.plugin(passportLocalMongoose);
userSchema.plugin(AutoIncrement, { inc_field: 'uniqueId' });
userSchema.plugin(mongoosePartialTextSearch);
userSchema.plugin(mongoosePaginate);

const songSchema = new Schema({
  name: {
    type: String,
    searchable: true,
  },
  id: String,
  coverImage: String,
  type: String,
  duration: Number,
  playbackUrl: String,
});

const mixtapeSchema = new Schema({
  name: {
    type: String,
    searchable: true,
  },
  collaborators: Array, // [{ user: mongoose.Types.ObjectId, permissions: { type: String, enum: ['owner', 'viewer', 'editor'] } }]
  songs: [songSchema],
  coverImage: { 
    type: {
      data: Buffer,
      contentType: String, // raw image data for mixtape cover image
    },
    select: false,
  },
  isPublic: Boolean,
});

mixtapeSchema.plugin(mongoosePaginate);
mixtapeSchema.plugin(mongoosePartialTextSearch);
songSchema.plugin(mongoosePartialTextSearch);

const inboxMessageSchema = new Schema({
  mixtape: mongoose.Types.ObjectId, // id of the mixtape this message corresponds to
  senderUsername: {
    type: String,
    default: 'Anonymous'
  },
  senderId: mongoose.Types.ObjectId,
  recipient: mongoose.Types.ObjectId, // object id for recipient user
  message: {
    type: String,
    maxlength: 250,
    minlength: 1,
  },
});

const listeningRoomSchema = new Schema({
  chatMessages: Array,
  invitedUsers: Array,
  currentListeners: Array, // array of user ids (users invited to listening room)
  mixtape: Schema.Types.Mixed, // id of the mixtape this listening room is playing
  owner: mongoose.Types.ObjectId,
  currentSong: Number, // index of currently playing song in mixtape `songs` array
  snakeScores: Array, // [{user: mongoose.Types.ObjectId, score: Number}]
  rhythmScores: Array, // [{user: mongoose.Types.ObjectId, score: Number}]
});

module.exports = {
  InboxMessage: model('InboxMessage', inboxMessageSchema),
  ListeningRoom: model('ListeningRoom', listeningRoomSchema),
  Mixtape: model('Mixtape', mixtapeSchema),
  User: model('User', userSchema),
};
