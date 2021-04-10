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
import { useState } from "react";
import { Search } from "@geist-ui/react-icons";

export default function Home({ divisions }) {
  const [votes, setVotes] = useState({});
  async function fetchVotes(id) {
    setVotes(await fetch(`/api/votes/${id}`).then((r) => r.json()));
    console.log(votes);
  }
  return (
    <Page size="large" style={{ width: "100%", padding: "0" }}>
      <Grid.Container gap={0} justify="center" style={{ padding: "0" }}>
        <Grid
          xs={7}
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
        >
          <div style={{ margin: "0 0 0rem 0 " }}>
            <Input
              icon={<Search />}
              placeholder="The Evil Rabbit"
              width="100%"
            />
          </div>
          <div style={{ overflow: "scroll", height: "calc(100% - 36px)" }}>
            {divisions.map(
              ({
                house,
                name,
                aye_votes,
                id,
                no_votes,
                possible_turnout,
                date,
              }) => (
                <Card
                  key={id}
                  style={{ margin: "1rem 0 0 0" }}
                  hoverable
                  onClick={() => fetchVotes(id)}
                >
                  <Text small style={{ color: "#666666" }}>
                    The{" "}
                    {house == "senate" ? "Senate" : "House of Representatives"}{" "}
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
                              : (aye_votes / (aye_votes + no_votes)) * 100 < 50
                              ? "The motion failed with a slight majority."
                              : (aye_votes / (aye_votes + no_votes)) * 100 == 50
                              ? "The motion failed as the vote was a tie."
                              : (aye_votes / (aye_votes + no_votes)) * 100 < 70
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
              )
            )}
            <Card
              hoverable
              style={{ margin: "1rem 0 0 0", borderColor: "#0070F3" }}
            >
              <Text small style={{ color: "#666666" }}>
                The House of Representatives | 25th Mar 2021
              </Text>
              <Text h5 style={{ fontWeight: "700", textAlign: "left" }}>
                Mutual Recognition Amendment Bill 2021 - Consideration in Detail
                - Don't add exclusion
              </Text>
              <div style={{ display: "flex" }}>
                <Avatar
                  style={{ objectFit: "cover" }}
                  src={"https://www.openaustralia.org.au/images/mpsL/10941.jpg"}
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
                      text={"The motion was passed with a slight majority."}
                      style={{ display: "block", width: "100%" }}
                    >
                      <Progress
                        value={67}
                        max={67 + 59}
                        colors={{
                          20: "#000",
                          40: "#000",
                          60: "#B8DE3D",
                          80: "#000",
                        }}
                      />
                    </Tooltip>
                  </div>
                  <Tooltip
                    text={"An attendance of 83% was observed."}
                    style={{ display: "block", width: "100%" }}
                  >
                    <Progress value={83} max={100} type="success" />
                  </Tooltip>
                </div>
              </div>
            </Card>
          </div>
        </Grid>
        {typeof votes.votes == "undefined" ? (
          <Grid
            xs={17}
            style={{
              width: "100%",
              height: "100vh",
              borderRadius: "0px",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
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
            xs={17}
            style={{
              width: "100%",
              height: "100vh",
              borderRadius: "0px",
              border: "none",
              display: "block",
            }}
          >
            <div
              style={{
                height: "50vh",
                borderBottom: "1px solid #333333",
                width: "100%",
                padding: "24px",
              }}
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
                  x.vote == "aye" ? (
                    <span key={x.member.person.id} style={{ marginRight: "8px", marginBottom: "8px" }}>
                      <Avatar
                        style={{ objectFit: "cover" }}
                        src={`https://www.openaustralia.org.au/images/mpsL/${x.member.person.id}.jpg`}
                      />
                    </span>
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
            <div
              style={{
                height: "50vh",
                borderBottom: "1px solid #333333",
                width: "100%",
                padding: "24px",
              }}
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
                  x.vote == "no" ? (
                    <span key={x.member.person.id} style={{ marginRight: "8px", marginBottom: "8px" }}>
                      <Avatar
                        style={{ objectFit: "cover" }}
                        src={`https://www.openaustralia.org.au/images/mpsL/${x.member.person.id}.jpg`}
                      />
                    </span>
                  ) : (
                    ""
                  )
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
      `}</style>
    </Page>
  );
}

export async function getStaticProps() {
  let divisions = await fetch(
    `https://theyvoteforyou.org.au/api/v1/divisions.json?key=${process.env.key}`
  ).then((r) => r.json());
  console.log(divisions);
  return {
    props: { divisions }, // will be passed to the page component as props
  };
}
