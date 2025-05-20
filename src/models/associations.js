const { Student, Attendance } = require('./index');

function setupAssociations() {
  Attendance.belongsTo(Student, { foreignKey: 'studentId' });
  Student.hasMany(Attendance, { foreignKey: 'studentId' });
}

module.exports = setupAssociations;
