
var blocos;

$(function() {

// str.replace(/[^o]/g, '').length < 4 &&
// str.replace(/[^-]/g, '').length < 6 &&
// str.replace(/[^|]/g, '').length < 6
var combinations = [
  'oo##--##', 'oo||--||', 'o##|o##|', 'o|##o|##', 'o|--o|--',
  'o--|o--|', 'o--|--o|', '##oo##--', '##o|##o|', '########',
  '##|o##|o', '##||##||', '##--##oo', '##--##--', '|oo||--|',
  '|o##|o##', '|o--|o--', '|o--|--o', '|##o|##o', '|##||##|',
  '||oo||--', '||##||##', '||--||oo', '||--||--', '|--o|o--',
  '|--o|--o', '|--||oo|', '|--||--|', '--o|o--|', '--o|--o|',
  '--##oo##', '--##--##', '--|o--|o', '--||oo||', '--||--||'
].map(function (str) { return str.split(''); });

SIZE = 200;
MARGIN = 5;

function run(container,element) {


  var $container = $(container);
  SIZE = ($container.width()- 10 * MARGIN) / 4;




  var images = $container.find(element).toArray().reverse();

  function display(img, x, y, width, height) {
    if (!img) {
      return;
    }
    img.css({
      'margin-left': x * SIZE + (x + 1) * MARGIN,
      'margin-top': y * SIZE + (y + 1) * MARGIN,
      'width': width * SIZE + (width - 1) * MARGIN,
      'height': height * SIZE + (height - 1) * MARGIN,
      'display': 'inline-block'
    });
  }

  function get() {
    return $(images.pop());
  }


  function display_from_data(image){
    /*var i = image.data('i');
    var w = image.data('w');
    var h = image.data('h');
    var x = image.data('x');
    var y = image.data('y');
    var height = image.data('height');*/
    //display(image, parseInt(x),parseInt(y), parseInt(w), parseInt(h));
    display(image, image.data("x"), image.data("y"), image.data("w"), image.data("h"));
  }

  function display_block(height, block) {
    for (var i = 0; i < 8; ++i) {
      var image = null;
      var h,w;
      if (block[i] === 'o') {
        image = get();
      //  display(image, i % 4, height + Math.floor(i / 4), 1, 1);
        image.data("w",1)
        image.data("h",1)
      } else if (block[i] === '#') {
        image = get();
      //  display(image, i % 4, height + Math.floor(i / 4), 2, 2);
        block[i] = block[i + 1] = block[i + 4] = block[i + 5] = 'x';
        image.data("w",2)
        image.data("h",2)
      } else if (block[i] === '|') {
        image = get();
       // display(image, i % 4, height + Math.floor(i / 4), 1, 2);
        block[i] = block[i + 4] = 'x';
        image.data("w",1)
        image.data("h",2)
      } else if (block[i] === '-') {
        image = get();
        //display(image, i % 4, height + Math.floor(i / 4), 2, 1);
        block[i] = block[i + 1] = 'x';
        image.data("w",2)
        image.data("h",1)
      }

      if (!!image){
        image.data("type",block[i])
        image.data("height",height)
        image.data("i",i)
        image.data("x",i % 4)
        image.data("y",height + Math.floor(i / 4))
        //display(image, image.data("x"), image.data("y"), image.data("w"), image.data("h"));
        display_from_data(image)
      }
    }
  }


  var h = 0;
  if (!$container.data("processed")){
    $container.data("processed",true);
    while (images.length) {
      display_block(h, combinations[combinations.length * Math.random() | 0].concat());
      h += 2;
    }
    $container.data("h",h);
  }else{
    while (images.length  ) {
      display_from_data(get());
    }
  }

  h = $container.data("h");

  
  
  $container.height(h * SIZE +  MARGIN*h)


  $container.resize(function(){
    run(container,element)
   });

}

blocos = run;


});
