import app from './app';
import { env } from './config/env';
import { sequelize } from './config/database';
import './models/task.model';

async function start() {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected');
    await sequelize.sync(); // creates the table if it doesn't exist
    app.listen(env.port, () => console.log(`Server running on port ${env.port}`));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();