'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Sci-Fi',
        description:
          'Science fiction is a form of fiction that deals principally with the impact of actual or imagined science upon society or individuals',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Action and adventure',
        description:
          'Action and Adventure is a genre of fiction that usually involves an adventure, risk taking and often action and physical danger',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Anathology',
        description:
          'An anthology is a collection of literary pieces by various different authors. It can sometimes refer to the collected output of a single author',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'History',
        description:
          'A record or account, often chronological in approach, of past events, developments',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Encyclopedia',
        description:
          'The encyclopedia is designed to cover major areas of knowledge uniformly, but it shows particular strength in scientific, technical, and medical subjects.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Journal',
        description:
          'A journal is a physical record or digital document kept as a book, spreadsheet, or data within accounting software.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  },
};
