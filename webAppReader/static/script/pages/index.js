;(function () {
  'use strict';
  var startX,
    endX,
    windowWidth = $(window).width(),
    offset = $($('.Swipe-tab').find('a')[0]).offset(),
    index_header_tab_width = offset.width;
  var mySwiper = new Swiper('.swiper-container', {//banner插件
    autoplay: 5000,
    width: windowWidth,
    loop: true
  });
  
  function main(){
    Puls();
  }
  
  function Puls(e) {
    var $container = $('#container'),
      TabI = $('.Swipe-tab i'),
      _this = this,
      TabA = $('.Swipe-tab a');
    $(TabA[0]).on('touchstart', function () {
      //_this.duration = 0.5;
      //_this.header_duration = 0.5;
      $container.animate({
        translate3d: '0px,0px,0px'
      });
      TabI.animate({
        translate3d: '0px,0px,0px'
      });
      $(this).addClass('Swipe-tab__on');
      $(TabA[1]).removeClass('Swipe-tab__on');
    });
  
    $(TabA[1]).on('touchstart', function () {
      $container.animate({
        translate3d: '' + (-windowWidth) + 'px,0px,0px'
      });
      TabI.animate({
        translate3d: '' + index_header_tab_width + 'px,0px,0px'
      });
      $(this).addClass('Swipe-tab__on');
      $(TabA[0]).removeClass('Swipe-tab__on');
    });
    var startX,
      endX,
      ctTransform;
  
    $container.on('touchstart', function (e) {
      startX = e.changedTouches[0].pageX;
    });
  
    $container.on('touchmove', function (e) {
      e.preventDefault();
    });
  
    $container.on('touchend', function (e) {
      endX = e.changedTouches[0].pageX;
      ctTransform = $container.css('transform');
      var forest = 'translate3d(' + (-windowWidth) + 'px, 0px, 0px)'
      if (endX > startX && ctTransform == forest) {
        $container.animate({
          translate3d: '0px,0px,0px'
        });
        $(TabA[1]).removeClass('Swipe-tab__on');
        $(TabA[0]).addClass('Swipe-tab__on');
        $(TabI).animate({
          translate3d: '0px,0px,0px'
        });
      }
      if (endX < startX && ctTransform != forest) {
        $container.animate({
          translate3d: '' + (-windowWidth) + 'px,0px,0px'
        });
        $(TabA[0]).removeClass('Swipe-tab__on');
        $(TabA[1]).addClass('Swipe-tab__on');
        $(TabI).animate({
          translate3d: '' + (index_header_tab_width) + 'px,0px,0px'
        });
      }
    });
  }
  
  $.get('/ajax/index', function (d) {
//获取当前屏幕宽度
    if (windowWidth < 320) {
      windowWidth = 320;
    }
    new Vue({
      el: '#app',
      data: {
        screen_width: windowWidth,
        double_screen_width: windowWidth * 2,
        doubler_screen_width: windowWidth * 2,
        index_header_tab_width: index_header_tab_width,
        top: d.items[0].data.data,
        hot: d.items[1].data.data,
        recommend: d.items[2].data.data,
        female: d.items[2].data.data,
        male: d.items[3].data.data,
        free: d.items[4].data.data,
        topic: d.items[5].data.data,
        duration: 0,
        position: 0,//屏幕宽度定位
        header_position: 0,//动画效果
        header_duration: 0,
        tab_1_class: 'Swipe-tab__on',
        tab_2_class: ''
      }/*,
      methods: {
        tabSwitch: function (pos) {
          var _this = this;
          this.duration = 0.5;
          this.header_duration = 0.5;
          if (pos === 0) {
            this.position = 0;
            this.header_position = 0;
            this.tab_1_class = 'Swipe-tab__on';
            this.tab_2_class = '';
          }
          if (pos === 1) {
            this.position = (-this.screen_width);
            this.header_position = index_header_tab_width;
            this.tab_2_class = 'Swipe-tab__on';
            this.tab_1_class = '';
          }
        }
      }*/
    })
  }, 'json');
  main();
})();
/*,
Puls: function (e) {
  var $container = $('#container'),
    TabI = $('.Swipe-tab i'),
    _this = this,
    TabA = $('.Swipe-tab a');
    $(TabA[0]).on('touchstart',function () {
    //_this.duration = 0.5;
    //_this.header_duration = 0.5;
    $container.animate({
      translate3d: '0px,0px,0px'
    });
    TabI.animate({
      translate3d: '0px,0px,0px'
    });
    $(this).addClass('Swipe-tab__on');
    $(TabA[1]).removeClass('Swipe-tab__on');
  });
  
  $(TabA[1]).on('touchstart',function () {
    $container.animate({
      translate3d: '' + (-windowWidth) + 'px,0px,0px'
    });
    TabI.animate({
      translate3d: '' + index_header_tab_width + 'px,0px,0px'
    });
    $(this).addClass('Swipe-tab__on');
    $(TabA[0]).removeClass('Swipe-tab__on');
  });
  var startX,
      endX,
      ctTransform;
  
  $container.on('touchstart',function(e){
    e.preventDefault();
    startX = e.changedTouches[0].pageX;
  });
  
  $container.on('touchmove',function(e){
    e.preventDefault();
    console.log(e.changedTouches[0].pageX);
  });
  
  $container.on('touchend',function(e){
    e.preventDefault();
    endX = e.changedTouches[0].pageX;
    ctTransform = $container.css('transform');
    var forest = 'translate3d('+ (-windowWidth) +'px, 0px, 0px)'
    if(endX > startX && ctTransform == forest ){
      $container.animate({
        translate3d: '0px,0px,0px'
      });
      $(TabA[1]).removeClass('Swipe-tab__on');
      $(TabA[0]).addClass('Swipe-tab__on');
      $(TabI).animate({
        translate3d: '0px,0px,0px'
      });
    }
    if(endX < startX && ctTransform != forest){
      $container.animate({
        translate3d: '' + (-windowWidth) + 'px,0px,0px'
      });
      $(TabA[0]).removeClass('Swipe-tab__on');
      $(TabA[1]).addClass('Swipe-tab__on');
      $(TabI).animate({
        translate3d: '' + (index_header_tab_width) + 'px,0px,0px'
      });
    }
  });*/
  //console.log(e.changedTouches[0].pageX);
  


/*  $container.swipeLeft(function (e) {//向左滑动
    e.preventDefault();
    var slide = $(this).css('transform'),
      _this = $(this);
    if (slide == 'translate3d(0px, 0px, 0px)') {
      _this.animate({
        
        translate3d: '' + (-windowWidth) + 'px,0px,0px'
      });
      $(TabA[0]).removeClass('Swipe-tab__on');
      $(TabA[1]).addClass('Swipe-tab__on');
      $(TabI).animate({
        translate3d: '' + (index_header_tab_width) + 'px,0px,0px'
      });
    }
  });
  
  $container.swipeRight(function (e) {
    e.preventDefault();
    var slide2 = $(this).css('transform'),
      _this = $(this);
    if (slide2 != 'translate3d(0px, 0px, 0px') {
      _this.animate({
        
        translate3d: '0px,0px,0px'
      });
      $(TabA[1]).removeClass('Swipe-tab__on');
      $(TabA[0]).addClass('Swipe-tab__on');
      $(TabI).animate({
        translate3d: '0px,0px,0px'
      });
    }
  });
}*/



