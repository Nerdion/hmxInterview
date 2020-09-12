'use strict';

$(()=> {
    let whichEvent = 0;
    $('#toggleAnimation').click(()=>{
        if(whichEvent == 0) {
            $('#box').animate({
                'left':'+=300px'
            })
            whichEvent=1;
        } else {
            $('#box').animate({
                'left':'-=300'
            })
            whichEvent=0;
        }
    })
})