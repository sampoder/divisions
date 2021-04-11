let orderBy = require("lodash").orderBy;
var fs = require("fs");
require('dotenv').config()
var fetch = require("node-fetch");
const arrayUnion = (...arguments_) => [...new Set(arguments_.flat())];
var unique = require('unique-array');

async function main() {
  let divisions = await fetch(
    `https://theyvoteforyou.org.au/api/v1/divisions.json?key=${process.env.key}`
  ).then((r) => r.json());

  let divisions1 = await fetch(
    `https://theyvoteforyou.org.au/api/v1/divisions.json?key=${process.env.key}&end_date=${divisions[divisions.length - 1].date}`
  ).then((r) => r.json());

  divisions = arrayUnion(divisions, divisions1)

  divisions1 = await fetch(
    `https://theyvoteforyou.org.au/api/v1/divisions.json?key=${process.env.key}&end_date=${divisions[divisions.length - 1].date}`
  ).then((r) => r.json());

  divisions = arrayUnion(divisions, divisions1)

  divisions1 = await fetch(
    `https://theyvoteforyou.org.au/api/v1/divisions.json?key=${process.env.key}&end_date=${divisions[divisions.length - 1].date}`
  ).then((r) => r.json());

  divisions = unique(arrayUnion(divisions, divisions1))

  divisions.map(
    (x, index) =>
      async function () {
        let data = await fetch(
          `https://theyvoteforyou.org.au/api/v1/divisions/${x.id}.json?key=${process.env.key}`
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
        divisions[index].picture =
          people[0].location != 1000000000000000
            ? `https://www.openaustralia.org.au/images/mpsL/${people[0].id}.jpg`
            : "https://cloud-570jjime3-hack-club-bot.vercel.app/0nopicfoundicon.png";
      }
  );
  for (var x in divisions) {
    async function fetchTheImage() {
      let data = await fetch(
        `https://theyvoteforyou.org.au/api/v1/divisions/${divisions[x].id}.json?key=${process.env.key}`
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
      divisions[x].picture =
        people[0].location != 1000000000000000
          ? `https://www.openaustralia.org.au/images/mpsL/${people[0].id}.jpg`
          : "https://cloud-570jjime3-hack-club-bot.vercel.app/0nopicfoundicon.png";
      console.log(divisions[x].picture);
    }
    await fetchTheImage();
  }

  fs.writeFile("finals.json", JSON.stringify(divisions), function (err) {
    if (err) throw err;
    console.log("Replaced!");
  });
}

main();
