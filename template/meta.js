import Head from "next/head";

const makeTitle = (title, name) =>
  title === name ? title : `${title} – ${name}`;

const Meta = ({
  title = "Divisions of Australia", // page title
  name = "Divisions of Australia", // site name
  description = "Every division in Australia's parliament visualized.", // page description
  image = "api/og_image?house=Da%20House%20of%20Representatives&title=Mutual%20Recognition%20Amendment%20Bill%202021%20-%20Consideration%20in%20Detail%20-%20Don%27t%20add%20exclusion&date=11-04-2020&status=Failed&percent=40&aye=https://upload.wikimedia.org/wikipedia/commons/4/42/Zali_Steggall_official_campaign_image.jpg&aye=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F4%2F42%2FZali_Steggall_official_campaign_image.jpg&nay=https%3A%2F%2Fwww.aph.gov.au%2Fapi%2Fparliamentarian%2F99931%2Fimage", // social card image URL
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
