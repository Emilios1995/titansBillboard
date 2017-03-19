const scrapper = require("./scrapper.js");
const Episode = require("./models/episode");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://emilio:95Databases@ds119250.mlab.com:19250/titans");
const R = require("ramda");
// scrapper
//   .getEpisodesWithGuest()
//   .then(eps => Promise.all(eps.map(e => Episode.create(e))))
//   .then(_ => console.log("listo!"))
//   .catch(e => console.log(e));
// Episode.find().then(eps => {
//   const all = eps
//     .filter(ep => !(ep.audioUrl && ep.billboardLocation))
//     .reduce(
//       (acc, ep) =>
//         acc.then(_ =>
//           scrapper
//             .getAudioUrlAndBillboardLocation(ep.pageUrl)
//             .then(data => ep.update(data))
//             .then(console.log("got data for " + ep.guest))
//             .catch(e => console.log(ep.pageUrl, e))),
//       Promise.resolve()
//     );
// });
// Episode.find().then(eps => {
//   eps
//     .filter(ep => !(ep.audioUrl && ep.billboardLocation))
//     .forEach(ep => ep.remove().then(_ => console.log("removed ", ep.pageUrl)));
// });
