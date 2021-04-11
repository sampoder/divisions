import Head from "next/head";

const makeTitle = (title, name) =>
  title === name ? title : `${title} – ${name}`;

const Meta = ({
  title = "Divisions of Australia", // page title
  name = "Divisions of Australia", // site name
  description = "Every division in Australia's parliament visualized.", // page description
  image = "https://aus-divisions.co/api/og_image?house=The%20House%20of%20Representatives&title=Divisions%20of%20Australia:%20Visualizing%20Every%20Parliamentary%20Division&date=12/04/2021&status=Succeeded&percent=57&aye=https://www.aph.gov.au/api/parliamentarian/282335/image&aye=https://www.aph.gov.au/api/parliamentarian/99931/image&nay=https://upload.wikimedia.org/wikipedia/commons/4/42/Zali_Steggall_official_campaign_image.jpg&aye=https://pbs.twimg.com/profile_images/994723081724641281/17Qd4u69.jpg&aye=https://pbs.twimg.com/profile_images/1117392084653133825/0phgU_tv.jpg&nay=https://www.aph.gov.au/api/parliamentarian/C2T/image&nay=https://yt3.ggpht.com/ytc/AAUvwngUW_HLoEfn3ykO9dlwKgRTrM2rOkj3XuDCrhAomA=s900-c-k-c0x00ffffff-no-rj&nay=https://cloud-qu5c4x9eb-hack-club-bot.vercel.app/0labor_pary.png", // social card image URL
  url = "https://divisions.vercel.app",
  children,
}) => (
  <Head>
    <meta key="og_locale" property="og:locale" content="en_US" />
    <meta key="og_type" property="og:type" content="website" />
    <meta key="og_site" property="og:site_name" content={name} />
    <title key="title">{makeTitle(title, name)}</title>
    <meta key="og_title" property="og:title" content={makeTitle(title, name)} />
    <meta
      key="tw_title"
      name="twitter:title"
      content={makeTitle(title, name)}
    />
    {description && (
      <>
        <meta key="desc" name="description" content={description} />
        <meta key="og_desc" property="og:description" content={description} />
        <meta key="tw_desc" name="twitter:description" content={description} />
      </>
    )}
    {image && (
      <>
        <meta key="og_img" property="og:image" content={image} />
        <meta key="tw_card" name="twitter:card" content="summary_large_image" />
        <meta key="tw_img" name="twitter:image" content={image} />
      </>
    )}
    <link
      key="apple_icon"
      rel="apple-touch-icon"
      sizes="180x180"
      href={`${url}/apple-icon.png`}
    />
    <link
      key="favicon_32"
      rel="icon"
      type="image/png"
      sizes="32x32"
      href={`${url}/favicon-32x32.png`}
    />
    <link
      key="favicon_16"
      rel="icon"
      type="image/png"
      sizes="16x16"
      href={`${url}/favicon-16x16.png`}
    />
    <link key="manifest" rel="manifest" href={`${url}/site.webmanifest`} />
    {children}
  </Head>
);

export default Meta;
