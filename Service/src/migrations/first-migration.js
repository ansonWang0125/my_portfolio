/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.insertSQL = ""

exports.up = pgm => {
    pgm.sql(`
    INSERT INTO users (username, email)
    VALUES
      ('Jimmy', 'test@test.com'),
      ('Hello', 'hello@test.com'),
      ('World', 'world@test.com');
  `);
};

exports.down = pgm => {};
