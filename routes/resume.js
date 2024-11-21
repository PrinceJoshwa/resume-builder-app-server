// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const { saveResume, getResumes, getResumeById, updateResume, deleteResume } = require('../controllers/resumeController');

// router.post('/', auth, saveResume);
// router.get('/', auth, getResumes);
// router.get('/:id', auth, getResumeById);
// router.put('/:id', auth, updateResume);
// router.delete('/:id', auth, deleteResume);

// module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { saveResume, getResumes, getResumeById, updateResume, deleteResume } = require('../controllers/resumeController');

router.post('/', auth, saveResume);
router.get('/', auth, getResumes);
router.get('/:id', auth, getResumeById);
router.put('/:id', auth, updateResume);
router.delete('/:id', auth, deleteResume);

module.exports = router;
