fetch("https://x85t8u60nl.execute-api.us-west-2.amazonaws.com/prod/getRandom")
  .then(r => r.json())
  .then(r => {
    document.querySelector("#quote").firstChild.nodeValue = r.billboard;
    if (r.billboard.length >= 180)
      document.querySelector("#quote").classList.add("large");
    document.querySelector("#quote").classList.add("loaded");
    document.querySelector("#author").firstChild.nodeValue = "— " + r.guest;
    document.querySelector("#link").setAttribute("href", r.pageUrl);
  });
// function getEpisode() {
//   var sample = {
//     guest: "Cal Fussman",
//     pageUrl: "http://tim.blog/2016/03/11/the-interview-master-cal-fussman-and-the-power-of-listening/",
//     __v: 0,
//     billboardLocation: "2:48:27",
//     audioUrl: "http://traffic.libsyn.com/timferriss/Tim_Ferriss_Show_-_Cal_Fussman.mp3",
//     billboard: "Life is too complicated to be summed up in a billboard. Don't pay attention to billboards."
//   };
//   return new Promise((res, rej) => {
//     res(sample);
//   });
// }
