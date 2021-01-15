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
        const newsSliderElement = document.getElementsByClassName(
            "home__news-slider"
        )[0];
        const showMoreBtn = document.querySelector(".home__news-more button");
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

const activeEvents = document.querySelectorAll(".events__item");
activeEvents.forEach(event => {
    event.addEventListener("click", () => {
        document
            .getElementsByClassName("events__item--active")[0]
            .classList.remove("events__item--active");
        event.classList.add("events__item--active");

        document
            .getElementsByClassName("events__item-image--active")[0]
            .classList.remove("events__item-image--active");
        document
            .querySelector(
                `.events__item-image[data-number="${event.getAttribute(
                    "data-number"
                )}"]`
            )
            .classList.add("events__item-image--active");
    });
});

// INSTAGRAM
const instagramList = document.getElementsByClassName("instagram__list")[0];

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
                        <img src="${edge.node.thumbnail_src}" width="150">
                    </div>
                `;
            }
        });
    });
