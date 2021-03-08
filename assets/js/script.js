new WOW().init();

let cardWrapper = document.querySelector('.card-wrapper');
let modalWrapper = document.querySelector('.modal-wrapper')
let navItems = Array.from(document.querySelector('.navbar').children);

document.addEventListener('click', event => {
      if (event.target.matches('.info-card')) {
          let modalInfo = Array.from(event.target.parentElement.children);
          clonedModalInfo = modalInfo[modalInfo.length - 1].cloneNode(true);
          clonedModalInfo.classList.remove('d-none');
          modalBody.innerHTML = ''
          modalBody.append(clonedModalInfo);
          myModal.show();
      }
  })

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

        let modalContent = document.createElement('div');
        modalContent.classList.add('container-fluid');
        let row = document.createElement('div');
        row.classList.add('row');
        
        const keyValueArr = Object.entries(obj);

        // Card Header
        const header = document.createElement('div');
        header.classList.add('d-flex', 'justify-content-between', 'w-85', 'mx-auto', 'pb-3')

        const cardNumber = document.createElement('span');
        cardNumber.innerText = `#${keyValueArr[1][1]}`
        cardNumber.classList.add('bigger-size');
        const timeScale = document.createElement('span');
        timeScale.classList.add('bolder', 'bigger-size');
        timeScale.innerText = `${keyValueArr[5][1]}`
        header.append(cardNumber);
        header.append(timeScale);
        card.append(header)

        // Card Body
        const cardName = document.createElement('p');
        cardName.classList.add('py-2', 'bolder', 'w-85', 'mx-auto','info-card');
        cardName.innerText = `${keyValueArr[2][1]}`
        card.append(cardName);

        // Card footer
        const footerWrapper = document.createElement('div');
        footerWrapper.classList.add('w-85', 'mx-auto', 'py-2')
        const cardImpact = document.createElement('span');
        if (keyValueArr[7][1][0] === 'S') {
          cardImpact.innerHTML = `Impact: <span class="badge rounded-pill bg-success">Small Scale</span>`
        } else if (keyValueArr[7][1][0] === 'M') {
          cardImpact.innerHTML = `Impact: <span class="badge rounded-pill bg-warning">Large Scale</span>`
        } else if (keyValueArr[7][1][0] === 'L') {
          cardImpact.innerHTML = `Impact: <span class="badge rounded-pill bg-danger">Transformative</span>`
        }
        footerWrapper.append(cardImpact);
        card.append(footerWrapper);
        
        keyValueArr.forEach(keyValue => {

          // Modal Content Generaton
          const sectionWrapper = document.createElement('div');
          sectionWrapper.classList.add('col-sm-6', 'p-2');
          const section = document.createElement('div');
          section.classList.add('section-bg');
          const title = document.createElement('strong');
          title.classList.add('p-2')
          title.innerText = `${keyValue[0]}`
          const content = document.createElement('div');
          content.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'py-5', 'mx-auto');

          let fieldData = document.createElement('p');
          switch (keyValue[0]) {
            case 'Escala De Tiempo':
              fieldData.classList.add('text-center', 'w-90', 'giant-size', 'bolder');
              fieldData.innerText = `${keyValue[1]}`
              break;
            case 'Impacto':
              if (keyValueArr[7][1][0] === 'S') {
                fieldData.innerHTML = `<span class="badge rounded-pill bg-success">Small Scale</span>`
              } else if (keyValueArr[7][1][0] === 'M') {
                fieldData.innerHTML = `<span class="badge rounded-pill bg-warning">Large Scale</span>`
              } else if (keyValueArr[7][1][0] === 'L') {
                fieldData.innerHTML = `<span class="badge rounded-pill bg-danger">Transformative</span>`
              }
              break;
            case 'Prioridad':
              keyValue[1].forEach(priority => {
                fieldData.innerHTML += `<span class="badge rounded-pill bg-primary">${priority}</span> `
              })
              break;
            case 'Area':
              keyValue[1].forEach(area => {
                fieldData.innerHTML += `<span class="badge rounded-pill bg-info">${area}</span> `
              })
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
              fieldData.classList.add('text-center', 'w-90');
              fieldData.innerText = `${keyValue[1]}`  
              break;
          }

            content.append(fieldData);
            section.append(title);
            section.append(content);
            sectionWrapper.append(section);
            row.append(sectionWrapper);
        })
        if (obj['Escala De Tiempo'] === "S") {
            card.classList.add('lightblue');
        } else if (obj['Escala De Tiempo'] === "M") {
            card.classList.add('blue');
        } else if (obj['Escala De Tiempo'] === "L") {
            card.classList.add('darkblue');
        }

        modalContent.append(row);
        modalContent.classList.add('d-none')
        card.append(modalContent);
        
        card.classList.add('w-90', 'mx-auto', 'py-3', 'border', 'wow', 'fadeInUp', 'text-light');
        card.setAttribute('data-wow-duration','1s');
        card.setAttribute('data-wow-delay','0.25s');

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

const modal = document.createElement('div');
modal.classList.add('modal', 'fade');
modal.setAttribute('id', `cardModal`);

const modalDialog = document.createElement('div');
modalDialog.classList.add('modal-dialog');
modalDialog.classList.add('modal-lg')

const modalContent = document.createElement('div');
modalContent.classList.add('modal-content');

var modalBody = document.createElement('div');
modalBody.classList.add('modal-body');

modalContent.append(modalBody);
modalDialog.append(modalContent);
modal.append(modalDialog);
modalWrapper.append(modal)

var myModal = new bootstrap.Modal(document.getElementById('cardModal'));

