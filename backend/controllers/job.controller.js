import { Job } from "../models/job.model.js";
import { KYC } from "../models/kyc.model.js";
import { Notification } from "../models/Notification.model.js";
import { User } from "../models/user.model.js";

// ✅ Create a new job (Client/Admin only)
export const createJob = async (req, res) => {
  try {
    const { workersNeeded, hours, budget } = req.body;

    if (!workersNeeded || workersNeeded <= 0) {
      return res.status(400).json({ error: "Workers needed must be at least 1" });
    }
    if (!hours || hours <= 0) {
      return res.status(400).json({ error: "Hours must be greater than 0" });
    }
    if (!budget || budget <= 0) {
      return res.status(400).json({ error: "Budget must be greater than 0" });
    }

    const job = new Job({ ...req.body, createdBy: req.user.id });
    await job.save();
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all jobs (public)
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all jobs created by logged-in user
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id })
      .populate("acceptedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch your jobs",
      error: error.message,
    });
  }
};

// ✅ Accept job (Worker)
// ✅ Accept job (Worker)
export const acceptJob = async (req, res) => {
  try {
    const { jobId, workerId } = req.body;
    const io = req.io;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Agar job already full ho chuka hai
    if (job.acceptedBy.length >= job.workersNeeded) {
      return res.status(400).json({ message: "Job already fullfilled" });
    }

    // Agar worker already accept kar chuka hai
    if (job.acceptedBy.includes(workerId)) {
      return res.status(400).json({ message: "You already accepted this job" });
    }

    const worker = await User.findById(workerId);
    if (!worker) return res.status(404).json({ message: "Worker not found" });

    // Worker ko add karo
    job.acceptedBy.push(worker._id);

    // Status update karo
    if (job.acceptedBy.length === job.workersNeeded) {
      job.status = "Fullfilled";
    } else {
      job.status = "In Progress";
    }

    await job.save();

    // Notification bhejna
    const notification = await Notification.create({
      userId: job.createdBy,
      jobId: job._id,
      workerId: worker._id,
      message: `Worker ${worker.name} (${worker.email}) accepted your job "${job.title}"`,
    });

    // Socket.io emit
    io.to(job.createdBy.toString()).emit("jobAccepted", {
      jobId,
      message: notification.message,
    });

    const updatedJob = await Job.findById(job._id).populate("acceptedBy", "name email");
    res.status(200).json({
      message: "Job accepted successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Close job (Client)
export const closeJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.status = "Closed";
    await job.save();
    res.status(200).json({ message: "Job closed", job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update job (Client/Admin who posted it)
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized to update this job" });

    // Validate updates if workersNeeded/hours/budget are changed
    if (req.body.workersNeeded && req.body.workersNeeded <= 0) {
      return res.status(400).json({ error: "Workers needed must be at least 1" });
    }
    if (req.body.hours && req.body.hours <= 0) {
      return res.status(400).json({ error: "Hours must be greater than 0" });
    }
    if (req.body.budget && req.body.budget <= 0) {
      return res.status(400).json({ error: "Budget must be greater than 0" });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete job (Client/Admin who posted it)
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized to delete this job" });

    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get notifications for client
export const getNotification = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


 // jisme workerCode save ho rha hai

// Add workers to a job using workerCodes
// Add workers to a job using workerCodes
export const addWorkersToJob = async (req, res) => {
  try {
    const { jobId, workerCodes } = req.body;

    if (!jobId || !workerCodes || !Array.isArray(workerCodes)) {
      return res.status(400).json({ message: "Job ID and worker codes are required" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Validate worker codes
    const workers = await KYC.find({ workerCode: { $in: workerCodes } }).populate("userId", "name email");

    if (workers.length !== workerCodes.length) {
      return res.status(400).json({ message: "One or more worker codes are invalid" });
    }

    // Add worker IDs to job.acceptedBy
    const addedWorkers = [];
    for (const worker of workers) {
      if (!job.acceptedBy.includes(worker.userId._id)) {
        job.acceptedBy.push(worker.userId._id);
        addedWorkers.push(worker);
      }
    }

    await job.save();

    // Send notification to client for each added worker
    for (const worker of addedWorkers) {
      const notification = await Notification.create({
        userId: job.createdBy,           // Client
        jobId: job._id,
        workerId: worker.userId._id,
        message: `Worker ${worker.userId.name} (${worker.userId.email}) has been added to your job "${job.title}"`,
      });

      // If using socket.io
      if (req.io) {
        req.io.to(job.createdBy.toString()).emit("workerAdded", {
          jobId: job._id,
          message: notification.message,
        });
      }
    }

    res.json({
      message: `${addedWorkers.length} worker(s) added successfully`,
      addedWorkers,
    });
  } catch (error) {
    console.error("Error in addWorkersToJob:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
