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
    width: 2048px;
     height: 1170px;
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
  margin-left: -3.625rem!important;
  }
  
  .zi-avatar.huge {
  width: 8.625rem!important;
  height: 8.625rem!important;
  }`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, theme, md, fontSize, aye, widths, date, title, house, status, percent, nay } = parsedReq;
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
                <div class="zi-card" style="height: 1106px; border: 0px solid var(--accents-2); padding: 0px; border-radius: 0px">
                    <div style="font-size: 105px; height: 964px; border-bottom: 3px solid var(--accents-2); padding: 64px; margin-bottom: 0px">
                        <h5 style="font-size: 65px; color: #999999">${house} | ${date}</h5>
                        <h1 style="font-size: 105px;">${title}</h1>
                <h5 style="font-size: 65px; color: #999999">${status} with ${percent}% of the vote.</h5>
                    </div>
                    <div style="display: flex; height: 206px;">
                        <div style="font-size: 105px; width: 50%; padding: 32px; padding-left: 64px; padding-right: 64px; background: rgba(151, 222, 110, 1)">
                            ${aye.map((img) => `<img class="zi-avatar stacked huge" src="${img}">`).join(' ')}
                        </div>
                        <div style="font-size: 105px; width: 50%; padding: 32px; padding-left: 64px; padding-right: 64px; background: #D33050">
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
