import postgres from 'postgres';
var SqlString = require('sqlstring');

async function createPageHandler(req, res) {

  const body = req.body;
  console.log('body',body);

  const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
  
  const response = SqlString.format( 
    `INSERT INTO table1 (body)
    VALUES (?)` 
    , [body] );


  console.log(response);
  await sql.query(response);
  
  sql.end();

  return res.status(200).json({ body })
}


export default async function handler(req, res) {

  if(req.method === 'POST') {
    return createPageHandler(req, res);
  }
  
  return res.status(405).json({ message:'invalid request' })
}
