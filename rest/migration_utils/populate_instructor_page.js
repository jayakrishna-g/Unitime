const details = require('./departmental_instructor.json');
const Instructor = require('../modules/Instructor/instructor.model');

const mongoose = require('mongoose');

for (let i = 0; i < details.length; i++) {
  let instructor = new Instructor({
    name: details[i].lname + ', ' + details[i].fname,
    email: details[i].email,
    phone: details[i].phone,
    externalId: details[i].external_uid,
    ignoreTooFar: details[i].ignore_too_far,
    note: details[i].note,
  });

  instructor.save((err) => {
    if (err) console.log(`ERROR CREATING Instructor ${err}`);
  });
}
