const cheerio = require("cheerio");
const request = require("request");
const url = "http://tim.blog/podcast/";

const fetchEpisodesWithGuest = () => new Promise((res, rej) => {
  request(url, function(error, response, html) {
    var $ = cheerio.load(html);
    const withGuest = filterEpisodesWithGuest($);
    res(withGuest);
  });
});

const getAudioUrlAndBillboardLocation = epUrl => new Promise((res, rej) => {
  request(epUrl, function(error, response, html) {
    if (error) return rej("err on " + epUrl);
    var $ = cheerio.load(html);
    let notesTitle = "";
    $("h3").each((i, v) => {
      const text = $(v).text();
      if (text.includes("Show Notes")) notesTitle = $(v);
    });
    if (!notesTitle || !isFunction(notesTitle.next))
      return rej("no notes title");
    const notes = notesTitle.next("ul");
    let billboardNote = "";
    $(notes).find("li").each((i, v) => {
      const text = $(v).text();
      if (text.includes("billboard")) billboardNote = $(v).text();
    });
    if (!billboardNote) return rej("no bill note");
    const location = billboardNote ? billboardNote.match(/\[(.*?)\]/)[1] : "";

    const url = $("a")
      .filter((i, el) => $(el).text().includes("clicking here"))
      .map((i, el) => $(el).attr("href"))
      .toArray()[0];

    res({ audioUrl: url, billboardLocation: location });
  });
});

const filterEpisodesWithGuest = $ => $(".podcast")
  .filter((i, el) => $(el).attr("class").includes("guest_name"))
  .map((i, el) => ({
    guest: getEpisodeGuest($(el)),
    pageUrl: getEpisodePageUrl($(el))
  }))
  .toArray();

const getEpisodeGuest = $el =>
  capitalizeWords(
    $el.attr("class").split("fhww_guest_name-")[1].replace("-", " ")
  );

const getEpisodePageUrl = $el => $el.find("a").attr("href");

const capitalizeWords = str => str.replace(/\b\w/g, l => l.toUpperCase());

module.exports = { fetchEpisodesWithGuest, getAudioUrlAndBillboardLocation };

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck &&
    getType.toString.call(functionToCheck) === "[object Function]";
}
