import postgres from 'postgres';
async function createCommentHandler(req, res){

    const rbody = req.body;
    console.log('body',rbody);
    var id = 2;

    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    try {
        const response = await sql`
        INSERT INTO comment (id, table1, comment)
        VALUES (${id}, ${rbody.page}, ${rbody.comment});
        `;

        return res.status(200).json({ id })
    } catch (error) {

        console.log(error);
        return res.status(404).json("page not found")
    }
    finally {
        sql.end();
    }

    
}

async function readCommentHandler(req, res){

    const {searchParams} = new URL(req.url, 'http://localhost:3000');
    const page = searchParams.get("page");
    if(!page) return res.status(400).json({ message:'missing page' });
    
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    try {
        const response = await sql`
        SELECT id, comment, created_at 
        FROM comment
        where table1 = ${page}
        ORDER BY created_at desc;
        `;
        console.log(response);
        return res.status(200).json({ response })
    } catch (error) {

        console.log(error);
        return res.status(404).json("page not found")
    }
    finally {
        sql.end();
    }
}

async function handler(req, res){

    if(req.method === 'POST') {
        return createCommentHandler(req, res);
    }
    else if(req.method === 'GET') {
        return readCommentHandler(req, res);
    }
    
    return res.status(405).json({ message:'invalid method' })
    
}

export default handler;