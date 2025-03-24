// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express, { response } from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')


// console.log('Let op: Er zijn nog geen routes. Voeg hier dus eerst jouw GET en POST routes toe.')

// Variabelen met api links
const apiEndpoint = "https://fdnd-agency.directus.app/items/avl_"
const apiCategories = "categories"
const apiComments = "comments"
const apiContourings = "contourings"
const apiSpeakers = "speakers"
const apiUsers = "users"

// Doe een fetch naar de data die je nodig hebt
const categoriesResponse = await fetch(`${apiEndpoint}${apiCategories}`)
const commentsResponse = await fetch(`${apiEndpoint}${apiComments}`)
const contouringsResponse = await fetch(`${apiEndpoint}${apiContourings}`)
const speakersResponse = await fetch(`${apiEndpoint}${apiSpeakers}`)
const usersResponse = await fetch(`${apiEndpoint}${apiUsers}`)

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
const categoriesResponseJSON = await categoriesResponse.json()
const commentsResponseJSON = await commentsResponse.json()
const contouringsResponseJSON = await contouringsResponse.json()
const speakersResponseJSON = await speakersResponse.json()
const usersResponseJSON = await usersResponse.json()

// FETCH JSON
async function fetchJson(url) {
  const response = await fetch(url);
  const responseJSON = await response.json();
  return responseJSON
}


// Zie https://expressjs.com/en/5x/api.html#app.get.method over app.get()
// INDEX
app.get('/', async function (request, response) {

  // Zie https://expressjs.com/en/5x/api.html#res.render over response.render()
  response.render('index.liquid')
})

app.get('/404', async function (request, response) {
  response.render('partials/404.liquid')
})

// WEBINARS
app.get('/webinars', async function (request, response) {
  const apiWebinars = "webinars"
  const webinarFields = '?fields=title,thumbnail,date,categories.*.*,speakers.*.*'
  
  const webinarsResponse = await fetch(`${apiEndpoint}${apiWebinars}${webinarFields}`)
  const webinarsResponseJSON = await webinarsResponse.json()

  response.render('webinars.liquid', {    
    categories: categoriesResponseJSON.data, 
    comments: commentsResponseJSON.data, 
    contourings: contouringsResponseJSON.data, 
    speakers: speakersResponseJSON.data, 
    users: usersResponseJSON.data, 
    webinars: webinarsResponseJSON.data })
})



// DETAIL
// app.get('/detail', async function (request, response) {
//   const apiWebinars = "webinars"
//   const webinarFields = '?fields=title,thumbnail,date,categories.*.*,speakers.*.*'
//   const viewField = '?fields=views,id'

//   const webinarsResponse = await fetch(`${apiEndpoint}${apiWebinars}${webinarFields}`)
//   const webinarsResponseJSON = await webinarsResponse.json()

//   const viewsFieldResponse = await fetch(`${apiEndpoint}${apiWebinars}${viewField}&filter={%22id%22:${request.params.id}}`) 
//   // const viewFieldResponse = await fetch(`${viewField}`)
//   const viewsFieldResponseJSON = await viewsFieldResponse.json()
//   console.log(viewsFieldResponseJSON)

//   response.render('detail.liquid', {
//     categories: categoriesResponseJSON.data, 
//     comments: commentsResponseJSON.data, 
//     contourings: contouringsResponseJSON.data, 
//     speakers: speakersResponseJSON.data, 
//     users: usersResponseJSON.data, 
//     webinars: webinarsResponseJSON.data,
//     views: viewsFieldResponseJSON.data })
// })

app.get('/detail/:id', async function (request, response) { 
  const webinarsdetailResponse = await fetch(`https://fdnd-agency.directus.app/items/avl_webinars/?fields=thumbnail,date,video,duration,transcript,title,speakers.*.*,categories.*.*,views,id&filter={"id":"${request.params.id}"}`)
  const webinarsdetailResponseJSON = await webinarsdetailResponse.json()

  const commentsResponse = await fetch(`https://fdnd-agency.directus.app/items/avl_comments/?fields=content,id`);
  const commentsResponseJSON = await commentsResponse.json()

  console.log(commentsResponseJSON)

// console.log(webinarsdetailResponseJSON)

response.render('detail.liquid', { 
  webdetail: webinarsdetailResponseJSON.data[0],
  comments: commentsResponseJSON.data

})

// console.log(webinarsdetailResponseJSON.data)
})



// Zie https://expressjs.com/en/5x/api.html#app.post.method over app.post()
app.post('/detail/:id', async function (request, response) {

  // In request.body zitten alle formuliervelden die een `name` attribuut hebben in je HTML
  console.log(request.body)

  // Via een fetch() naar Directus vullen we nieuwe gegevens in

  // Zie https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch over fetch()
  // Zie https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify over JSON.stringify()
  // Zie https://docs.directus.io/reference/items.html#create-an-item over het toevoegen van gegevens in Directus
  // Zie https://docs.directus.io/reference/items.html#update-an-item over het veranderen van gegevens in Directus
  await fetch(`https://fdnd-agency.directus.app/items/avl_comments`, {
    method: "POST",
    body: JSON.stringify({
      content: request.body.comment
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    
  });

  // Redirect de gebruiker daarna naar een logische volgende stap
  // Zie https://expressjs.com/en/5x/api.html#res.redirect over response.redirect()
  response.redirect(303,`/detail/${request.params.id}`)
})



// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () { })
  // Toon een bericht in de console
  // console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)

