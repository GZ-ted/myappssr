/*客户端入口*/

import React from 'react';
import { render, hydrate } from 'react-dom';
import Home from './components/home.js';

//ssr，用hydrate代替render
hydrate(<Home /> , document.getElementById('app'));
