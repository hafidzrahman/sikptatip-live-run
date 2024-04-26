import fs from 'node:fs';
import path from 'node:path'


export async function GET() {
    const filePath = path.join(process.cwd(), 'db', 'announcement.json');
    const readedFile = fs.readFileSync(filePath);
    const announcementData = JSON.parse(readedFile);
    return Response.json(announcementData);
}

export async function POST(req) {
    let JSONresult = await req.json();
    const result = JSON.parse(JSONresult);
    const filePath = path.join(process.cwd(), 'db', 'accounts.json');
    const readedFile = fs.readFileSync(filePath);
    const data = JSON.parse(readedFile);
    const index = data.findIndex(d => d.NIP === result.NIP);
    data[index] = {...result};
    try {
    fs.writeFileSync(filePath, JSON.stringify(data));
    return Response.json({message : "Success"}); 
    } catch (e) {
        return Response.json({message : "Failed"})
    }
}