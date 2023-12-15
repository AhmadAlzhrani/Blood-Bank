import postgres from 'postgres';

async function searching(req, res) {
    const rbody = JSON.parse(req.body);
    //const rbody = req.body;
    console.log(req.body);

    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
    
    const table = rbody.donor ? 'Donor' : 'Recipient';
    
    const response = await sql`
    FROM Person
    WHERE person_ID = ${rbody.id};
    SELECT * FROM Donor
    WHERE donor_ID = ${rbody.id};
    `;

    sql.end();

    return res.status(200).json(rbody.id)
}


export default async function handler(req, res) {

  if(req.method === 'POST') {
    return searching(req, res);
  }
  
  return res.status(405).json({ message:'invalid request' })
}
