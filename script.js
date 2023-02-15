let form = document.forms.todo
let container = document.querySelector('.container')
let todos = []
form.onsubmit = (e) => {
    e.preventDefault()
    let todo = {
        id: Math.random(),
        isDone: false,
        time: new Date().getHours() + ':' + new Date().getMinutes()
    }
    let fm = new FormData(form)
    fm.forEach((value, key) => {
        todo[key] = value
    });
    if (todo.task.length > 0) {
        todos.push(todo);
        reload(todos, container)
    } else {
        alert('Без Работный')
    }
}
//edit modal
let modal = document.querySelector('.modal')
let modal_bg = document.querySelector('.modal_bg')
let inp2 = modal.querySelector('input')
let exit = modal.querySelector('.exit')
let save = modal.querySelector('.save')
//delete modal
let modal_del = document.querySelector('.modal_del')
let dl_txt = document.querySelector('.modal_del h1')
let modal_bgDel = document.querySelector('.modal_bgDel')
let delInp = modal_del.querySelector('.delInp')
let exitt = modal_del.querySelector('.exitt')
let deletee = modal_del.querySelector('.deletee')
let reload = (arr, pl) => {
    pl.innerHTML = ""
    for (let item of arr) {
        // createElement 
        let mainDiv = document.createElement('div')
        let topSide = document.createElement('div')
        let edel = document.createElement('div')
        let del = document.createElement('img')
        let edit = document.createElement('img')
        let h4 = document.createElement('h2')
        let time = document.createElement('p')
        // class
        mainDiv.classList.add('item')
        edit.classList.add('edit')
        topSide.classList.add('top-side')
        del.classList.add('delete')
        edel.classList.add('edel')
        //innerHTML
        del.src = './img/delete.png'
        edit.src = './img/edit.png'
        h4.innerHTML = item.task
        time.innerHTML = item.time
        // append
        topSide.append(h4, edit)
        edel.append(time, del)
        mainDiv.append(topSide, edel)
        pl.prepend(mainDiv)
        //function
        h4.onclick = () => {
            item.isDone = !item.isDone
            if (item.isDone) {
                mainDiv.classList.add('done')
            } else {
                mainDiv.classList.remove('done')
            }
        }
        //delete modal func
        del.onclick = () => {
            deleting(item)
            dl_txt.innerHTML = `Type '${item.task}'`
            reload(todos, container)
        }
        //edit modal func
        edit.onclick = () => {
            ed_func(item)
            reload(todos, container)
        }
    }
}
//deleting function
function deleting(item) {
    open_del_moadl()
    deletee.onclick = () => {
        if (delInp.value === item.task) {
            todos = todos.filter(el => el.id !== item.id)
            console.log('Правильно');
            modal_del.style.opacity = "0"
            modal_bgDel.style.opacity = "0"
            setTimeout(() => {
                modal_del.style.display = "none"
                modal_bgDel.style.display = "none"
            }, 200)
        } else {
            delInp.style.border = '2px solid red'
            console.log('Не Правильно');
        }
        reload(todos, container)
    }
    exitt.onclick = () => {
        modal_del.style.opacity = "0"
        modal_bgDel.style.opacity = "0"
        setTimeout(() => {
            modal_del.style.display = "none"
            modal_bgDel.style.display = "none"
        }, 200)
    }
}
function open_del_moadl() {
    modal_del.style.display = "flex"
    modal_bgDel.style.display = "block"
    setTimeout(() => {
        modal_del.style.opacity = "1"
        modal_bgDel.style.opacity = "1"
    }, 200)
}
//edit function
function ed_func(item) {
    open_edit_modal()
    save.onclick = () => {
        item.task = inp2.value
        modal.style.opacity = "0"
        modal_bg.style.opacity = "0"
        setTimeout(() => {
            modal.style.display = "none"
            modal_bg.style.display = "none"
        }, 200)
        reload(todos, container)
    }
    exit.onclick = () => {
        modal.style.opacity = "0"
        modal_bg.style.opacity = "0"
        setTimeout(() => {
            modal.style.display = "none"
            modal_bg.style.display = "none"
        }, 200)
    }
}
function open_edit_modal() {
    modal.style.display = "flex"
    modal_bg.style.display = "block"
    setTimeout(() => {
        modal.style.opacity = "1"
        modal_bg.style.opacity = "1"
    }, 200)
}
reload(todos, container)