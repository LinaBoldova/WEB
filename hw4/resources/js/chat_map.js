window.onload = function() {
    // Инициализация карты
    var map = L.map('map').setView([55.80363348770191, 37.40967556649959], 17);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    // Обработчик отправки текстового сообщения
    document.getElementById('send-message').addEventListener('click', function() {
      var messageInput = document.getElementById('chat-input');
      var message = messageInput.value;
      appendMessage('Вы', message);
  
      // Проверка наличия ключевых слов и отправка случайного ответа
      if (message.includes('ривет')) {
        var responses = ['Привет!', 'Здравствуйте!', 'Добро пожаловать!'];
        var randomIndex = Math.floor(Math.random() * responses.length);
        appendMessage('Бот', responses[randomIndex]);
      }

      if (message.includes('ак дела')) {
        var responses = ['Отлично!', 'Замечательно!', 'А у Вас?'];
        var randomIndex = Math.floor(Math.random() * responses.length);
        appendMessage('Бот', responses[randomIndex]);
      }

      if (message.includes('хорошо')) {
        var responses = ['Я рада за вас!', 'И у меня!'];
        var randomIndex = Math.floor(Math.random() * responses.length);
        appendMessage('Бот', responses[randomIndex]);
      }

      messageInput.value = ''; // Очистка поля ввода
    });

    // Обработчик отправки голосового сообщения
    document.getElementById('record-audio').addEventListener('click', function() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(function(stream) {
                    var mediaRecorder = new MediaRecorder(stream);
                    var audioChunks = [];

                    mediaRecorder.addEventListener('dataavailable', function(event) {
                        audioChunks.push(event.data);
                    });

                    mediaRecorder.addEventListener('stop', function() {
                        var audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                        var audioUrl = URL.createObjectURL(audioBlob);
                        var audio = new Audio(audioUrl);
                        audio.controls = true;
                        document.getElementById('chat-box').appendChild(audio);
                    });

                    mediaRecorder.start();

                    setTimeout(function() {
                        mediaRecorder.stop();
                    }, 5000);
                })
                .catch(function(err) {
                    console.error('Ошибка при доступе к микрофону: ' + err);
                });
        } else {
            console.error('Микрофон недоступен');
        }
    });
  
    // Функция добавления сообщения в чат
    function appendMessage(sender, message) {
      var chatBox = document.getElementById('chat-box');
      var messageElement = document.createElement('div');
      messageElement.textContent = sender + ': ' + message;
      chatBox.appendChild(messageElement);
    }
  };
  