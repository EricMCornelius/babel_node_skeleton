import polyfill from 'babel-polyfill';
import chai from 'chai';
import _ from 'lodash';

global.chai = chai;
global.should = chai.should;
global.expect = chai.expect;
global._ = _;
