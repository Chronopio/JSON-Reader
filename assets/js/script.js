let cardWrapper = document.querySelector('.card-wrapper');
let navItems = Array.from(document.querySelector('.navbar').children);

const fetchJSONFile = (path, callback) => {
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
              let data = JSON.parse(httpRequest.responseText);
              if (callback) callback(data);
          }
      }
  };
  httpRequest.open('GET', path);
  httpRequest.setRequestHeader("Access-Control-Allow-Origin","*");
  httpRequest.send(); 
}

const dynamicCardRendering = (objectArray) => {
    objectArray.forEach(obj => {
        let cardSection = document.createElement('div');
        
        objectArray.length <= 10 ? 
        cardSection.classList.add('col-md-4') : 
        cardSection.classList.add('col-lg-3', 'col-md-4');
        
        cardSection.classList.add('p-1', 'col-sm-6');

        let card = document.createElement('div');

        const keyValueArr = Object.entries(obj);
        keyValueArr.forEach(keyValue => {
            let paragraph = document.createElement('p');
            paragraph.innerText = `${keyValue[0]}: ${keyValue[1]}`;
            paragraph.classList.add('text-center');

            card.append(paragraph);
        })
        if (obj['Escala De Tiempo'] === "S") {
            card.classList.add('lightblue');
        } else if (obj['Escala De Tiempo'] === "M") {
            card.classList.add('blue');
        } else if (obj['Escala De Tiempo'] === "L") {
            card.classList.add('darkblue', 'text-light');
        }

        card.classList.add('w-90', 'mx-auto', 'py-3', 'border');

        cardSection.append(card);
        cardWrapper.append(cardSection);
    })
}

fetchJSONFile('./placeholder.json', (data) => {
  
  dynamicCardRendering(data);
  
  const renderedCards = Array.from(document.querySelector('.card-wrapper').children)
  
  const renderAll = (e) => {
    renderedCards.forEach(card => {
      if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
      }
    })
    navItems.forEach(navItem => navItem.classList.remove('active'));
    e.target.classList.add('active')
  }
  
  const renderFiltered = (area, e) => {
    const keyValueArr = Object.entries(data);
    renderedCards.forEach((card, index) => {
      card.classList.add('d-none');
      if (keyValueArr[index][1].Area.includes(area)) {
        card.classList.remove('d-none');
      }
    })
    navItems.forEach(navItem => navItem.classList.remove('active'));
    e.target.classList.add('active');
  }
  
  
  navItems.forEach(navItem => {
    navItem.addEventListener('click', (e) => {
      switch (e.target) {
        case navItems[0]:
          renderAll(e);
          break;
        case navItems[1]:
          renderFiltered("Area#1", e);
          break;
        case navItems[2]:
          renderFiltered("Area#2", e);
          break;
        case navItems[3]:
          renderFiltered("Area#3", e);
          break;
        case navItems[4]:
          renderFiltered("Area#4", e);
          break;
        case navItems[5]:
          renderFiltered("Area#5", e);
          break;             
        case navItems[6]:
          renderFiltered("Area#6", e);
          break;             
        default:
          console.log("Algo salio mal");
          break;
      }
    })
  })
  
});
