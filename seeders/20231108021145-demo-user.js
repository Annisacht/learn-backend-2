module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'annisa@example.com',
      password: '081234567',
      firstName: 'Annisa',
      lastName: 'Putri',
      email: 'annisa@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'nai@example.com',
      password: '081234567',
      firstName: 'Anais',
      lastName: 'nai',
      email: 'nai@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};