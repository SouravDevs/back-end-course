const form = document.querySelector("form");
const progress = document.querySelector('p');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    // Append Fields, you can access these fields using (req.body)
    formData.append('parentDirId', '123456789')
    formData.append('parentDirId', '123456789')

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.open("POST", `http://localhost:4000/upload`, true);
  
    xhr.addEventListener('load', () => {
        console.log(xhr.response);
    })

    xhr.upload.addEventListener("progress", (e) => {
        const totalProgress = (e.loaded / e.total) * 100;
        progress.innerText = `Progress : ${totalProgress.toFixed(2)}%`
    })

    xhr.send(formData)
})