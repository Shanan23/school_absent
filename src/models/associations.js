function setupAssociations({ Student, Attendance }) {
  Attendance.belongsTo(Student, { foreignKey: 'studentId' });
  Student.hasMany(Attendance, { foreignKey: 'studentId' });
}

module.exports = setupAssociations;
