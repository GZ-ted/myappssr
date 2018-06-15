/*客户端入口*/

import React from 'react';
import { hydrate } from 'react-dom';
import Home from './components/home.js';

hydrate(<Home /> , document.getElementById('app'));