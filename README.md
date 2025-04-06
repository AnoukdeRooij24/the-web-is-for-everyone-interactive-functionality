# Oncollaboration
<!-- Ontwerp en maak voor een opdrachtgever een interactieve toepassing die voor iedereen toegankelijk is
De instructie vind je in: [INSTRUCTIONS.md](https://github.com/fdnd-task/the-web-is-for-everyone-interactive-functionality/blob/main/docs/INSTRUCTIONS.md) -->

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual of video toe 📸 -->
<!-- Voeg een link toe naar GitHub Pages 🌐-->
![poster-readme](https://github.com/user-attachments/assets/a20323f6-0fd7-4d11-946c-1902ee96cc62)
Het platform waar artsen uit Indonesië webinars kunnen kijken en informatie uitwisselen met artsen uit Nederland. <br>
Hier is mijn ontwerp van [Oncollaboration](https://the-web-is-for-everyone-interactive-f5t9.onrender.com/).

### Over Oncollaboration
Oncollaboration is een online platform waar informatie tussen Indoneschische en Nederlandse radiotherapeuten kan worden uitgewisseld. De site is opgezet door oud-CMD student Sergio Eijben als zijn afstudeerproject. De vraag van de opdrachtgever is hierom, ontwikkel een pagina waarop de webinars bekeken kunnen worden en vragen kunnen worden gesteld.

### Mijn werk
Ik ben deze sprint aan de slag gegaan met het ontwerpen en uitwerken van een home pagina en het verder ontwikkelen van de webinar detail pagina. Ik heb een comment sectie toegevoegd, waar je feedback of vragen over de betreffende webinar achter kan laten. Hierbij rekening gehouden met de UI states (zoals een loading state, die aantoont dat de website bezig is met een actie).

### Huisstijl
Daarnaast ben ik gaan experimenteren met de kleuren van de huisstijl. Ik heb ervoor gekozen om voor de kleur groen te gaan, aangezien deze kleur niet voorkomt uit een van de twee bestaande websites. <br>
Hieronder zie je de opties die ik heb gemaakt: <br>
<img src="https://github.com/user-attachments/assets/78ba4985-804b-4828-9836-c391c82c0cfd" width="500">
<img src="https://github.com/user-attachments/assets/6311cfd7-f4c1-4051-9d09-252de35ec945" width="500">
<img src="https://github.com/user-attachments/assets/6d0294ca-de85-4a32-b9c8-e2f49e86e387" width="500">


## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->
Op de detail pagina van een webinar vind de opdrachtgever het belangrijk dat je een comment kan achterlaten. Daarom is de user story die ik heb aangehouden "Als arts wil ik vragen kunnen stellen over een Webinar zodat een gespecialiseerde arts daarop antwoord kan geven." 



## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framework of library gebruikt? -->

### Chatten / reactie achterlaten
Zoals je hieronder ziet kan je een reactie achterlaten bij een webinar. 
![image](https://github.com/user-attachments/assets/63f633d6-36bb-4db1-a49d-ed8d6331a8b2) <br>
<br>
Als je op de submit button klikt, dan wordt deze even licht groen om aan te tonen dat hij bezig is (de loading state). Zodra het berichtje verstuurd is wordt de knop weer donkergroen en kan je opnieuw een reactie achterlaten.
Dit heb ik gedaan doormiddel van een Post in de sever: <br>
https://github.com/AnoukdeRooij24/the-web-is-for-everyone-interactive-functionality/blob/8994871612f6386ae314e46963c4c1d37d9d356c/server.js#L118-L141 <br>
Hierna laat ik de comments zien op de webpagina met de volgende code: <br>
https://github.com/AnoukdeRooij24/the-web-is-for-everyone-interactive-functionality/blob/8994871612f6386ae314e46963c4c1d37d9d356c/views/detail.liquid#L30-L36 <br>
En als laatste de form waarmee de comments achter gelaten kunnen worden, hierop zit een if els state. Dat betekend dat als de if state (loading state) bezig is, de button er anders uit komt te zien. <br>
https://github.com/AnoukdeRooij24/the-web-is-for-everyone-interactive-functionality/blob/8994871612f6386ae314e46963c4c1d37d9d356c/views/detail.liquid#L38-L55 <br>
Dit heb ik gedaan door de normale button te stylen met algemenen CSS: <br>
https://github.com/AnoukdeRooij24/the-web-is-for-everyone-interactive-functionality/blob/8994871612f6386ae314e46963c4c1d37d9d356c/public/style.css#L383-L397 <br>
En de loading state een eigen styling mee te geven. <br>
https://github.com/AnoukdeRooij24/the-web-is-for-everyone-interactive-functionality/blob/8994871612f6386ae314e46963c4c1d37d9d356c/public/style.css#L383-L397

## Installatie
<!-- Bij Installatie staat hoe een andere developer aan jouw repo kan werken -->
Dit project is gemaakt in NodeJS. Daarom is het belangrijk dat dit eerst geinstaleerd is, daarna kunt u het project openen in de code-editor.

Voer in de terminal npm install uit om alle bijbehorende onderdelen te installeren.
Voer npm start uit om de server te starten.
In de browser kan je het project bekijken op http://localhost:8000 .

## Bronnen
[Oncollaboration eerste versie](https://oncollaboration.agency.fdnd.nl/) <br>
[De Antoni van Leeuwenhoek website](https://avlfoundation.nl/) <br>
[Sardjito](https://sardjito.co.id/)


## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
