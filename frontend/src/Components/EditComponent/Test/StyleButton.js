import React from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';
import LinkIcon from '@mui/icons-material/Link';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


export const StyleButton = ({ style, active, label, onToggle, className }) => {
    const onToggleCustom = (e) => {
      e.preventDefault();
      onToggle(style);
    };
  
    let toolTipText = label || '';
    if (label === 'UL') toolTipText = 'Bulleted List';
    else if (label === 'OL') toolTipText = 'Numbered List';
    else if (label === 'Monospace') toolTipText = 'Inline Code';
  
    const activeclass = `${active ? ' RichEditor-activeButton' : ''}`;
    const classNames = className + activeclass;
    return (
      <span className={classNames} onMouseDown={onToggleCustom}>
        <Tooltip title={toolTipText}>
          <IconButton>{getIconIfValid(label)}</IconButton>
        </Tooltip>
      </span>
    );
  };

  const getIconIfValid = (label) => {
    switch (label) {
      case 'Bold':
        return <FormatBoldIcon />;
      case 'Italic':
        return <FormatItalicIcon />;
      case 'Underline':
        return <FormatUnderlinedIcon />;
      case 'Monospace':
        return <CodeIcon />;
      case 'Link':
        return <LinkIcon />;
      case 'Blockquote':
        return <FormatQuoteIcon />;
      case 'UL':
        return <FormatListBulletedIcon/>;
      case 'OL':
        return <FormatListNumberedIcon />;
      case 'Code Block':
        return <DeveloperModeIcon />;
      default:
        return label;
    }
  };