import MainTemplate from "../template/main";
import Meta from "../template/meta";
import divisionsJSON from "../finals.json";


export default function Home({ divisions, data, parties, home }) {
  
  return (
    <>
      {!home ? (
        <Meta
          title={!home ? data.name : ""}
          image={
            !home
              ? `/api/og_image?house=The%20${
                  data.house == "senate" ? "Senate" : "House of Representatives"
                }&title=${data.name}&date=${new Date(data.date)
                  .toLocaleDateString()
                  .replace("-", "/")
                  .replace("-", "/")
                  .replace("-", "/")}&status=${
                  (data.aye_votes / (data.aye_votes + data.no_votes)) * 100 > 50
                    ? "Succeeded"
                    : "Failed"
                }&percent=${Math.round(
                  (data.aye_votes / (data.aye_votes + data.no_votes)) * 100
                )}${Object.keys(parties)
                  .map((x) => `&${parties[x].vote}=${parties[x].image}`)
                  .join("")}`
              : ""
          }
        />
      ) : (
        <Meta
          image={`/api/og_image?house=The%20${"House%20of%20Representatives"}&title=${"Divisions of Australia: Visualizing Every Parliamentary Division"}&date=${new Date()
            .toLocaleDateString()
            .replace("-", "/")
            .replace("-", "/")
            .replace(
              "-",
              "/"
            )}&status=${"Succeeded"}&percent=${"57"}${Object.keys(parties)
            .map((x) => `&${parties[x].vote}=${parties[x].image}`)
            .join("")}`}
        >
          <title>Divisions of Australia</title>
        </Meta>
      )}
      <MainTemplate divisions={divisions} data={!home ? data : {}} />
    </>
  );
}

export async function getStaticPaths() {
  let divisions = uniq(divisionsJSON, true /* array already sorted */, function(item) {
    return item.id;
  });
  let paths = divisions.map((x) => ({
    params: {
      slug: String(x.id),
    },
  }));
  paths.push({
    params: {
      slug: "home",
    },
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let uniq = require("underscore").uniq;
  var unique = require('unique-array');
  const isDev = !process.env.AWS_REGION;
  let divisions = uniq(divisionsJSON, true /* array already sorted */, function(item) {
    return item.id;
  });
  if (params.slug != "home") {
    let parties = {};
    let data = await fetch(
      `https://theyvoteforyou.org.au/api/v1/divisions/${params.slug}.json?key=${process.env.key}`
    ).then((r) => r.json());
    let images = {
      "Liberal Party":
        "https://pbs.twimg.com/profile_images/1117392084653133825/0phgU_tv.jpg",
      "Country Liberal Party":
        "https://pbs.twimg.com/profile_images/1117392084653133825/0phgU_tv.jpg",
      "National Party":
        "https://pbs.twimg.com/profile_images/1117392084653133825/0phgU_tv.jpg",
      "Centre Alliance":
        "https://pbs.twimg.com/profile_images/994723081724641281/17Qd4u69.jpg",
      "Liberal National Party":
        "https://pbs.twimg.com/profile_images/1117392084653133825/0phgU_tv.jpg",
      Haines: "https://www.aph.gov.au/api/parliamentarian/282335/image",
      Steggall:
        "https://upload.wikimedia.org/wikipedia/commons/4/42/Zali_Steggall_official_campaign_image.jpg",
      Kelly: "https://www.aph.gov.au/api/parliamentarian/99931/image",
      "Australian Labor Party":
        "https://cloud-qu5c4x9eb-hack-club-bot.vercel.app/0labor_pary.png",
      "Australian Greens":
        "https://yt3.ggpht.com/ytc/AAUvwngUW_HLoEfn3ykO9dlwKgRTrM2rOkj3XuDCrhAomA=s900-c-k-c0x00ffffff-no-rj",
      "Katter's Australian Party":
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Bob_Katter.jpg/170px-Bob_Katter.jpg",
      Wilkie: "https://www.aph.gov.au/api/parliamentarian/C2T/image",
      "Jacqui Lambie Network":
        "https://www.aph.gov.au/api/parliamentarian/250026/image",
      Patrick: "https://inbox.news/media/225/conversions/profile_image.jpg",
      "Pauline Hanson's One Nation Party":
        "https://pbs.twimg.com/profile_images/620385771103518721/NgUC1EAH_400x400.png",
    };
    data.votes.map((x) => {
      if (
        x.member.party != "CWM" &&
        x.member.party != "PRES" &&
        x.member.party != "DPRES"
      ) {
        parties[
          x.member.party == "Independent"
            ? x.member.last_name
            : x.member.party
                .replace("National Party", "Liberal National Party")
                .replace(
                  "Liberal Liberal National Party",
                  "Liberal National Party"
                )
                .replace("Country Liberal Party", "Liberal National Party")
                .replace("Liberal Party", "Liberal National Party")
        ] = {
          vote: x.vote.replace("no", "nay"),
          image:
            images[
              x.member.party == "Independent"
                ? x.member.last_name
                : x.member.party
            ],
        };
      }
    });

    return {
      props: { divisions, data, parties }, // will be passed to the page component as props
    };
  } else {
    let parties = {
      Haines: {
        vote: "aye",
        image: "https://www.aph.gov.au/api/parliamentarian/282335/image",
      },
      Kelly: {
        vote: "aye",
        image: "https://www.aph.gov.au/api/parliamentarian/99931/image",
      },
      Steggall: {
        vote: "nay",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/4/42/Zali_Steggall_official_campaign_image.jpg",
      },
      "Centre Alliance": {
        vote: "aye",
        image:
          "https://pbs.twimg.com/profile_images/994723081724641281/17Qd4u69.jpg",
      },
      "Liberal National Party": {
        vote: "aye",
        image:
          "https://pbs.twimg.com/profile_images/1117392084653133825/0phgU_tv.jpg",
      },
      Wilkie: {
        vote: "nay",
        image: "https://www.aph.gov.au/api/parliamentarian/C2T/image",
      },
      "Australian Greens": {
        vote: "nay",
        image:
          "https://yt3.ggpht.com/ytc/AAUvwngUW_HLoEfn3ykO9dlwKgRTrM2rOkj3XuDCrhAomA=s900-c-k-c0x00ffffff-no-rj",
      },
      "Australian Labor Party": {
        vote: "nay",
        image:
          "https://cloud-qu5c4x9eb-hack-club-bot.vercel.app/0labor_pary.png",
      }
    };

    return { props: { divisions, parties, home: true } };
  }
}
