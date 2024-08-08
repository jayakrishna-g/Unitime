const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  externalId: String,
  position: String,
  note: String,
  preferenceTime: String,
  roomDistribution: String,
  course: [String],
  teachingPreference: [Boolean],
  maximalLoad: Number,
  classAssignment: String,
  examAssignment: String,
  ignoreTooFar: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  department: String,
});

module.exports = mongoose.model('Product', productSchema);

// UserSchema.post('find', function (res, next) {
//   this.find({ deleted: { ne: false } })
//     .then(() => next())
//     .error((err) => next(err));
// });

// {
//   "_id": "6685995d162e0904a3f5b058",
//   "name": "Contreras, Norman",
//   "externalId": "ncontre7",
//   "note": "Hello I am Norman",
//   "course": [
//     "ACT 601 - Acturial Science VI"
//   ],
//   "teachingPreference": [],
//   "ignoreTooFar": false,
//   "__v": 0,
//   "preferenceTime": "NA, NA, NA, NA, NA, NA, NA, NA, NA, NA, Strongly Preferred, Strongly Preferred, Strongly Preferred, NA, NA, NA, NA, NA, NA, NA, NA, NA\nNA, NA, NA, NA, NA, NA, NA, NA, NA, NA, Strongly Preferred, Strongly Preferred, Strongly Preferred, NA, NA, NA, NA, NA, NA, NA, NA, NA\nNA, NA, NA, NA, NA, NA, Neutral, Neutral, Neutral, NA, Strongly Preferred, Strongly Preferred, Strongly Preferred, NA, Strongly Discouraged, Strongly Discouraged, Strongly Discouraged, NA, NA, NA, NA, NA\nNA, NA, NA, NA, NA, NA, Neutral, Neutral, Neutral, NA, Strongly Preferred, Strongly Preferred, Strongly Preferred, NA, Strongly Discouraged, Strongly Discouraged, Strongly Discouraged, NA, NA, NA, NA, NA\nNA, NA, NA, NA, NA, NA, NA, NA, NA, NA, Strongly Preferred, Strongly Preferred, Strongly Preferred, NA, NA, NA, NA, NA, NA, NA, NA, NA",
//   "roomDistribution": "At Least 1 Hour Between---On Mondays, At Most 6 Hours A Day---On Saturday",
//   "classAssignment": "ACT 601 - Acturial Science VI---Preferred",
//   "user": "ncontre7@buffalo.edu",
//   "position": "Assistant Prof",
//   "maximalLoad": 0,
//   "examAssignment": "",
//   "department": "Computer Science"
// }
