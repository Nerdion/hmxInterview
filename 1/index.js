'use strict';

$(()=> {
    
    $('#editUpdate').remove()

    let boxOne = $('div#sideNav > div.row > div:nth-child(1) > .box')
    let boxTwo = $('div#sideNav > div.row > div:nth-child(2) > .box')
    let boxThree = $('div#sideNav > div.row > div:nth-child(3) > .box')
    let boxFour = $('div#sideNav > div.row > div:nth-child(4) > .box')

    boxOne.css('background-color','red')
    boxTwo.css('background-color','blue')
    boxThree.css('background-color','green')
    boxFour.css('background-color','yellow')

    $(document).on('click', '.smallBox', event => {
        if(event.target.attributes.class.value.includes('fa-trash')) {
            let element = $(event.target).parent().parent()
            element.remove()
            console.log(element)
        } else if(event.target.attributes.class.value.includes('fa-edit')) {
            let element = $(event.target).parent().parent()
            let bgColor = convertToHEX(element.css('background-color'))
            $('#newColor').val(bgColor)
        } else {
            let whichBox = event.target.attributes['data-box'].value
            let boxToFill = `[data-color="${whichBox}"]`
    
            let style = getComputedStyle(event.target)
            let color = style.backgroundColor
    
            $(boxToFill).css('background-color',color)
        }

    })

    //Add options when mouse hovered
    $(document).on('mouseenter', '.smallBox', event => {
        $(event.target).append(`
            <div id="editUpdate" class="row">
                <span class="fa fa-edit modalClassButton" data-toggle="modal" data-target="#addModal"></span>
                <span class="fa fa-trash text-danger"></span>
            </div>
        `)
    })

    //Remove option immediately
    $(document).on('mouseleave', '.smallBox', event => $('.smallBox').mouseleave(()=>$('#editUpdate').remove()))

    let editElementDiv = ''
    $(document).on('click', '.modalClassButton', event => {
        if(event.target.attributes['data-button']) {
            //to identify which button was clicked
            let whichWasClicked = event.target.attributes['data-button'].value;
            //binding that value
            $('#whichNewColor').val(whichWasClicked)
            $('#isItEditing').val('false')
        } else {
            editElementDiv = $(event.target).parent().parent()
            $('#isItEditing').val('true')
        }
    })

    $('#saveNewColor').click(()=>{
        let newColorValue = $('#newColor').val()

        if($('#isItEditing').val() == 'true') {
            editElementDiv.css('background-color',newColorValue)
        } else {
            let whereToAdd = parseInt($('#whichNewColor').val())

            let calcChild = (whereToAdd*2) + (whereToAdd-1)
    
            let selector = `#buttonsNav > div:nth-child(${calcChild})`
            $(selector).append(`
                <div style="background-color: ${newColorValue};" data-box="${whereToAdd}" class="col-1 smallBox">
                </div>
            `)
        }
        $('#addModal').modal('toggle')
    })
})


/*  Used this conversion because, input[type="color"] only accepts hex value
    and jQuery.css(property) only returns RGB & also the JS DOM
*/
function convertToHEX(rgbValue) {
    let splitEach = rgbValue.match(/\d+/g)
    let hexArray = splitEach.map(e=> {
        let element = parseInt(e).toString(16)
        return (element.length==1) ? "0"+element : element; 
    })
    return '#'+hexArray.join('')
}