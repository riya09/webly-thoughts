const container = document.querySelector('.container');
fetch('/news')
.then(function(res){
  return res.json();
})
.then(function(data){
  let heading="";
  for(let i=0;i<data.length;i++){
    if(data[i].web=='FreeCodeCamp'){
      data[i].url = 'https://www.freecodecamp.org'+data[i].url;
    }
    if(data[i].web=='DEV Community'){
      data[i].url = 'https://www.dev.to'+data[i].url;
    }
    if(data[i].web=='HACKERNOON'){
      data[i].url = 'https://www.hackernoon.com'+data[i].url;
    }
    console.log(data[i].url);
    heading += `<div class='cards'>
    <a target="_blank" href=${data[i].url}><p class="text">${data[i].title}</p></a>
    <span class="source">${data[i].web}</span>
    </div>`;
  }
  container.innerHTML=heading;
  const loader=document.querySelector('.loader');
  loader.classList.add('loader-finished');
})
