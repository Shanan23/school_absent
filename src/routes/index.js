const express = require('express');
const router = express.Router();
const { Student, Attendance } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const students = await Student.findAll();
    const attendance = await Attendance.findAll({
      where: {
        date: {
          [Op.between]: [firstDayOfMonth, lastDayOfMonth]
        }
      },
      include: [Student]
    });

    // Calculate attendance statistics
    const stats = {
      hadir: 0,
      terlambat: 0,
      sakit: 0,
      izin: 0,
      alfa: 0
    };

    attendance.forEach(record => {
      stats[record.status]++;
    });

    res.render('index', {
      students,
      attendance,
      stats,
      currentMonth: today.toLocaleString('id-ID', { month: 'long', year: 'numeric' })
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 