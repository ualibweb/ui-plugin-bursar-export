import React, { useCallback, useState } from 'react';
import {
  CriteriaCardGroupType,
  CriteriaCardTerminalType,
  CriteriaGroup,
  CriteriaTerminal,
} from '../form/types';
import {
  Button,
  Dropdown,
  DropdownMenu,
  IconButton,
} from '@folio/stripes/components';

export default function CriteriaCardAddButton({
  onAdd,
}: {
  onAdd: (newValue: CriteriaGroup | CriteriaTerminal) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  const onAddCondition = useCallback(() => {
    onAdd({
      type: CriteriaCardTerminalType.AGE,
    });
    toggle();
  }, [onAdd]);

  const onAddGroup = useCallback(() => {
    onAdd({ type: CriteriaCardGroupType.ALL_OF, criteria: [] });
    toggle();
  }, [onAdd]);

  const renderMenu = useCallback(
    () => (
      <DropdownMenu
        aria-role="menu"
        aria-label="Add criteria"
        onToggle={toggle}
      >
        <ul>
          <li>
            <Button buttonStyle="dropdownItem" onClick={onAddCondition}>
              Add condition
            </Button>
          </li>
          <li>
            <Button buttonStyle="dropdownItem" onClick={onAddGroup}>
              Add group
            </Button>
          </li>
        </ul>
      </DropdownMenu>
    ),
    []
  );

  const renderTrigger = useCallback(
    ({ getTriggerProps }) => (
      <div {...getTriggerProps()}>
        {' '}
        <IconButton icon="plus-sign" />
      </div>
    ),
    []
  );

  return (
    <Dropdown
      usePortal
      open={open}
      onToggle={toggle}
      renderTrigger={renderTrigger}
      renderMenu={renderMenu}
    />
  );
}
