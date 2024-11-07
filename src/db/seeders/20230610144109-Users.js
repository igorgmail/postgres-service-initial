const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const hash = await bcrypt.hash('111qqq', 10);
    await queryInterface.bulkInsert('Users', [{
      name: 'admin',
      email: 'admin@mail.ru',
      password: hash,
      role: 'admin',
    },
    {
      name: 'owner',
      email: 'owner@mail.ru',
      password: hash,
      role: 'owner',
    },
    {
      name: 'Ivan',
      email: 'ivan@mail.ru',
      password: hash,
      role: 'user',
    },
    {
      name: 'Elena',
      email: 'elena@mail.ru',
      password: hash,
      role: 'user',
    },
    {
      name: 'Tanya',
      email: 'tanya@mail.ru',
      password: hash,
      role: 'user',
    },
    {
      name: 'Igor',
      email: 'Igor@mail.ru',
      password: hash,
      role: 'user',
    },
    {
      name: 'Vika',
      email: 'vika@mail.ru',
      password: hash,
      role: 'user',
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
