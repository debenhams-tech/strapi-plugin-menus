import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { stopPropagation } from '@strapi/helper-plugin';
import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { IconButton } from '@strapi/design-system/IconButton';
import { Typography } from '@strapi/design-system/Typography';
import ChevronDown from '@strapi/icons/ChevronDown';
import ChevronRight from '@strapi/icons/ChevronRight';
import ChevronUp from '@strapi/icons/ChevronUp';
import Plus from '@strapi/icons/Plus';
import Trash from '@strapi/icons/Trash';

import Toolbar from '../Toolbar';
import { getBoxProps, getTrad, menuItemProps } from '../../utils';
import { Label, Wrapper } from './styled';

const TreeMenuItem = forwardRef(
  (
    {
      children,
      data,
      hasChildren,
      hasErrors,
      isCollapsed,
      isFirst,
      isLast,
      isActive,
      isMaxDepth,
      onAddSubmenu,
      onClick,
      onDelete,
      onMoveUp,
      onMoveDown,
      onToggleCollapse,
    },
    ref
  ) => {
    const { formatMessage } = useIntl();

    let bgColor, borderColor;

    if (hasErrors) {
      bgColor = 'danger100';
      borderColor = 'danger600';
    }

    const boxProps = getBoxProps({
      background: bgColor ?? 'neutral0',
      borderSize: 1,
      borderStyle: 'solid',
      borderColor: borderColor ?? 'transparent',
      paddingTop: 2,
      paddingLeft: 6,
      paddingRight: 2,
      paddingBottom: 2,
      shadow: 'filterShadow',
      transition: 'background-color 0.2s, border-color 0.2s, box-shadow 0.2s',
    });

    const actions = [
      {
        key: 'add',
        hidden: isMaxDepth,
        icon: <Plus />,
        label: formatMessage({
          id: getTrad('ui.add.menu'),
          defaultMessage: 'Add submenu',
        }),
        onClick: onAddSubmenu,
      },
      {
        key: 'move-down',
        hidden: isLast,
        icon: <ChevronDown />,
        label: formatMessage({
          id: getTrad('ui.move.menuItem.down'),
          defaultMessage: 'Move item down',
        }),
        onClick: onMoveDown,
      },
      {
        key: 'move-up',
        hidden: isFirst,
        icon: <ChevronUp />,
        label: formatMessage({
          id: getTrad('ui.move.menuItem.up'),
          defaultMessage: 'Move item up',
        }),
        onClick: onMoveUp,
      },
      {
        key: 'delete',
        hidden: false,
        icon: <Trash />,
        label: formatMessage({
          id: getTrad('ui.delete.menuItem'),
          defaultMessage: 'Delete menu item',
        }),
        onClick: onDelete,
      },
    ];

    return (
      <div ref={ref}>
        <Wrapper {...boxProps} hasErrors={hasErrors} isActive={isActive} onClick={onClick}>
          <Flex justifyContent="space-between">
            <Flex>
              {hasChildren && (
                <Box paddingRight={2} {...stopPropagation}>
                  <IconButton
                    onClick={onToggleCollapse}
                    label={formatMessage(
                      isCollapsed
                        ? {
                            id: getTrad('ui.expand.menuItem'),
                            defaultMessage: 'Expand menu item',
                          }
                        : {
                            id: getTrad('ui.collapse.menuItem'),
                            defaultMessage: 'Collapse menu item',
                          }
                    )}
                    icon={isCollapsed ? <ChevronRight /> : <ChevronDown />}
                    noBorder
                  />
                </Box>
              )}
              <Label>
                {!!data.title ? (
                  data.title
                ) : (
                  <Typography textColor="neutral400" style={{ fontStyle: 'italic' }}>
                    {formatMessage({
                      id: getTrad('ui.untitled'),
                      defaultMessage: 'Untitled',
                    })}
                  </Typography>
                )}
              </Label>
            </Flex>
            {isActive && <Toolbar actions={actions} />}
          </Flex>
        </Wrapper>
        {!isCollapsed && children}
      </div>
    );
  }
);

TreeMenuItem.defaultProps = {
  children: null,
  hasChildren: false,
  hasErrors: false,
  isActive: false,
  isCollapsed: false,
  isFirst: false,
  isLast: false,
  isMaxDepth: false,
  onAddSubmenu: () => {},
  onClick: () => {},
  onDelete: () => {},
  onMoveUp: () => {},
  onMoveDown: () => {},
  onToggleCollapse: () => {},
};

TreeMenuItem.propTypes = {
  children: PropTypes.node,
  data: menuItemProps.isRequired,
  hasChildren: PropTypes.bool,
  hasErrors: PropTypes.bool,
  isActive: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  isMaxDepth: PropTypes.bool,
  onAddSubmenu: PropTypes.func,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  onMoveUp: PropTypes.func,
  onMoveDown: PropTypes.func,
  onToggleCollapse: PropTypes.func,
};

export default TreeMenuItem;
