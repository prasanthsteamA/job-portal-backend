import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Job } from '../models/Job';

export const createJob = async (req: Request, res: Response) => {
  try {
    const jobRepo = AppDataSource.getRepository(Job);
    const newJob = jobRepo.create(req.body);
    await jobRepo.save(newJob);
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error });
  }
};


export const getJobs = async (req: Request, res: Response) => {
  try {
    const { title, location, type, page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    
    let query = AppDataSource.getRepository(Job)
      .createQueryBuilder("job");

    if (title) {
      query = query.andWhere("LOWER(job.title) LIKE LOWER(:title)", {
        title: `%${title}%`,
      });
    }

    if (location) {
      query = query.andWhere("LOWER(job.location) LIKE LOWER(:location)", {
        location: `%${location}%`,
      });
    }

    if (type) {
      query = query.andWhere("LOWER(job.type) = LOWER(:type)", { type });
    }

  
    const jobs = await query
      .skip((pageNumber - 1) * limitNumber)
      .take(limitNumber)
      .getMany();

    const totalCount = await query.getCount();
    res.json({
      jobs,
      totalCount,
      currentPage: Number(page),
      pageSize: Number(limit),
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching jobs", error });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const jobRepo = AppDataSource.getRepository(Job);
    const job = await jobRepo.findOneBy({ id: parseInt(req.params.id) });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving job', error });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const jobRepo = AppDataSource.getRepository(Job);
    let job = await jobRepo.findOneBy({ id: parseInt(req.params.id) });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    jobRepo.merge(job, req.body);
    await jobRepo.save(job);
    res.json({ message: 'Job updated successfully', job });
  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const jobRepo = AppDataSource.getRepository(Job);
    const job = await jobRepo.findOneBy({ id: parseInt(req.params.id) });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    await jobRepo.remove(job);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error });
  }
};
