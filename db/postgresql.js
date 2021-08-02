// tommy's password ==> lol123
// abiel's password ==> root
// wenqing's password ==> ba13641228671

const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bgc',
  password: 'ba13641228671',
  port: 5432,
})
module.exports = pool;

// const { Pool } = require('pg')
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'root',
//   port: 5432,
// })
// module.exports = pool;