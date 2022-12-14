import React, { useState, useEffect } from 'react';
import type { messagesProps } from 'pages/index';
import styles from 'styles/Message.module.css';

export default function Message({ channel, userName, date, text, color }: messagesProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 style={{ color: `#${color}` }} className={styles.userName}>
          {userName}
        </h3>
        <p>{date}</p>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

// export default Message;
