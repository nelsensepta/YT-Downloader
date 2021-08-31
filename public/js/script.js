const host = "http://localhost:5000/";
document.getElementById("btn-info").addEventListener("click", () => {
  let videoURL = document.getElementById("videoURL").value.trim();
  if (videoURL.length === 0) {
    alert("Masukan Link Video Yang Akan Anda Download");
    return;
  }
  fetch(`${host}videoInfo?videoURL=${videoURL}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let detailsNodes = {
        thumbnail: document.querySelector(".video-data .data .thumbnail img"),
        title: document.querySelector(".video-data .data .info h2"),
        videoURL: document.querySelector(".video-data .controls #video-url"),
        downloadOptions: document.querySelector(
          ".video-data .controls #download-options"
        ),
      };
      console.log(detailsNodes);

      let html = "";
      for (let i = 0; i < data.formats.length; i++) {
        if (data.formats[i].container !== "mp4") {
          continue;
        }
        html += `
              <option value="${data.formats[i].itag}">
              ${data.formats[i].container} - ${data.formats[i].qualityLabel}
              </option>
          `;
        detailsNodes.thumbnail.src =
          data.videoDetails.thumbnails[
            data.videoDetails.thumbnails.length - 1
          ].url;
        detailsNodes.title.innerText = data.videoDetails.title;
        detailsNodes.videoURL.value = videoURL;
        detailsNodes.downloadOptions.innerHTML = html;

        document.querySelector(".video-data").style.display = "block";
        document.querySelector(".video-data").scrollIntoView({
          behavior: "smooth",
        });
      }
      // document.getElementById("download-options").removeAttr("disable", true);
    })
    .catch((error) => alert("Link Anda Salah Ngab"));
});

document.querySelector("#download-btn").addEventListener("click", () => {
  let videoURL = document.getElementById("video-url").value;
  let itag = document.getElementById("download-options").value;
  window.open(`${host}download?videoURL=${videoURL}&itag=${itag}`);
});
