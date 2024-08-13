(function(){
    'use strict';

    const form = document.getElementById('myForm');

    form.addEventListener('submit', function(event)     {
        event.preventDefault();

        const formData = {
            name: this.querySelector('#name').value,
            description: this.querySelector('#description').value
        };

        const imageFile = this.querySelector('#image').files[0];
        const reader = new FileReader();

        reader.onloadend = async () => {
            formData.image = await getCompressedImage(reader.result);

            fetch(this.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                // .then(response => response.json())
                .then(data => window.location.reload())
                .catch(error => console.error('Error:', error));
        };

        reader.readAsDataURL(imageFile);
    });

    function getCompressedImage(imageFile) {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = imageFile;

            img.onload = function() {
                // Створюємо canvas для стиснення зображення
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');

                // Встановлюємо розмір canvas
                let maxWidth = 800; // Задайте максимальну ширину
                let maxHeight = 800; // Задайте максимальну висоту
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round(height * (maxWidth / width));
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round(width * (maxHeight / height));
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                // Малюємо стиснуте зображення на canvas
                ctx.drawImage(img, 0, 0, width, height);

                // Отримуємо стиснуте зображення у форматі Base64
                let compressedDataUrl = canvas.toDataURL('image/jpeg', 0.3); // Стиснення до 30%


                resolve(compressedDataUrl);
            }
        })
    }
})()