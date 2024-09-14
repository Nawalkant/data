import React, { useState } from 'react';
import { List, Switch } from 'antd';

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

const ToggleListComponent = () => {
  const [toggleStates, setToggleStates] = useState(new Array(items.length).fill(false));

  const handleToggle = (index) => {
    const updatedStates = [...toggleStates];
    updatedStates[index] = !updatedStates[index];
    setToggleStates(updatedStates);
  };

  return (
    <List
      dataSource={items}
      renderItem={(item, index) => (
        <List.Item
          actions={[
            <Switch
              checked={toggleStates[index]}
              onChange={() => handleToggle(index)}
              key={`toggle-${index}`}
            />,
          ]}
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
        >
          {item}
        </List.Item>
      )}
      style={{ width: '100%' }}
    />
  );
};

export default ToggleListComponent;
