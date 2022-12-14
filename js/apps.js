const getNavbar = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayNavbar(data.data.news_category))
        .catch(error => {
            throw (error);
        })
}
const displayNavbar = (infos) => {
    infos.forEach(info => {
        const getNavDiv = document.getElementById('navbar');
        const a = document.createElement('a');
        a.classList.add('nav-link');
        a.classList.add('me-4');
        a.classList.add('cursor');
        a.innerText = `${info.category_name}`;
        getNavDiv.appendChild(a);
        a.addEventListener('click', function () {
            getLoader(true);
            fetch(`https://openapi.programming-hero.com/api/news/category/${info.category_id}`)
                .then(res => res.json())
                .then(data => displayCard(data.data))
                .catch(error => {
                    throw (error);
                })
        })
    });
}
const displayCard = (items) => {
    items.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    const countField = document.getElementById('count-field');
    const countItems = document.getElementById('count-items');
    if (items.length > 0) {
        count = items.length
        countItems.innerText = count + ' ' + 'items found in this section'
        countField.classList.remove('d-none');

    }
    else {
        countItems.innerText = 'No item found';
        countField.classList.remove('d-none');
    }
    const getCard = document.getElementById('card-row');
    getCard.innerHTML = ``;
    items.forEach(item => {
        const showCard = document.createElement('div');
        showCard.innerHTML = `<div class="card mb-3 mt-3  d-flex justify-content-center" style="">
        <div class="row p-3">
            <div class="col-md-4">
                <img src=${item.thumbnail_url} class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <div class="">
                        <h5 class="card-title">${item.title}</h5>
                        <p id='para'>${item.details.slice(0, 200)}...</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                    <div class='mt-3 d-flex justify-content-evenly align-items-center'>
                        <div class='d-flex'>
                            <div class='me-2'><img src=${item.author.img} class="img-fluid rounded-start author-img" alt="..."></div>
                            <div>
                                <h5> ${item.author?.name}</h5>
                                <h6> ${item.author?.published_date}</h6>
                            </div>
                        </div>
                        <div class='d-flex'>
                            <div class='me-2'><i class="fa-solid fa-eye"></i></div>
                            <div> <span>${item?.total_view}<span></div>
                        </div>
                        <div>
                            <div>
                                <i class="fa-solid fa-star star-color"></i>
                                <i class="fa-solid fa-star star-color"></i>
                                <i class="fa-solid fa-star star-color"></i>
                                <i class="fa-solid fa-star star-color"></i>
                                <i class="fa-solid fa-star-half star-color"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
        getCard.appendChild(showCard);
        document.getElementById('footer').classList.remove('d-none');
    })
    getLoader(false);
}
const getLoader = value => {
    const loader = document.getElementById('loader');
    if (value) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }

}

getNavbar();