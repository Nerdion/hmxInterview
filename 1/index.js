'use strict';

$(()=> {
    
    $('#editUpdate').remove()

    // Adding some predefined colors
    let boxOne = $('[data-color="1"]')
    let boxTwo = $('[data-color="2"]')
    let boxThree = $('[data-color="3"]')
    let boxFour = $('[data-color="4"]')

    $('#buttonsNav > div:nth-child(2)').append(`<div style="background-color: #ff0000;" data-box="1" class="col-1 smallBox"></div>`)
    $('#buttonsNav > div:nth-child(5)').append(`<div style="background-color:#0000ff;" data-box="2" class="col-1 smallBox"></div>`)
    $('#buttonsNav > div:nth-child(8)').append(`<div style="background-color: #008000;" data-box="3" class="col-1 smallBox"></div>`)
    $('#buttonsNav > div:nth-child(11)').append(`<div style="background-color: yellow;" data-box="4" class="col-1 smallBox"></div>`)
    
    let smallBox1 = $('#buttonsNav > div:nth-child(2) > div:nth-child(2)').css('background-color')
    let smallBox2 = $('#buttonsNav > div:nth-child(5) > div:nth-child(2)').css('background-color')
    let smallBox3 = $('#buttonsNav > div:nth-child(8) > div:nth-child(2)').css('background-color')
    let smallBox4 = $('#buttonsNav > div:nth-child(11) > div:nth-child(2)').css('background-color')

    boxOne.css('background-color',smallBox1)
    boxTwo.css('background-color',smallBox2)
    boxThree.css('background-color',smallBox3)
    boxFour.css('background-color',smallBox4)
    //end of adding predfined colors

    $(document).on('click', '.smallBox', event => {
        if(event.target.attributes.class.value.includes('fa-trash')) {
            //delete color
            let element = $(event.target).parent().parent()
            let whichBox = element.attr('data-box')
            element.remove()
            updateColor(whichBox)
        } else if(event.target.attributes.class.value.includes('fa-edit')) {
            //edit color
            let element = $(event.target).parent().parent()
            let bgColor = convertToHEX(element.css('background-color'))
            $('#newColor').val(bgColor)
        } else {
            //code to update the color once clicked
            let whichBox = event.target.attributes['data-box'].value
            let boxToFill = `[data-color="${whichBox}"]`
    
            let style = getComputedStyle(event.target)
            let color = style.backgroundColor
    
            $(boxToFill).css('background-color',color)
        }
    })

    //Add options when mouse enters on smallBox
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
            //when we want to edit the color
            editElementDiv = $(event.target).parent().parent()
            $('#isItEditing').val('true')
        }
    })

    // Invoked when save button is pressed on the modal
    $('#saveNewColor').click(()=>{
        let newColorValue = $('#newColor').val()

        if($('#isItEditing').val() == 'true') {
            editElementDiv.css('background-color',newColorValue)
            // let whichBox = element.attr('data-box')
            // updateColor(whichBox)
            let whichBox = editElementDiv.attr('data-box')
            let updateBoxSelector = `[data-color="${whichBox}"]`
            $(updateBoxSelector).css('background-color',newColorValue)

        } else {
            let whereToAdd = parseInt($('#whichNewColor').val())

            let calcChild = (whereToAdd*2) + (whereToAdd-1)
    
            let selector = `#buttonsNav > div:nth-child(${calcChild})`
            $(selector).append(`
                <div style="background-color: ${newColorValue};" data-box="${whereToAdd}" class="col-1 smallBox">
                </div>
            `)
            updateColor(whereToAdd)
        }
        $('#addModal').modal('toggle')
    })
})

// this function updates the color on any action performed
function updateColor(bindValue) {
    let smallBoxSelector = `[data-box="${bindValue}"]` 
    let sideBoxSelector = `[data-color="${bindValue}"]`
    let smallBoxColor = $(smallBoxSelector).css('background-color')

    if(smallBoxColor != undefined)
        $(sideBoxSelector).css('background-color',smallBoxColor)
    else
        $(sideBoxSelector).css('background-color','')
}

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