import rehypeReact from "rehype-react";
import React from 'react';
import { Styled } from 'theme-ui';

const headings = ["h1", "h2", "h3", "h4", "h5","img","p","code","pre"];
const headings_components = headings.reduce(((prevValue,currentValue,index)=>{
  prevValue[currentValue] = Styled[currentValue];
  return prevValue;
}),{})

const cps = Object.assign({}, {
}, headings_components);

export default new rehypeReact({
  createElement: React.createElement,
  components: cps
  
}).Compiler;