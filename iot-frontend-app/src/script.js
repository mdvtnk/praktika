async function authenticate() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    axios.post('http://localhost:3000/auth/login', {
        username: username,
        password: password
    })
    .then(function (response) {
        const token = response.data.access_token;
        // Проверка наличия токена
        if (token) {
            // Перенаправление на account.html с токеном в URL
            window.location.href = 'account.html?username=' + username + '&token=' + token;
        } else {
            // Обработка ошибки
            console.error('Токен не получен');
        }
    })
    .catch(function (error) {
        var errorMessage = document.getElementById('error');
        errorMessage.textContent = "Неправильный логин или пароль!";
    });
}

 var urlParams = new URLSearchParams(window.location.search);
 var username = urlParams.get('username');
 username = username.charAt(0).toUpperCase() + username.slice(1);
 document.getElementById('username').textContent = username;