var message = document.getElementById('welcome message');
var saveButton = document.getElementsByClassName('save')[0];
var text = document.getElementsByClassName('text')[0];
var container = document.getElementById('diaries-container');
var username = document.cookie.split(';')[1].split('=')[1];

saveButton.onclick = (e) => {
  e.preventDefault();
  var data = `username=${username}&text=${text.value}&date=${getDate()}`;
  post('/creatdiary', data, (status, response) => { //eslint-disable-line
    window.location.href = '/diary';
  });
};

get('/showdiary', (status, response) => { //eslint-disable-line
  message.innerText = `What happend with you today, ${username}?`;
  response.forEach((obj) => {
    var diary = document.createElement('p');
    var text = document.createTextNode(obj.text);
    var date = document.createTextNode(obj.date.split('T')[0]);
    diary.appendChild(text);
    diary.appendChild(date);
    container.appendChild(diary);
  });
});

function getDate () {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; // January is 0!

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return mm + '-' + dd + '-' + yyyy;
}
