(function () {
  // console.log('jhh');
  document.getElementByClass('login').addEventListener('click', (event) => {
    // console.log('get');
    var username = document.getElementsByName('username')[0].value;
    var password = document.getElementsByName('password')[0].value;
    var url = `login?username=${username}&password=${password}`;
    get(url, (status, response) => {
      if (status === 500) {
        console.log('ERROR');
      }
      // console.log('redirect');
      window.location = 'http://localhost:1900/';
    });
  });

  console.log('in sss');
  document.getElementByClass('signup').addEventListener('click', (event) => {
    var username = document.getElementsByName('username')[0].value;
    var password = document.getElementsByName('password')[0].value;
    var confirmPass = document.getElementsByName('confirm')[0].value;
    // var confirmPass = document.createElement('input');
    // confirmPass.setAttribute('type', 'password');
    validatePassword(password, confirmPass);
    var urlSignUp = `signUpPage?username=${username}&password=${password}`;
    if (password.length > 8 && confirmPass === password) {
      post(url, data, (status, response) => {

      });
    } else if (password.length < 8) {
      console.log('Password shold be more than 8 charecter');
    } else {
      console.log('please check the password, two password are different');
    }
  });
})();

function validatePassword (password, confirmPass) {
  console.log(password, confirmPass);
}
