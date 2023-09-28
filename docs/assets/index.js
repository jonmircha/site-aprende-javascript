document.addEventListener("DOMContentLoaded", (e) => {
  ((d) => {
    //Google Analytics
    function ga() {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "UA-177774803-1");
    }

    //Botones AddThis
    function shareSocialMedia() {
      const $s = d.createElement("script");
      $s.src =
        "//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5f61673eecd77f5a";
      d.body.appendChild($s);
    }

    //Botones para compartir
    if (d.getElementById("share-social-media")) {
      shareSocialMedia();
    }

    /* //Disqus Comments
    function disqusComments() {
      const disqus_config = function () {
        this.page.url = `https://aprendejavascript.org/${location.pathname}`;
        this.page.identifier = location.pathname;
      };
      const $s = d.createElement("script");
      $s.src = "https://aprendejavascript.disqus.com/embed.js";
      $s.setAttribute("data-timestamp", +new Date());
      (d.head || d.body).appendChild($s);
    }

    //Comentarios Disqus
    if (d.getElementById("disqus_thread")) {
      disqusComments();
    } */

    //Push Notifications
    function webPushs() {
      const $s = d.createElement("script");
      $s.src =
        "//web.webpushs.com/js/push/becb768265b3a589c682587b24c5fdb1_1.js";
      $s.charSet = "UTF-8";
      $s.async = true;
      d.head.appendChild($s);
    }

    //Progreso en localStorage
    function checkProgress() {
      const $items = d.querySelectorAll(".course-item"),
        ls = localStorage,
        progress = JSON.parse(ls.getItem("progressCourse"));

      if (!ls.progressCourse) {
        let initialProgress = Array($items.length).fill(false);
        localStorage.setItem("progressCourse", JSON.stringify(initialProgress));
      }

      $items.forEach((el, index) => {
        const $div = d.createElement("div"),
          $input = d.createElement("input");

        $div.classList.add("course-check");
        $input.type = "checkbox";
        $input.name = `progress-${index}`;
        $input.dataset.id = index;
        $input.checked = ls.progressCourse ? progress[index] : false;

        $div.appendChild($input);
        el.insertAdjacentElement("afterend", $div);
      });

      d.addEventListener("click", (e) => {
        if (e.target.matches("input[type='checkbox']")) {
          if (e.target.checked) {
            progress[e.target.dataset.id] = true;
          } else {
            progress[e.target.dataset.id] = false;
          }
          ls.setItem("progressCourse", JSON.stringify(progress));
        }
      });
    }

    checkProgress();

    //Entorno local vs producción
    if (location.host === "aprendejavascript.org") {
      ga();
      webPushs();

      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js");
        //.then((reg) => console.log("Service Worker Registrado", reg));
      }
    }
  })(document);
});
