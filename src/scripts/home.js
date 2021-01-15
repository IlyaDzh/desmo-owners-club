// SLIDERS

const gallerySlider = tns({
    container: "#gallery-slider",
    gutter: 6,
    controls: false,
    swipeAngle: false,
    mouseDrag: true,
    nav: false,
    loop: false,
    speed: 400,
    items: 2.5,
    responsive: {
        768: {
            gutter: 25
        },
        640: {
            gutter: 12
        }
    }
});

let newsSlider;
const newsSliderConfig = {
    container: "#news-slider",
    controls: false,
    swipeAngle: false,
    mouseDrag: true,
    nav: false,
    loop: false,
    speed: 400,
    items: 2.3,
    responsive: {
        768: {
            gutter: 60
        },
        640: {
            gutter: 25
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth > 640) {
        newsSlider = tns(newsSliderConfig);
    } else {
        const newsSliderElement = document.getElementsByClassName("news__slider")[0];
        const showMoreBtn = document.querySelector(".news__more button");
        showMoreBtn.addEventListener("click", () => {
            showMoreBtn.innerHTML =
                showMoreBtn.innerHTML === "Открыть ещё" ? "Скрыть" : "Открыть ещё";
            newsSliderElement.classList.toggle("news-show-all");
        });
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth < 641) {
        if (newsSlider && newsSlider.isOn) {
            newsSlider.destroy();
        }
    } else {
        if (newsSlider) {
            if (!newsSlider.isOn) {
                newsSlider = newsSlider.rebuild();
            }
        } else {
            newsSlider = tns(newsSliderConfig);
        }
    }
});

// EVENTS

const activeEvents = document.querySelectorAll(".event__item");
activeEvents.forEach(event => {
    event.addEventListener("click", () => {
        document
            .getElementsByClassName("event__item--active")[0]
            .classList.remove("event__item--active");
        event.classList.add("event__item--active");

        document
            .getElementsByClassName("event__image--active")[0]
            .classList.remove("event__image--active");
        document
            .querySelector(
                `.event__image[data-number="${event.getAttribute("data-number")}"]`
            )
            .classList.add("event__image--active");
    });
});

// INSTAGRAM
const instagramList = document.getElementsByClassName("instagram__list")[0];
const instagramLoader = document.getElementsByClassName("instagram__loader")[0];

fetch(
    `https://images${~~(
        Math.random() * 33
    )}-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https://www.instagram.com/ducati.spb.ru`
)
    .then(res => res.text())
    .then(data => {
        const regex = /_sharedData = ({.*);<\/script>/m;
        const json = JSON.parse(regex.exec(data)[1]);
        const edges =
            json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media
                .edges;
        edges.forEach((edge, index) => {
            if (index < 3) {
                instagramList.innerHTML += `
                    <div class="instagram__item">
                        <a href="https://instagr.am/p/${edge.node.shortcode}" target="_blank" rel="noopener noreferrer">
                            <img src="${edge.node.thumbnail_src}" alt="${edge.node.accessibility_caption}">
                        </a>
                    </div>
                `;
            }
        });
        instagramLoader.classList.add("instagram__loader--hide");
    });
