const quote = document.querySelector(".quote");
const authorName = document.querySelector(".name")
const changeBtn = document.querySelector("button");
const speakBtn = document.querySelector(".sound");
const copy = document.querySelector(".copy");
const twitter = document.querySelector(".twitter");

const loading = () =>{
    changeBtn.classList.add("loading")
}
const removeLoading = () =>{
    changeBtn.classList.remove("loading");
}
const disableClicks = () =>{
    changeBtn.classList.add("disable");
    speakBtn.classList.add("disable");
    copy.classList.add("disable");
    twitter.classList.add("disable");
}
const enableClicks = () =>{
    changeBtn.classList.remove("disable");
    speakBtn.classList.remove("disable");
    copy.classList.remove("disable");
    twitter.classList.remove("disable");
}

const randomQuotegenerator = async() =>{
    loading();
    disableClicks();
    changeBtn.innerText = "Loading...";
    let response = await fetch("https://api.quotable.io/random");
    let jsonresponse =await response.json();
    console.log(jsonresponse);
    quote.innerText = jsonresponse.content;
    authorName.innerHTML = `<em>${jsonresponse.author}</em>`;
    changeBtn.innerText = "Change Quote";
    removeLoading();
    enableClicks();
}

const speak = () => {
    loading();
    let speakText = new SpeechSynthesisUtterance(
        `${quote.innerHTML}  quote by ${authorName.innerHTML}`
    )
    speechSynthesis.speak(speakText);
    setInterval(()=>{
        if(speechSynthesis.speaking){
            speakBtn.style.background = "#5372F0";
            speakBtn.style.color = "#FFFFFF";
            disableClicks();
            speakBtn.classList.remove("disable");
        }
        else{
            speakBtn.style.background = "#FFFFFF";
            speakBtn.style.color = "#5372F0";
            removeLoading();
            enableClicks();
        }
    },10)
    
}

const copyContent = () =>{
    Swal.fire({
        title: "Do you want to copy the quote?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes!",
        denyButtonText: `Don't Copy`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Copied!", "", "success");
          navigator.clipboard.writeText(quote.innerHTML);
        } else if (result.isDenied) {
          Swal.fire("Not Copied!", "", "info");
        }
      });
}

const TwitterButtonFunction = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${quote.innerHTML}`,
      "_blank"
    );
  };

changeBtn.addEventListener("click", ()=>{
    randomQuotegenerator();
})

speakBtn.addEventListener("click", ()=>{
    speak();
})

copy.addEventListener("click",()=>{
    copyContent();
})

twitter.addEventListener("click",()=>{
    TwitterButtonFunction();
})