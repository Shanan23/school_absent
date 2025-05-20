const Student = require('./Student');
const Attendance = require('./Attendance');
const setupAssociations = require('./associations');

setupAssociations({ Student, Attendance });

module.exports = {
  Student,
  Attendance
};
