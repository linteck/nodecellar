import Backbone from 'backbone';
import * as $ from 'jquery';
import * as _ from 'underscore';
import React from 'react';

function PageItem(props) {
  let className;
  if (props.activeId === props.id) {
    className='active';
  } else {
    className='inactive';
  }
  return (
      <li className={className}>
        <a href={'#wines/page/'+ props.id}> {props.id}</a>
      </li>
  )
}

export default function Paginator(props) {
  var pageCount = Math.ceil(props.length / props.perPage);
  var pages = _.range(1, pageCount+1);
  var activeId = props.activePage;

  const listItems = pages.map((id) =>
    <PageItem key={id} id={id} activeId={activeId}/>
  );
  return (
    <div className="pagination pagination-centered">
      <ul>
        {listItems}
      </ul>
    </div>
  );
}
