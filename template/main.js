import {
  Page,
  Text,
  Grid,
  Card,
  Avatar,
  Progress,
  Link,
  Spacer,
  Tooltip,
  Input,
  Tag,
} from "@geist-ui/react";
import { useState, useRef, useEffect } from "react";
import { Search } from "@geist-ui/react-icons";
import { useRouter } from "next/router";
import Head from "next/head";
import NextLink from "next/link";

function AvatarForRep({ x }) {
  return (
    <span
      key={x.member.person.id}
      title={
        x.member.first_name +
        " " +
        x.member.last_name +
        " (" +
        x.member.party +
        ")" +
        " from " +
        x.member.electorate
      }
      className={"avatar-wrapper" + " " + JSON.stringify(x.member)}
      style={{ marginRight: "8px", marginBottom: "8px" }}
    >
      <Avatar
        style={{
          objectFit: "cover",
          border:
            x.member.party == "Australian Labor Party" ||
            x.member.party == "DPRES"
              ? "2.5px solid #E13940"
              : x.member.party == "Australian Greens"
              ? "2.5px solid #009C3D"
              : x.member.party == "Katter's Australian Party"
              ? "2.5px solid #b50204"
              : x.member.party == "Independent" ||
                x.member.party == "Jacqui Lambie Network"
              ? "2.5px solid #7928CA"
              : x.member.party == "Centre Alliance"
              ? "2.5px solid #FF5800"
              : x.member.party == "Liberal Party" || x.member.party == "PRES"
              ? "2.5px solid #1C4F9C"
              : x.member.party == "National Party" ||
                x.member.party == "Country Liberal Party"
              ? "2.5px solid #1C4F9C"
              : x.member.party == "Liberal National Party"
              ? "2.5px solid #1C4F9C"
              : x.member.party == "CWM"
              ? "2.5px solid #1C4F9C"
              : x.member.party == "Pauline Hanson's One Nation Party"
              ? "2.5px solid #f36c21"
              : "",
        }}
        src={
          x.member.person.id != "10963"
            ? `https://www.openaustralia.org.au/images/mpsL/${x.member.person.id}.jpg`
            : "https://www.outinperth.com/wp-content/uploads/2020/11/Garth-Hamilton.jpg"
        }
      />
    </span>
  );
}

export default function Home({ divisions, data }) {
  const router = useRouter();
  useEffect(() => {
    window.addEventListener("keydown", function (e) {
      if (
        e.keyCode === 114 ||
        (e.ctrlKey && e.keyCode === 70) ||
        (e.metaKey && e.keyCode === 70)
      ) {
        e.preventDefault();
        if (document.activeElement === inputEl.current) {
          inputEl.current.blur();
        } else {
          inputEl.current.focus();
        }
      }
    });
  });
  const [votes, setVotes] = useState(data);
  useEffect(() => {
    setVotes(data);
  }, [data]);
  const [loading, setLoading] = useState(null);
  const [loadingFirst, setLoadingFirst] = useState(false);
  const [search, setSearch] = useState("");
  const inputEl = useRef(null);
  const nonInputEl = useRef(null);
  async function fetchVotes(id) {
    setLoading(id);
    router.push(`/${id}`);
    setLoading(null);
  }
  return (
    <Page size="large" style={{ width: "100%", padding: "0" }}>
      <Head>
        <title>
          {data == {} ? "Divisions of the Australian Parliament" : data.name}
        </title>
      </Head>
      <Grid.Container
        gap={0}
        justify="center"
        style={{ padding: "0" }}
        className="thegridwrapper"
      >
        <Grid
          md={7}
          xs={24}
          style={{
            width: "100%",
            height: "100vh",
            borderRadius: "0px",
            border: "none",
            background: "#111111",
            padding: "24px",
            paddingBottom: "0px",
            display: "block",
          }}
          className="searchbar"
        >
          <div style={{ margin: "0 0 1rem 0 " }}>
            <Input
              ref={inputEl}
              icon={<Search />}
              value={search}
              onInput={(e) => setSearch(e.target.value)}
              placeholder="Search Divisions"
              width="100%"
            />
          </div>
          <div
            style={{ overflow: "scroll", height: "calc(100% - 36px - 1rem)" }}
            className="divisions-bar"
          >
            {divisions.map(
              (
                {
                  house,
                  name,
                  aye_votes,
                  id,
                  no_votes,
                  possible_turnout,
                  date,
                },
                index
              ) => (
                <NextLink href="/[slug]" as={`/${id}`}>
                  <Card
                    key={id}
                    style={{
                      margin: "0rem 0 1rem 0",
                      borderColor: votes.id == id ? "#0070F3" : "",
                      cursor: loading == id ? "wait" : "pointer",
                      display:
                        search == "" ||
                        name.toUpperCase().includes(search.toUpperCase())
                          ? "inherit"
                          : "none",
                    }}
                    hoverable
                    onClick={() =>
                      votes.id == id ? setVotes({}) : fetchVotes(id)
                    }
                  >
                    <Text
                      small
                      style={{ color: "#666666", marginBottom: "8px" }}
                    >
                      The{" "}
                      {house == "senate"
                        ? "Senate"
                        : "House of Representatives"}{" "}
                      | {new Date(date).toLocaleDateString()}
                    </Text>
                    <Text h5 style={{ fontWeight: "700", textAlign: "left" }}>
                      {name}
                    </Text>
                    <div style={{ display: "flex" }}>
                      <Avatar
                        style={{ objectFit: "cover" }}
                        src={`/api/image/${id}`}
                      />
                      <div
                        style={{
                          display: "block",
                          width: "calc(100% - 1.875rem)",
                          paddingLeft: "8px",
                        }}
                      >
                        <div style={{ marginBottom: "8px" }}>
                          {" "}
                          <Tooltip
                            text={
                              (aye_votes / (aye_votes + no_votes)) * 100 < 30
                                ? "The motion failed with a strong majority."
                                : (aye_votes / (aye_votes + no_votes)) * 100 <
                                  50
                                ? "The motion failed with a slight majority."
                                : (aye_votes / (aye_votes + no_votes)) * 100 ==
                                  50
                                ? "The motion failed as the vote was a tie."
                                : (aye_votes / (aye_votes + no_votes)) * 100 <
                                  70
                                ? "The motion passed with a slight majority."
                                : "The motion passed with a strong majority."
                            }
                            style={{ display: "block", width: "100%" }}
                          >
                            <Progress
                              value={(aye_votes / (aye_votes + no_votes)) * 100}
                              max={100}
                              colors={{
                                30: "#EE0000",
                                50: "#F5A623",
                                70: "#B8DE3D",
                                100: "#17DE51",
                              }}
                            />
                          </Tooltip>
                        </div>
                        <Tooltip
                          text={`An attendance of ${Math.round(
                            ((aye_votes + no_votes) / possible_turnout) * 100
                          )}% was observed.`}
                          style={{ display: "block", width: "100%" }}
                        >
                          <Progress
                            value={aye_votes + no_votes}
                            max={possible_turnout}
                            type="success"
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </Card>
                </NextLink>
              )
            )}{" "}
          </div>
        </Grid>
        {typeof votes.votes == "undefined" ? (
          <Grid
            md={17}
            xs={24}
            style={{
              width: "100%",
              height: "100vh",
              borderRadius: "0px",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="avatarwrapperwrapper"
          >
            <Text
              style={{ textAlign: "center", color: "rgb(102, 102, 102)" }}
              small
            >
              <Text h3 style={{ margin: "0 0 0.225rem 0" }}>
                Select a Division to View the Votes
              </Text>
              <Text small style={{ display: "block" }}>
                By{" "}
                <Link href="https://github.com/sampoder" color>
                  @sampoder
                </Link>
                , open sourced{" "}
                <Link href="https://github.com/sampoder/divisions" color>
                  here
                </Link>
                .
              </Text>
            </Text>
          </Grid>
        ) : (
          <Grid
            md={17}
            xs={24}
            style={{
              width: "100%",
              height: "100vh",
              borderRadius: "0px",
              border: "none",
              display: "block",
            }}
            className="avatarwrapperwrapper"
          >
            <div
              style={{
                height: "50vh",
                overflow: "scroll",
                borderBottom: "1px solid #333333",
                width: "100%",
                padding: "24px",
              }}
              className="avatarwrapper"
            >
              <Tag
                type={votes.aye_votes > votes.no_votes ? "success" : "lite"}
                style={{
                  color: votes.aye_votes > votes.no_votes ? "white" : "",
                }}
                invert={votes.aye_votes > votes.no_votes ? true : false}
              >
                AYE
              </Tag>
              <Spacer x={0.2} style={{ display: "inline-block" }} />
              <Tag>{votes.aye_votes}</Tag>
              <Spacer y={0.6} />
              <div style={{ lineHeight: "2.5" }}>
                {votes.votes.map((x) =>
                  x.vote == "aye" ? <AvatarForRep x={x} key={x.member.person.id} /> : ""
                )}
              </div>
            </div>
            <div
              style={{
                height: "50vh",
                overflow: "scroll",
                borderBottom: "1px solid #333333",
                width: "100%",
                padding: "24px",
              }}
              className="avatarwrapper"
            >
              <Tag
                type={votes.aye_votes < votes.no_votes ? "success" : "lite"}
                style={{
                  color: votes.aye_votes < votes.no_votes ? "white" : "",
                }}
                invert={votes.aye_votes < votes.no_votes ? true : false}
              >
                NAY
              </Tag>
              <Spacer x={0.2} style={{ display: "inline-block" }} />
              <Tag>{votes.no_votes}</Tag>
              <Spacer y={0.6} />
              <div style={{ lineHeight: "2.5" }}>
                {votes.votes.map((x) =>
                  x.vote == "no" ? <AvatarForRep x={x} /> : ""
                )}
              </div>
            </div>
          </Grid>
        )}
      </Grid.Container>
      <style>{`
        main {
          padding: 0px !important;
        }

        .avatar-wrapper .avatar{
          border: none!important
        }
        
        @media only screen and (max-width: 650px){
          .searchbar{
            height: 40vh!important;
          }
          .avatarwrapperwrapper {
            height: 60vh!important
          }
          .avatarwrapper{
            height: 30vh!important;
          }
          .thegridwrapper {
            flex-direction: column-reverse;
          }
        }
      `}</style>
    </Page>
  );
}
