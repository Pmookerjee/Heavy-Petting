'use strict';

// card templater

// const render = Handlebars.compile($('#cardTemplate').text());

$('input:text').focus(
    function(){
        $(this).val('');
    });
