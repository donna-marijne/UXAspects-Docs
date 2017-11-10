/*
  Import jQuery and expose to global scope
*/
import * as $ from 'jquery';
(<any>window).$ = $;
(<any>window).jQuery = $;

// import only the required jquery ui functionality
import 'jquery-ui/ui/unique-id';
import 'jquery-ui/ui/position';
import 'jquery-ui/ui/widgets/sortable';

import 'bootstrap';

/*
  Import AngularJS
*/
import 'angular';

/*
  Import Angular 1 Components and their dependencies
*/
import '@ux-aspects/ux-aspects/dist/ng1/ux-aspects-ng1';

/*
    Import Angular Libraries
*/
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
import '@angular/upgrade';
