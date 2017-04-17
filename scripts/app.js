// Variant 1 Make Tab active
// var main = function () {
//   "use strict";

//   var makeTabActive = function (TabNumber) {
//     var tabSelector = ".tabs a:nth-child(" + TabNumber + ") span";
//     // делаем все вкладки неактивными
//     $(".tabs span").removeClass("active");
//     // делаем активной вкладку TabNumber
//     $(tabSelector).addClass("active");
//   };

//   $(".tabs a:nth-child(1)").on("click", function () {
//     makeTabActive (1);
//     // очищаем основное содержание, чтобы переопределить его
//     $("main .content").empty();
//     // возвращается false, так как мы не переходим по ссылке
//     return false;
//   });
//   $(".tabs a:nth-child(2)").on("click", function () {
//     makeTabActive (2);
//     $("main .content").empty();
//     return false;
//   });
//   $(".tabs a:nth-child(3)").on("click", function () {
//     makeTabActive (3);
//     $("main .content").empty();
//     return false;
//   });
// };

// Variant 2 Make Tab active
// var main = function () {
//   "use strict";
//   var tabNumber;
//   for (tabNumber=1; tabNumber<=3; tabNumber++) {
//     var tabSelector = ".tabs a:nth-child("+ tabNumber +") span";
//     $(tabSelector).on("click", function () {
//       $(".tabs span").removeClass("active");
//       $(this).addClass("active");
//       $("main .content").empty();
//       return false;
//     });
//   }
// };

// Variant 3 Make Tab active
// var main = function () {
//   "use strict";
//   $(".tabs a span").toArray().forEach( function (element) {
//     $(element).on("click", function () {
//       $(".tabs a span").removeClass("active");
//       $(element).addClass("active");
//       $("main .content").empty();
//       return false;
//     });
//   });
// };

var toDoObjects = JSON.parse(
  '[\
    {\
    "description" : "Купить продукты",\
    "tags" : [ "шопинг", "рутина" ]\
    },\
    {\
    "description" : "Сделать несколько новых задач",\
    "tags" : [ "писательство", "работа" ]\
    },\
    {\
    "description" : "Подготовиться к лекции в понедельник",\
    "tags" : [ "работа", "преподавание" ]\
    },\
    {\
    "description" : "Ответить на электронные письма",\
    "tags" : [ "работа" ]\
    },\
    {\
    "description" : "Вывести Грейси на прогулку в парк",\
    "tags" : [ "рутина", "питомцы" ]\
    },\
    {\
    "description" : "Закончить писать книгу",\
    "tags" : [ "писательство", "работа" ]\
    }\
  ]');

var organizeByTags = function (toDoObjects) {
  var tags = [];

  toDoObjects.forEach(function (toDo) {
    toDo.tags.forEach(function (tag) {
      if ( tags.indexOf(tag) === -1 ) {
        tags.push(tag);
      }
    });
  });
  
  var tagObjects = tags.map(function (tag) {
    var toDoWithTag = [];
    toDoObjects.forEach(function (toDo) {
      if (toDo.tags.indexOf(tag) !== -1) {
        toDoWithTag.push(toDo.description);
      }
    });
    return { "name":tag, "toDos":toDoWithTag};
  });
  return tagObjects;
};

var main = function () {
  "use strict";

  var toDos = toDoObjects.map( function ( toDo ) {
    return toDo.description
  });

  $(".tabs a span").toArray().forEach( function (element) {
    var $element = $(element);

    $element.on("click", function () {
      var $content,
          $input,
          $button;

      $(".tabs a span").removeClass("active");
      $element.addClass("active");
      $("main .content").empty();

      if ($element.parent().is(":nth-child(1)")) {
        $content = $("<ul>");

        // Variant with forEach() cicle
        /*toDos.forEach(function (todo) {
          $content.prepand($("<li>").text(todo));
        });*/

        // Variant with for() cicle
        for (var todo = toDos.length-1; todo>=0 ; todo--) {
          $content.append($("<li>").text(toDos[todo]));
        };

      } else if ($element.parent().is(":nth-child(2)")) {
        $content = $("<ul>");
        toDos.forEach(function (todo) {
          $content.append($("<li>").text(todo));
        });

      } else if ($element.parent().is(":nth-child(3)")) {
        var organizedByTags = organizeByTags(toDoObjects).sort(function (a, b) {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
        });

        organizedByTags.forEach(function (tag) {
          var $tagName = $("<h3>").text(tag.name),
              $content = $("<ul>");
          tag.toDos.forEach(function (description) {
            var $li = $("<li>").text(description);
            $content.append($li);
          });
          $("main .content").append($tagName);
          $("main .content").append($content);
        });

      } else if ($element.parent().is(":nth-child(4)")) {

        var $input = $("<input>").addClass("description").attr("type","text").attr("placeholder","Новое задание"),
          $inputLabel = $("<p>").text("Description: "),
          $tagInput = $("<input>").addClass("tags").attr("placeholder","работа, шопинг, преподавание"),
          $tagLabel = $("<p>").text("Tags: "),
          $button = $("<button>").text("+");

        $button.on("click", function() {
          if($input.val() !== "") {
            var description = $input.val(),
              tags = $tagInput.val().split(",");

            toDoObjects.push({"description":description, "tags":tags});

            toDos = toDoObjects.map(function (toDo) {
              return toDo.description;
            });

            $input.val("");
            $tagInput.val("");
          }
        });

        $content = $("<div>").append($inputLabel, $input, $tagLabel, $tagInput, $button);
      }

      $("main .content").append($content);

      return false;
    });
  });

  $(".tabs a:first-child span").trigger("click");
};

$(document).ready(main);

  /* // Вариант получения списка задач из файла
  function () {
    $.getJSON("todos.json", function (toDoObjects) {
    // вызов функции main с аргументом в виде объекта toDoObjects
    main(toDoObjects);
  });
  */
  /* // Вариант прямого указания списка задач в тексте программы
  function () {
    var toDos = [
    "Закончить писать эту книгу",
    "Вывести Грейси на прогулку в парк",
    "Ответить на электронные письма",
    "Подготовиться к лекции в понедельник",
    "Обновить несколько новых задач",
    "Купить продукты"
    ];
    main(toDos);
  }
  */