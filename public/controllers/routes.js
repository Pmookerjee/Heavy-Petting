'use strict';

page.base('');
page('/', zipcodeController.index);
page('/pet', petController.index);
page('/faves', favesController.index);

page();
