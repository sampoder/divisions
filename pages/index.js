import MainTemplate from "../template/main";

export default function Home({ divisions }) {
  return <MainTemplate divisions={divisions} data={{}} />;
}

export async function getStaticProps() {
  let orderBy = require("lodash").orderBy;
  const isDev = !process.env.AWS_REGION;
  let divisions = await fetch(
    `https://theyvoteforyou.org.au/api/v1/divisions.json?key=${process.env.key}`
  ).then((r) => r.json());

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
  return {
    props: { divisions }, // will be passed to the page component as props
  };
}
