const Student = require('./Student');
const Attendance = require('./Attendance');
const setupAssociations = require('./associations');

setupAssociations();

module.exports = {
  Student,
  Attendance
};
