//import React from 'react';
//import { render } from 'react-dom';

function convertToHtml(virtualNode) {
  //console.log(virtualNode);

  if (typeof virtualNode === 'string' || typeof virtualNode === 'number') return document.createTextNode(virtualNode);

  const $domElement = document.createElement(virtualNode.type);

  virtualNode.props.children.forEach( (virtualChildren) => {
    $domElement.appendChild(convertToHtml(virtualChildren));
  });

  return $domElement;
}

function render(initialVirtualTree, $domRoot) {
  //console.log(JSON.stringify(initialVirtualTree, null, 4));

  const $appHTML = convertToHtml(initialVirtualTree);

  //console.log("appHTML", $appHTML);
  
  $domRoot.appendChild($appHTML);
}

function createElement(elementType, props, ...children) {

  const virutalElementsProps = {
    ...props,
    children
  }
  
  if (typeof elementType === "function") return elementType(props);

  return  {
    type: elementType,
    props: virutalElementsProps
  }
}


const React = {
  createElement, render
}

//=========================================================================================

function Title(props) {
  return React.createElement("H1", null, "Nosso app recria o dom virtual estilo React");
}

function App(props) {

  return (
    React.createElement('section', {className: "App"}, 
      React.createElement("section", null, 
        React.createElement(Title, null),
        React.createElement("div", null,
          React.createElement("div", null, "0"), 
          React.createElement("button", null, "Incrementar"), 
          React.createElement("button", null, "Decrementar")
        )
      )
    )
  );

  /*
  return (
    <section>
      <div>
        <h1>Nosso app recria o dom virtual estilo React</h1>
        <div>0</div>
        <button>Incrementar</button>
        <button>Decrementar</button>
      </div>
    </section>
  );*/

}

render(React.createElement(App, null), document.querySelector('#root'));