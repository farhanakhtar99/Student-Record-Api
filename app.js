const express = require('express');
const mongoose = require('mongoose');
const Student = require('./student');

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/studentdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


app.post('/students', async (req, res) => {
  try {
    const { name, course, age, city } = req.body;
    
    if (!name || !course) {
      return res.status(400).json({ error: 'Name and course are required.' });
    }
    const student = new Student({ name, course, age, city });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
