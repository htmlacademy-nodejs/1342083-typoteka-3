'use strict';

class UserService {
  constructor(sequelize) {
    this._User = sequelize.models.User;
  }

  async create(userData) {
    const user = this._User.create(userData);
    return user.get();
  }

  async findByEmail(email) {
    const user = this._User.findOne({
      where: {email},
    });
    return user ? user.get() : null;
  }
}

module.exports = UserService;
