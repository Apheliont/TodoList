/**
 * Created by Aphel on 11.09.2016.
 */
$("i").on('click', function (){
    $("#addNew").toggle("slide");
});

$("#addNew").on('keypress', function(event) {
    if(event.which === 13)
    {
        //создаем новый элемент списка
        var newLi = document.createElement("li");


        // $(newDiv).addClass("taskItem");
        // $(newDiv).html('<span class="trashBin"><i class="fa fa-trash" aria-hidden="true"></i></span>' +
        //     '<p class="textTodo">' + $(this).val() + '</p>');
        // $(newDiv).on('click', function (event) {
        //     $(this).toggleClass("taskDone");
        //
        // });
        // $(newDiv).on('mouseenter', function () {
        //     $(this).find(".trashBin").toggle("slide");
        //     $(this).find(".trashBin").click(function () {$(this).parent(".taskItem").remove();});
        // });
        // $(newDiv).on('mouseleave', function () {
        //     $(this).find(".trashBin").toggle("slide");
        // });


        //помещаем внутрь этого элемента данные из формы ввода
        $(newLi).html('<span class="trashBin"><i class="fa fa-trash" aria-hidden="true"></i></span>' + '<p class="textTodo">' + $(this).val() + '</p>');
        //при клике по тесту он должен стать бледным и перечеркнутым
        $(newLi).click(function(){
            $(this).find(".textTodo").toggleClass("taskDone");
        });
        //при клике на корзинке удаляется вся Li'йка
        $(newLi).on('click', 'span', function() {
            $(this).parent().fadeOut(function(){
                $(this).remove();
            });
        });


        $("ul").append(newLi);
        $(this).val("");

    }
});


//тест