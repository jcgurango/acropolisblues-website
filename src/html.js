import React from 'react';
import PropTypes from 'prop-types';
import media from './media';

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <style>
          {`
.menu-container {
  background-color: rgba(0, 0, 0, 0);

  padding: 10px 20px;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  transition: background-color 0.5s;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 34px;
}

.menu-container.bg, .menu-container:hover {
  background-color: rgb(0, 0, 0);
}

${media.desktopOnly} {
  .menu-container {
    padding: 18px 40px;
    height: 50px;
  }
}
        `}
        </style>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
