export default async function handler(req, res) {
  let data = await fetch(
    `https://theyvoteforyou.org.au/api/v1/divisions/${req.query.id}.json?key=${process.env.key}`
  ).then((r) => r.json());

  res.send(data);
}
