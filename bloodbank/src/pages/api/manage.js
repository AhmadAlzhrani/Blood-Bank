import postgres from 'postgres';

async function createInfo(req, res) {
    const rbody = JSON.parse(req.body);
    //const rbody = req.body;
    console.log(req.body);

    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
    
    const table = rbody.donor ? 'Donor' : 'Recipient';
    
    const response = await sql`
    INSERT INTO Person (person_ID, first_name, last_name, blood_type, email, b_date, username) VALUES 
    (${rbody.id}, ${rbody.fname}, ${rbody.lname}, ${rbody.blood}, ${rbody.email}, ${rbody.birth}, ${rbody.user});
    INSERT INTO Customer (customer_ID) VALUES (${rbody.id});
    INSERT INTO ${table} (donor_ID, major_disease) VALUES (${rbody.id}, false);
    `;

    sql.end();

    return res.status(200).json(rbody.id)
}

async function updateInfo(req, res) {
    const rbody = JSON.parse(req.body);
    //const rbody = req.body;
    console.log(req.body);
    
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
    
    const response = await sql`
    UPDATE Person SET first_name = ${rbody.fname}, last_name = ${rbody.lname}, blood_type = ${rbody.blood},
    email = ${rbody.email}, b_date = ${rbody.birth}, username = ${rbody.user}
    WHERE person_ID = ${rbody.id};
    `;

    sql.end();

    return res.status(200).json(rbody.id)
}

async function deleteInfo(req, res) {
    const rbody = JSON.parse(req.body);
    //const rbody = req.body;
    console.log(req.body);
    
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
    
    const response = await sql`
    DELETE FROM Person WHERE person_ID = ${rbody.id};
    DELETE FROM Donor WHERE donor_ID = ${rbody.id};
    DELETE FROM Recipient WHERE recipient_ID = ${rbody.id};
    `;

    sql.end();

    return res.status(200).json(rbody.id)
}


export default async function handler(req, res) {

  if(req.method === 'POST') {
    return createInfo(req, res);
  }
  else if (req.method === 'PUT') {
    return updateInfo(req, res);
  }
  else if (req.method === 'DELETE') {
    return deleteInfo(req, res);
  }
  
  return res.status(405).json({ message:'invalid request' })
}
