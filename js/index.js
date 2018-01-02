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
const options = {
    mode: 'cors'
}
const url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`

window.addEventListener('load', e => {
    updateNews();
});

async function updateNews() {
    const res = await fetch(url, options)
    const json  = await res.json() 
    
    news.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article){
    return `
    <article>
        <h2>${article.title}<h2>
        <p>${article.author}<p>
        <time>${article.publishedAt}<time>
        <a href="${article.url}">
            <img src=${article.urlToImage} width="200" height="auto"/>
        </a>
        <p></p>
    </article>
    `
}
