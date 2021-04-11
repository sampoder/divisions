import MainTemplate from "../template/main";

export default function Home({ divisions }) {
  return <MainTemplate divisions={divisions} data={{}} />;
}

export async function getStaticProps() {
  let divisions = await fetch(
    `https://theyvoteforyou.org.au/api/v1/divisions.json?key=${process.env.key}`
  ).then((r) => r.json());
  return {
    props: { divisions }, // will be passed to the page component as props
  };
}
