const db = require("../db/models");

class DbUserServices {

  async findOneFromEmail(email) {
    try {
      const user = await db.User.findOne({ where: { email }, raw: true });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    const allUsers = await db.User.findAll({
      raw: true,
      attributes: ["id", "name", "role"],
    });
    return allUsers;
  }

  async getById(id) {
    const oneOwner = await db.User.findOne({
      where: { id },
      attributes: ["id", "name", "age", "email", "role"],
      include: {
        model: db.Pet,
        throw: db.PetOwner,
        include: {
          model: db.PetType,
        },
      },
    });
    return oneOwner;
  }

  async addNewUser(data) {
    
  }

}

module.exports = new DbUserServices();
