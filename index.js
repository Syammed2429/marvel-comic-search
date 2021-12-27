
// Declaring all the variable 
const muteImage = document.querySelector('.mute');
const unMuteImage = document.querySelector('.un-mute');
const song = document.createElement('audio');
const charactersDetails = document.getElementById('characters');
const personalInfo = document.getElementById('personal-info')
const anatomyDetails = document.getElementById('anatomy');
const charcterDetails = document.querySelector('.character-details');
const personalData = document.querySelector('.personal-data')
let timerId;


//Song Start Playing
let mute = () => {
    song.src = `TheAvengers.mp3`;
    song.autoplay = true;
    unMuteImage.style.display = 'block';
    muteImage.style.display = 'none';
}

//Song will stop after
let unmute = () => {
    song.src = `TheAvengers.mp3`;
    unMuteImage.style.display = 'none';
    muteImage.style.display = 'block';
    // console.log('Hai from unmute');
    song.autoplay = false;
}

// Fethcing the characters data from the api
let charactersData = async (a) => {
    let response = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=1&name=${a}&apikey=3cd2c88f4e33cc070f216c960016e36e&hash=051bcd75702e39bd60204973db08cadf`)
    let result = await response.json();
    console.log('res:', result.data.results)
    return result.data.results;


}

//main function 
let main = async () => {
    let searchInput = document.querySelector('.search-bar').value;
    //if the innput field is empty then charactersDetails box will be hidden vice versa
    if (!searchInput) {
        charactersDetails.style.visibility = "hidden";

    } else {
        charactersDetails.style.visibility = "visible";
        charactersDetails.style.background = '#2d2f30';

    }
    let charactersInfo = await charactersData(searchInput);
    if (charactersInfo === undefined) {
        return false;
    }

    appendCharacters(charactersInfo);


}

//appending function
let appendCharacters = (c) => {
    charactersDetails.innerHTML = '';

    //appending the name , gender and age at the charactersDetails cont. it will show the results of the user query
    for (let data of c) {
        const characterName = document.createElement('p');
        const age = document.createElement('p');
        const characterGender = document.createElement('p');

        characterName.innerHTML = data.name;
        characterName.classList.add('characterName');
        //add mouse events
        characterName.addEventListener('mousemove', () => {
            characterName.style.color = 'yellow';

        });
        characterName.addEventListener('mouseout', () => {
            characterName.style.color = 'white';

        });
        //appending the details of the characters whenenver user click on the particular character name
        characterName.addEventListener('click', () => {
            personalData.style.display = 'block';

            let personalInfoMessage = document.createElement('p');
            // personalInfoMessage.innerHTML = "Personal Info"
            let name = document.createElement('p');
            let desc = document.createElement('p')

            name.innerHTML = `${data.name}`;
            desc.innerHTML = data.description
            desc.style.color = 'yellow';
            desc.style.textAlign = 'center';


            let comic = document.createElement('p');
            comic.innerHTML = `Comics Available : ${data.comics.available}`;

            let story = document.createElement('p');
            story.innerHTML = `Stories : ${data.stories.available}`;

            let anatomy = document.createElement('p');

            let serie = document.createElement('p');
            serie.innerHTML = `Series : ${data.series.available}`;

            let event = document.createElement('p');
            event.innerHTML = `Events : ${data.events.available}`;


            personalInfoMessage.append(comic, story);
            personalInfoMessage.classList.add('personal-Info-cont');
            personalInfo.append(personalInfoMessage)
            document.querySelector('.character-name').append(name);
            document.querySelector('.character-desc').append(desc);

            anatomy.append(serie, event);
            anatomy.classList.add('anatomy-cont');
            anatomyDetails.append(anatomy)

        });

        characterGender.innerHTML = `id : ${data.id}`;
        characterGender.classList.add('characterGender')
        charactersDetails.append(characterName, characterGender);
    }

}

//seting time for debouncing function
let debounce = (func, delay) => {
    let searchInput = document.querySelector('.search-bar').value;
    if (searchInput < 3) {
        return false;
    }

    if (timerId) {
        clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
        func()
    }, delay);
}

//Go Back Button Function
let goBack = () => {
    setTimeout(() => {
        window.location.reload();
    }, 100)
}


