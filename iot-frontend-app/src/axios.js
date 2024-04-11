const params = new URLSearchParams(window.location.search);
if (params.has('username') && params.has('token')) {
    const token = params.get('token');
    const username = params.get('username');
    axios.get('http://localhost:3000/devices', {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        const devices = response.data;
        const deviceInfoElement = document.getElementById('deviceInfo');
        devices.forEach((device) => {
            const deviceId = device.id;
            // Создание элементов
            const deviceNameElement = document.createElement('h2');
            const deviceNameLink = document.createElement('a');
            const deviceCommentElement = document.createElement('h5');
            const deviceCommentLink = document.createElement('span');
            //изменения бета
            const deviceNameInput = document.createElement('input');
            deviceNameInput.type = 'text';
            deviceNameInput.value = device.name;
            deviceNameInput.classList.add('NameInput'); 
            const deviceCommentInput = document.createElement('input');
            deviceCommentInput.type = 'text';
            deviceCommentInput.value = device.comment;
            deviceCommentInput.classList.add('CommentInput');  
            const deviceSaveButton = document.createElement('button');
            deviceSaveButton.textContent = 'Сохранить';
            deviceSaveButton.classList.add('SaveButton');  
            deviceSaveButton.addEventListener('click', () => {
            const newName = deviceNameInput.value;
            const newComment = deviceCommentInput.value;
            axios.put(`http://localhost:3000/devices/${deviceId}`, {
            name: newName,
            comment: newComment,
            }, {
            headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
            }).then((response) => {
            // Обновляем отображаемое имя устройства
            deviceNameLink.textContent = `${newName}`;
            deviceCommentLink.textContent = `${newComment}`;
            }).catch((error) => {
            console.error(error);
            });
            });
            // Задаем значения для элементов
            deviceNameLink.textContent = `${device.name}: `;
            deviceCommentLink.textContent = device.comment;
            // Добавляем классы для стилей
            deviceNameElement.classList.add('deviceName');
            deviceCommentElement.classList.add('deviceComment');
            deviceNameLink.classList.add('deviceLink');
            deviceCommentLink.classList.add('deviceLink');
            // Добавляем элементы в родительский элемент
            deviceNameElement.appendChild(deviceNameLink);
            deviceCommentElement.appendChild(deviceCommentLink);
            deviceInfoElement.appendChild(deviceNameElement);
            deviceInfoElement.appendChild(deviceCommentElement);
            deviceInfoElement.appendChild(deviceNameInput);
            deviceInfoElement.appendChild(deviceCommentInput);
            deviceInfoElement.appendChild(deviceSaveButton);
            // Добавляем событие при нажатии на устройство
            const sensorDataElement = document.getElementById('sensorData');
            deviceNameLink.addEventListener('click', () => {
                if (deviceNameInput.style.display === 'none') {
                    deviceNameInput.style.display = 'block';
                    deviceCommentInput.style.display = 'block';
                    deviceSaveButton.style.display = 'block';
                } else {
                    deviceNameInput.style.display = 'none';
                    deviceCommentInput.style.display = 'none';
                    deviceSaveButton.style.display = 'none';
                }
                // Очищаем всё что находится в диве
                const sensorInfoElement = document.getElementById('sensorInfo');
                sensorInfoElement.innerHTML = '<h2>Мои Сенсоры</h2>';
                sensorDataElement.innerHTML = '';
                // Получаем сенсоры только для выбранного устройства
                axios.get(`http://localhost:3000/devices/${deviceId}/sensors`, {
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }).then((sensorResponse) => {
                    const sensors = sensorResponse.data;
                    // Создаем элементы сенсоров
                    sensors.forEach((sensor) => {
                        const sensorNameElement = document.createElement('h2');
                        const sensorNameLink = document.createElement('a');
                        const sensorCommentElement = document.createElement('h5');
                        const sensorCommentLink = document.createElement('span');
                        //изменения beta
                        const sensorNameInput = document.createElement('input');
                        sensorNameInput.type = 'text';
                        sensorNameInput.value = sensor.name;
                        sensorNameInput.classList.add('NameInput');  
                        const sensorCommentInput = document.createElement('input');
                        sensorCommentInput.type = 'text';
                        sensorCommentInput.value = sensor.comment; 
                        sensorCommentInput.classList.add('CommentInput');  
                        const sensorSaveButton = document.createElement('button');
                        sensorSaveButton.textContent = 'Сохранить';
                        sensorSaveButton.classList.add('SaveButton');  
                        sensorSaveButton.addEventListener('click', () => {
                        const newName = sensorNameInput.value;
                        const newComment = sensorCommentInput.value;
                        axios.patch(`http://localhost:3000/sensors/${sensor.id}`, {
                        name: newName,
                        comment: newComment,
                        }, {
                        headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        },
                        }).then((response) => {
                        // Обновляем отображаемое имя сенсора
                        sensorNameLink.textContent = `${newName}`;
                        sensorCommentLink.textContent = `${newComment}`;
                        }).catch((error) => {
                        console.error(error);
                        });
                        });
                        // Задаем текст для элементов сенсоров
                        sensorNameLink.textContent = `${sensor.name}: `;
                        sensorCommentLink.textContent = `${sensor.comment} `;
                        // Добавляем классы
                        sensorNameElement.classList.add('sensorName');
                        sensorCommentElement.classList.add('sensorComment');
                        sensorNameLink.classList.add('sensorLink');
                        sensorCommentLink.classList.add('sensorLink');
                        // Добавляем элементы сенсоров в родительский элемент для сенсоров
                        sensorNameElement.appendChild(sensorNameLink);
                        sensorCommentElement.appendChild(sensorCommentLink);
                        sensorInfoElement.appendChild(sensorNameElement);
                        sensorInfoElement.appendChild(sensorCommentElement);
                        sensorInfoElement.appendChild(sensorNameInput);
                        sensorInfoElement.appendChild(sensorCommentInput);
                        sensorInfoElement.appendChild(sensorSaveButton);
                        // Добавляем событие для имени сенсора для получения данных
                        sensorNameLink.addEventListener('click', () => {
                            if (sensorNameInput.style.display === 'none') {
                                sensorNameInput.style.display = 'block';
                                sensorCommentInput.style.display = 'block';
                                sensorSaveButton.style.display = 'block';
                            } else {
                                sensorNameInput.style.display = 'none';
                                sensorCommentInput.style.display = 'none';
                                sensorSaveButton.style.display = 'none';
                            }
                            const currentDate = new Date();
                            const endDate = new Date(currentDate.getTime() - (1 * 60 * 60 * 1000));
                            const formattedEndDate = endDate.toISOString();
                            axios.get(`http://localhost:3000/sensor/${sensor.id}/sensor-values`, {
                                headers: {
                                    'content-type': 'application/json',
                                    Authorization: `Bearer ${token}`,
                                },
                                params: {
                                    startDate: formattedEndDate,
                                    endDate: currentDate.toISOString(),
                                },
                            }).then((sensorDataResponse) => {
                                const sensorData = sensorDataResponse.data;
                                let sensorDataHTML = '';
                                let previousTimestamp = null;
                                let labels = []; // массив для меток на графике
                                let values = []; // массив для значений на графике
                                sensorData.forEach((data) => {
                                    const timestamp = new Date(data.timestamp);
                                    const formattedDate = `${timestamp.getDate()}.${timestamp.getMonth() + 1}.${timestamp.getFullYear()}`;
                                    const formattedTime = `${timestamp.getHours()}:${timestamp.getMinutes()}`;
                                    if (!previousTimestamp || timestamp.getMinutes() !== previousTimestamp.getMinutes()) {
                                        const roundedValue = data.value.toFixed(3);
                                        sensorDataHTML += `Значение: ${roundedValue} Дата: ${formattedDate} Время: ${formattedTime}<br> <hr>`;
                                        previousTimestamp = timestamp;
                                        // Добавляем данные для графика
                                        labels.push(formattedTime); // использование времени как метки
                                        values.push(roundedValue); // использование значения как значения на графике
                                    }
                                });
                                sensorDataElement.innerHTML = sensorDataHTML;
                                // Создаем график
                                const chartContainer = document.getElementById('grafik');
                                // Удаляем старый canvas, если он существует
                                const existingCanvas = document.getElementById('sensorChart');
                                if (existingCanvas) {
                                    chartContainer.removeChild(existingCanvas);
                                }
                                // Создаем новый элемент canvas
                                const newCanvas = document.createElement('canvas');
                                newCanvas.id = 'sensorChart';
                                chartContainer.appendChild(newCanvas);
                                // Получаем контекст для нового canvas и создаем график
                                const ctx = newCanvas.getContext('2d');
                                const chart = new Chart(ctx, {
                                    type: 'line',
                                    data: {
                                        labels: labels,
                                        datasets: [{
                                            label: 'Значения сенсора',
                                            backgroundColor: 'rgb(255, 99, 132)',
                                            borderColor: 'rgb(255, 99, 132)',
                                            data: values,
                                        }]
                                    },
                                    options: {
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                        }
                                    }
                                });
                            }).catch((sensorDataError) => {
                                console.error(sensorDataError);
                            });
                        });
                    });
                }).catch((sensorError) => {
                    console.error(sensorError);
                });
            });
        });
    }).catch((error) => {
        console.error(error);
    });
}