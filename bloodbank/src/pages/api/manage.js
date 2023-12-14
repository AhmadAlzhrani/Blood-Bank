import postgres from 'postgres';

async function createInfo(req, res) {
  const rbody = JSON.parse(req.body);
  //const rbody = req.body;
  console.log(req.body);

  const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
  
  /*const response = await sql`
  INSERT INTO Person (person_ID, first_name, last_name, blood_type, email, b_date, address, username) VALUES 
  (${rbody.id}, ${rbody.fname}, 'l', 'BType', 'abcd@efg.com', '2002-02-22', 'citystreet', 'uniqueUsername8');
  `;*/
  const response = await sql`
  INSERT INTO Person (person_ID, first_name, last_name, blood_type, email, b_date, username) VALUES 
  (${rbody.id}, ${rbody.fname}, ${rbody.lname}, ${rbody.blood}, ${rbody.email}, ${rbody.birth}, ${rbody.user});
  `;

  /*const response = await sql`
  DELETE FROM table1
  WHERE handle=${rbody.handle};
  `;*/

  sql.end();

  return res.status(200).json(rbody.id)
}


export default async function handler(req, res) {

  if(req.method === 'POST') {
    return createInfo(req, res);
  }
  else if (req.method === 'GET') {
    return getInfo()
  }
  else if (req.method === 'PUT') {
    return updateInfo(req, res);
  }
  else if (req.method === 'DELETE') {
    return deleteInfo(req, res);
  }
  
  return res.status(405).json({ message:'invalid request' })
}
