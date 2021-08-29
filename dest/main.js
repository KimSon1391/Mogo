$(document).on("ready", function () {
  //menu and button nav
  let btnmenu = $(".btnmenu");
  let navMenu = $(".nav");

  //Remove Nav
  function removeNav() {
    btnmenu.removeClass("tranform");
    navMenu.removeClass("active");
    $(".bgopacity").removeClass("active");
  }

  //Show Nav
  function showNavBtn() {
    let windowWidth = $(window).width();
    if (windowWidth < 768) {
      btnmenu.addClass("active");
    } else {
      btnmenu.removeClass("active");
      removeNav();
    }
  }

  showNavBtn();

  //Show Nav when resize
  $(window).resize(function () {
    showNavBtn();
  });

  //Click Btn menu handler
  btnmenu.click(function (e) {
    e.stopPropagation();
    navMenu.toggleClass("active");
    $(this).toggleClass("tranform");
    $(".bgopacity").toggleClass("active");
  });

  $(document).click(function (e) {
    removeNav();
  });

  $(document).scroll(function (e) {
    removeNav();
  });

  //Click to scroll to section in menu
  let carousel = $(".carousel");
  let header = $("header");
  let heightHeader = header.outerHeight();
  let headerMenu = $(".header__menu li a");
  let sections = [];

  headerMenu.each(function (index) {
    let sectionName = $(this).attr("href").replace("#", "");
    let section = $("." + sectionName);
    sections.push(section);

    $(this).click(function (e) {
      e.preventDefault();

      headerMenu.removeClass("active");
      $(this).addClass("active");

      $(window).scrollTop(section.offset().top - heightHeader + 1);
    });

    $(window).scroll(function () {
      let position = $(window).scrollTop();

      //Active menu when scroll to section
      $(sections).each(function (index) {
        if (
          position > $(this).offset().top - heightHeader &&
          position < $(this).offset().top + $(this).outerHeight()
        ) {
          headerMenu.removeClass("active");
          $(headerMenu[index]).addClass("active");
        } else {
          $(headerMenu[index]).removeClass("active");
        }
      });

      //Change Header color and show back top button when scroll to slider
      if (position > carousel.outerHeight() - heightHeader) {
        header.addClass("active");
        backTop.addClass("active");
      } else {
        header.removeClass("active");
        backTop.removeClass("active");
      }
    });
  });

  //Back To Top
  let backTop = $(".backtop");
  backTop.click(function () {
    $(window).scrollTop(0);
  });

  //Faq accordian
  let faqBtn = $(".wedo__accordian-item .title");
  faqBtn.click(function () {
    faqBtn.next().not($(this).next()).slideUp();
    $(this).next().slideToggle();

    faqBtn.parent().not($(this).parent()).removeClass("active");
    $(this).parent().toggleClass("active");
  });

  //Quote slider
  let $carousel = $(".quote__wrap");
  $carousel.flickity({
    //Options
    cellAlign: "left",
    contain: true,
    wrapAround: true,
    prevNextButtons: false,
    pageDots: false,
    autoPlay: true,
    friction: 0.8,
  });
  //prev , next button
  $(".arrow.--left").on("click", function () {
    $carousel.flickity("next");
  });
  $(".arrow.--right").on("click", function () {
    $carousel.flickity("previous");
  });

  $(window).on("load", function () {
    //Replace svg
    $(".svg").svgToInline();

    //loading
    $(".loading").removeClass("active");
  });
});
