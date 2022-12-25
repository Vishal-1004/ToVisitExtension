let myLead = []
const inputEl = document.getElementById("input-el")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

//localStorage.clear()

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"))

if (leadsFromLocalStorage){
    myLead = leadsFromLocalStorage
    render(myLead)
}

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //console.log(tabs)
        myLead.push([tabs[0].url,inputEl.value])
        inputEl.value = ""
        localStorage.setItem("myLead",JSON.stringify(myLead))
        render(myLead)
    })
})

function render(leads){
    let listItems = ""
    if(leads.length > 0){
        ulEl.innerHTML = `
        <li id='topLi-el'>
        Saved Tabs
        </li>
        `
    }
    else{
        ulEl.innerHTML = ""
    }
    for(let i=0;i<leads.length;i++){
        if(leads[i][1]){
            listItems += 
            `<li id='li-el'>
                <a href='${leads[i][0]}' target='_blank'>
                    ${leads[i][1]}
                </a>
            </li>`
        }
        else{
            listItems += 
        `<li id='li-el'>
            <a href='${leads[i][0]}' target='_blank'>
                No Title Given
            </a>
        </li>`
        }
    }
    ulEl.innerHTML += listItems
}

deleteBtn.addEventListener("click",function(){
    localStorage.clear()
    myLead = []
    render(myLead)
})

/* Created by :- Vishal Kumar Yadav */