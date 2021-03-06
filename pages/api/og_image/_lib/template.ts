import { readFileSync } from "fs";
import marked from "marked";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

function getCss(theme: string, fontSize: string) {
  let background = "white";
  let foreground = "black";
  let radial = "lightgray";

  if (theme === "dark") {
    background = "black";
    foreground = "white";
    radial = "dimgray";
  }
  return `
  #mainbody{
    width: 1200px;
     height: 630px;
     background: black;
  }
  
  body{
    background: purple!important;
    width: 100vw;
    height: 100vh;
  }
  
  img{
    object-fit: cover;
    border-width: 0px!important;
  }
  
  .zi-avatar.stacked+.zi-avatar.stacked {
  margin-left: -1.812rem!important;
  }
  
  .zi-avatar.huge {
  width: 4.312rem!important;
  height: 4.312rem!important;
  }`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, theme, md, fontSize, aye, widths, date, title, house, status, percent, nay } = parsedReq;
  console.log(title)
  return `<!DOCTYPE html>
    <html class="dark-theme">
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <link href="https://cdn.jsdelivr.net/npm/@geist-ui/style@latest/dist/style.css" rel="stylesheet" type="text/css" />
    </head>
    
    <body>
    <style>
        ${getCss(" ", " ")}
    </style>
        <div id="mainbody">
            <div style="padding: 0px">
                <div class="zi-card" style="height: 525px; border: 0px solid var(--accents-2); padding: 0px; border-radius: 0px">
                    <div style="font-size: 52px; height: 525px; border-bottom: 3px solid var(--accents-2); padding: 32px; margin-bottom: 0px">
                        <h5 style="font-size: 32px; color: #999999">${house} | ${date}</h5>
                        <h1 style="font-size: ${title == "Divisions of Australia: Visualizing Every Parliamentary Division" ? "76" : "53"}px;">${title}</h1>
                <h5 style="font-size: 32px; color: #999999">${status} with ${percent}% of the vote.</h5>
                    </div>
                    <div style="display: flex; height: 105px;">
                        <div style="font-size: 52px; width: 50%; padding: 16px; padding-left: 32px; padding-right: 32px; background: rgba(151, 222, 110, 1)">
                            ${aye.map((img) => `<img class="zi-avatar stacked huge" src="${img}">`).join(' ')}
                        </div>
                        <div style="font-size: 52px; width: 50%; padding: 16px; padding-left: 32px; padding-right: 32px; background: #D33050">
                            ${nay.map((img) => `<img class="zi-avatar stacked huge" src="${img}">`).join(' ')}
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </body>
    
    </html>`;
}

function getImage(src: string, width = "auto", height = "225") {
  return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`;
}

function getPlusSign(i: number) {
  return i === 0 ? "" : '<div class="plus">+</div>';
}
