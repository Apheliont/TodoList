/**
 * Created by Aphel on 11.09.2016.
 * Говнокод, тестирую работу стореджа
 */
//создаем объект состояния для сохранения в localStorage
let state = {
  todoItems: []
};

window.addEventListener('load', init);

function init() {
  //восстановить данные из localStorage, повтор кода ахтунг :)
  getSavedData();

  $('.header__plus-btn').on('click', function () {
    $('.add-new-input').toggle('slide');
  });


  $('.add-new-input').on('keypress', function(event) {
    if(event.which === 13)
    {
      //сохраняем значение в объекте состояния
      state.todoItems.push({data: $(this).val(), completed: false});
      //записать данные объекта состояния в localStorage
      window.localStorage.setItem('todoData', JSON.stringify(state));
      $(this).val("");

      getSavedData();
    }
  });
}

function createNewLi(obj) {
  let newLi = document.createElement('li');
  newLi.classList.add('todo-list__item');

  $(newLi).html('<span class="trashBin"><i class="fa fa-trash" aria-hidden="true"></i></span>'
    + '<p class="todo-text">' + obj.data + '</p>');

  if (obj.completed) {
    $(newLi).find('.todo-text').addClass('taskDone');
  }

  $(newLi).click(function(){
    $(this).find('.todo-text').toggleClass('taskDone');
    let itemNum = Number($(this).index());
    state.todoItems[itemNum].completed = !state.todoItems[itemNum].completed;
    window.localStorage.setItem('todoData', JSON.stringify(state));
  });
  //при клике на корзинке удаляется вся Li'йка
  $(newLi).on('click', 'span', function(e) {
    e.stopImmediatePropagation();
    //удалить элемент из объекта состояния
    let itemNum = Number($(this).parent().index());
    state.todoItems.splice(itemNum, 1);
    window.localStorage.setItem('todoData', JSON.stringify(state));
    $(this).parent().fadeOut(function(){
      getSavedData();
    });
  });
  $('.todo-list').append(newLi);
}

function getSavedData() {
  $('.todo-list').html('');
  let data = window.localStorage.getItem('todoData');
  if (data) {
    state = JSON.parse(data);
    state.todoItems.forEach(function(dataObj){
      createNewLi(dataObj);
    });
  }
}

//тест