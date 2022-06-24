const pool = require('../utils/pool');

module.exports = class User {
  id;
  firstName;
  lastName;
  email;
  #passwordHash;

  constructor(row) {
    this.id = row.id;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
  }

  static async insert({ firstName, lastName, email, passwordHash }) {
    const { rows } = await pool.query(
      `
        INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *
      `, 
      [firstName, lastName, email, passwordHash]
    );

    return new User(rows[0]);
  }

  static async getByEmail(email) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email=$1
      `,
      // $1 refers to its position in the dependency below, since there is one it is $1, if it was WHERE email=$1, password=$2 then [email, password]
      [email]
    );
    if (!rows[0]) return null;
    
    return new User(rows[0]);
  }

  // you must return the hashed password to be utilized in other functions
  get passwordHash() {
    return this.#passwordHash;
  }

};
