/**
 * @package     Cattive.Site
 * @subpackage  Templates.cattive
 *
 * @copyright   Copyright (C) 2015, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

/* global Pace, $, document, window */

$(function () {
    var SubMenuShow = false;
    var larguraDaTela = 0;
    var travaMenu = false;

    limparMenu();
    larguraDaTela = $(document).width() - 980;
    larguraDaTela = (larguraDaTela / 2);

    $(window).resize(function (event) {

        if ($(document).width() <= 980) {
            travaMenu = true;
        } else {
            travaMenu = false;
        }
        larguraDaTela = $(document).width() - 980;
        larguraDaTela = (larguraDaTela / 2);
    });

    if ($(document).width() <= 980) {
        travaMenu = true;
    } else {
        travaMenu = false;
    }

    /* Coloca a barra de progresso azul depois que terminar de carregar */
    Pace.on('done', function () {
        $('.pace-progress').fadeOut('medium', function () {
            $(this).removeClass('pace-progress');
        });

    });

    
    /* Ativar/Desativar Img Shadow */
    $('.ativar-shadow').mouseover(function(){
        $(this).addClass('img-shadow');
    });
    $('.ativar-shadow').mouseleave(function(){
        $(this).removeClass('img-shadow');
    });
    
    
    /* Mouse Hover em cima da capa para aparecer as informações do jornal */

    $('.miniatura-capa').mouseover(function () {

        if (SubMenuShow === false) {
            $('#sub-menu-show').css('display', 'block');
            $('.info-jornal-miniatura-capa').css('display', 'block');
            SubMenuShow = true;
        }
    });



    $('#sub-menu-show').mouseover(function () {
        $(this).mouseleave(function () {
            if (SubMenuShow === true) {
                $(this).css('display', 'none');
                limparMenu();
                SubMenuShow = false;
            }
        });

    });


    $.each($('.menu-principal li'), function (index, value) {
        $(this).children('a').unbind('mouseover');
        
                $('#sub-menu-show').mouseover(function () {
                        $(this).mouseleave(function () {
                            if (SubMenuShow === true) {

                                $(this).css('display', 'none');
                                limparMenu();
                                SubMenuShow = false;
                            }
                        });

                 });
        
        $(this).children('a').on('mouseover', function () {
            if (travaMenu === false) {
                
                if (SubMenuShow === true) {

                                $('#sub-menu-show').css('display', 'none');
                                limparMenu();
                                SubMenuShow = false;
                            }

                var href = $(this).attr('href');
                var posicao = $(this).offset().left;
                posicao = posicao - larguraDaTela;

                $('.arrow-up').css('margin-left', posicao + 'px');
                $('.arrow-up-border').css('margin-left', posicao + 'px');

                 if (href == '/home') {
                     if (SubMenuShow === true) {
                                limparMenu();
                                $('#sub-menu-show').css('display', 'none');
                                SubMenuShow = false;
                            }
                 }

                else {
                    if (SubMenuShow === false) {
                        $('#sub-menu-show, .arrow-up, .arrow-up-border').css('display', 'block');
                        $('#menu-' + href.substring(1)).css('display', 'block');
                        SubMenuShow = true;
                    }
                }
                 }
        });
    });

    $('body').on('click', function () {
        if (SubMenuShow === true) {
            $('#sub-menu-show .row>div, #sub-menu-show').not('[class*="col-sm"]').css('display', 'none');
            SubMenuShow = false;
        }
    });


    $(document).on('click', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
            $(this).collapse('hide');
            console.log('atvou');
        }
    });


});


function limparMenu() {
    $('#sub-menu-show .row>div, #sub-menu-show').not('[class*="col-sm"]').css('display', 'none');
}