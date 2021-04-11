import MainTemplate from "../template/main";
import divisionsJSON from '../finals.json'

export default function Home({ divisions }) {
  return <MainTemplate divisions={divisionsJSON} data={{}} />;
}