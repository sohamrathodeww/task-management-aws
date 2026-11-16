'use strict';

const TITLES = [
  'Set up project repository',
  'Design database schema',
  'Build CRUD APIs',
  'Write API documentation',
  'Deploy to AWS',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const inDays = (n) => new Date(now.getTime() + n * 24 * 60 * 60 * 1000);

    await queryInterface.bulkInsert('tasks', [
      {
        title: TITLES[0],
        description: 'Initialize Git and push to GitHub',
        status: 'completed',
        priority: 'high',
        dueDate: inDays(-2),
        createdAt: now,
        updatedAt: now,
      },
      {
        title: TITLES[1],
        description: 'Create tasks table with migrations',
        status: 'completed',
        priority: 'high',
        dueDate: inDays(-1),
        createdAt: now,
        updatedAt: now,
      },
      {
        title: TITLES[2],
        description: 'Create, read, update, delete endpoints',
        status: 'in_progress',
        priority: 'high',
        dueDate: inDays(3),
        createdAt: now,
        updatedAt: now,
      },
      {
        title: TITLES[3],
        description: null,
        status: 'pending',
        priority: 'medium',
        dueDate: inDays(7),
        createdAt: now,
        updatedAt: now,
      },
      {
        title: TITLES[4],
        description: 'EC2 + MySQL + PM2 + Nginx',
        status: 'pending',
        priority: 'low',
        dueDate: null,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', { title: { [Sequelize.Op.in]: TITLES } });
  },
};