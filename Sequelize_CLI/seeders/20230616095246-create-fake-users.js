"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          uuid: "895dcdce-3ea5-40b7-8f13-c5d1eea78bec",
          name: "Jean Doe",
          email: "jean@123gmai.com",
          role: "Employee",
          createdAt: "2023-06-16T09:28:30.297Z",
          updatedAt: "2023-06-16T09:28:30.297Z",
        },
        {
          uuid: "8b980440-c051-419c-aad4-d7a72fd7263e",
          name: "Jack",
          email: "jack@123gmai.com",
          role: "Employee",
          createdAt: "2023-06-16T07:33:48.863Z",
          updatedAt: "2023-06-16T09:46:22.516Z",
        },
        {
          uuid: "8b980440-c051-419c-aad4-d7a7ddd7263e",
          name: "John Doe",
          email: "john@123gmai.com",
          role: "Employee",
          createdAt: "2023-06-16T07:33:48.863Z",
          updatedAt: "2023-06-16T09:46:22.516Z",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
