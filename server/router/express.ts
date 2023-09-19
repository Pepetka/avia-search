import { Router } from 'express';
import Controller from '../controllers/controller.ts';

const controller = new Controller();

const router = Router();

router.get('/flights', controller.getFlights);
router.get('/getFilters', controller.getCompaniesFilters);

export default router;
