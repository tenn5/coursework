const Course = require('../models/Course')

exports.createCourse = (req, res) => {
  const newCourse = new Course({
    title: req.body.title,
    video: req.body.video,
    description: req.body.description,
    test: req.body.test,
    author: req.body.author
  })
  newCourse.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      id: newCourse._id
    })
  })
}

exports.getCourses = (req, res) => {
  Course.find({}, 'title', function (error, courses) {
    if (error) {
      console.error(error)
    }
    res.send({courses: courses})
  }).sort({_id: -1})
}

exports.getCourse = (req, res) => {
  Course.findById(req.params.id, 'title video description author', function (error, course) {
    if (error) {
      console.error(error)
    }
    res.send({course: course})
  })
}

exports.getTest = (req, res) => {
  Course.findById(req.params.id, 'title test author', function (error, test) {
    if (error) {
      console.error(error)
    }
    res.send({test: test})
  })
}

exports.getCoursesByAuthor = (req, res) => {
  Course.find({author: req.params.author}, 'title', function (error, courses) {
    if (error) {
      console.error(error)
    }
    res.send({courses: courses})
  }).sort({_id: -1})
}