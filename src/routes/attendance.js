const express = require('express');
const router = express.Router();
const { Student, Attendance } = require('../models');
const { Op } = require('sequelize');

// Get attendance for a specific date
router.get('/date/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const attendance = await Attendance.findAll({
      where: { date },
      include: [Student]
    });
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Get monthly attendance report
router.get('/monthly/:year/:month', async (req, res) => {
  try {
    const { year, month } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const attendance = await Attendance.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate]
        }
      },
      include: [Student]
    });

    // Group attendance by student
    const studentAttendance = {};
    attendance.forEach(record => {
      if (!studentAttendance[record.Student.id]) {
        studentAttendance[record.Student.id] = {
          student: record.Student,
          attendance: {
            hadir: 0,
            terlambat: 0,
            sakit: 0,
            izin: 0,
            alfa: 0
          }
        };
      }
      studentAttendance[record.Student.id].attendance[record.status]++;
    });

    res.json(Object.values(studentAttendance));
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Record attendance
router.post('/', async (req, res) => {
  try {
    const { studentId, date, status, notes } = req.body;
    
    const [attendance, created] = await Attendance.findOrCreate({
      where: { studentId, date },
      defaults: { status, notes }
    });

    if (!created) {
      await attendance.update({ status, notes });
    }

    res.json({ success: true, attendance });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Bulk record attendance
router.post('/bulk', async (req, res) => {
  try {
    const { date, records } = req.body;
    
    const attendanceRecords = records.map(record => ({
      studentId: record.studentId,
      date,
      status: record.status,
      notes: record.notes
    }));

    await Attendance.bulkCreate(attendanceRecords, {
      updateOnDuplicate: ['status', 'notes']
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Rekap bulanan dengan tanda tangan digital
router.get('/rekap/:year/:month', async (req, res) => {
  try {
    const { year, month } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const students = await Student.findAll();
    const attendance = await Attendance.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate]
        }
      },
      include: [Student]
    });

    // Rekap per siswa
    const rekap = students.map(student => {
      const records = attendance.filter(a => a.studentId === student.id);
      const count = { hadir: 0, terlambat: 0, sakit: 0, izin: 0, alfa: 0 };
      records.forEach(r => count[r.status]++);
      return {
        student,
        ...count
      };
    });

    res.render('attendance/rekap', {
      rekap,
      year,
      month,
      waliKelas: students[0]?.waliKelas || 'Aghi Sofia Jati, S.I.Kom',
      kelas: students[0]?.class || 'XI Pemasaran'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// New route for attendance recap with date range
router.get('/rekap-range', async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).send('Start and end date are required');
    }
    const startDate = new Date(start);
    const endDate = new Date(end);

    const students = await Student.findAll();
    const attendance = await Attendance.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate]
        }
      },
      include: [Student]
    });

    // Rekap per siswa
    const rekap = students.map(student => {
      const records = attendance.filter(a => a.studentId === student.id);
      const count = { hadir: 0, terlambat: 0, sakit: 0, izin: 0, alfa: 0 };
      records.forEach(r => count[r.status]++);
      return {
        student,
        ...count
      };
    });

    res.render('attendance/rekap', {
      rekap,
      startDate: start,
      endDate: end,
      waliKelas: students[0]?.waliKelas || 'Aghi Sofia Jati, S.I.Kom',
      kelas: students[0]?.class || 'XI Pemasaran'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
