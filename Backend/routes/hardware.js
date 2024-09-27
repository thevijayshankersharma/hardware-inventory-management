const express = require('express');
const router = express.Router();
const hardwareController = require('../controllers/hardwareController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, hardwareController.getAllHardware);
router.get('/:id', authMiddleware, hardwareController.getHardwareById);
router.post('/', authMiddleware, hardwareController.createHardware);
router.put('/:id', authMiddleware, hardwareController.updateHardware);
router.delete('/:id', authMiddleware, hardwareController.deleteHardware);

module.exports = router;