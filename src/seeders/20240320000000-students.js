'use strict';

const students = [
  "Adinda",
  "Ajeng Yovela I. L.",
  "Alifia Hartini",
  "Almailla Destria P.",
  "Amad Rido",
  "Anggita Cahyani",
  "Ardi Catur L.",
  "Arif Rahman",
  "Asep Indra L.",
  "Chikal Muhamad D.",
  "Dean Erlangga",
  "Ervan Fitriana",
  "Firlan Kurniawan I.",
  "Herlangga",
  "Herlina",
  "M Firlan Denia B.",
  "Mala Hariyani",
  "Marsel Saputra",
  "Maulana Fajrial",
  "M. Ilham",
  "M. Adi Erwin S.",
  "M. Nazril Saputra",
  "M. Pirli Al Majid",
  "M. Algi Alfari",
  "M. Diandra Agista",
  "M. Zulfikar",
  "Nayla Fadilah",
  "Nur Mugni Zahrina",
  "Pajar Hidayatulloh",
  "Panny Albastian",
  "Rahayu Sri W.",
  "Rangga Dwi P.",
  "Rizki Putra Setiadi",
  "Royan",
  "Rusdan Adalwi",
  "Saepul",
  "Salimah",
  "Septia Rahmawati",
  "Septiani Agustin",
  "Siti Marlina",
  "Siti Nazwa M.",
  "Siti Nur Lisnawati",
  "Siti Nurul Fitria",
  "Siti Rahayu",
  "Siti Salma R.",
  "Siti Sari Nengsih",
  "Syavina Tulbahar",
  "Syeila Alya A.",
  "Widi Maulida"
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const studentRecords = students.map(name => ({
      name,
      class: 'XI Pemasaran',
      waliKelas: 'Aghi Sofia Jati, S.I.Kom',
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Students', studentRecords, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Students', null, {});
  }
}; 