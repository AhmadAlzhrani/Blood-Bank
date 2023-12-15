import postgres from 'postgres';

async function searching(req, res) {
    const rbody = JSON.parse(req.body);
    //const rbody = req.body;
    console.log(req.body);

    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
    
    const response = await sql`
    select * FROM person
    WHERE person_ID = ${rbody.id};`

    /*SELECT * FROM donor
    WHERE donor_ID = ${rbody.id};
    `;*/

    sql.end();
    console.log(response[0]);

    return res.status(200).json(response[0])
}


export default async function handler(req, res) {

  if(req.method === 'POST') {
    return searching(req, res);
  }
  
  return res.status(405).json({ message:'invalid request' })
}
