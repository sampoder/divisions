import MainTemplate from "../template/main";

export default function Home({ divisions, data }) {
  return <MainTemplate divisions={divisions} data={data} />;
}

export async function getStaticPaths() {
  let divisions = await fetch(
    `https://theyvoteforyou.org.au/api/v1/divisions.json?key=${process.env.key}`
  ).then((r) => r.json());
  let paths = divisions.map((x) => ({
    params: {
      slug: String(x.id)
    }
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let divisions = await fetch(
    `https://theyvoteforyou.org.au/api/v1/divisions.json?key=${process.env.key}`
  ).then((r) => r.json());
  let data = await fetch(
    `https://theyvoteforyou.org.au/api/v1/divisions/${params.slug}.json?key=${process.env.key}`
  ).then((r) => r.json());
  return {
    props: { divisions, data }, // will be passed to the page component as props
  };
}
