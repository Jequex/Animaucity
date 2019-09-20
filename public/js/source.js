$(document).ready(()=>{

    $.fn.reload = function(){
        $('#tbody').empty();
        $.ajax({
            url: 'http://localhost:3000/Animals',
            method: 'GET',
            }).done((e)=>{
            for(let i = 0; i < e.length; i++){
            $('#tbody').append(
                `<tr class="clickable-row">
                    <td>${i+1}</td>
                    <td>${e[i].Name}</td>
                    <td>${e[i].Type}</td>
                    <td>${e[i].Age}</td>
                    <td>${e[i].Sound}</td>
                    <td>${e[i].Habitat}</td>
                    <td><button type="" class="btn btn-success btn-view" id="view-${e[i].id}">View&Edit</button></td>  
                    <td><button type="" class="btn btn-danger btn-delete" id="delete-${e[i].id}">Delete</button></td>   
                </tr>`
            )
            }

            $('.btn-view').on('click',(e)=>{
                y = e.target.id.split('view-').join('');
                $.ajax({
                    url: 'http://localhost:3000/Animals',
                    method: 'GET',
                    }).done((e)=>{
                    for(let i = 0; i < e.length; i++){
                        if(e[i].id == y){
                            $('#Name2').val(`${e[i].Name}`)
                            $('#Type2').val(`${e[i].Type}`)
                            $('#Age2').val(`${e[i].Age}`)
                            $('#Sound2').val(`${e[i].Sound}`)
                            $('#Habitat2').val(`${e[i].Habitat}`)
                        }
                    }
                })
                $(window).scrollTop(0)
                $('.table').fadeTo('fast', 0.4)
                $('.form2').css('visibility',"visible");
            })
    
            $('.btn-delete').on('click',(e)=>{
                x = e.target.id;
                $(window).scrollTop(0)
                $('.table').fadeTo('fast', 0.4)
                $('.form3').css('visibility',"visible");
            })
        })
    }
    
    $('#tbody').reload()

    $('#close').on('click',(e)=>{
        $('.form1').css('visibility',"hidden");
        $('.table').fadeTo('fast', 1)
    })
    
    $('#close2').on('click',(e)=>{
        $('.form2').css('visibility',"hidden");
        $('.table').fadeTo('fast', 1)
    })

    $('#close3').on('click',(e)=>{
        $('.form4').css("visibility","hidden");
        e.preventDefault()
    })

    $('#close4').on('click',(e)=>{
        $('.form5').css("visibility","hidden");
        $('.table').fadeTo('fast', 1)
        e.preventDefault()
    })

    $('#signuplogin').on('click',(e)=>{
        $('.form4').css("visibility","visible");
        e.preventDefault()
    })

    $('#signup').on('click',(e)=>{
        $('.form5').css("visibility","visible");
        $('.form4').css("visibility","hidden");
        e.preventDefault()
    })

    $('#login').on('click',(e)=>{
        $('.form4').css("visibility","visible");
        $('.form5').css("visibility","hidden");
        e.preventDefault()
    })

    $('#create').on('click',(e)=>{
        e.preventDefault()
        $('.table').fadeTo('fast', 0.4)
        $('.form1').css('visibility',"visible");
    })

    $('#createaccount').on('click',(e)=>{
        e.preventDefault()
        $('.table').fadeTo('fast', 0.4)
        $('.form5').css('visibility',"visible");
    })

    
    $('#save').click((e)=>{
        e.preventDefault();
        var Name = $('#Name').val();
        var Type = $('#Type').val();
        var Age = $('#Age').val();
        var Sound = $('#Sound').val();
        var Habitat = $('#Habitat').val();

        if(Name.length <= 2){
            $('#outputform1').html("Name is too short")
            return
        }else if(Age < 1){
            $('#outputform1').html("Animal is too young")
            return
        }else if(Sound.length <= 2){
            $('#outputform1').html("Sound is not loud enough")
            return
        }else{$.ajax({
                url: 'http://localhost:3000/Animals',
                method: 'POST',
                data:{
                    Name, Type, Age, Sound, Habitat
                }
            }).done((e)=>{
                $('.form1').css("visibility","hidden")
                $('#tbody').reload()
                $('.table').fadeTo('fast', 1)
            })
        }
        })
        

    $('#save2').click((e)=>{
        e.preventDefault();
        let Name = $('#Name2').val();
        let Type = $('#Type2').val();
        let Age = $('#Age2').val();
        let Sound = $('#Sound2').val();
        let Habitat = $('#Habitat2').val();
        $.ajax({
            url: `http://localhost:3000/Animals/${y}`,
            method: 'put',
            data:{
                Name, Type, Age, Sound, Habitat
            }
        }).done((e)=>{
            $('.form2').css("visibility","hidden")
            $('.table').fadeTo('fast', 1)
            $('#tbody').reload()
        })
    })

    $('#yes').click((e)=>{
            e.preventDefault();
            let id = x.split('delete-').join('')
            $('.form3').css("visibility","hidden")
            $.ajax({
                url: `http://localhost:3000/Animals/${id}`,
                method: 'delete',
            }).done((e)=>{
            $('.tbody').reload() 
            $('.table').fadeTo('fast', 1)
        })   
    })

    $('#no').click((e)=>{
        $('.form3').css("visibility","hidden")
        $(".table").fadeTo('fast', 1)
    })

    $('#ok').click((e)=>{
        $('.form6').css("visibility","hidden");
        e.preventDefault()
    })
    
    $('#homebtn').click((e)=>{
        window.location.replace('http://localhost:3000/');
    })

    $('#log-in').click((e)=>{
        var userName = $('#username').val();
        var passWord = $('#password').val();
        $.ajax({
            url: 'http://localhost:3000/Admin',
            method: 'GET',
        }).done((e)=>{
            for(let q = 0; q < e.length; q++){
                if(e[q].username == userName && e[q].password == passWord){
                    localStorage.setItem("Username", userName)
                }
            }if (window.localStorage.getItem("Username") != ""){
                window.location.replace('http://localhost:3000/dataPage.html');
            }else{
                $('.form4').css("visibility","hidden")
                $('.form5').css("visibility","hidden")
                $('.form6').css("visibility","visible")
            }
        })
    })

    $('#sign-up').click((e)=>{
        e.preventDefault();
        var username = $('#username2').val();
        var firstname = $('#firstname2').val();
        var lastname = $('#lastname2').val();
        var password = $('#password2').val();
        var password2 = $('#password3').val();
        var age = $('#age2').val();

        $.ajax({
            url: 'http://localhost:3000/Admin',
            method: 'GET',
            }).done((e)=>{
            for(let q = 0; q < e.length; q++){
                if(e[q].username == username){
                    $('#output').html("Username already exists")
                    return
                }else if(username.length <= 3){
                    $('#output').html("Username is too short")
                    return
                }else if(firstname.length <= 2){
                    $('#output').html("Firstname is too short")
                    return
                }else if(lastname.length <= 2){
                    $('#output').html("Lastname is too short")
                    return
                }else if(password.length < 8){
                    $('#output').html("passwords are too short")
                    return
                }else if(password2 != password){
                    $('#output').html("passwords dont match")
                    return
                }else if(parseInt(age) < 18 || age.length < 1){
                    $('#output').html("you are under 18 years")
                    return
                }
            } $.ajax({
                url: 'http://localhost:3000/Admin',
                method: 'POST',
                data:{
                    username, firstname, lastname, password, age
                }
            }).done((e)=>{
                alert("successsful")
                $('.form5').css("visibility","hidden")
                $('.table').fadeTo('fast', 1)
            })
        })

    })

    $('#logoutbtn').click((e)=>{
        localStorage.setItem("Username", "")
        window.location.replace('http://localhost:3000/')
    })
    
    $('#continueDataPage').click((e)=>{
        window.location.replace('http://localhost:3000/dataPage.html')
    })


})

function slider(){
    let p = $('#img1').attr('src');
    if(p == "./images/tiger.jpg"){
        $('#img1').attr('src',"./images/croc.jpg");
    }else if(p == "./images/croc.jpg"){
        $('#img1').attr('src',"./images/zebra.jpg");
    }else{
        $('#img1').attr('src',"./images/tiger.jpg");
    }
}

window.setInterval(slider, 5000)