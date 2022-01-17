var containerImage = document.getElementById('dropper');
let copy = document.getElementById("copy");
let link = document.getElementById("link");
let fd = new FormData();

containerImage.addEventListener('dragover', function(ev){
    ev.preventDefault()
    // console.log(ev)
}, false);

containerImage.addEventListener('drop', function(ev){
    ev.preventDefault()
    document.getElementById("container").style.display = "none";
    document.getElementById("barloader").style.display = "block";
    let reader = new FileReader();
    const fileName = ev.dataTransfer.files[0].name;
    reader.onload = (e) => {
        fd.append('image', e.target.result);
        fd.append('file', fileName);
        fetch('http://localhost/image_upload/upload.php', {
            method: 'POST',
            body: fd
        }).then(data => data.text())
        .then(resp => {
            setTimeout(function() {
                let imageUp = document.getElementById('uploaded');
                imageUp.src = resp;
                link.textContent = `${window.location.host}/images/${fileName}`;
                document.getElementById("results").style.display = "block";
            }, 6000);
        })
        .catch(err => console.error(err))
        .finally(() => {
            setTimeout(() => {
                document.getElementById("barloader").style.display = "none";
            }, 6000)
        })
    }
    reader.readAsDataURL(ev.dataTransfer.files[0]);
}, false);

copy.addEventListener('click', function(){
    let val = link.textContent;
    navigator.clipboard.writeText(val);
})
