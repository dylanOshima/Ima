import React from 'react';

const style = require('./Tasks.css').default;

function Tasks() {
  return (
    <div className={`${style.wrapper} center`}>
      <div className={style.date}>
        <div className={style.text_full_date}>January 13th, 2021</div>
        <h2>Wednesday</h2>
      </div>
      <div className={style.tasks}>
        <div className={style.task_header}>Today's Tasks:</div>
        <ul>
          <li>Finish figma mockups</li>
          <li>Create persistant storage</li>
          <li>Turn these into react components</li>
        </ul>
      </div>
    </div>
  );
}

export default Tasks;
