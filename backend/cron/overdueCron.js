import cron from 'node-cron'
import Task from '../models/Task.js';

// Runs every day at midnight server time
const startOverdueCron = () => {
  cron.schedule('0 0 * * *', async () => {
    try {
      const now = new Date();
      const res = await Task.updateMany(
        {
          status: { $ne: 'completed' },
          dueDate: { $lt: now }
        },
        { $set: { status: 'overdue' } }
      );
      console.log('Overdue cron executed. Modified:', res.modifiedCount);
    } catch (err) {
      console.error('Overdue cron error', err);
    }
  });
};
export default startOverdueCron;
