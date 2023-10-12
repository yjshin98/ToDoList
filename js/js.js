//  삭제, 추가를 하다보면 id값이 꼬임 => id값을 고유값으로 변경

const items = document.querySelector('.items')  
const input = document.querySelector('.footer_input')  
const addBtn = document.querySelector('.footer_addBtn') 
const resetBtn = document.querySelector(".reset_btn")

// let id = 0; - id가 겹치는 문제 발생
let shoppingLists = []; 


const save = () => {
  localStorage.setItem("shopList", JSON.stringify(shoppingLists))
}

const init = () => {  
  const userList = JSON.parse(localStorage.getItem("shopList"))
  
  if(userList){
    userList.forEach(obj => {
      createItem(obj)
      shoppingLists = userList;
    })
  } 
  
}
init();

const onAdd = () =>{    
  const list = {  
    id:Date.now(), // UTC 시간부터 현재까지 몇초 지났는지를 id값으로 이용
    text:input.value
  }

  if(list.text == ''){  
    input.focus();
    return;
  }  

  shoppingLists.push(list) 
  save()  

  createItem(list); 
  
  input.value = '';
  input.focus();

  console.log(shoppingLists);
}


function createItem(list){
  const itemRow = document.createElement('li')
  itemRow.className = 'item_row'
  itemRow.setAttribute('data-id',list.id)

  itemRow.innerHTML = `
    <div class="item">
      <span class="item_name">${list.text}</span>
      <button class="item_delBtn">
        <i class="fa-solid fa-ban" data-id=${list.id}></i>
      </button>
    </div>
    <div class="item_devider"></div>
  `

  items.append(itemRow)
  itemRow.scrollIntoView();

  return itemRow
}


addBtn.addEventListener('click', onAdd)

input.addEventListener('keypress', event =>{

  event.key === 'Enter' && onAdd();

  // if ( event.key === 'Enter'){
  //   onAdd();
  // }
})

items.addEventListener('click', e =>{
  const clickid = e.target.dataset.id;
  console.log('클릭한 쓰레기통의 ID는 ? ',clickid);
  if(clickid) {
    const toBeDeleted = document.querySelector(`.item_row[data-id="${clickid}"]`);    
    toBeDeleted.remove();

    shoppingLists = shoppingLists.filter(aa => aa.id != clickid)
    save()
  }
})

resetBtn.addEventListener("click",()=>{
  const reset = document.querySelectorAll(".item_row")
  
  for(let i=0; i<reset.length;i++){
    reset[i].remove()
    shoppingLists = shoppingLists.filter(aa => aa[i])    
    save()
  }   
})