'use strict';

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const records = [];
    for (let i = 0; i < 20; i++) {
      records.push({
          title: faker.word.words(
              { count: { min: 1, max: 5 } }
              ),
          category: faker.commerce.department(),
          release_year: faker.date.past({ years: 40}).getFullYear(),
          rate_average: parseFloat(faker.number.float({ min: 1, max: 5 }).toFixed(1)),
          vote_count: faker.number.int({ min: 1, max: 1000 }),
      });
    }
    await queryInterface.bulkInsert('movies', records)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('movies', null, {});
  }
};
