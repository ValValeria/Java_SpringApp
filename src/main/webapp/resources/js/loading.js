(()=>{
    const data = {
        get loadingDiv(){
            return document.querySelector(".loading")
        },
        get persentagesDiv() {
            return document.querySelector("#percentages")
        },
        pers: (100/3)
    };

    Object.seal(data);

    document.addEventListener("readystatechange",()=>{
        data.pers+=(100/3);

        if(document.readyState !== "complete") return;

        data.persentagesDiv.style.width = `${data.pers}%`;

        data.persentagesDiv.addEventListener("transitionend",()=>{
            data.loadingDiv.style.opacity = 0;

            data.loadingDiv.addEventListener("transitionend",(event)=>{
                 event.target.parentElement.removeChild(event.target);

                 setTimeout(()=>{
                     document.body.classList.add("overflowY-visible");
                 },0);
            })
        })
    })
})();