/*
htmlファイルからは直接SW.jsは読み込まない。
ここではindex.js内で
navigator.serviceWorker.register メソッドで SW.jsをブラウザに登録している
登録がうまくいくと
ServiceWorkerRegistration オブジェクトがPromiseでかえる
*/
// if('serviceWorker' in navigator){
//     const options = {
//         scope: './'
//     };

//     navigator.serviceWorker.register('service-worker.js', options)
//         .then(success => {
//         })
//         .catch(error => {
//         })
// }

const apiKey = '4be9d92a3f404e668a8501ba9be42cba';
const news = document.getElementById('news');
const selectSource = document.getElementById('selectSource');
const defaultSource = 'bbc-news';
const options = {
    mode: 'cors'
}

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    selectSource.value = defaultSource;

    selectSource.addEventListener('change', e => {
        updateNews(e.target.value)
    });

    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('service-worker.js?v=2', {
            scope: './'
        })
        .then(success => {
            console.log('SW has been registered')
        })
        .catch(success => {
            console.log('SW registration failed!')
        })
    }

})

async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, options)
    const json  = await res.json() 

    console.log(json);

    news.innerHTML = json.articles.map(createArticle).join('\n');
}

async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, options)
    const json = await res.json();
    news.innerHTML = json.articles.map(addArcticle).join('\n')
}

function addArcticle(article){
    return `
        <article>
            <h2>${article.title}</h2>
            <div class="info">
                <p>${article.author}</p>
                <time>${article.publishedAt}</time>
            </div>
            <a href=${article.url}>
                <img src=${article.urlToImage} width="360" height="auto"/>
            </a>
        </article>
    `
}

async function updateSources(source = defaultSource){
    const res = await fetch(`https://newsapi.org/v1/sources?apiKey=${apiKey}`, options);
    const json = await res.json();
    selectSource.innerHTML = json.sources.map(createSource).join('\n')
}

function createSource(source) {
    return `
    <option value=${source.id}>${source.name}</option>
    `
}
