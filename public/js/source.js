$(document).ready(()=>{
    $.fn.reload = function(){
        $('#tbody').empty()
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

    $('#save').click((e)=>{
        e.preventDefault();
        let Name = $('#Name').val();
        let Type = $('#Type').val();
        let Age = $('#Age').val();
        let Sound = $('#Sound').val();
        let Habitat = $('#Habitat').val();
        $.ajax({
            url: 'http://localhost:3000/Animals',
            method: 'post',
            data:{
                Name, Type, Age, Sound, Habitat
            }
        }).done((e)=>{
            $('.form1').css("visibility","hidden")
            $('.table').fadeTo('fast', 1)
            $('#tbody').reload()
        })
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
        $('.form6').css("visibility","hidden")
    })
    
    $('#save').click((e)=>{
        e.preventDefault();
        let Name = $('#Name').val();
        let Type = $('#Type').val();
        let Age = $('#Age').val();
        let Sound = $('#Sound').val();
        let Habitat = $('#Habitat').val();
        $.ajax({
            url: 'http://localhost:3000/Animals',
            method: 'post',
            data:{
                Name, Type, Age, Sound, Habitat
            }
        }).done((e)=>{
            $('#tbody').reload()
            $('.form1').css("visibility","hidden")
            $('.table').fadeTo('fast', 1)
        })
    })

    $('#log-in').click((e)=>{
        e.preventDefault();
        let userName = $('#userName').val();
        let passWord = $('#passWord').val();
        $.ajax({
            url: 'http://localhost:3000/Admin',
            method: 'get',
        }).done((e)=>{
            for(let q = 0; q < e.length; q++){
                if(e[q].userName == userName && e[q].passWord == passWord){
                    window.location.replace('localhost:3000/Animals')
                }
            }
            $('#login').css("visibility","hidden")
            $('.form6').css("visibility","visible")
        })
    })

})