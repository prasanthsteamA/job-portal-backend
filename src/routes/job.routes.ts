import express, { RequestHandler } from 'express';
import { createJob, getJobs, getJobById, updateJob, deleteJob } from '../controllers/job.controller';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management APIs
 */

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               companyName:
 *                 type: string
 *               type:
 *                 type: string
 *               location:
 *                 type: string
 *               salaryRange:
 *                 type: string
 *               postedBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', createJob as RequestHandler);

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Retrieve a list of jobs with search and filtering options
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Search jobs by title
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter jobs by location
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter jobs by job type (e.g., full-time, part-time)
 *     responses:
 *       200:
 *         description: A list of jobs
 *       500:
 *         description: Server error
 */
router.get('/', getJobs as RequestHandler);

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Get job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job details
 *       404:
 *         description: Job not found
 */
router.get('/:id', getJobById as RequestHandler);

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Update job details
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               companyName:
 *                 type: string
 *               type:
 *                 type: string
 *               location:
 *                 type: string
 *               salaryRange:
 *                 type: string
 *               postedBy:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       404:
 *         description: Job not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticateToken as RequestHandler, updateJob as RequestHandler);

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Delete a job
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticateToken as RequestHandler, deleteJob as RequestHandler);

export default router;
