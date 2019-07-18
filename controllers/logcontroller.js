const router = require('express').Router();
const sequelize = require('../db');
const Log = sequelize.import('../models/log');
const validateSession = require('../middleware/validate-session');

router.post('/', validateSession, (req, res) => {
  console.log("req.user.id => ", req.user.id)
  Log.create({ where: { userId: req.user.id},
    date: req.body.log.date,
    activity: req.body.log.activity,
    duration: req.body.log.duration,
    notes: req.body.log.notes,
    userId: req.user.id
  })
  .then(
    createSuccess = (log) => {
      res.status(200).json({
        log: log,
        message: 'Workout created'
      })
    },
    createFail = (err) => {
      res.status(500).send(err.message)
    }
  )
})

router.get('/', (req, res) => {
  Log.findAll({ where: {userId: req.user.id}})
  .then(
    findAllSuccess = (logs) => {
      res.status(200).json({
        logs: logs,
        message: "Logs fetched"
      })
    },
    findAllFail = () => {
      res.status(500).json({
        message: "Logs not found"
      })
    }
  )
})

router.get('/:id', (req, res) => {
  Log.findOne({ where: {id: req.params.id, userId: req.user.id}})
  .then(
    findOneSuccess = (log) => {
      res.status(200).json({
        log: log,
        message: "Log fetched"
      })
    },
    findOneFail = (err) => {
      res.status(500).json({
        message: "Log not found"
      })
    }
  )
})

router.put('/:id', validateSession, (req, res) => {
  Log.update( req.body.log , { where: {id: req.params.id, userId: req.user.id} })
  .then(
    updateSuccess = (log) => {
      res.status(200).json({
        log: log,
        message: "Successful update"
      })
    },
    updateFail = (err) => {
      res.status(500).json({
        message: err.mesage
      })
    }
  )
})

router.delete('/:id', validateSession, (req, res) => {
  Log.destroy({ where: { id: req.params.id, userId: req.user.id } })
  .then(
    deleteSuccess = (log) => {
      res.status(200).json({
        log: log,
        message: "All evidence has been destroyed!"
      })
    },
    deleteFail = (err) => {
      res.status(500).json({
        error: err.message
      })
    }
  )
})

module.exports = router;