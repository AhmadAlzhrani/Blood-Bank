import postgres from 'postgres';

async function createPageHandler(req, res) {

  const rbody = req.body;
  console.log('body:',rbody);

  const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
  
  const response = await sql`
  INSERT INTO table1 (handle)
  VALUES (${rbody.handle});
  `;

  /*const response = await sql`
  DELETE FROM table1
  WHERE handle=${rbody.handle};
  `;*/

  console.log(response);
  sql.end();

  return res.status(200).json(rbody.handle)
}


export default async function handler(req, res) {

  if(req.method === 'POST') {
    return createPageHandler(req, res);
  }
  
  return res.status(405).json({ message:'invalid request' })
}
