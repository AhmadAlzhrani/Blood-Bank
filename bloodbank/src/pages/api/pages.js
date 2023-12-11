import postgres from 'postgres';

async function createPageHandler(req, res) {

  const rbody = JSON.parse(req.body);

  const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
  
  const response = await sql`
  INSERT INTO table1 (handle)
  VALUES (${rbody.handle});
  `;

  /*const response = await sql`
  DELETE FROM table1
  WHERE handle=${rbody.handle};
  `;*/

  sql.end();

  return res.status(200).json(rbody.handle)
}


export default async function handler(req, res) {

  if(req.method === 'POST') {
    return createPageHandler(req, res);
  }
  else if (req.method === 'GET') {
    return res.status(200).json([
      { id: 1, name: 'Request 1', description: 'Date: 1/11/111' },
      { id: 2, name: 'Request 2', description: 'Date: 22/222/2' },
      { id: 3, name: 'Request 3', description: 'Date: 333/3/33' },
    ]);
  }
  
  return res.status(405).json({ message:'invalid request' })
}
