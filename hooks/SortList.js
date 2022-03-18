/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from "react";
import useArrayMove from "./useArrayMove";
import SortableList, { SortableItem } from 'react-easy-sort';

export default function SortList (props) {
  if (props.list === undefined || props.list === null) return console.warn('list is not found!!');
  if (!Array.isArray(props.list)) return console.warn('list is not array!!');
  if (!props.id) return console.warn('id is not found!!');
  if (!props.name) return console.warn('name is not found!!');
  
  const list = props.list;
  const onChange = useCallback((_old, _new) => {
    let result = useArrayMove(list, _old, _new);
    props.change(result);
  }, [list, props]);

  return (
    <SortableList onSortEnd={onChange} draggedItemClassName='active'>
      {list.map(item => (
        <SortableItem key={item[props.id]}>
          <div style={props.itemStyle}>{ item.children ?? item[props.name] }</div>
        </SortableItem>
      ))}
    </SortableList>
  );
}