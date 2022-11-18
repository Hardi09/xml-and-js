const xhr = (url, method = `GET`) =>
  new Promise((resolve) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resolve(this.responseXML);
      }
    };
    xhttp.open(method, url);
    xhttp.send();
  });

  function stringToNode(html) {
    const template = document.createElement(`template`);
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
  }

  function displayData(xmlDoc) {
    const listElement = document.getElementById(`peopleDetail`);

    const studentNodes = xmlDoc.getElementsByTagName(`people`);
    for (let index = 0; index < studentNodes.length; index++) {
      const studentNode = studentNodes[index];
      const listItem = stringToNode(`<li>
        <h2>${
          studentNode.getElementsByTagName(`firstname`)[0].childNodes[0]
            .nodeValue
        } ${
        studentNode.getElementsByTagName(`lastname`)[0].childNodes[0]
          .nodeValue
      } - ${studentNode.getAttribute(`id`)}</h2>
      <p>${`Email`} - ${
        studentNode.getElementsByTagName(`email`)[0].childNodes[0]
          .nodeValue
      }</p>
      <p>${`Gender: ${
        studentNode.getElementsByTagName(`gender`)[0].childNodes[0].nodeValue
      }`}</p>
      <p>${`Ip_address: ${
        studentNode.getElementsByTagName(`ip_address`)[0].childNodes[0].nodeValue
      }`}</p>
      </li>`);
      listElement.appendChild(listItem);
    }
  }

  xhr("people.xml").then(displayData);