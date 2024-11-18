const Resume = require('../models/Resume');

exports.saveResume = async (req, res) => {
  try {
    const { templateId, data } = req.body;
    const newResume = new Resume({
      user: req.user.id,
      templateId,
      data,
    });
    await newResume.save();
    res.json(newResume);
  } catch (error) {
    console.error('Save resume error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user.id });
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    console.error('Get resume by ID error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateResume = async (req, res) => {
  try {
    const { templateId, data } = req.body;
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { templateId, data, updatedAt: Date.now() },
      { new: true }
    );
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    res.json({ msg: 'Resume deleted' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};