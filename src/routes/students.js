const express = require('express');
const router = express.Router();
const { Student } = require('../models');
const path = require('path');
const fs = require('fs');
const upload = require('../middleware/upload'); // Import multer upload middleware from new module

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.render('students/index', { students });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Add new student
router.post('/', upload.single('profilePicture'), async (req, res) => {
  try {
    const { name } = req.body;
    const profilePicture = req.file ? req.file.filename : null;
    
    await Student.create({
      name,
      profilePicture
    });
    
    res.redirect('/students');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Update student
router.put('/:id', upload.single('profilePicture'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const profilePicture = req.file ? req.file.filename : undefined;
    
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).send('Student not found');
    }

    // Delete old profile picture if exists and new one is uploaded
    if (profilePicture && student.profilePicture) {
      const oldPicturePath = path.join(__dirname, '../public/uploads', student.profilePicture);
      if (fs.existsSync(oldPicturePath)) {
        fs.unlinkSync(oldPicturePath);
      }
    }

    await student.update({
      name,
      ...(profilePicture && { profilePicture })
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    
    if (!student) {
      return res.status(404).send('Student not found');
    }

    // Delete profile picture if exists
    if (student.profilePicture) {
      const picturePath = path.join(__dirname, '../public/uploads', student.profilePicture);
      if (fs.existsSync(picturePath)) {
        fs.unlinkSync(picturePath);
      }
    }

    await student.destroy();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
