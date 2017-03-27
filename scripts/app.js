// Variant 1
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

// Variant 2
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

// Variant 3
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

var main = function () {
  "use strict";

  var toDos = [
  "Закончить писать эту книгу",
  "Вывести Грейси на прогулку в парк",
  "Ответить на электронные письма",
  "Подготовиться к лекции в понедельник",
  "Обновить несколько новых задач",
  "Купить продукты"
  ];

  $(".tabs a span").toArray().forEach( function (element) {
    $(element).on("click", function () {
      var $element = $(element),
      $content;
      $(".tabs a span").removeClass("active");
      $element.addClass("active");
      $("main .content").empty();
      if ($element.parent().is(":nth-child(1)")) {
        $content = $("<ul>");
        // toDos.forEach(function (todo) {
        //   $content.prepand($("<li>").text(todo));
        // });
        for (var todo = toDos.length-1; todo>=0 ; todo--) {
          $content.append($("<li>").text(toDos[todo]));
        };
        $("main .content").append($content);
      } else if ($element.parent().is(":nth-child(2)")) {
        $content = $("<ul>");
        toDos.forEach(function (todo) {
          $content.append($("<li>").text(todo));
        });
        $("main .content").append($content);
      } else if ($element.parent().is(":nth-child(3)")) {
        console.log("Third tab");
      }
      return false;
    });
  });
  $(".tabs a:first-child span").trigger("click");
};

$(document).ready(main);