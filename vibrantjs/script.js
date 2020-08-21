(function () {
    'use strict';
    
//    var loadFile = function(event) {
//        var reader = new FileReader();
//        reader.onload = function(){
//          var output = document.getElementById('img');
//          output.src = reader.result;
//        };
//        reader.readAsDataURL(event.target.files[0]);
//      };
    
    var file = document.querySelector('#file');
    file.addEventListener('change', function(event) {
        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('img');
          output.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    });
    
    var img = document.querySelector('#img'),
        list = document.querySelector('ul'),
        section = document.querySelector('section'),
        paletteReady = false;
        
    var btn = document.querySelector('#load');
    img.addEventListener('load', function() {
//        if ( !paletteReady )
            getPalette();
    });
    
//    if (!paletteReady)
//        getPalette();
    
    function getPalette() {
        paletteReady = true;
        
        var vibrant = new Vibrant(img),
            swatches = vibrant.swatches(),
            listFragment = new DocumentFragment();

        let vibrantColor = null;
        
        for ( var swatch in swatches ) {
            if (swatches.hasOwnProperty(swatch) && swatches[swatch]) { 
                console.log(swatch, swatches[swatch].getHex());
                var li = document.createElement('li'),
                    p = document.createElement('p'),
                    small = document.createElement('small');

                if(vibrantColor == null) {
                    vibrantColor = swatches[swatch].getHex();
                }
                
                p.textContent = swatches[swatch].getHex();
                p.style.color = swatches[swatch].getTitleTextColor();
                small.textContent = swatch;
                // small.style.color = swatches[swatch].getBodyTextColor();
                small.style.color = vibrantColor;
                li.style.backgroundColor = swatches[swatch].getHex();
                li.appendChild(p);
                li.appendChild(small);
                listFragment.appendChild(li);
            }
        }
        list.innerHTML = '';
        list.appendChild(listFragment);
        
        if (swatches['DarkVibrant']) {
            section.style.backgroundColor = swatches['DarkVibrant'].getHex();
        }
    }
} ());