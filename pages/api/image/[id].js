import { orderBy } from "lodash";

export default async function handler(req, res) {
  let data = await fetch(
    `https://theyvoteforyou.org.au/api/v1/divisions/${req.query.id}.json?key=${process.env.key}`
  ).then((r) => r.json());

  let people = await fetch(
    `https://theyvoteforyou.org.au/api/v1/people.json?key=${process.env.key}`
  ).then((r) => r.json());

  people = people.map((person) => ({
    id: person.id,
    name:
      person["latest_member"]["name"]["first"] +
      " " +
      person["latest_member"]["name"]["last"],
    location:
      data.summary.search(
        person["latest_member"]["name"]["first"] +
          " " +
          person["latest_member"]["name"]["last"]
      ) != -1
        ? data.summary.search(
            person["latest_member"]["name"]["first"] +
              " " +
              person["latest_member"]["name"]["last"]
          )
        : 1000000000000000,
  }));
  people = orderBy(people, "location", "asc");
  res.redirect(
    people[0].location != 1000000000000000
      ? `https://www.openaustralia.org.au/images/mpsL/${people[0].id}.jpg`
      : "https://cloud-570jjime3-hack-club-bot.vercel.app/0nopicfoundicon.png"
  );
}
